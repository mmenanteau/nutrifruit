import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "@/store";
import { Fruit } from "@/types/Fruit";
import { fetchAllFruits } from '@/api/fruits';

type FruitsState = {
  data: Fruit[],
  isLoading: boolean,
  error?: string,
};

const initialState: FruitsState = {
  data: [],
  isLoading: false,
  error: undefined,
};

export const fetchFruits = createAsyncThunk("fruits/fetchFruits", async () => await fetchAllFruits())

export const fruitsSlice = createSlice({
  name: "fruits",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFruits.pending, () => {
        return { ...initialState, isLoading: true }
      })
      .addCase(fetchFruits.fulfilled, (state, action) => {
        state.data = action.payload
        state.isLoading = false
      })
      .addCase(fetchFruits.rejected, (state, action) => {
        state.error = action.error.message
        state.isLoading = false
      })
  },
})

export const fruitsSelector = (state: RootState) => state.fruits
export const selectFruits = (state: RootState) => state.fruits.data
export const selectFruitById = (state: RootState, fruitId: number) => selectFruits(state).find(fruit => fruit.id === fruitId)

export default fruitsSlice.reducer
