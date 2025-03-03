import React from 'react';
import { Link } from 'react-router-dom';
import { EnrolledCourse } from '../types';
import { CheckCircle, Calendar } from 'lucide-react';
import { useAppDispatch } from '../hooks';
import { updateCourseCompletion } from '../store/slices/studentSlice';

interface EnrolledCourseCardProps {
  course: EnrolledCourse;
}

const EnrolledCourseCard: React.FC<EnrolledCourseCardProps> = ({ course }) => {
  const dispatch = useAppDispatch();

  const handleToggleCompletion = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(updateCourseCompletion({ 
      courseId: course.id, 
      completed: !course.completed 
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 h-40 md:h-auto">
          <img 
            src={course.thumbnail} 
            alt={course.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 md:w-3/4">
          <div className="flex justify-between items-start">
            <Link to={`/course/${course.id}`}>
              <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-600">{course.name}</h3>
            </Link>
            <button 
              onClick={handleToggleCompletion}
              className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                course.completed 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              <CheckCircle size={16} className={`mr-1 ${course.completed ? 'text-green-600' : 'text-gray-500'}`} />
              {course.completed ? 'Completed' : 'Mark as Complete'}
            </button>
          </div>
          
          <p className="text-gray-600 mb-2">Instructor: {course.instructor}</p>
          
          <div className="flex items-center text-gray-500 mb-3">
            <Calendar size={16} className="mr-1" />
            <span>Due: {course.dueDate}</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500">{course.progress}% complete</p>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourseCard;