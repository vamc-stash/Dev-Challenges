import React, { useState, useContext } from 'react';
import './App.css';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ConfigureStore } from './redux/store/configure'
import Main from './components/Main'
import { ThemeContext } from './context/ThemeContext'

const store = ConfigureStore()

const App = () => {

  const defaultTheme = useContext(ThemeContext)
  const [theme, setTheme] = useState(defaultTheme)

  return (
    <Provider store = {store}>
      <BrowserRouter>
          <ThemeContext.Provider value={{ theme, setTheme }}>
            <Main/>
          </ThemeContext.Provider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
