/* Libraries imports */
import {useOutletContext, Form, redirect, useNavigation} from 'react-router-dom';
import { toast } from 'react-toastify';

/* Local imports - Server side */
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';

/* Local imports - Client side */
import Wrapper from '../assets/wrappers/FormDashboard';
import {FormRow, FormSelection} from '../components';
import customAxiosFetch from '../utils/axiosFetch';


export const reactRouterAction = async ({ request }) => {

    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        await customAxiosFetch.post('/jobs', data);
        toast.success('Job added successfully');
        return redirect('/dashboard/my-jobs');
    } catch (error) {
        toast.error(error?.response?.data?.msg, { autoClose: 1500, theme: 'colored' });
        return error;
    }
};


const NewJob = () => {

    const { user } = useOutletContext();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    return (
        <Wrapper>
            <Form method='post' className='form'>
                <h4 className='form-title'>New Job</h4>
                <div className='form-center'>

                    {/*
                    * @description FormRow functional component that renders a text input field.
                    *
                    * @component
                    * @param {Object} props - Properties passed to the component.
                    * @param {string} props.type - Type of the input field (e.g., 'text').
                    * @param {string} props.name - Name and id of the input field.
                    * @param {string} props.labelText - Text for the label of the input field.
                    * @param {string} [props.defaultValue=''] - Initial value that the input field should display.
                    *
                    * @link {FormRow.jsx} - This component is imported from FormRow.jsx.
                    *
                    * @example
                    * <FormRow
                    *    type='text'
                    *    name='username'
                    *    labelText='Username'
                    *    defaultValue='testUser'
                    * />
                    */}
                    <FormRow type='text' labelText='Job Title' name='jobTitle'/>
                    <FormRow type='text' labelText='Client' name='clientName'/>
                    <FormRow
                        type='text'
                        labelText='job location'
                        name='jobLocation'
                        defaultValue={user.location} // Use Users location as default value
                    />

                    {/* Dropdown list section */}
                    <FormSelection
                        labelText='job status'
                        name='jobStatus'
                        defaultValue={JOB_STATUS.PENDING}
                        list={Object.values(JOB_STATUS)}
                    />
                    <FormSelection
                        labelText='job type'
                        name='jobType'
                        defaultValue={JOB_TYPE.FORM_WORK}
                        list={Object.values(JOB_TYPE)}
                    />


                    {/* formBtn by default is true */}
                    {/*<SubmitBtn formBtn />*/}
                    <button
                        type='submit'
                        className='btn btn-block form-btn '
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'submitting...' : 'submit'}
                    </button>

                </div>
            </Form>
        </Wrapper>
    );
};

export default NewJob;