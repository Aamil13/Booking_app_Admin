import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { StyleProvider } from '@ant-design/cssinjs';
import ErrorPage from './error-page.tsx';
import CreateHotel from './components/hotelForm/CreateHotel.tsx';
import Root from './pages/Root.tsx';
import DashBoard from './components/dashboard/DashBoard.tsx';
import UpdateHotel from './components/hotelForm/UpdateHotel.tsx';
import View_Delete from './components/hotelForm/View_Delete.tsx';
import CreateRoom from './components/roomForm/CreateRoom.tsx';
import UpdateRoom from './components/roomForm/UpdateRoom.tsx';
import View_Delete_Room from './components/roomForm/View_Delete_Room.tsx';
import Reservation from './components/Reservation';
import Users from './components/User';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import ProtectedRoute from './shared/ProtectedRoute.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: (
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'hotel/create',
        element: (
          <ProtectedRoute>
            <CreateHotel />
          </ProtectedRoute>
        ),
      },
      {
        path: 'hotel/update',
        element: (
          <ProtectedRoute>
            <UpdateHotel />
          </ProtectedRoute>
        ),
      },
      {
        path: 'hotel',
        element: (
          <ProtectedRoute>
            <View_Delete />
          </ProtectedRoute>
        ),
      },
      {
        path: 'Rooms',
        element: (
          <ProtectedRoute>
            <View_Delete_Room />
          </ProtectedRoute>
        ),
      },
      {
        path: 'Rooms/create',
        element: (
          <ProtectedRoute>
            <CreateRoom />
          </ProtectedRoute>
        ),
      },
      {
        path: 'Rooms/update',
        element: (
          <ProtectedRoute>
            <UpdateRoom />
          </ProtectedRoute>
        ),
      },
      {
        path: 'bookings',
        element: (
          <ProtectedRoute>
            <Reservation />
          </ProtectedRoute>
        ),
      },
      {
        path: 'Users',
        element: (
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <StyleProvider layer>
      <RouterProvider router={router} />
    </StyleProvider>
  </QueryClientProvider>
  // </React.StrictMode>
);
