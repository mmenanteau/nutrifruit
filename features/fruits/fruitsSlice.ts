import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit"
import { RootState } from "@/store";
import { Fruit } from "@/types/Fruit";
import { fetchAllFruits } from '@/api/fruits';

type FruitsState = {
  value: Fruit[],
};

const initialState: FruitsState = {
  value: [],
};

export const fetchFruits = createAsyncThunk("fruits/fetchAllFruits", async (): Promise<Fruit[]> => {
  return await fetchAllFruits()
})

export const fruitsSlice = createSlice({
  name: "fruits",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFruits.fulfilled, (state, action) => {
      state.value = action.payload
    })
  },
})

export const selectFruits = (state: RootState) => state.fruits.value
export const selectFruitById = (state: RootState, fruitId: Number) => selectFruits(state).find(fruit => fruit.id === fruitId)
export const selectFruitsSortedByName = createSelector(
  (state: RootState) => selectFruits(state),
  (fruits: Fruit[]) => [...fruits].sort((a, b) => a.name.localeCompare(b.name.toString()))
)

export default fruitsSlice.reducer
