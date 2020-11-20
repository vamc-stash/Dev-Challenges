import React from 'react'
import './App.css';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ConfigureStore } from './redux/store/configure'
import Main from './components/Main'

const store = ConfigureStore()

function App() {
  return (
    <Provider store = {store}>
      <BrowserRouter>
        <Main/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
