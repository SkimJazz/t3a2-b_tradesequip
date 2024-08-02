import { Link, useRouteError } from 'react-router-dom';
import img from '../assets/images/error.svg';
import Wrapper from '../assets/wrappers/ErrorPage';

const Error = () => {
    const error = useRouteError();
    console.log(error);
    if (error.status === 404) {
        return (
            <Wrapper>
                <div>
                    <img src={img} alt='page not found' />
                    <h3>Oops! page not found</h3>
                    <p> Every one's on smoke'o</p>
                    <Link to='/dashboard'>back home</Link>
                </div>
            </Wrapper>
        );
    }
    return (
        <Wrapper>
            <div>
                <h3>something went wrong</h3>
            </div>
        </Wrapper>
    );
};

export default Error;