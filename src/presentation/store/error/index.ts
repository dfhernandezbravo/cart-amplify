import { AppError } from '@entities/error/error.entity';
import { RootState } from '@hooks/storeHooks';
import { createSlice } from '@reduxjs/toolkit';

type ErrorState = {
  error: AppError | null;
};

const initialState: ErrorState = {
  error: null,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { setError } = errorSlice.actions;
export default errorSlice;

// selectors
export const selectError = (state: RootState) => state.error;
