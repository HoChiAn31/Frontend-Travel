import React from 'react';
import PropTypes from 'prop-types';
const OptionFilter = ({ selectedOptions, onSelectOptions }) => {
    const handleClick = (option) => {
        onSelectOptions(option);
    };

    return (
        <div className="mb-6">
            <label className="mb-2 block font-medium text-gray-700">Loại:</label>
            <div className="grid grid-cols-2 gap-4">
                {[
                    { key: 'tour', label: 'Tour' },
                    { key: 'hotel', label: 'Khách sạn' },
                ].map((option) => (
                    <button
                        key={option.key}
                        onClick={() => handleClick(option.key)}
                        className={`rounded-lg px-4 py-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] ${
                            selectedOptions === option.key ? 'bg-blue-500 bg-blue text-white' : 'bg-white text-gray-700'
                        }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
};
OptionFilter.propTypes = {
    selectedOptions: PropTypes.string.isRequired,
    onSelectOptions: PropTypes.func.isRequired,
};
export default OptionFilter;
