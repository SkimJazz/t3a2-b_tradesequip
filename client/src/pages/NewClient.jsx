/* Libraries imports */
import { useOutletContext, Form, redirect, useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';

/* Local imports - Client side */
import Wrapper from '../assets/wrappers/FormDashboard';
import { FormRow } from '../components';
import customAxiosFetch from '../utils/axiosFetch';



export const reactRouterAction = async ({ request }) => {

    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        await customAxiosFetch.post('/clients', data);
        toast.success('Client added successfully');
        return redirect('../my-clients');
    } catch (error) {
        toast.error(error?.response?.data?.msg, { autoClose: 1500, theme: 'colored' });
        return error;
    }
};


const NewClient = () => {

    const { user } = useOutletContext();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    return (
        <Wrapper>
            <Form method='post' className='form'>
                <h4 className='form-title'>New Client</h4>
                <div className='form-center'>

                    <FormRow
                        type='text'
                        labelText='client company name'
                        name='clientCompName'
                    />
                    <FormRow
                        type='text'
                        labelText='clients address'
                        name='clientAddress'
                    />
                    <FormRow
                        type='text'
                        labelText='project contact'
                        name='projectContact'
                        defaultValue={user.location} // Use Users location as default value
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

export default NewClient;