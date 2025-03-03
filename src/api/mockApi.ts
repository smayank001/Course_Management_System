import { Course, EnrolledCourse, Student } from '../types';

// Mock data for courses
const coursesData: Course[] = [
  {
    id: 1,
    name: "Introduction to React",
    instructor: "John Doe",
    description: "Learn the fundamentals of React, including components, state, props, and hooks. Build your first React application from scratch.",
    enrollmentStatus: "Open",
    thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    duration: "8 weeks",
    schedule: "Tuesdays and Thursdays, 6:00 PM - 8:00 PM",
    location: "Online",
    prerequisites: ["Basic JavaScript knowledge", "HTML and CSS fundamentals"],
    syllabus: [
      { week: 1, topic: "Introduction to React", content: "Overview of React, Virtual DOM, and JSX syntax" },
      { week: 2, topic: "Components and Props", content: "Creating functional and class components, passing data with props" },
      { week: 3, topic: "State and Lifecycle", content: "Managing component state, lifecycle methods, and hooks" },
      { week: 4, topic: "Event Handling", content: "Handling user interactions and form inputs" },
      { week: 5, topic: "Conditional Rendering", content: "Rendering components conditionally and lists" },
      { week: 6, topic: "Context API", content: "Using Context for state management across components" },
      { week: 7, topic: "React Router", content: "Client-side routing with React Router" },
      { week: 8, topic: "Final Project", content: "Building a complete React application" }
    ],
    likes: 245
  },
  {
    id: 2,
    name: "Advanced JavaScript",
    instructor: "Jane Smith",
    description: "Deep dive into advanced JavaScript concepts including closures, prototypes, async programming, and modern ES6+ features.",
    enrollmentStatus: "In Progress",
    thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    duration: "10 weeks",
    schedule: "Mondays and Wednesdays, 7:00 PM - 9:00 PM",
    location: "Online",
    prerequisites: ["Intermediate JavaScript knowledge", "Basic programming concepts"],
    syllabus: [
      { week: 1, topic: "JavaScript Fundamentals Review", content: "Variables, data types, operators, and functions" },
      { week: 2, topic: "Closures and Scope", content: "Understanding lexical scope and closures" },
      { week: 3, topic: "Prototypes and Inheritance", content: "Prototypal inheritance and object creation patterns" },
      { week: 4, topic: "Asynchronous JavaScript", content: "Callbacks, promises, and async/await" },
      { week: 5, topic: "ES6+ Features", content: "Arrow functions, destructuring, spread/rest operators" },
      { week: 6, topic: "Modules and Bundlers", content: "ES modules, CommonJS, and bundling tools" },
      { week: 7, topic: "Functional Programming", content: "Pure functions, immutability, and higher-order functions" },
      { week: 8, topic: "Design Patterns", content: "Common JavaScript design patterns" },
      { week: 9, topic: "Performance Optimization", content: "Memory management and performance techniques" },
      { week: 10, topic: "Final Project", content: "Building a complex JavaScript application" }
    ],
    likes: 189
  },
  {
    id: 3,
    name: "Full Stack Web Development",
    instructor: "Michael Johnson",
    description: "Comprehensive course covering both frontend and backend development. Learn to build complete web applications with modern technologies.",
    enrollmentStatus: "Closed",
    thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    duration: "12 weeks",
    schedule: "Saturdays, 10:00 AM - 2:00 PM",
    location: "Hybrid (Online and In-person)",
    prerequisites: ["Basic HTML, CSS, and JavaScript", "Familiarity with command line"],
    syllabus: [
      { week: 1, topic: "Web Development Overview", content: "Introduction to web development stack and tools" },
      { week: 2, topic: "Frontend Basics", content: "HTML5, CSS3, and responsive design" },
      { week: 3, topic: "JavaScript Essentials", content: "Core JavaScript concepts for web development" },
      { week: 4, topic: "Frontend Frameworks", content: "Introduction to React" },
      { week: 5, topic: "State Management", content: "Managing application state with Redux" },
      { week: 6, topic: "Backend Basics", content: "Node.js and Express fundamentals" },
      { week: 7, topic: "Databases", content: "MongoDB and Mongoose ODM" },
      { week: 8, topic: "API Development", content: "RESTful API design and implementation" },
      { week: 9, topic: "Authentication", content: "User authentication and authorization" },
      { week: 10, topic: "Deployment", content: "Deploying applications to production" },
      { week: 11, topic: "Testing", content: "Unit and integration testing" },
      { week: 12, topic: "Final Project", content: "Building and deploying a full stack application" }
    ],
    likes: 327
  },
  {
    id: 4,
    name: "UI/UX Design Principles",
    instructor: "Sarah Williams",
    description: "Learn the fundamentals of user interface and user experience design. Create intuitive and visually appealing digital products.",
    enrollmentStatus: "Open",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    duration: "6 weeks",
    schedule: "Fridays, 5:00 PM - 8:00 PM",
    location: "Online",
    prerequisites: ["Basic design knowledge", "Familiarity with design tools is a plus"],
    syllabus: [
      { week: 1, topic: "Introduction to UI/UX", content: "Principles of user-centered design" },
      { week: 2, topic: "User Research", content: "Methods for understanding user needs and behaviors" },
      { week: 3, topic: "Information Architecture", content: "Organizing and structuring content effectively" },
      { week: 4, topic: "Wireframing and Prototyping", content: "Creating low and high-fidelity prototypes" },
      { week: 5, topic: "Visual Design", content: "Color theory, typography, and visual hierarchy" },
      { week: 6, topic: "Usability Testing", content: "Evaluating designs with real users" }
    ],
    likes: 156
  },
  {
    id: 5,
    name: "Data Science Fundamentals",
    instructor: "Robert Chen",
    description: "Introduction to data science concepts, tools, and methodologies. Learn to extract insights from data using statistical analysis and machine learning.",
    enrollmentStatus: "Open",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    duration: "10 weeks",
    schedule: "Tuesdays and Thursdays, 5:00 PM - 7:00 PM",
    location: "Online",
    prerequisites: ["Basic programming knowledge", "Statistics fundamentals", "Python basics"],
    syllabus: [
      { week: 1, topic: "Introduction to Data Science", content: "Overview of data science field and applications" },
      { week: 2, topic: "Data Collection and Cleaning", content: "Techniques for gathering and preprocessing data" },
      { week: 3, topic: "Exploratory Data Analysis", content: "Visualizing and understanding data patterns" },
      { week: 4, topic: "Statistical Analysis", content: "Applying statistical methods to data" },
      { week: 5, topic: "Introduction to Machine Learning", content: "Basic machine learning concepts" },
      { week: 6, topic: "Supervised Learning", content: "Regression and classification algorithms" },
      { week: 7, topic: "Unsupervised Learning", content: "Clustering and dimensionality reduction" },
      { week: 8, topic: "Data Visualization", content: "Creating effective data visualizations" },
      { week: 9, topic: "Big Data Technologies", content: "Introduction to tools for handling large datasets" },
      { week: 10, topic: "Final Project", content: "End-to-end data science project" }
    ],
    likes: 210
  }
];

// Mock data for a student
const studentData: Student = {
  id: 1,
  name: "Mayank Saxena",
  email: "mayanksaxena1262@example.com",
  enrolledCourses: [1, 2, 4] // IDs of enrolled courses
};

// Mock enrolled courses with additional data
let enrolledCoursesData: EnrolledCourse[] = coursesData
  .filter(course => studentData.enrolledCourses.includes(course.id))
  .map(course => ({
    ...course,
    dueDate: course.id === 1 ? "March 15, 2025" : course.id === 2 ? "April 20, 2025" : "May 10, 2025",
    progress: course.id === 1 ? 65 : course.id === 2 ? 30 : 10,
    completed: false
  }));

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const api = {
  // Get all courses
  getCourses: async (): Promise<Course[]> => {
    await delay(800);
    return [...coursesData];
  },

  // Get a single course by ID
  getCourseById: async (id: number): Promise<Course | undefined> => {
    await delay(500);
    return coursesData.find(course => course.id === id);
  },

  // Search courses by name or instructor
  searchCourses: async (query: string): Promise<Course[]> => {
    await delay(300);
    const lowercaseQuery = query.toLowerCase();
    return coursesData.filter(
      course => 
        course.name.toLowerCase().includes(lowercaseQuery) || 
        course.instructor.toLowerCase().includes(lowercaseQuery)
    );
  },

  // Get student data
  getStudentData: async (): Promise<Student> => {
    await delay(600);
    return { ...studentData };
  },

  // Get enrolled courses for a student
  getEnrolledCourses: async (): Promise<EnrolledCourse[]> => {
    await delay(700);
    return [...enrolledCoursesData];
  },

  // Update course completion status
  updateCourseCompletion: async (courseId: number, completed: boolean): Promise<EnrolledCourse> => {
    await delay(400);
    const courseIndex = enrolledCoursesData.findIndex(course => course.id === courseId);
    if (courseIndex !== -1) {
      // Create a new array with the updated course
      enrolledCoursesData = enrolledCoursesData.map(course => {
        if (course.id === courseId) {
          return {
            ...course,
            completed: completed,
            progress: completed ? 100 : course.progress
          };
        }
        return course;
      });
      
      return enrolledCoursesData[courseIndex];
    }
    throw new Error("Course not found");
  }
};