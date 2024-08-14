const FormRow = ({ type, name, labelText, defaultValue = '', hideLabel = false }) => {
    return (
        <div className="form-row">
            {!hideLabel && <label htmlFor={name} className='form-label'>
                {labelText || name}
            </label>}
            <input
                type={type}
                id={name}
                name={name}
                className='form-input'
                defaultValue={defaultValue}
                placeholder={labelText || name} // Added placeholder attribute
                required
            />
        </div>
    );
};
export default FormRow;