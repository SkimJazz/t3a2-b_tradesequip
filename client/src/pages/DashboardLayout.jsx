// External imports
import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { useState, createContext, useContext } from 'react';
import customAxiosFetch from "../utils/axiosFetch.js";
import {toast} from "react-toastify";

// Local imports
import Wrapper from '../assets/wrappers/Dashboard';
import { SmallSidebar, LargeSidebar, Navbar } from '../components';
import { checkDefaultTheme } from '../App';




// Loader function for GET request to /users/current-user
export const reactRouterLoader = async () => {
    try {
        const { data } = await customAxiosFetch.get('/users/current-user');
        return data;
    } catch (error) {
        return redirect('/');
    }
};


// Create a context for the DashboardLayout component
const DashboardContext = createContext();

const DashboardLayout = () => {

    // Custom hooks
    const { user } = useLoaderData();   // current user data
    const navigate = useNavigate();     // RRD hook passed as a prop

    // State variables
    const [showSidebar, setShowSidebar] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

    // GLOBAL Values - Placeholder functions for setting up the context provider
    const darkThemeToggle = () => {
        const newDarkTheme  = !isDarkTheme;
        setIsDarkTheme(newDarkTheme);
        // Vanilla JS to toggle the theme
        document.body.classList.toggle('dark-theme', newDarkTheme);
        // Vanilla JS to persist the theme value (save to local storage)
        localStorage.setItem('darkTheme', newDarkTheme);
    };

    // User SIDEBAR TOGGLE
    const sidebarToggle = () => {
        setShowSidebar(!showSidebar);
    };

    // User LOGOUT
    const userLogout = async () => {
        await customAxiosFetch.get('/auth/logout');
        toast.success('Logging out...', { autoClose: 1500 });
        navigate('/');    // Redirect to landing page
    };


    return (
        // Context variables and functions provided to child components
        <DashboardContext.Provider
            value={{
                user,
                showSidebar,
                isDarkTheme,
                darkThemeToggle,
                sidebarToggle,
                userLogout,
            }}
        >
            <Wrapper>
                <main className="dashboard">
                    <SmallSidebar />
                    <LargeSidebar />
                    <div>
                        <Navbar />
                        <div className="dashboard-page">
                            <Outlet context={{ user }}/>
                        </div>
                    </div>
                </main>
            </Wrapper>
        </DashboardContext.Provider>
    );
};

// Custom Context Hook
export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;