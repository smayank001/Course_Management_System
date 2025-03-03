import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Course } from '../../types';
import { api } from '../../api/mockApi';

interface CoursesState {
  courses: Course[];
  selectedCourse: Course | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: CoursesState = {
  courses: [],
  selectedCourse: null,
  loading: false,
  error: null,
  searchQuery: '',
};

// Async thunks
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async () => {
    return await api.getCourses();
  }
);

export const fetchCourseById = createAsyncThunk(
  'courses/fetchCourseById',
  async (id: number) => {
    return await api.getCourseById(id);
  }
);

export const searchCourses = createAsyncThunk(
  'courses/searchCourses',
  async (query: string) => {
    if (!query.trim()) {
      return await api.getCourses();
    }
    return await api.searchCourses(query);
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearSelectedCourse: (state) => {
      state.selectedCourse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch courses';
      })
      
      // Fetch course by ID
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCourse = action.payload || null;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch course';
      })
      
      // Search courses
      .addCase(searchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(searchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search courses';
      });
  },
});

export const { setSearchQuery, clearSelectedCourse } = coursesSlice.actions;
export default coursesSlice.reducer;