"use client"

import { useState, useEffect, useRef } from "react"
import { Bell } from "lucide-react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { INotification } from "@/interface/response"

export default function NotificationDropdown() {
  const [notifications, setNotifications] = useState<INotification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get("http://localhost:2900/notification/v1?page=1&limit=10", {
        withCredentials: true
      })
      
      if (response.data.success) {
        setNotifications(response.data.notifications)
        // Check if there are any unread notifications
        setHasUnread(response.data.notifications.some((notif: INotification) => !notif.isRead))
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Mark a notification as read
  const markAsRead = async (notificationId: string) => {
    try {
      const response = await axios.patch(
        `http://localhost:2900/notification/v1/${notificationId}/read`,
        {},
        { withCredentials: true }
      )
      
      if (response.data.success) {
        // Update the notification in the state
        setNotifications(prevNotifications => 
          prevNotifications.map(notif => 
            notif._id === notificationId ? { ...notif, isRead: true } : notif
          )
        )
        
        // Check if there are still unread notifications
        const stillHasUnread = notifications.some(
          notif => notif._id !== notificationId && !notif.isRead
        )
        setHasUnread(stillHasUnread)
      }
    } catch (error) {
      console.error("Failed to mark notification as read:", error)
      toast.error("Failed to mark notification as read")
    }
  }

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(notif => !notif.isRead)
      
      if (unreadNotifications.length === 0) return
      
      // Create an array of promises for each unread notification
      const markReadPromises = unreadNotifications.map(notif => 
        axios.patch(
          `http://localhost:2900/notification/v1/${notif._id}/read`,
          {},
          { withCredentials: true }
        )
      )
      
      await Promise.all(markReadPromises)
      
      // Update all notifications in the state
      setNotifications(prevNotifications => 
        prevNotifications.map(notif => ({ ...notif, isRead: true }))
      )
      
      setHasUnread(false)
      toast.success("All notifications marked as read")
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error)
      toast.error("Failed to mark all notifications as read")
    }
  }

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      fetchNotifications()
    }
  }

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Fetch notifications on initial load
  useEffect(() => {
    fetchNotifications()
    
    // Set up polling to check for new notifications every minute
    const intervalId = setInterval(fetchNotifications, 60000)
    
    return () => clearInterval(intervalId)
  }, [])

  // Get notification icon color based on type
  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'booking':
        return 'text-blue-500'
      case 'payment':
        return 'text-green-500'
      case 'review':
        return 'text-yellow-500'
      case 'system':
      default:
        return 'text-gray-500'
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="relative p-2 rounded-full hover:bg-[#dbd7cc] transition-colors"
        aria-label="Notifications"
      >
        <Bell className="h-6 w-6 fill-[#99775C] hover:fill-[#886a52] transition-colors" />
        {hasUnread && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg overflow-hidden z-50 border border-[#EAE7DD]">
          <div className="p-4 border-b border-[#EAE7DD] flex justify-between items-center bg-[#EAE7DD]">
            <h3 className="text-lg font-medium text-[#99775C]">Notifications</h3>
            {hasUnread && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsRead}
                className="text-xs hover:bg-[#dbd7cc] text-[#99775C] font-medium"
              >
                Mark all as read
              </Button>
            )}
          </div>
          
          <div className="max-h-[480px] overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-[#99775C]">Loading notifications...</div>
            ) : notifications.length > 0 ? (
              <ul>
                {notifications.map((notification) => (
                  <li 
                    key={notification._id}
                    className={cn(
                      "p-4 border-b border-[#EAE7DD] hover:bg-[#EAE7DD]/20 transition-colors cursor-pointer",
                      !notification.isRead && "bg-[#EAE7DD]/10"
                    )}
                    onClick={() => !notification.isRead && markAsRead(notification._id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full mt-2",
                        getNotificationColor(notification.type)
                      )}></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800 font-medium">{notification.message}</p>
                        <p className="text-xs text-[#99775C] mt-1">
                          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center text-[#99775C]">
                <p className="text-sm">No notifications</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Update the getNotificationColor function
const getNotificationColor = (type: string) => {
  switch (type) {
    case 'booking':
      return 'bg-[#99775C]'
    case 'payment':
      return 'bg-green-500'
    case 'review':
      return 'bg-yellow-500'
    case 'system':
    default:
      return 'bg-gray-400'
  }
}