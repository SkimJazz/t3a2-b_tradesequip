// External imports
import { useOutletContext, Form } from 'react-router-dom';
import { useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';

// Local imports Client side
import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/FormDashboard';
import customAxiosFetch from '../utils/axiosFetch';




export const reactRouterAction = async ({ request }) => {
    // IMPORTANT! Image files are sent to server as Form Data, not JSON
    const formData = await request.formData();

    const file = formData.get('avatar');
    // File selection and file size check
    if (file && file.size > 500000) {
        toast.error('Image size too large');
        return null;
    }

    try {
        await customAxiosFetch.patch('/users/update-user', formData);
        toast.success('Profile updated successfully');
    } catch (error) {
        toast.error(error?.response?.data?.msg);
    }
    return null;
};



const MyProfile = () => {

    const { user } = useOutletContext();
    const { name, lastName, email, location } = user;

    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    return (

        <Wrapper>
            <Form method='post' className='form' encType='multipart/form-data'>
                {/* encType = "Content-Type" => Ref Headers tab in browser dev tools.
                    EncryptionType needed for sending files to server when using the Form component
                    multipart/form-data is used for sending the image file as part of the form data
                    and will be sent as form data, not JSON.
                */}
                <h4 className='form-title'>my profile</h4>

                <div className='form-center'>
                    <div className='form-row'>
                        <label htmlFor='image' className='form-label'>
                            Select image file | max 0.5 MB
                        </label>

                        {/* Avatar image sent as binary  */}
                        <input
                            type='file'
                            id='avatar'
                            name='avatar'
                            className='form-input'
                            accept='image/*'
                        />
                    </div>
                    <FormRow type='text' name='name' defaultValue={name} />
                    <FormRow
                        type='text'
                        labelText='last name'
                        name='lastName'
                        defaultValue={lastName}
                    />
                    <FormRow type='email' name='email' defaultValue={email} />
                    <FormRow type='text' name='location' defaultValue={location} />
                    <button
                        className='btn btn-block form-btn'
                        type='submit'
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'submitting...' : 'save changes'}
                    </button>
                </div>
            </Form>
        </Wrapper>
    );
};

export default MyProfile;



