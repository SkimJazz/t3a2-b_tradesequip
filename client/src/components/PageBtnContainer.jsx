// External imports
import { useLocation, useNavigate } from 'react-router-dom';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

// Internal imports
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useMyJobsContext } from '../pages/MyJobs';



const PageBtnContainer = () => {

    const {
        data: { numOfPages, currentPage },
    } = useMyJobsContext();
    const { search, pathname } = useLocation();
    const navigate = useNavigate();
    console.log(search, pathname);
    const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);


    // Handles page change when user clicks on a page number
    const handlesPageChanges = (pageNumber) => {
        // JS constructor URLSearchParams() to manipulate the query string
        const searchParams = new URLSearchParams(search);
        // Send request to server with page included in query string
        searchParams.set('page', pageNumber);
        // Navigate back to myJobs and include the searchParams (in this case its Page Number)
        navigate(`${pathname}?${searchParams.toString()}`);  //
    };


    return (
        <Wrapper>

            {/* Handles navigating back to previous page */}
            <button
                className='btn prev-btn'
                onClick={() => {
                    let prevPage = currentPage - 1;
                    if (prevPage < 1) prevPage = numOfPages;
                    handlesPageChanges(prevPage);
                }}
            >
                <HiChevronDoubleLeft />
                prev
            </button>

            <div className='btn-container'>
                {pages.map((pageNumber) => (

                    // Handles page change when user clicks on a page number
                    <button
                        className={`btn page-btn ${pageNumber === currentPage && 'active'}`}
                        key={pageNumber}
                        onClick={() => handlesPageChanges(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>

            {/* Handles navigating to next page */}
            <button
                className='btn next-btn'
                onClick={() => {
                    let nextPage = currentPage + 1;
                    if (nextPage > numOfPages) nextPage = 1;
                    handlesPageChanges(nextPage);
                }}
            >
                next
                <HiChevronDoubleRight />
            </button>

        </Wrapper>
    );
};

export default PageBtnContainer;