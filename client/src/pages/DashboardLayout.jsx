import { Outlet } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
// import { SmallSidebar, LargeSidebar, Navbar } from '../components';
import { useState, createContext, useContext } from 'react';

const DashboardContext = createContext();

const DashboardLayout = () => {

    /**
     * Temporary component sets up the DashboardContext.Provider
     * using the following variables:
     *
     */
    const user = { name: 'josh' };
    const [showSidebar, setShowSidebar] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(false);


    // GLOBAL Values - Placeholder functions for setting up the context provider
    const DarkThemeToggle = () => {
        console.log('toggle dark theme');
    };
    const SidebarToggle = () => {
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
                DarkThemeToggle,
                SidebarToggle,
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