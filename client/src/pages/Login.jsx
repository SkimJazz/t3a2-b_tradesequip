// {Link} component is used to navigate to Signup page from Login page.
// It will only work for the pages that are defined in the pages' directory.
import { Link, Form, redirect, useNavigation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// Local imports
import Wrapper from "../assets/wrappers/RegoAndLoginPage.js";
import main from '../assets/images/main.svg';
import { Logo, FormRow } from '../components';
import customApiFetch from '../utils/axiosFetch';



// React Router action function
export const reactRouterAction = async ({ request }) => {
    const formData = await request.formData();
    // console.log(formData);
    const data = Object.fromEntries(formData);  // data => { email: '...', password: '...' }
    // console.log(data);
    // return null;
    try {
        await customApiFetch.post('/auth/login', data);
        // return null;
        toast.success('Login successful', {autoClose: 1500});
        return redirect('/dashboard');
    } catch (error) {
        toast.error(error?.response?.data?.msg, {autoClose: 1500});
        return error;
    }
};



const Login = () => {

    const navigation = useNavigation();
    // console.log(navigation);
    const isSubmitting = navigation.state === 'submitting';


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
            <Form method='post' className='form'>
                <Logo/>

                <h4> Login </h4>

                <FormRow type='email' name='email' />
                <FormRow type='password' name='password' />

                {/*<button type='login' className='btn btn-block'>*/}
                {/*    submit login*/}
                {/*</button>*/}

                <button type='submit' className='btn btn-block' disabled={isSubmitting}>
                    {isSubmitting ? 'submitting...' : 'submit'}
                </button>

                <p>
                    Don't have an account?
                    <Link to='/signup' className='account-btn'>Sign Up</Link>
                </p>
            </Form>
        </Wrapper>
    );
};

export default Login;