import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../Layouts/ThemeProvider';

const InputField = ({
    label,
    type,
    placeholder,
    value,
    onChange,
    required,
    min,
    options,
    className,
    sizeH,
    defaultValue,
}) => {
    const { darkMode } = useTheme();

    const inputClassName = `w-full rounded-md border border-gray-300 px-2 py-3 focus:border-blue focus:outline-none focus:ring-blue ${className} ${darkMode ? 'bg-darkHF text-white' : 'bg-white text-black'}`;

    return (
        <div className="w-full py-2">
            <p className="font-bold">{label}:</p>
            {type === 'textarea' ? (
                <textarea
                    required={required}
                    className={`${inputClassName} ${sizeH === 'lg' ? 'h-[120px]' : ''}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            ) : type === 'select' ? (
                <select
                    value={value}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    className={`focus:ring-blue-500 focus:border-blue-500 h-12 w-full min-w-[120px] cursor-pointer rounded-lg border border-gray-300 px-2 py-3 outline-none ${className} ${darkMode ? 'bg-darkHF text-white' : 'bg-white text-black'}`}
                >
                    {options.map((option) => (
                        <option key={option.id || option.value} value={option.id || option.value}>
                            {option.label || option.name || option.text}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    required={required}
                    className={inputClassName}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    min={min}
                />
            )}
        </div>
    );
};

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'textarea', 'select', 'number', 'password', 'email']).isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    min: PropTypes.number,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            label: PropTypes.string,
            name: PropTypes.string,
            text: PropTypes.string,
        }),
    ),
    className: PropTypes.string,
    sizeH: PropTypes.oneOf(['sm', 'md', 'lg']),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

InputField.defaultProps = {
    placeholder: '',
    required: false,
    min: undefined,
    options: [],
    className: '',
    sizeH: 'md',
    defaultValue: '',
};

export default InputField;
