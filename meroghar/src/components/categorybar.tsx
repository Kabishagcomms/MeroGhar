"use client";
import useModal from '../store/useModal'
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import { propertyOptions } from '../configs/constant'
import { 
  Home, 
  Building2, 
  Warehouse, 
  Castle, 
  Hotel, 
  Ship, // replaced Boat
  Tent, 
  Home as TinyHome, 
  Wind, 
  Building, 
  HomeIcon, 
  Building as Duplex,
  LandPlot, // replaced Palace
  Store,
  Hotel as Resort
} from "lucide-react";

type CategoryItem = {
  id: string;
  label: string;
  active?: boolean;
};

interface CategoryBarProps {
  onCategorySelect: (category: string | null) => void;
}

// Add this import at the top


export default function CategoryBar({ onCategorySelect }: CategoryBarProps) {
  const modal = useModal();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories: CategoryItem[] = propertyOptions.map(option => ({
    id: option.toLowerCase().replace(/[/\s]/g, '-'),
    label: option,
  }));

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      // Initial check for arrows
      handleScroll();
      
      // Force a recheck after component fully renders
      setTimeout(handleScroll, 100);
      
      return () => scrollElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    // Ensure right arrow shows on initial load if content overflows
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      setShowRightArrow(scrollWidth > clientWidth);
    }
  }, [categories]);

  const handleCategoryClick = (categoryId: string) => {
    const newCategory = activeCategory === categoryId ? null : categoryId;
    setActiveCategory(newCategory);
    onCategorySelect(newCategory);
  };

  const getIconForCategory = (categoryId: string) => {
    switch (categoryId) {
      case 'house': return <Home className="h-5 w-5 text-gray-500" />;
      case 'flat-apartment': return <Building2 className="h-5 w-5 text-gray-500" />;
      case 'cabin': return <Warehouse className="h-5 w-5 text-gray-500" />;
      case 'castle': return <Castle className="h-5 w-5 text-gray-500" />;
      case 'guest-house': return <Hotel className="h-5 w-5 text-gray-500" />;
      case 'houseboat': return <Ship className="h-5 w-5 text-gray-500" />; // updated
      case 'shepherds-hut': return <Tent className="h-5 w-5 text-gray-500" />;
      case 'tiny-home': return <TinyHome className="h-5 w-5 text-gray-500" />;
      case 'windmill': return <Wind className="h-5 w-5 text-gray-500" />;
      case 'condominium': return <Building className="h-5 w-5 text-gray-500" />;
      case 'town-house': return <HomeIcon className="h-5 w-5 text-gray-500" />;
      case 'duplex': return <Duplex className="h-5 w-5 text-gray-500" />;
      case 'villa': return <LandPlot className="h-5 w-5 text-gray-500" />; // updated
      case 'studio': return <Store className="h-5 w-5 text-gray-500" />;
      case 'beach-resort': return <Resort className="h-5 w-5 text-gray-500" />;
      default: return <Home className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative flex items-center">
        {/* Left Arrow Button */}
        {showLeftArrow && (
          <Button
            onClick={scrollLeft}
            className="absolute left-8 z-10 rounded-full p-1 h-7 w-7 shadow-md bg-[#99775C] hover:bg-[#886a52]"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4 text-white" />
          </Button>
        )}

        {/* Category List */}
        <div
          ref={scrollRef}
          className="flex space-x-6 py-4 overflow-x-auto mx-8 scroll-smooth"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            maxWidth: 'calc(100% - 180px)' // Increased space for filter button
          }}
          onScroll={handleScroll}
        >
          {categories.map((category, index) => (
            <div key={category.id} className="relative">
              {index === 0 && (
                <div className="absolute -top-4 left-0 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                  Hottest
                </div>
              )}
              <button
                className={`flex flex-col items-center space-y-2 min-w-[80px] transition-opacity ${
                  activeCategory && activeCategory !== category.id ? "opacity-60" : "opacity-100"
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="h-6 w-6 relative flex items-center justify-center">
                  {getIconForCategory(category.id)}
                </div>
                <span className={`text-xs whitespace-nowrap text-muted-foreground`}>
                  {category.label}
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        {showRightArrow && (
          <Button
            onClick={scrollRight}
            className="absolute right-36 z-10 rounded-full p-1 h-7 w-7 shadow-lg bg-[#99775C] hover:bg-[#886a52]"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4 text-white" />
          </Button>
        )}

        {/* Filters Button */}
        <div className="absolute right-8 border-l pl-4 flex items-center z-10">
          <Button 
            onClick={() => modal.onOpen('search')}
            variant="outline" 
            className="ml-4 rounded-md gap-2 h-10 border-[#99775C] text-[#99775C] hover:bg-[#99775C] hover:text-white"
          >
            <Sliders className="h-4 w-4" />
            <span className="font-medium text-sm">Filters</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
