import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchStudentData, fetchEnrolledCourses } from '../store/slices/studentSlice';
import EnrolledCourseCard from '../components/EnrolledCourseCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { User, BookOpen } from 'lucide-react';

const StudentDashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { student, enrolledCourses, loading, error } = useAppSelector(state => state.student);

  useEffect(() => {
    dispatch(fetchStudentData());
    dispatch(fetchEnrolledCourses());
  }, [dispatch]);

  if (loading && !student) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-sm text-red-700">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center">
          <div className="bg-blue-100 p-3 rounded-full">
            <User size={24} className="text-blue-600" />
          </div>
          <div className="ml-4">
            <h1 className="text-2xl font-bold text-gray-900">{student?.name}'s Dashboard</h1>
            <p className="text-gray-600">{student?.email}</p>
          </div>
        </div>
      </div>
      
      <h2 className="text-xl font-semibold text-gray-800 mb-4">My Enrolled Courses</h2>
      
      {loading ? (
        <LoadingSpinner />
      ) : enrolledCourses.length > 0 ? (
        <div>
          {enrolledCourses.map(course => (
            <EnrolledCourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No enrolled courses</h3>
          <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
        </div>
      )}
    </div>
  );
};

export default StudentDashboardPage;