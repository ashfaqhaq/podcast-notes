import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import spotifyIDReducer from '../features/spotifyIdSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    spotifyID: spotifyIDReducer
  },
});
