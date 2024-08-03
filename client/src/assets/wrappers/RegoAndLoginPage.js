import styled from 'styled-components';

const Wrapper = styled.section`
    min-height: 100vh;
    display: grid;
    align-items: center;
    
    .logo {
        display: block;
        margin: 0 auto;
        margin-bottom: 1.38rem;
    }
    
    // Alternate version to include text with the logo
    //.logo-container {
    //    display: flex;
    //    align-items: center;
    //}
    //
    //.logo-image {
    //    /* Adjust as needed */
    //    width: 50px; /* Example size */
    //    margin-right: 10px; /* Space between logo and text */
    //}
    //
    //.logo-text {
    //    /* Style for the text */
    //    font-size: 20px; /* Example size */
    //    font-weight: bold;
    //}
    
    .form {
        max-width: 400px;
        border-top: 5px solid var(--primary-500);
        background-color: rgba(255, 255, 255, 0.5); /* Semi-transparent white background */
        backdrop-filter: blur(3px); /* Blurring effect for the frosted look */
        -webkit-backdrop-filter: blur(3px); /* For Safari */
    }

    h4 {
        text-align: center;
        margin-bottom: 1.38rem;
        color: var(--primary-500);
        font-weight: bold;
        
    }

    p {
        margin-top: 1rem;
        text-align: center;
        line-height: 1.5;
    }
    
    .btn {
        margin-top: 1rem;
    }
    .account-btn {
        color: var(--primary-500);
        font-weight: bold;
        letter-spacing: var(--letter-spacing);
        margin-left: 0.25rem;
    }

`;
export default Wrapper;