import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import './styles/tailwind.css';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: any }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="site-shell p-10 text-center">
          <h1 className="font-serif text-2xl font-bold text-[#1e120a] mb-2">Something went wrong</h1>
          <p className="text-sm text-[#6b5744] mb-6">
            An unexpected error occurred. You can return to the homepage.
          </p>
          <a href="/" className="landing-cta inline-block">
            Return Home
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}

const router = createBrowserRouter(routes);

export function App() {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </React.StrictMode>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
}

export default App;
