import styled from 'styled-components';

const Wrapper = styled.main`
    
    /* Minimum height of 100vh to fill the full viewport height(vh) */
    min-height: 100vh;
    
    /* Centre all text */ 
    text-align: center;
    
    /* Use flexbox for layout */
    display: flex;
    
    /* Center the content vertically */
    align-items: center;

    /* Center the content horizontally */
    justify-content: center;

    /* Define styles for any img elements within this component */
    img {
        /* Add styles for img here */
        width: 90vw;
        max-width: 600px;
        display: block;
        margin-bottom: 2rem;
        margin-top: -3rem;
    }
    h3 {
        margin-bottom: 0.5rem;
    }
    p {
        line-height: 1.5;
        margin-top: 0.5rem;
        margin-bottom: 1rem;
        color: var(--text-secondary-color);
    }
    
    /* <Link to='/dashboard'>back home</Link>  */
    a {
        color: var(--primary-500);
        font-weight: bold;
        text-transform: capitalize;
        border: 2px solid var(--primary-500);
        border-radius: 0.25rem;
        // top, right, bottom, left
        padding: 0.2rem 0.5rem 0.2rem 0.5rem;
    }
    
`;

export default Wrapper;