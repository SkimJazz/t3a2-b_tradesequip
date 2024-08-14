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
    MyProfile,
    Admin,
}  from './pages';

// React Router action function imports
import {reactRouterAction as signupAction} from './pages/Signup';
// import {reactRouterLoader as ? } from -> ?



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

                // test action function
                // action: () => {
                //     // console.log('Signup link is successful');
                //     //// MUST return null to prevent redirect error
                //     // return null;
                // },
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'dashboard',
                element: <DashboardLayout />,
                children: [
                    {
                        index: true, // userprofile API endpoint
                        element: <MyProfile />,
                    },
                    {
                        path: 'new-job' ,
                        element: <NewJob />,
                    },
                    {
                        path: 'my-jobs',
                        element: <MyJobs />,
                    },
                    {
                        path: 'admin',
                        element: <Admin />,
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