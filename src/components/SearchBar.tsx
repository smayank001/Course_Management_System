import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setSearchQuery, searchCourses } from '../store/slices/coursesSlice';

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector(state => state.courses);
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Update local state when redux state changes
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localQuery !== searchQuery) {
        dispatch(setSearchQuery(localQuery));
        dispatch(searchCourses(localQuery));
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localQuery, dispatch, searchQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchQuery(localQuery));
    dispatch(searchCourses(localQuery));
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto mb-6">
      <div className="relative">
        <input
          type="text"
          value={localQuery}
          onChange={handleChange}
          placeholder="Search courses or instructors..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
      </div>
    </form>
  );
};

export default SearchBar;