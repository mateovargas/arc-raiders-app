import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';

import './index.css'
import App from './App.tsx'
import reducers from './reducers/index.ts';

const store = configureStore({
  reducer: reducers,
  preloadedState: {},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode >,
)
