// External imports
import {Form, redirect, useLoaderData, useNavigation} from 'react-router-dom';
import { toast } from 'react-toastify';

// Local imports - Client side
import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/FormDashboard';
import customAxiosFetch  from '../utils/axiosFetch';



export const reactRouterLoader =  async ({ params }) => {
    // console.log(params);
    // return null;
    try {
        const { data } = await customAxiosFetch.get(`/clients/${params.id}`);
        return data;
    }   catch (error) {
        toast.error(error?.response?.data?.msg, {autoClose: 1500});
        return redirect('/dashboard/my-clients');
    }
};


const EditClient = () => {

    const { client } = useLoaderData();
    // console.log(job);
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    return (
        <Wrapper>
            <Form method="post" className='form'>
                <h4 className='form-title'> Edit Client </h4>
                <div className='form-center'>
                    <FormRow type='text' name='clientCompName' defaultValue={client.clientCompName}/>
                    <FormRow type='text' name='clientAddress' defaultValue={client.clientAddress}/>
                    <FormRow type='text' labelText='project contact' name='projectContact' defaultValue={client.projectContact}/>

                    {/*<SubmitBtn formBtn/>*/}
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

export default EditClient;




export const reactRouterAction = async ({ request, params }) => {

    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        await customAxiosFetch.patch(`/clients/${params.id}`, data);
        toast.success('Client edited successfully', {autoClose: 1500});
        return redirect('/dashboard/my-clients');
    } catch (error) {
        toast.error(error.response.data.msg, {autoClose: 2000});
        return error;
    }
};