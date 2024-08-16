/* External imports */
import { toast } from 'react-toastify';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';

/* Local imports - Server side */
import { MyJobsContainer, SearchContainer } from '../components';
import customAxiosFetch from "../utils/axiosFetch.js";





export const reactRouterLoader = async ({ request }) => {

    // Get back an object with the data property. Data property is an array of jobs(myJobs).
    try {
        const { data } = await customAxiosFetch.get('/jobs');
        return { data }
    } catch (error) {
        toast.error(error?.response?.data?.msg, { autoClose: 1500, theme: 'colored'});
        return error;
    }
};


const MyJobsContext = createContext();
const MyJobs = () => {

    const { data } = useLoaderData();
    // console.log(data);

    return (
        <MyJobsContext.Provider value={{ data }}>
            <SearchContainer />
            <MyJobsContainer />
        </MyJobsContext.Provider>
    );
};

// useMyJobsContext is a custom hook that returns the context value.
export const useMyJobsContext = () => useContext(MyJobsContext);

export default MyJobs;