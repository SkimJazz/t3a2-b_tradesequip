/* Libraries imports */
import { toast } from 'react-toastify';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';

/* Local imports - Client side */
import Wrapper from '../assets/wrappers/FormDashboard';
import { MyClientsContainer, SearchContainer } from '../components';
import customAxiosFetch from '../utils/axiosFetch';



export const reactRouterLoader = async ({ request }) => {
    // console.log(request.url);
    const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
    console.log(params);
    try {
        // Use Axios to make a GET request to the server with the search 'params'
        const { data } = await customAxiosFetch.get('/clients', { params, });
        return { data, searchValues: {...params }, }
    } catch (error) {
        toast.error(error?.response?.data?.msg, { autoClose: 1500, theme: 'colored'});
        return error;
    }
};


const MyClientsContext = createContext();

const MyClients = () => {

    const { data, searchValues } = useLoaderData();
    // console.log(data);

    return (
        <MyClientsContext.Provider value={{ data, searchValues }}>
            {/*<SearchContainer />*/}
            <MyClientsContainer />
        </MyClientsContext.Provider>
    );

};

export const useMyClientsContext = () => useContext(MyClientsContext);

export default MyClients;