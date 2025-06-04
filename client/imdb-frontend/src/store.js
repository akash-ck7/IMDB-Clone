import { configureStore } from "@reduxjs/toolkit";
import movieeducer from "./slices/MovieSlice";
export const store = configureStore({
  reducer: {
    tasks: movieeducer,
  },
});
