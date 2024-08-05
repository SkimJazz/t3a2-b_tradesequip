import Wrapper from "../assets/wrappers/LargeSidebar.js";
import NavLinks from './NavLinks.jsx';
import Logo from '../components/Logo';
import { useDashboardContext } from '../pages/DashboardLayout';



const LargeSidebar = () => {

    const {showSidebar} = useDashboardContext();

    return (
        <Wrapper>
            <div
                className={
                    showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'
                }
            >
                <div className="content"></div>
                <header>
                    <Logo />
                </header>
                <NavLinks isLargeSidebar />
            </div>
        </Wrapper>
    )
}
export default LargeSidebar