import React from 'react';
import PropTypes from 'prop-types';

const DaysFilter = ({ selectedDays, onSelectDays }) => {
    const handleClick = (days) => {
        onSelectDays(days);
    };

    return (
        <div className="mb-6">
            <label className="mb-2 block font-medium text-gray-700">Số ngày đi:</label>
            <div className="grid grid-cols-2 gap-4">
                {['3', '7', '14', '15'].map((days) => (
                    <button
                        key={days}
                        onClick={() => handleClick(days)}
                        className={`rounded-lg px-4 py-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] ${
                            selectedDays === days ? 'bg-blue-500 bg-blue text-white' : 'bg-white text-gray-700'
                        }`}
                    >
                        {days}+ ngày
                    </button>
                ))}
            </div>
        </div>
    );
};
DaysFilter.propTypes = {
    selectedDays: PropTypes.string.isRequired,
    onSelectDays: PropTypes.func.isRequired,
};
export default DaysFilter;
