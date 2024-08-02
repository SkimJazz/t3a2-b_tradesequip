import styled from 'styled-components';

const Wrapper = styled.section`
    
    nav {
        width:var(--fluid-width);
        max-width:var(--max-width);
        margin:0 auto;
        height:var(--nav-height);
        display: flex;
        align-items: center;
    }

    /* Original code from Landing.jsx */
    //.page {
    //    min-height: calc(100vh - var(--nav-height));
    //    display: grid;
    //    align-items: center;
    //    margin-top: -3rem;
    //}
    
    /* New Landing page background image */
    .page {
        min-height: calc(100vh - var(--nav-height));
        display: grid;
        align-items: center;
        margin-top: -3rem;
        //background-image: url('../images/main.svg');
        //background-size: cover; 
        //background-position: center; 
        position: relative;
    }
    
    h1 {
        font-family: 'Orbitron', 'Roboto', sans-serif;
        font-weight: 700;
        span {
            color: var(--primary-500);
        }
        margin-bottom: 2rem;
    }
    p {
        font-family: 'Orbitron', 'Robot', sans-serif;
        line-height: 2;
        color: var(--text-secondary-color);
        margin-bottom: 5rem;
        max-width: 35em;

    }

    /* Register button */
    .signup-link {
        margin-right: 1rem;
    }

    /* Small screen => No img displayed */
    .main-img {
        display: none;
    }

    .btn {
        padding: 0.75rem 1rem;
    }

    /* Media query */
    @media (min-width: 992px) {
        .page {
            grid-template-columns: 1fr 400px;
            column-gap: 3rem;
        }
        .main-img {
            display: block;
        }
        
    /* Didn't work -> Should have made Landing page background image disappear when resizing screen */
    //@media (max-width: 768px) {
    //    .page {
    //        background-image: none !important;
    //    }
    //}

`;

export default Wrapper;