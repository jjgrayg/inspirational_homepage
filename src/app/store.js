import { configureStore } from '@reduxjs/toolkit';

// Reducer imports
import backgroundReducer from '../features/background/backgroundSlice';
import todosReducer from '../features/todo/todosSlice';
import weatherReducer from '../features/weather/weatherSlice';
import quotesReducer from '../features/quote/quoteSlice';

export default configureStore({
    reducer: {
        background: backgroundReducer,
        todos: todosReducer,
        weather: weatherReducer,
        quote: quotesReducer
    }
});