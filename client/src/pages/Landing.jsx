// External imports
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Local imports
import Wrapper from "../assets/wrappers/Landing.js";
import main from '../assets/images/main.svg';
import {Logo} from '../components';



const Landing = () => {

    // Resize background image based on screen size
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <Wrapper style={{
            backgroundImage: isLargeScreen ? `url(${main})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <nav>
                <Logo />
                {/*<h2>*/}
                {/*    <strong><em><span className="rotate" style={{color: "darkorange"}}>Trades</span></em></strong>*/}
                {/*    <strong><em><span className="rotate" style={{color: "black"}}>Equip</span></em></strong>*/}
                {/*</h2>*/}
            </nav>
            <div className='container page'>
                {/* info */}
                <div className='info'>
                    <h1>
                        job <span>management</span>
                    </h1>

                    <p>
                        Our Job Management App is designed to empower Trades Persons
                        across various industries, providing a comprehensive solution
                        to track and manage their jobs efficiently. Whether you're an
                        electrician, plumber, carpenter, or in any other trade, our
                        platform simplifies job tracking, from initial contact through
                        to completion. Stay organized, save time, and focus on what you
                        do best - mastering your trade.
                    </p>
                    <Link to='/signup' className='btn signup-link'>
                        Sign Up / Demo
                    </Link>
                    <Link to='/login' className='btn'>
                        Login
                    </Link>
                </div>
                {/* <img> no longer need -> Ref handleResize in useEffect */}
                {/*<img src={main} alt='track job' className='img main-img' />*/}
            </div>
        </Wrapper>
    );
};
export default Landing;