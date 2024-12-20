import { configureStore } from "@reduxjs/toolkit";
import { dishReducer } from '../store/slices/dishesSlice.ts';

export const store = configureStore({
    reducer: {
      dishes: dishReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
