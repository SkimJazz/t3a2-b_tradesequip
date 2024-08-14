import axios from 'axios';

/**
 * Creates an instance of Axios with a custom configuration.
 *
 * @type {AxiosInstance}
 * @version Axios v1.3.1
 * @property {string} baseURL - The base URL for API requests.
 */
const customAxiosFetch = axios.create({
    baseURL: '/api/v0',
});

export default customAxiosFetch;