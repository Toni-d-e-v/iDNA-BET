import { createSlice } from '@reduxjs/toolkit';

export const sliceName = 'general';

const generalSlice = createSlice({
  name: sliceName,
  initialState: {
    tokensSecured: false,
    user: null,
    data: {}
  },
  reducers: {
    updateTokensSecured: (state, action) => {
      state.tokensSecured = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    updateData: (state, action) => {
      if (action.payload?.users) {
        state.data.users = action.payload.users;
      }
    },
    clearData: state => {
      state.data = {};
    }
  }
});

const { actions, reducer } = generalSlice;

export const { updateTokensSecured, updateUser, updateData, clearData } = actions;

export default reducer;
