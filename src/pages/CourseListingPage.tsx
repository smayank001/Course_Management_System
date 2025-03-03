import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchCourses } from '../store/slices/coursesSlice';
import CourseCard from '../components/CourseCard';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import { BookOpen } from 'lucide-react';

const CourseListingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { courses, loading, error, searchQuery } = useAppSelector(state => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Error loading courses: {error}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Courses</h1>
        <p className="text-gray-600">Discover and enroll in our wide range of courses</p>
      </div>
      
      <SearchBar />
      
      {loading ? (
        <LoadingSpinner />
      ) : courses.length > 0 ? (
        <>
          {searchQuery && (
            <p className="text-gray-600 mb-4">
              Showing results for "{searchQuery}"
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-500">
            {searchQuery 
              ? `No courses match "${searchQuery}". Try a different search term.` 
              : "There are no courses available at the moment."}
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseListingPage;