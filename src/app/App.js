import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import './GoogleLogo.css'

//Components
import { NewTodoForm } from '../components/newTodoForm';
import { SearchForm } from '../components/searchForm';
import { TodosDisplay } from '../features/todo/todosDisplay';
import { WeatherDisplay } from '../features/weather/weatherDisplay';
import { QuoteDisplay } from '../features/quote/quoteDisplay';

import { fetchBackground, backgroundSelector, isLoadingOrFailed } from '../features/background/backgroundSlice';

function App() {
  const dispatch = useDispatch();
  const background = useSelector(backgroundSelector);
  const loadingOrFailed = useSelector(isLoadingOrFailed);
  const backgroundStyle = loadingOrFailed ? {backgroundColor: 'black'} : {
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh'
  };

  useEffect(() => {
    if (background === '')
      dispatch(fetchBackground());
  }, [])

  return (
    <div className='App' style={backgroundStyle}>
      <header className='App-header'>
        <SearchForm />
        <main>
          <div className='todos'>
            <NewTodoForm />
            <TodosDisplay />
          </div>
          <div className='vertical-cont'>
            <WeatherDisplay />
            <QuoteDisplay />
          </div>
        </main>
      </header>
    </div>
  );
}

export default App;
