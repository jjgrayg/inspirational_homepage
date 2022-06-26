import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isMobile } from 'react-device-detect';

export const fetchBackground = createAsyncThunk(
    'background/fetchBackground', 
    async () => {
        console.log('Mobile?', isMobile)
        const response = await fetch('https://api.unsplash.com/photos/random?client_id=o1LfTxdtsC8FuvcjR8dZNaSeEK4zOPDyKmyFUT6Bq4Q' + (isMobile ? '&orientation=landscape' : '')); //
        const json = await response.json();
        return json.urls.full;
});

export const backgroundSlice = createSlice({
    name: 'background',
    initialState: {
        backgroundImage: '',
        loading: false,
        failedToLoad: false
    },
    reducers: {
        updateImage: (state, action) => {
            state.backgroundImage = action.payload;
        }
    },
    extraReducers: {
        [fetchBackground.pending]: (state) => {
            state.loading = true;
            state.failedToLoad = false;
        },
        [fetchBackground.rejected]: (state) => {
            state.loading = false;
            state.failedToLoad = true;
        },
        [fetchBackground.fulfilled]: (state, action) => {
            state.loading = false;
            state.failedToLoad = false;
            state.backgroundImage = action.payload;
        }
    }
});

export default backgroundSlice.reducer;
export const { updateImage } = backgroundSlice.actions;
export const backgroundSelector = state => state.background.backgroundImage;
export const isLoadingOrFailed = state => (state.background.loading || state.background.failedToLoad)