import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';
import { useLoaderData, redirect } from 'react-router-dom';
import customAxiosFetch from '../utils/axiosFetch';
import Wrapper from '../assets/wrappers/StatsContainer';
import { toast } from 'react-toastify';
import { StatsItem } from '../components';



export const reactRouterLoader = async () => {
    try {
        const response = await customAxiosFetch.get('/users/super/app-stats');
        return response.data;
    } catch (error) {
        toast.error('You are not authorized to view this page');
        // Only admin has access to this page. All other users are redirected
        return redirect('/dashboard');
    }
};


const Super = () => {
    const { users, jobs } = useLoaderData();

    return (
        <Wrapper>
            <StatsItem
                title='current users'
                count={users}
                color='#e9b949'
                bcg='#fcefc7'
                icon={<FaSuitcaseRolling />}
            />
            <StatsItem
                title='total jobs'
                count={jobs}
                color='#647acb'
                bcg='#e0e8f9'
                icon={<FaCalendarCheck />}
            />

            {/* <StatsItem
                    title='total clients'
                    count={clients}
                    color='add here'
                    bcg='add here'
                    icon={< Use cog wheel icon maybe? />}
                    />
                    */}

        </Wrapper>
    );
};

export default Super;