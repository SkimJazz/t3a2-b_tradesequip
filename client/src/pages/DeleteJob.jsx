// External imports
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';


// Local imports
import customAxiosFetch from "../utils/axiosFetch.js";


export const reactRouterAction = async ({ params }) => {
    try {
        await customAxiosFetch.delete(`/jobs/${params.id}`);
        toast.success('Job deleted successfully', { autoClose: 1500 });
    } catch (error) {
        toast.error(error.response.data.msg);
    }
    return redirect('/dashboard/my-jobs');
}