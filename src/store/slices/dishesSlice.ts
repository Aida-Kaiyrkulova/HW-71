import { Dish } from '../../types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';

interface DishesState {
  dishes: Dish[];
  status: 'idle' | 'loading' | 'failed';
  error?: string | null;
}

const initialState: DishesState = {
  dishes: [],
  status: 'idle',
  error: null,
};

export const fetchDishes = createAsyncThunk('dishes/fetchDishes', async () => {
  const response = await axiosApi.get('/dishes.json');
  const dishesList = response.data;
  const dishes = Object.keys(dishesList).map((key) => ({
    id: key,
    ...dishesList[key],
  }));
  return dishes;
});

export const addDish = createAsyncThunk(
  'dishes/addDish',
  async (newDish: { title: string; price: number; image: string }) => {
    const response = await axiosApi.post('/dishes.json', newDish);
    return { id: response.data.name, ...newDish };
  }
);

export const editDish = createAsyncThunk(
  'dishes/editDish',
  async (updatedDish: { id: string; title: string; price: number; image: string }) => {
    await axiosApi.put(`/dishes/${updatedDish.id}.json`, updatedDish);
    return updatedDish;
  }
);
export const deleteDish = createAsyncThunk(
  'dishes/deleteDish',
  async (id: string) => {
    await axiosApi.delete(`/dishes/${id}.json`);
    return id;
  }
);


const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDishes.fulfilled, (state, action) => {
        state.status = 'idle';
        state.dishes = action.payload;
      })
      .addCase(fetchDishes.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addDish.fulfilled, (state, action) => {
        state.dishes.push(action.payload);
      })
      .addCase(editDish.fulfilled, (state, action) => {
        const index = state.dishes.findIndex((dish) => dish.id === action.payload.id);
        if (index !== -1) {
          state.dishes[index] = action.payload;
        }
      })
      .addCase(deleteDish.fulfilled, (state, action) => {
        state.dishes = state.dishes.filter((dish) => dish.id !== action.payload);
      });
  },
});

export const dishReducer = dishesSlice.reducer;
export const {} = dishesSlice.actions;