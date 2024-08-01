import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
    return (
        <>
            {/* Navbar stuff goes here */}
            {/* <h4> Navbar </h4>*/}
            <Outlet />
        </>
    );
};

export default HomeLayout;