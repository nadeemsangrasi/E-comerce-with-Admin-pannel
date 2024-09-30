import { configureStore } from "@reduxjs/toolkit";
import { ThunkAction, Action } from "@reduxjs/toolkit";

// Create your store
export const store = configureStore({
  reducer: {
    // Add your slice reducers here
    // example: someSlice: someSliceReducer
  },
});

// Infer the store type
export type StoreType = typeof store;

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;

// Optional: Define a Thunk type if you're using Thunk middleware for async actions
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
