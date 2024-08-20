/* External imports */
import { toast } from 'react-toastify';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';

/* Local imports - Server side */
import { MyJobsContainer, SearchContainer } from '../components';
import customAxiosFetch from "../utils/axiosFetch.js";





export const reactRouterLoader = async ({ request }) => {
    // console.log(request.url);
    const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
    console.log(params);
    try {
        // Use Axios to make a GET request to the server with the search 'params'
        const { data } = await customAxiosFetch.get('/jobs', { params, });
        return { data, searchValues: {...params }, }
    } catch (error) {
        toast.error(error?.response?.data?.msg, { autoClose: 1500, theme: 'colored'});
        return error;
    }
};


const MyJobsContext = createContext();
const MyJobs = () => {

    const { data, searchValues } = useLoaderData();
    // console.log(data);

    return (
        <MyJobsContext.Provider value={{ data, searchValues }}>
            <SearchContainer />
            <MyJobsContainer />
        </MyJobsContext.Provider>
    );
};

// useMyJobsContext is a custom hook that returns the context value.
export const useMyJobsContext = () => useContext(MyJobsContext);

export default MyJobs;