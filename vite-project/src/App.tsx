import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import AddMovie from './components/AddMovie';
import MovieTable from './components/MovieTable';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className='container mx-auto'>
        <h1 className='text-center font-bold text-2xl'>Movie App</h1>
        <AddMovie />
        <MovieTable />
      </div>
    </Provider>
  );
};

export default App;
