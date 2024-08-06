import { Outlet } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { SmallSidebar, LargeSidebar, Navbar } from '../components';
import { useState, createContext, useContext } from 'react';
import { checkDefaultTheme } from '../App';


const DashboardContext = createContext();


const DashboardLayout = () => {

    /**
     * Temporary component sets up the DashboardContext.Provider
     * using the following variables:
     *
     */
    const user = { name: 'josh' };
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
    const sidebarToggle = () => {
        setShowSidebar(!showSidebar);
    };
    const UserLogout= async () => {
        console.log('logout user');
    };

    return (

        <DashboardContext.Provider
            value={{
                user,
                showSidebar,
                isDarkTheme,
                darkThemeToggle,
                sidebarToggle,
                UserLogout,
            }}
        >
            <Wrapper>
                <main className="dashboard">
                    <SmallSidebar />
                    <LargeSidebar />
                    <div>
                        <Navbar />
                        <div className="dashboard-page">
                            <Outlet />
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