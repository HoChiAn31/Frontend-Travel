import React from 'react';
import PropTypes from 'prop-types';
const VehicleFilter = ({ selectedVehicles, onSelectVehicles }) => {
    const handleClick = (vehicle) => {
        onSelectVehicles(vehicle);
    };

    return (
        <div className="mb-6">
            <label className="mb-2 block font-medium text-gray-700">Phương tiện di chuyển:</label>
            <div className="grid grid-cols-2 gap-4">
                {['Xe khach', 'May bay'].map((vehicle) => (
                    <button
                        key={vehicle}
                        onClick={() => handleClick(vehicle)}
                        className={`rounded-lg px-4 py-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] ${
                            selectedVehicles === vehicle ? 'bg-blue-500 bg-blue text-white' : 'bg-white text-gray-700'
                        }`}
                    >
                        {vehicle}
                    </button>
                ))}
            </div>
        </div>
    );
};
VehicleFilter.propTypes = {
    selectedVehicles: PropTypes.string.isRequired,
    onSelectVehicles: PropTypes.func.isRequired,
};
export default VehicleFilter;
