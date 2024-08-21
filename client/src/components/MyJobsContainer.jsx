import Job from './Job';
import Wrapper from '../assets/wrappers/MyJobsContainer';
import PageBtnContainer from './PageBtnContainer';
import { useMyJobsContext } from '../pages/MyJobs';



const MyJobsContainer = () => {

    const { data } = useMyJobsContext();
    const { myJobs, totalJobs, numOfPages } = data;

    if (myJobs.length === 0) {
        return (
            <Wrapper>
                <h2>No jobs to display...</h2>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <h5>
                {totalJobs} job{myJobs.length > 1 && 's'} found
            </h5>
            <div className='jobs'>
                {myJobs.map((job) => {
                    return <Job key={job._id} {...job} />;
                })}
            </div>
            {numOfPages > 1 && <PageBtnContainer />}
        </Wrapper>
    );
};

export default MyJobsContainer;