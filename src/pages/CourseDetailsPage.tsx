import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchCourseById, clearSelectedCourse } from '../store/slices/coursesSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import { ArrowLeft, Clock, MapPin, Heart, ChevronDown, ChevronUp } from 'lucide-react';

const CourseDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedCourse, loading, error } = useAppSelector(state => state.courses);
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([]);

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseById(parseInt(id)));
    }
    
    return () => {
      dispatch(clearSelectedCourse());
    };
  }, [dispatch, id]);

  const toggleWeek = (weekNumber: number) => {
    setExpandedWeeks(prev => 
      prev.includes(weekNumber)
        ? prev.filter(w => w !== weekNumber)
        : [...prev, weekNumber]
    );
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-sm text-red-700">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!selectedCourse) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
          <p className="text-sm text-yellow-700">Course not found</p>
        </div>
      </div>
    );
  }

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        onClick={handleBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to Courses
      </button>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-64 overflow-hidden">
          <img 
            src={selectedCourse.thumbnail} 
            alt={selectedCourse.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-6">
          <div className="flex flex-wrap justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 mr-4">{selectedCourse.name}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedCourse.enrollmentStatus)}`}>
              {selectedCourse.enrollmentStatus}
            </span>
          </div>
          
          <div className="flex items-center text-gray-600 mb-6">
            <Heart size={18} className="text-red-500 mr-1" />
            <span>{selectedCourse.likes} likes</span>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Instructor</h2>
            <p className="text-gray-700">{selectedCourse.instructor}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
            <p className="text-gray-700">{selectedCourse.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <div className="flex items-start mb-4">
                <Clock size={20} className="text-gray-500 mr-2 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-800">Duration</h3>
                  <p className="text-gray-600">{selectedCourse.duration}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin size={20} className="text-gray-500 mr-2 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-800">Location</h3>
                  <p className="text-gray-600">{selectedCourse.location}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Schedule</h3>
              <p className="text-gray-600 mb-4">{selectedCourse.schedule}</p>
              
              <h3 className="font-medium text-gray-800 mb-2">Prerequisites</h3>
              <ul className="list-disc list-inside text-gray-600">
                {selectedCourse.prerequisites.map((prereq, index) => (
                  <li key={index}>{prereq}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Syllabus</h2>
            <div className="border rounded-lg overflow-hidden">
              {selectedCourse.syllabus.map((item) => (
                <div 
                  key={item.week}
                  className="border-b last:border-b-0"
                >
                  <button
                    onClick={() => toggleWeek(item.week)}
                    className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50 focus:outline-none"
                  >
                    <div>
                      <span className="font-medium">Week {item.week}:</span> {item.topic}
                    </div>
                    {expandedWeeks.includes(item.week) ? (
                      <ChevronUp size={18} className="text-gray-500" />
                    ) : (
                      <ChevronDown size={18} className="text-gray-500" />
                    )}
                  </button>
                  
                  {expandedWeeks.includes(item.week) && (
                    <div className="p-4 pt-0 bg-gray-50">
                      <p className="text-gray-700">{item.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;