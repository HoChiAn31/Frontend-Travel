import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../Layouts/ThemeProvider';
import { Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SelectRoomPage = () => {
    const { id } = useParams();
    const { setRoomSelect, setCheckInDate, setCheckOutDate, darkMode, setQuantityPeopleHotel, url } = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [dataRoom, setDataRoom] = useState([]);
    const [filterRoom, setFilterRoom] = useState([]);
    const navigate = useNavigate();

    const [selectedRooms, setSelectedRooms] = useState([]);
    const [filterType, setFilterType] = useState('');
    const [filterCapacity, setFilterCapacity] = useState('');
    const [checkInDates, setCheckInDates] = useState('');
    const [checkOutDates, setCheckOutDates] = useState('');
    const [triggerFilter, setTriggerFilter] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${url}/rooms/hotel/${id}`);
                setDataRoom(response.data);
                setIsLoading(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleRoomSelect = (roomId) => {
        if (selectedRooms.includes(roomId)) {
            setSelectedRooms(selectedRooms.filter((id) => id !== roomId));
        } else {
            setSelectedRooms([...selectedRooms, roomId]);
        }
    };

    useEffect(() => {
        if (triggerFilter) {
            const filterRooms = () => {
                let filteredRooms = dataRoom;

                if (filterType) {
                    filteredRooms = filteredRooms.filter((room) => room.roomType === filterType);
                }

                if (filterCapacity) {
                    filteredRooms = filteredRooms.filter((room) => room.maxGuests >= parseInt(filterCapacity));
                }

                if (checkInDates && checkOutDates) {
                    filteredRooms = filteredRooms.filter((room) => {
                        const bookedDatesForRoom = room.availabilitystatus || [];
                        for (
                            let date = new Date(checkInDates);
                            date <= new Date(checkOutDates);
                            date.setDate(date.getDate() + 1)
                        ) {
                            const dateString = date.toISOString().split('T')[0];
                            if (bookedDatesForRoom.includes(dateString)) return false;
                        }
                        return true;
                    });
                }

                setFilterRoom(filteredRooms);
                setTriggerFilter(false); // Reset trigger
            };

            filterRooms();
        }
    }, [triggerFilter, dataRoom, filterType, filterCapacity, checkInDates, checkOutDates]);

    const handleBookRooms = () => {
        if (selectedRooms.length > 0) {
            setRoomSelect(selectedRooms);

            setCheckInDate(checkInDates);
            setCheckOutDate(checkOutDates);
            setQuantityPeopleHotel(filterCapacity);
            navigate(`/oneStepCheckOutHotel/${id}`);
        }
    };

    const roomTypes = [...new Set(dataRoom.map((room) => room.roomType))];

    return (
        <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between pb-8">
                <h1 className="m-0 text-3xl font-bold">Danh sách phòng khách sạn {id}</h1>
                <button
                    className={`hover:bg-blue-600 focus:ring-blue-500 rounded-lg bg-blueButton px-8 py-3 text-white focus:outline-none focus:ring-2 focus:ring-opacity-50 ${selectedRooms.length === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                    onClick={handleBookRooms}
                    disabled={selectedRooms.length === 0}
                >
                    Đặt phòng ({selectedRooms.length})
                </button>
            </div>
            <div className="mb-5">
                <p className="text-xl">Hãy chọn giúp Travel các lựa chọn bên dưới nhé ^_^</p>
            </div>
            <div className="flex justify-between pb-8">
                <div className="flex items-center space-x-4">
                    <label htmlFor="roomType" className="font-medium">
                        Loại phòng:
                    </label>
                    <select
                        id="roomType"
                        name="roomType"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="focus:ring-blue-500 focus:border-blue-500 min-w-[120px] rounded-lg border border-gray-300 py-2 pr-4 text-black"
                    >
                        <option value="">Tất cả</option>
                        {roomTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center space-x-4">
                    <label htmlFor="roomCapacity" className="font-medium">
                        Sức chứa:
                    </label>
                    <select
                        id="roomCapacity"
                        name="roomCapacity"
                        value={filterCapacity}
                        onChange={(e) => setFilterCapacity(e.target.value)}
                        className="focus:ring-blue-500 focus:border-blue-500 min-w-[120px] rounded-lg border border-gray-300 py-2 pr-4 text-black"
                    >
                        <option value="">Tất cả</option>
                        <option value="2">2+</option>
                        <option value="4">4+</option>
                        <option value="6">6+</option>
                    </select>
                </div>
                <div className="flex items-center space-x-4">
                    <label htmlFor="checkInDates" className="font-medium">
                        Ngày nhận phòng:
                    </label>
                    <input
                        type="date"
                        id="checkInDates"
                        name="checkInDates"
                        value={checkInDates}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setCheckInDates(e.target.value)}
                        className="focus:ring-blue-500 focus:border-blue-500 rounded-lg border border-gray-300 px-4 py-2 text-black"
                    />
                </div>
                <div className="flex items-center space-x-4">
                    <label htmlFor="checkOutDates" className="font-medium">
                        Ngày trả phòng:
                    </label>
                    <input
                        type="date"
                        id="checkOutDates"
                        name="checkOutDates"
                        value={checkOutDates}
                        min={checkInDates}
                        onChange={(e) => setCheckOutDates(e.target.value)}
                        className="focus:ring-blue-500 focus:border-blue-500 rounded-lg border border-gray-300 px-4 py-2 text-black"
                    />
                </div>
                <Button
                    disabled={!checkInDates & !checkOutDates}
                    className="hover:bg-blue-600 focus:ring-blue-500 rounded-lg bg-blueButton px-8 py-3 text-white focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    onClick={() => setTriggerFilter(true)}
                >
                    Lọc
                </Button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Số phòng
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Loại phòng
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Sức chứa
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Giá
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Chọn phòng
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {isLoading ? (
                            <>
                                {filterRoom.length > 0 ? (
                                    filterRoom.map((room) => (
                                        <tr key={room.id}>
                                            <td
                                                className={`font-medium ${darkMode ? 'text-white' : 'text-black'} px-6 py-4 text-center text-sm`}
                                            >
                                                {room.roomNumber}
                                            </td>
                                            <td className="px-6 py-4 text-center text-sm">{room.roomType}</td>
                                            <td className="px-6 py-4 text-center text-sm">{room.maxGuests} khách</td>
                                            <td className="px-6 py-4 text-center text-sm">
                                                {room.pricePerNight} VNĐ/đêm
                                            </td>
                                            <td className="px-6 py-4 text-center text-sm">
                                                <input
                                                    type="checkbox"
                                                    id={`room-${room.id}`}
                                                    name={`room-${room.id}`}
                                                    checked={selectedRooms.includes(room.id)}
                                                    onChange={() => handleRoomSelect(room.id)}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="py-4 text-center">
                                            Không có phòng phù hợp với tiêu chí lọc
                                        </td>
                                    </tr>
                                )}
                            </>
                        ) : null}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SelectRoomPage;
