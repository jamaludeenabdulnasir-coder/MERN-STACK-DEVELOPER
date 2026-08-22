function CustomInputField({
    label,
    type = 'text',
    name,
    placeholder = '',
    value,
    onChange,
    required = false,
    error = '',
    autoComplete
}) {
    return (
        <div className="custom-input-field">
            {label && <label htmlFor={name}>{label}</label>}
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                autoComplete={autoComplete}
            />
            {error && <small className="input-error">{error}</small>}
        </div>
    )
}

export default CustomInputField
