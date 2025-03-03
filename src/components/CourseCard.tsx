import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types';
import { Heart } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-green-100 text-green-800';
      case 'Closed':
        return 'bg-red-100 text-red-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link to={`/course/${course.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="h-48 overflow-hidden">
          <img 
            src={course.thumbnail} 
            alt={course.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.enrollmentStatus)}`}>
              {course.enrollmentStatus}
            </span>
          </div>
          <p className="text-gray-600 mb-4">Instructor: {course.instructor}</p>
          <div className="flex items-center text-gray-500">
            <Heart size={16} className="text-red-500 mr-1" />
            <span>{course.likes} likes</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;