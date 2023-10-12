import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IModalState } from '../../../types/reducers';

const initialState: IModalState = {
  isShowedModal: false,
};

const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<boolean>) => {
      state.isShowedModal = action.payload;
    },
  },
});

const { actions, reducer } = modal;
export const { showModal } = actions;
export default reducer;
