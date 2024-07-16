import React from 'react';
import PropTypes from 'prop-types';
const PeoplesFilter = ({ selectedPeoples, onSelectPeoples }) => {
    const handleClick = (peoples) => {
        onSelectPeoples(peoples);
    };
    console.log(selectedPeoples);
    return (
        <div className="mb-6">
            <label className="mb-2 block font-medium text-gray-700">Số ngày đi:</label>
            <div className="grid grid-cols-2 gap-4">
                {['1', '2', '3-5', '5+'].map((peoples) => (
                    <button
                        key={peoples}
                        onClick={() => handleClick(peoples)}
                        className={`rounded-lg px-4 py-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] ${
                            selectedPeoples === peoples ? 'bg-blue-500 bg-blue text-white' : 'bg-white text-gray-700'
                        }`}
                    >
                        {peoples} người
                    </button>
                ))}
            </div>
        </div>
    );
};
PeoplesFilter.propTypes = {
    selectedPeoples: PropTypes.string.isRequired,
    onSelectPeoples: PropTypes.func.isRequired,
};
export default PeoplesFilter;
