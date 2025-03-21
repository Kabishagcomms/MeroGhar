import Api from './axios'

export async function getNotifications(page = 1, limit = 10) {
  try {
    const response = await Api.get(`/notification/v1?page=${page}&limit=${limit}`, {
      withCredentials: true,
    })
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch notifications')
    }
    
    return response.data.notifications
  } catch (error) {
    console.error('Error fetching notifications:', error)
    throw error
  }
}

export async function markNotificationAsRead(notificationId: string) {
  try {
    const response = await Api.patch(`/notification/v1/${notificationId}/read`, {}, {
      withCredentials: true,
    })
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to mark notification as read')
    }
    
    return true
  } catch (error) {
    console.error('Error marking notification as read:', error)
    throw error
  }
}