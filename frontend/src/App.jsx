import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import { Profile } from './components/Profile';
import JobDiscription from './components/JobDiscription';
import Companies from './components/admin/Companies';
import CompanyCreate from './components/admin/CompanyCreate';
import CompanySetup from './components/admin/CompanySetup';
import AdminJobs from './components/admin/adminJobs';
import PostJob from './components/admin/PostJob';
import Applicants from './components/admin/Applicants';
import ProtectedRoute from './components/admin/ProtectedRoute';
import ProtectedRouteUser from './components/ProtectedRouteUser';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element:<Home />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/jobs",
    element:<ProtectedRouteUser><Jobs /></ProtectedRouteUser>
  },
  {
    path: "/discription/:id",
    element: <ProtectedRouteUser><JobDiscription /></ProtectedRouteUser>
  },
  {
    path: "/browse",
    element: <ProtectedRouteUser><Browse /></ProtectedRouteUser>
  },
  {
    path: "/profile",
    element: <ProtectedRouteUser><Profile /></ProtectedRouteUser>
  },
  {
    path: "/about-us",
    element: <ProtectedRouteUser><AboutUs /></ProtectedRouteUser>
  },
  {
    path: "/contact",
    element: <ProtectedRouteUser><Contact /></ProtectedRouteUser>
  },
  // admin ke liye
  {
    path:'/admin/companies',
    element:<ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:'/admin/companies/create',
    element:<ProtectedRoute><CompanyCreate/></ProtectedRoute>
  },
  {
    path:'/admin/companies/:id',
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute>
  },
  {
    path:'/admin/jobs',
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute>
  },
  {
    path:'/admin/job/create',
    element:<ProtectedRoute><PostJob/></ProtectedRoute>
  },
  {
    path:'/admin/jobs/:id/applicants',
    element:<ProtectedRoute><Applicants/></ProtectedRoute>
  },
])

function App() {

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
