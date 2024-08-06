import Wrapper from "../assets/wrappers/Theme.js";
import {useDashboardContext} from "../pages/DashboardLayout.jsx";
import { BsSunglasses } from "react-icons/bs";
import { BiSolidTorch } from "react-icons/bi";


const ThemeToggle = () => {

    const { isDarkTheme, darkThemeToggle } = useDashboardContext();

    return (
        <Wrapper onClick={darkThemeToggle}>
            {/*check if dark theme is enabled*/}
            {isDarkTheme ? (
                <BsSunglasses className='toggle-icon' />
            ) : (
                <BiSolidTorch className='toggle-icon' />
            )}
        </Wrapper>
    )
}
export default ThemeToggle