import React,{useRef} from "react";
import '../App.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
const filters = [
    'All', 'Live', 'Music', 'Education','Gaming', 'Programming',
    'Food', 'Health', 'Wellness', 'Nature',"Yoga","Movie",'T-Series',
  ];
  
  const FilterButtons = ({ selectedFilter, onFilterSelect }) => {
    const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

    return (
      
      <div className="relative group flex items-center">
      {/* Left Scroll Button */}
      <button
        className="absolute left-0 z-10 bg-white p-1 shadow rounded-lg group-hover:opacity-100 "
        onClick={scrollLeft}
      >
        <ChevronLeft />
      </button>

      {/* Scrollable Filters */}
      <div
        ref={scrollRef}
        className="mx-8 flex hover:overflow-x-auto gap-2 p-2 scrollbar-hide"
      >
        {filters.map(filter => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
              selectedFilter === filter ? 'bg-black text-white' : 'bg-gray-200'
            }`}
            onClick={() => onFilterSelect(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Right Scroll Button */}
      <button
        className="absolute right-0 z-10 bg-white p-1 shadow rounded-full"
        onClick={scrollRight}
      >
        <ChevronRight />
      </button>
    </div>
  );
  };
  export default FilterButtons