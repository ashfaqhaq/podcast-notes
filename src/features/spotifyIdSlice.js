import { createSlice } from '@reduxjs/toolkit';

export const spotifyIdSlice = createSlice({
  name: 'spotifyID',
  initialState: {
    id: null,
  },
  reducers: {
    writeID: (state, action) => {
      state.id = action.payload;
    },
    removeID: (state) => {
      state.id = null;
    },
  },
});

export const { writeID, removeID } = spotifyIdSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectSpotifyID = state => state.spotifyID.id;

export default spotifyIdSlice.reducer;
