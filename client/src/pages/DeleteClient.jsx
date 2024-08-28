// External imports
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';


// Local imports
import customAxiosFetch from "../utils/axiosFetch.js";


export const reactRouterAction = async ({ params }) => {
    try {
        await customAxiosFetch.delete(`/clients/${params.id}`);
        toast.success('Client deleted successfully', { autoClose: 1500 });
    } catch (error) {
        toast.error(error.response.data.msg);
    }
    return redirect('/dashboard/my-clients');
}