import styled from 'styled-components';


const Wrapper = styled.section`
    
    .dashboard {
        display: grid;
        grid-template-columns: 1fr;
    }
    .dashboard-page {
        width: 90vw;        // Max width of dashboard page
        margin: 0 auto;     // Center the dashboard page
        padding: 2rem 0;
    }
    
    // Logic for Large screen -> For large screens, show LargeSidebar first
    @media (min-width: 992px) {
        .dashboard {
            // First column is width of LargeSidebar. Second column is Navbar and User Profile page
            grid-template-columns: auto 1fr;
        }
        .dashboard-page {
            // 90% of the content area (NOT screen width) = 90% of 1fr
            width: 90%; 
        }
    }
    
`;
export default Wrapper;