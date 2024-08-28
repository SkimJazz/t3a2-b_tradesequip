import Client from './Client';
import Wrapper from '../assets/wrappers/MyClientsContainer';
// import PageBtnContainer from './PageBtnContainer';
import { useMyClientsContext } from '../pages/MyClients';

const MyClientsContainer = () => {

    const { data } = useMyClientsContext();
    const { myClients } = data;

    if (myClients.length === 0) {
        return (
            <Wrapper>
                <h2>No clients to display...</h2>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            {/*<h5>*/}
            {/*    {totalJobs} job{myJobs.length > 1 && 's'} found*/}
            {/*</h5>*/}
            <div className='jobs'>
                {myClients.map((client) => {
                    return <Client key={client._id} {...client} />;
                })}
            </div>
            {/*{numOfPages > 1 && <PageBtnContainer />}*/}
        </Wrapper>
    );
};

export default MyClientsContainer;