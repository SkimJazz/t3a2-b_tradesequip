import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignJustify } from 'react-icons/fa';
import Logo from './Logo';

import { useDashboardContext } from '../pages/DashboardLayout';



const Navbar = () => {

    const { SidebarToggle } = useDashboardContext();

    return (
        <Wrapper>
            <div className='nav-center'>
                <button
                    type='button'
                    className='toggle-btn'
                    onClick={ SidebarToggle }
                >
                    <FaAlignJustify />
                </button>
                <div>
                    <Logo />
                    <h4 className='logo-text'>dashboard</h4>
                </div>
                <div className='btn-container'>toggle/logout</div>
            </div>
        </Wrapper>
    );
};

export default Navbar;