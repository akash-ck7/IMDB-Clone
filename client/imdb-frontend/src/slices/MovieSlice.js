import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/movies";

const initialState = {
  movieList: [],
  selectedMovieList: {},
};

// Async actions
export const fetchMovies = createAsyncThunk("movies/fetch", async () => {
  const res = await API.get("/movies");
  return res.data;
});

export const createMovie = createAsyncThunk("movies/create", async (movie) => {
  const res = await API.post("/movies", movie);
  return res.data;
});

export const updateMovie = createAsyncThunk("movies/update", async (movie) => {
  const res = await API.put(`/movies/${movie.id}`, movie);
  return res.data;
});

export const deleteMovie = createAsyncThunk("movies/delete", async (id) => {
  await API.delete(`/movies/${id}`);
  return id;
});

const movieSlice = createSlice({
  name: "movieSlice",
  initialState,
  reducers: {
    setSelectedMovieList: (state, action) => {
      state.selectedMovieList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movieList = action.payload;
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        state.movieList.push(action.payload);
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.movieList = state.movieList.map((movie) =>
          movie.id === action.payload.id ? action.payload : movie
        );
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movieList = state.movieList.filter(
          (movie) => movie.id !== action.payload
        );
      });
  },
});

export const { setSelectedMovieList } = movieSlice.actions;
export default movieSlice.reducer;
