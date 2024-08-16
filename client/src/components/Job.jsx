/**
 *  This Job.jsx file is only used in the MyJobsContainer.jsx file.
 *
 * */
// External imports
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link, Form } from 'react-router-dom';

// Assets
import Wrapper from '../assets/wrappers/Job';

// Components
import JobInfo from './JobInfoIcon';

// Extend dayjs with advancedFormat plugin
day.extend(advancedFormat);




const Job = ({
     _id,
     jobTitle,
     clientName,
     jobLocation,
     jobType,
     createdAt,
     jobStatus,
    // Add more properties here

 }) => {
    const date = day(createdAt).format('Do MMM, YYYY');
    // console.log(data);

    return (
        <Wrapper>
            <header>
                <div className='main-icon'>{clientName.charAt(0)}</div>
                <div className='info'>
                    <h5>{jobTitle}</h5>
                    <p>{clientName}</p>
                </div>
            </header>

            <div className='content'>
                <div className='content-center'>
                    <JobInfo icon={<FaLocationArrow/>} text={jobLocation}/>
                    <JobInfo icon={<FaCalendarAlt/>} text={date}/>
                    <JobInfo icon={<FaBriefcase/>} text={jobType}/>
                    {/*<div className={`status ${jobStatus}`}>{jobStatus}</div>*/}
                    <div className={`status ${jobStatus.replace(' ', '-')}`}>{jobStatus}</div>
                </div>

                <footer className='actions'>
                    {/* Navigate to edit-job page and find job with this mongoDB '_id' */}
                    <Link to={`../edit-job/${_id}`} className='btn edit-btn'>
                        Edit
                    </Link>

                    {/* Delete job with this mongoDB '_id' */}
                    <Form method='post' action={`../delete-job/${_id}`}>
                        <button type='submit' className='btn delete-btn'>
                            Delete
                        </button>
                    </Form>
                </footer>
            </div>

        </Wrapper>
    );
};

export default Job;