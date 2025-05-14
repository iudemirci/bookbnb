import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  edit: null,
  latlng: null,
  fileList: [],
};

const bookbnbSlice = createSlice({
  name: 'bookbnb',
  initialState,
  reducers: {
    setLatlng: (state, action) => {
      state.latlng = action.payload;
    },
    clearLatlng: (state) => {
      state.latlng = null;
    },
    setFileList: (state, action) => {
      state.fileList = state.fileList || [];
      state.fileList.push(action.payload);
    },
    removeFile: (state, action) => {
      if (state.fileList) {
        state.fileList = state.fileList.filter((file) => file.uid !== action.payload.uid);
      }
    },
    clearFiles: (state) => {
      state.fileList = [];
    },
    setEdit: (state, action) => {
      state.edit = action.payload;
    },
  },
});

export const { setEdit, setLatlng, setFileList, clearFiles, clearLatlng, removeFile } = bookbnbSlice.actions;

export default bookbnbSlice.reducer;
