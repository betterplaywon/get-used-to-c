import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { TutorialsPage } from './pages/TutorialsPage';
import { TutorialDetailPage } from './pages/TutorialDetailPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'tutorials', element: <TutorialsPage /> },
      { path: 'tutorials/:slug', element: <TutorialDetailPage /> },
      { path: 'playground', element: <PlaygroundPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
