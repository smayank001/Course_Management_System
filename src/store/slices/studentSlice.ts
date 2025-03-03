import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Student, EnrolledCourse } from '../../types';
import { api } from '../../api/mockApi';

interface StudentState {
  student: Student | null;
  enrolledCourses: EnrolledCourse[];
  loading: boolean;
  error: string | null;
}

const initialState: StudentState = {
  student: null,
  enrolledCourses: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchStudentData = createAsyncThunk(
  'student/fetchStudentData',
  async () => {
    return await api.getStudentData();
  }
);

export const fetchEnrolledCourses = createAsyncThunk(
  'student/fetchEnrolledCourses',
  async () => {
    return await api.getEnrolledCourses();
  }
);

export const updateCourseCompletion = createAsyncThunk(
  'student/updateCourseCompletion',
  async ({ courseId, completed }: { courseId: number; completed: boolean }) => {
    return await api.updateCourseCompletion(courseId, completed);
  }
);

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch student data
      .addCase(fetchStudentData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentData.fulfilled, (state, action) => {
        state.loading = false;
        state.student = action.payload;
      })
      .addCase(fetchStudentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch student data';
      })
      
      // Fetch enrolled courses
      .addCase(fetchEnrolledCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEnrolledCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.enrolledCourses = action.payload;
      })
      .addCase(fetchEnrolledCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch enrolled courses';
      })
      
      // Update course completion
      .addCase(updateCourseCompletion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourseCompletion.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCourse = action.payload;
        state.enrolledCourses = state.enrolledCourses.map(course => 
          course.id === updatedCourse.id ? updatedCourse : course
        );
      })
      .addCase(updateCourseCompletion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update course completion';
      });
  },
});

export default studentSlice.reducer;