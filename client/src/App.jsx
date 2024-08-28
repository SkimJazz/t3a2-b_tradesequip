import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
    HomeLayout,
    Landing,
    DashboardLayout,
    Signup,
    Login,
    Error,
    NewJob,
    MyJobs,
    NewClient,
    MyClients,
    MyProfile,
    Super,
    EditJob,
}  from './pages';


// React Router action function imports
import {reactRouterAction as signupAction} from './pages/Signup';
import {reactRouterAction as loginAction} from './pages/Login';
import {reactRouterLoader as dashboardLoader } from './pages/DashboardLayout';
import {reactRouterAction as newJobAction } from './pages/NewJob';
import {reactRouterLoader as myJobsLoader } from './pages/MyJobs';
import {reactRouterAction as newClientAction } from './pages/NewClient';
import {reactRouterLoader as myClientsLoader } from './pages/MyClients';
import {reactRouterLoader as editJobLoader } from './pages/EditJob';
import {reactRouterAction as editJobAction } from './pages/EditJob';
import {reactRouterAction as deleteJobAction} from './pages/DeleteJob';
import {reactRouterAction as myProfileAction} from './pages/MyProfile';
import {reactRouterLoader as superLoader} from './pages/Super';



// Check if user has dark theme set. Run when component mounts
export const checkDefaultTheme = () => {
    const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
    document.body.classList.toggle('dark-theme', isDarkTheme);
    return isDarkTheme;
}
checkDefaultTheme();



const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Landing />,
            },
            {
                path: 'signup',
                element: <Signup />,
                action: signupAction,
            },
            {
                path: 'login',
                element: <Login />,
                action: loginAction,
            },
            {
                path: 'dashboard',
                element: <DashboardLayout />,
                loader: dashboardLoader,
                children: [
                    {
                        index: true, // userprofile API endpoint
                        element: <MyProfile />,
                        action: myProfileAction,
                    },
                    {
                        path: 'new-job' ,
                        element: <NewJob />,
                        action: newJobAction,
                    },
                    {
                        path: 'my-jobs',
                        element: <MyJobs />,
                        loader: myJobsLoader,
                    },
                    {
                        path: 'new-client',
                        element: <NewClient />,
                        action: newClientAction,
                    },
                    {
                        path: 'my-clients',
                        element: <MyClients />,
                        loader: myClientsLoader,
                    },
                    {
                        path: 'edit-job/:id',
                        element: <EditJob />,
                        loader: editJobLoader,
                        action: editJobAction,
                    },
                    {
                        path: 'delete-job/:id',
                        action: deleteJobAction,
                    },
                    {
                        path: 'super',
                        element: <Super />,
                        loader: superLoader,
                    },
                ],
            },

        ],
    },
]);


const App = () => {
    return <RouterProvider router={router} />;
};

export default App;