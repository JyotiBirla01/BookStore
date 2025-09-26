import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBooks, getBooksByCategory, searchBooks } from '../../api/bookApi';

const initialState = {
  data: [],
  totalPages: 1,
  currentPage: 1,
  query: '',
  error: null,
  loading: false,
  success: false,
};

export const getBooksThunk = createAsyncThunk(
  'book/fetchBooks',
  async (page = 1, thunkAPI) => {
    try {
      const data = await getBooks(page);
      return {
        books: data.books,
        totalPages: data.totalPages,
        currentPage: data.currentPage,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch books'
      );
    }
  }
);
export const searchBooksThunk = createAsyncThunk(
  'book/searchBooks',
  async ({ query, page = 1 }, thunkAPI) => {
    try {
      const data = await searchBooks(query, page);
      return {
        books: data.books,
        totalPages: data.totalPages,
        currentPage: data.currentPage,
        query,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to search books '
      );
    }
  }
);
export const getBooksByCategoryThunk = createAsyncThunk(
  'book/getBooksByCategory',
  async ({ categoryId, page = 1 }, thunkAPI) => {
    try {
      const data = await getBooksByCategory(categoryId, page);
      return {
        books: data.books,
        totalPages: data.totalPages,
        currentPage: data.currentPage,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch category books'
      );
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    clearBookError: (state) => {
      state.error = null;
    },
    resetBooksStatus: (state) => {
      state.success = false;
    },
    resetBooks: (state) => {
      state.data = [];
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooksThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBooksThunk.fulfilled, (state, action) => {
        state.loading = false;
        const { books, currentPage, totalPages } = action.payload;
        state.currentPage = currentPage;
        state.totalPages = totalPages;

        const existingIds = new Set(state.data.map((book) => book.id));
        const newBooks = (books || []).filter((book) => !existingIds.has(book.id));
        state.data = [...state.data, ...newBooks];
      })
      .addCase(getBooksThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchBooksThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchBooksThunk.fulfilled, (state, action) => {
        const { books, currentPage, totalPages, query } = action.payload;
        state.loading = false;
        state.currentPage = currentPage;
        state.totalPages = totalPages;
        state.query = query;

        if (currentPage === 1) {
          state.data = books;
        } else {
          // state.data = [...state.data, ...books];
          const existingIds = new Set(state.data.map((book) => book.id));
          const newBooks = (books || []).filter(
            (book) => !existingIds.has(book.id)
          );
          state.data = [...state.data, ...newBooks];
        }
      })
      .addCase(searchBooksThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getBooksByCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBooksByCategoryThunk.fulfilled, (state, action) => {
        const { books, currentPage, totalPages } = action.payload;
        state.loading = false;
        state.currentPage = currentPage;
        state.totalPages = totalPages;
        // state.data = [...state.data, ...books];

        const existingIds = new Set(state.data.map((book) => book.id));
        const newBooks = (books || []).filter(
          (book) => !existingIds.has(book.id)
        );
        state.data = [...state.data, ...newBooks];
      })
      .addCase(getBooksByCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { clearBookError, resetBooksStatus, resetBooks } =
  booksSlice.actions;
export default booksSlice.reducer;
