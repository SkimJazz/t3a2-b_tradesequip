import Job from './Job';
import Wrapper from '../assets/wrappers/MyJobsContainer';

import { useMyJobsContext } from '../pages/MyJobs';



const MyJobsContainer = () => {

    const { data } = useMyJobsContext();
    const { myJobs } = data;

    if (myJobs.length === 0) {
        return (
            <Wrapper>
                <h2>No jobs to display...</h2>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <div className='jobs'>
                {myJobs.map((job) => {
                    return <Job key={job._id} {...job} />;
                })}
            </div>
        </Wrapper>
    );
};

export default MyJobsContainer;