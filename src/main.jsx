import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppSettingsProvider } from './context/AppSettingsContext';
import { store } from './redux/store';
import App from './App';
import './index.css'; 

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      retry: 1,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppSettingsProvider>
          <HashRouter>
            <App />
            <Toaster position="bottom-right" />
          </HashRouter>
        </AppSettingsProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);