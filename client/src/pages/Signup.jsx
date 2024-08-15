// External imports
import { useEffect, useState } from 'react';
import { Form, Link, redirect, useNavigation } from 'react-router-dom';
import {toast} from "react-toastify";

// Local imports
import Wrapper from "../assets/wrappers/RegoAndLoginPage.js";
import main from '../assets/images/main.svg';
import { Logo, FormRow } from '../components';
import customAxiosFetch from "../utils/axiosFetch.js";



// React Router action function
export const reactRouterAction = async ({request}) => {
    const formData = await request.formData();
    // console.log(formData);
    const data = Object.fromEntries(formData);
    // console.log(data);
    // return null;
    try {
        await customAxiosFetch.post('/auth/signup', data);
        // return null;
        toast.success('Signup successful', { autoClose: 1500 });
        return redirect('/login');
    } catch (error) {
        toast.error(error?.response?.data?.msg, { autoClose: 1500 });
        // console.log(error);
        return error;
    }
};



const Signup = () => {

    const navigation = useNavigation();
    // console.log(navigation);
    const isSubmitting = navigation.state === 'submitting';


    // Resize background image based on screen size
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    // Adding style to Wrapper component for background image is one method.
    //  Ref Login.jsx component for using const backgroundStyle = { ... } and
    //  pass the object to Wrapper component method.
    return (
        <Wrapper style={{
            backgroundImage: isLargeScreen ? `url(${main})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <Form method='post' className='form'>
                <Logo/>

                <h4> Sign Up </h4>

                <FormRow type='text' name='name' labelText='first name' defaultValue='josh'/>
                <FormRow type='text' name='lastName' labelText='last name' defaultValue='bennett'/>
                <FormRow type='text' name='location' defaultValue='cairns'/>
                <FormRow type='email' name='email' defaultValue='josh@email.com'/>
                <FormRow type='password' name='password' defaultValue='secret123'/>

                {/*<button type='submit' className='btn btn-block'>*/}
                {/*    submit sign up*/}
                {/*</button>*/}

                <button type='submit' className='btn btn-block' disabled={isSubmitting}>
                    {isSubmitting ? 'submitting...' : 'submit'}
                </button>

                {/*<SubmitBtn formBtn />*/}

                <p> Or check out the Demo </p>
                <button type='button' className='btn btn-block'>
                    Demo
                </button>
                <p>
                    Already have an account?
                    <Link to='/login' className='account-btn'>Login</Link>
                </p>
            </Form>
        </Wrapper>
    );
};

export default Signup;