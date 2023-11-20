import { configureStore } from "@reduxjs/toolkit";

import fruitsReducer from "@/features/fruits/fruitsSlice";

const store = configureStore({
  reducer: {
    fruits: fruitsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
