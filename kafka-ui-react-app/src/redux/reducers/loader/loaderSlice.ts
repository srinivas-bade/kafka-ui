import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AsyncRequestStatus } from 'lib/constants';
import { LoaderSliceState } from 'redux/interfaces';

const initialState: LoaderSliceState = {};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    resetLoaderById: (
      state: LoaderSliceState,
      { payload }: PayloadAction<string>
    ) => {
      delete state[payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action: Action<string>) => action.type.endsWith('/pending'),
        (state, { type }) => {
          state[type.replace('/pending', '')] = AsyncRequestStatus.pending;
        }
      )
      .addMatcher(
        (action: Action<string>) => action.type.endsWith('/fulfilled'),
        (state, { type }) => {
          state[type.replace('/fulfilled', '')] = AsyncRequestStatus.fulfilled;
        }
      )
      .addMatcher(
        (action: Action<string>) => action.type.endsWith('/rejected'),
        (state, { type }) => {
          state[type.replace('/rejected', '')] = AsyncRequestStatus.rejected;
        }
      );
  },
});

export const { resetLoaderById } = loaderSlice.actions;

export default loaderSlice.reducer;
