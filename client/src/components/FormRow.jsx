const FormRow = ({ type, name, labelText, defaultValue = '', hideLabel = false }) => {
    return (
        <div className="form-row">
            {!hideLabel && <lable htmlFor={name} className='form-label'>
                {labelText || name}
            </lable>}
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