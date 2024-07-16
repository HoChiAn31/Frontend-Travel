import React from 'react';
import { useFilter } from '../Layouts/FilterContext';
import DaysFilter from './searchCategory/DaysFilter';
import PeoplesFilter from './searchCategory/PeoplesFilter';
import { dataLocations } from './data';
import OptionFilter from './searchCategory/OptionFilter';
import VehicleFilter from './searchCategory/VehicleFilter';

const Sidebar = () => {
    const { filters, updateFilter, setIsFilter, option, setOption, setIsLoadOption, isLoadOption } = useFilter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'city' && value !== '') {
            updateFilter('city', value);
            updateFilter('name', '');
        } else if (option === 'tour' || option === 'hotel') {
            if (name === 'priceChild') {
                const [minPrice, maxPrice] = value.split(',');
                updateFilter('priceChild', [parseInt(minPrice), parseInt(maxPrice)]);
            } else {
                updateFilter(name, value);
            }
            setIsFilter(true);
        }
    };

    const handleDaysSelect = (days) => {
        updateFilter('duration', days);
        setIsFilter(true);
    };
    const handleVehiclesSelect = (vehicle) => {
        updateFilter('vehicle', vehicle);
        setIsFilter(true);
    };
    const handleOptionsSelect = (option) => {
        console.log(option);
        setOption(option);
        setIsLoadOption(isLoadOption + 1);
    };
    const handleChangeQuantity = (e) => {
        const { name, value } = e.target;
        updateFilter(name, value);
        setIsFilter(true);
    };
    return (
        <div className="w-80 rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">Bộ lọc tìm kiếm</h2>
            <OptionFilter selectedOptions={option} onSelectOptions={handleOptionsSelect} />
            {option === 'tour' ? (
                <>
                    <div className="mb-6">
                        <label className="mb-2 block font-medium text-gray-700">Địa điểm du lịch:</label>
                        <select
                            name="city"
                            value={filters.city}
                            onChange={handleChange}
                            className="focus:ring-blue-500 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2"
                        >
                            {dataLocations.map((data, index) => (
                                <option key={index} value={data.value}>
                                    {data.text}
                                </option>
                            ))}
                        </select>
                    </div>
                    <DaysFilter selectedDays={filters.duration} onSelectDays={handleDaysSelect} />
                    <VehicleFilter selectedVehicles={filters.vehicle} onSelectVehicles={handleVehiclesSelect} />
                    <div className="mb-6">
                        <label className="mb-2 block font-medium text-gray-700">Giá cả:</label>
                        <div>
                            <input
                                type="range"
                                name="priceChild"
                                min="0"
                                max="10000000"
                                step="100000"
                                value={filters.priceChild[0]}
                                onChange={handleChange}
                                className="focus:ring-blue-500 h-2 w-full rounded-lg bg-gray-200 focus:outline-none focus:ring-2"
                            />
                            <div className="mt-2 flex items-center justify-between">
                                <span className="text-sm text-gray-600">
                                    {filters.priceChild[0]?.toLocaleString()} VND
                                </span>
                                <span className="text-sm text-gray-600">{(10000000).toLocaleString()} VND</span>
                            </div>
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="mb-2 block font-medium text-gray-700">Ngày đi:</label>
                        <input
                            type="date"
                            name="startDate"
                            value={filters.startDate}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={handleChange}
                            className="focus:ring-blue-500 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2"
                        />
                    </div>
                </>
            ) : option === 'hotel' ? (
                <>
                    <div className="mb-6">
                        <label className="mb-2 block font-medium text-gray-700">Địa điểm du lịch:</label>
                        <select
                            name="city"
                            value={filters.city}
                            onChange={handleChange}
                            className="focus:ring-blue-500 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2"
                        >
                            {dataLocations.map((data, index) => (
                                <option key={index} value={data.value}>
                                    {data.text}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="mb-2 block font-medium text-gray-700">Số người đi:</label>
                        <input
                            type="number"
                            placeholder="Nhập số người đi"
                            name="quantityPeople"
                            min={0}
                            className="w-full rounded-md border p-2 outline-none"
                            onChange={handleChangeQuantity}
                        />
                    </div>
                    <div>
                        <input
                            type="range"
                            name="priceChild"
                            min="0"
                            max="10000000"
                            step="500000"
                            value={filters.priceChild[0]}
                            onChange={handleChange}
                            className="focus:ring-blue-500 h-2 w-full rounded-lg bg-gray-200 focus:outline-none focus:ring-2"
                        />
                        <div className="mt-2 flex items-center justify-between">
                            <span className="text-sm text-gray-600">{filters.priceChild[0]?.toLocaleString()} VND</span>
                            <span className="text-sm text-gray-600">{(10000000).toLocaleString()} VND</span>
                        </div>
                    </div>
                </>
            ) : (
                <div>Lỗi hệ thống! Xin lỗi vì sự bất tiện này. Hãy thử lại sau nhé!</div>
            )}
        </div>
    );
};

export default Sidebar;
