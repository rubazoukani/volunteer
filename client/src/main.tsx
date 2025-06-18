import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import AppProvider from './context/AppProvider.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import "bootstrap/dist/css/bootstrap.min.css";
import './index.scss'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <App />
    </AppProvider>
  </QueryClientProvider>
)