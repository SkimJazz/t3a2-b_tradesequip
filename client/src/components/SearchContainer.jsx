// External imports
import { FormRow, FormSelection } from '.';     //  SubmitBtn
import { Form, useSubmit, Link } from 'react-router-dom';

// Local imports
import Wrapper from '../assets/wrappers/FormDashboard';
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from '../../../utils/constants';
import { useMyJobsContext} from "../pages/MyJobs";


const SearchContainer = () => {

    const { searchValues } = useMyJobsContext();
    const { search, jobStatus, jobType, sort } = searchValues;
    const submit = useSubmit();


    // ---------------------- Controlled input ---------------------- //

    /**
     * Yes!, this is a function that returns a function. This is a common pattern
     * in JavaScript to create a closure around the timeout variable.
     *
     * Debounce function (Vanilla JS) to run onChange event handler after 2000ms
     * after the last keystroke. This will prevent the onChange event handler from
     * running too fast and too often. This give the user time to finish typing.
     *
     * @param {Function} onChange - The function to be debounced.
     * @returns {Function} - A debounced function that delays invoking onChange.
     */
    const debouncedSubmit = (onChange) => {
        let timeout;
        return (e) => {
            // console.log('Bounce');
            const form = e.currentTarget.form;
            // console.log(form);
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                onChange(form);
            }, 2000);
        };
    };


    return (
        <Wrapper>
            {/* react-router-dom will let the bowser make a GET request
                back to the URL in this Form component, as there is no
                default method=post.*/}
            <Form className='form'>
                <h5 className='form-title'>search form</h5>
                <div className='form-center'>
                    {/* search position */}

                    <FormRow
                        type='search'
                        name='search'
                        defaultValue={search}
                        // Pass the form to the debouncedSubmit function
                        onChange={debouncedSubmit((form) => { submit(form) })}
                    />

                    <FormSelection
                        labelText='job status'
                        name='jobStatus'
                        list={['all', ...Object.values(JOB_STATUS)]}
                        defaultValue={jobStatus}
                        onChange={(e) => {
                            submit(e.currentTarget.form);
                        }}
                    />

                    <FormSelection
                        labelText='job type'
                        name='jobType'
                        list={['all', ...Object.values(JOB_TYPE)]}
                        defaultValue={jobType}
                        onChange={(e) => {
                            submit(e.currentTarget.form);
                        }}
                    />

                    <FormSelection
                        name='sort'
                        defaultValue={sort}
                        list={[...Object.values(JOB_SORT_BY)]}
                        onChange={(e) => {
                            submit(e.currentTarget.form);
                        }}
                    />

                    {/* This URL will clear out the search, directed back to the my-jobs endpoint */}
                    <Link to='/dashboard/my-jobs' className='btn form-btn delete-btn'>
                        Reset Search
                    </Link>
                    {/* TEMP!!!! */}
                    {/*<SubmitBtn formBtn />*/}
                </div>
            </Form>
        </Wrapper>
    );
};

export default SearchContainer;