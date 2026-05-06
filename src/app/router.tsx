import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/widgets/layout';
import { HomePage } from '@/pages/home';
import { TutorialsPage } from '@/pages/tutorials';
import { TutorialDetailPage } from '@/pages/tutorial-detail';
import { PlaygroundPage } from '@/pages/playground';
import { NotFoundPage } from '@/pages/not-found';

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
