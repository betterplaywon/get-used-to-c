import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { TutorialsPage } from './pages/TutorialsPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'tutorials', element: <TutorialsPage /> },
      { path: 'playground', element: <PlaygroundPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
