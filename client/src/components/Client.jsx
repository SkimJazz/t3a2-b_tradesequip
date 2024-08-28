// External imports
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link, Form } from 'react-router-dom';

// Local imports
import Wrapper from '../assets/wrappers/Client';
import JobInfo from './JobInfoIcon';

// Extend dayjs with advancedFormat plugin
day.extend(advancedFormat);



const Client = ({
                 _id,
                 // clientNoJobAssigned,
                 clientCompName,
                 clientAddress,
                 projectContact,
                 createdAt,
                 createdBy,
                 // Add more properties here

             }) => {
    const date = day(createdAt).format('Do MMM, YYYY');
    // console.log(data);

    return (
        <Wrapper>
            <header>
                <div className='main-icon'>{clientCompName.charAt(0)}</div>
                <div className='info'>
                    <h5>{clientCompName}</h5>
                    <p>{projectContact}</p>
                </div>
            </header>

            <div className='content'>
                <div className='content-center'>
                    <JobInfo icon={<FaLocationArrow/>} text={clientAddress}/>
                    <JobInfo icon={<FaCalendarAlt/>} text={date}/>
                    <JobInfo icon={<FaBriefcase/>} text={projectContact}/>
                    {/*<div className={`status ${jobStatus}`}>{jobStatus}</div>*/}
                    {/*<div className={`status ${jobStatus.replace(' ', '-')}`}>{jobStatus}</div>*/}
                </div>

                <footer className='actions'>
                    {/* Navigate to edit-job page and find job with this mongoDB '_id' */}
                    <Link to={`../edit-client/${_id}`} className='btn edit-btn'>
                        Edit
                    </Link>

                    {/*/!* Delete job with this mongoDB '_id' *!/*/}
                    <Form method='post' action={`../delete-client/${_id}`}>
                        <button type='submit' className='btn delete-btn'>
                            Delete
                        </button>
                    </Form>
                </footer>
            </div>

        </Wrapper>
    );
};

export default Client;