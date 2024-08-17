// External imports
import {Form, redirect, useLoaderData, useNavigation} from 'react-router-dom';
import { toast } from 'react-toastify';

// Local imports - Client side
import { FormRow, FormSelection  } from '../components';
import Wrapper from '../assets/wrappers/FormDashboard';
import customAxiosFetch  from '../utils/axiosFetch';


// Local imports - Server side
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';



export const reactRouterLoader =  async ({ params }) => {
    // console.log(params);
    // return null;
    try {
        const { data } = await customAxiosFetch.get(`/jobs/${params.id}`);
        return data;
    }   catch (error) {
        toast.error(error?.response?.data?.msg, {autoClose: 1500});
        return redirect('/dashboard/my-jobs');
    }
};


const EditJob = () => {

    const { job } = useLoaderData();
    // console.log(job);
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    return (
        <Wrapper>
            <Form method="post" className='form'>
                <h4 className='form-title'> Edit Job </h4>
                <div className='form-center'>
                    <FormRow
                        type='text'
                        name='jobTitle'
                        defaultValue={job.jobTitle}
                    />
                    <FormRow
                        type='text'
                        name='clientName'
                        defaultValue={job.clientName}
                    />
                    <FormRow
                        type='text'
                        labelText='job location'
                        name='jobLocation'
                        defaultValue={job.jobLocation}
                    />
                    <FormSelection
                        name='jobStatus'
                        labelText='job status'
                        defaultValue={job.jobStatus}
                        list={Object.values(JOB_STATUS)}
                    />
                    <FormSelection
                        name='jobType'
                        labelText='job type'
                        defaultValue={job.jobType}
                        list={Object.values(JOB_TYPE)}
                    />
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

export default EditJob;




export const reactRouterAction = async ({ request, params }) => {

    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        await customAxiosFetch.patch(`/jobs/${params.id}`, data);
        toast.success('Job edited successfully', {autoClose: 1500});
        return redirect('/dashboard/my-jobs');
    } catch (error) {
        toast.error(error.response.data.msg, {autoClose: 2000});
        return error;
    }
};



