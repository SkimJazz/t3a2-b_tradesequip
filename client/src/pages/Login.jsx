// This Link component is used to navigate to the Signup page from the Login page.
// It will only work for the pages that are defined in the pages' directory.
import { Link } from 'react-router-dom';
import Wrapper from "../assets/wrappers/RegoAndLoginPage.js";
import main from '../assets/images/main.svg';
import { Logo, FormRow } from '../components';
import { useEffect, useState } from 'react';


const Login = () => {

    // Resize background image based on screen size
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

    useEffect(() => {
        const handleResize = () => setIsLargeScreen(window.innerWidth > 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Pass the backgroundStyle object to the Wrapper component
    const backgroundStyle = {
        backgroundImage: isLargeScreen ? `url(${main})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    };


    return (
        <Wrapper style={backgroundStyle}>
            <form className='form'>
                <Logo/>

                <h4> Login </h4>

                <FormRow type='email' name='email' defaultValue='josh@email.com' />
                <FormRow type='password' name='password' defaultValue='secret123' />

                <button type='login' className='btn btn-block'>
                    submit login
                </button>

                <p>
                    Don't have an account?
                    <Link to="/signup" className='account-btn'>Sign Up</Link>
                </p>
            </form>
        </Wrapper>
    );
};

export default Login;