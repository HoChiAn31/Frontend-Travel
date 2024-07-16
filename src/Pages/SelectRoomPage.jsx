import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../Layouts/ThemeProvider';
import axios from 'axios';

export const SelectRoomPage = () => {
    const { id } = useParams();

    const { setRoomSelect, setCheckInDate, setCheckOutDate, darkMode, url } = useTheme();
    const [isLoading, setIsLoading] = useState([]);
    const [dataRoom, setDataRoom] = useState([]);
    const [filterRoom, setFilterRoom] = useState([]);
    useEffect(() => {
        axios.get(`${url}/rooms/hotel/0516ffc5-5a4c-4ff2-9105-6613ba7e7ca8`).then((res) => {
            setDataRoom(res.data);
            setIsLoading(true);
        });
    }, []);
    // Lấy danh sách các loại phòng duy nhất từ dataRoom
    const navigate = useNavigate();
    // Lấy danh sách các loại phòng duy nhất từ dataRoom
    const roomTypes = [...new Set(dataRoom.map((room) => room.roomType))];

    // State để lưu ID các phòng đã đặt
    const [selectedRooms, setSelectedRooms] = useState([]);

    // State cho bộ lọc
    const [filterType, setFilterType] = useState(''); // Loại phòng
    const [filterCapacity, setFilterCapacity] = useState(''); // Sức chứa

    // Lấy ngày hôm nay
    const today = new Date();

    // Tính toán ngày nhận phòng là ngày hôm nay + 3 ngày
    const checkInDate = new Date(today);
    checkInDate.setDate(today.getDate() + 3);
    const formattedCheckInDate = checkInDate.toISOString().slice(0, 10);

    // Tính toán ngày trả phòng là ngày nhận phòng + 3 ngày
    const checkOutDate = new Date(checkInDate);
    checkOutDate.setDate(checkInDate.getDate() + 3);
    const formattedCheckOutDate = checkOutDate.toISOString().slice(0, 10);

    // State cho ngày nhận phòng và ngày trả phòng
    const [checkInDates, setCheckInDates] = useState(formattedCheckInDate);
    const [checkOutDates, setCheckOutDates] = useState(formattedCheckOutDate);

    // Lọc danh sách các phòng theo id của khách sạn và các bộ lọc
    // console.log(filterType);
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];

        const filteredRooms = dataRoom.filter((room) => {
            // Lọc theo id khách sạn
            // if (room.hotelid !== id) return false;
            // Lọc theo loại phòng
            // if (filterType && room.roomType !== filterType) return false;
            if (filterType && room.roomType !== filterType) {
                console.log(1);
            }

            // Lọc theo sức chứa
            if (filterCapacity && room.maxGuests < parseInt(filterCapacity)) return false;

            // Kiểm tra ngày nhận phòng và ngày trả phòng
            if (checkInDates && checkOutDates) {
                if (checkOutDates <= checkInDates || checkInDates < today) return false;
            } else {
                return false; // Nếu không có ngày nhận phòng và ngày trả phòng, không hiển thị phòng
            }

            // Lọc theo ngày còn phòng
            const bookedDatesForRoom = room.bookedDates || [];
            for (let date = new Date(checkInDates); date <= new Date(checkOutDates); date.setDate(date.getDate() + 1)) {
                const dateString = date.toISOString().split('T')[0];
                if (bookedDatesForRoom.includes(dateString)) return false; // Phòng đã có ngày đặt
            }

            return true;
        });

        setFilterRoom(filteredRooms);
    }, [filterType, filterCapacity, checkInDates, checkOutDates]);

    // Hàm xử lý khi người dùng chọn một phòng
    const handleRoomSelect = (roomId) => {
        // Kiểm tra xem phòng đã được chọn hay chưa
        if (selectedRooms.includes(roomId)) {
            // Nếu đã chọn rồi thì bỏ chọn (remove từ danh sách)
            setSelectedRooms(selectedRooms.filter((id) => id !== roomId));
        } else {
            // Nếu chưa chọn thì thêm vào danh sách
            setSelectedRooms([...selectedRooms, roomId]);
        }
    };

    // Hàm xử lý khi người dùng nhấn nút Đặt phòng
    const handleBookRooms = () => {
        // Đưa ra thông báo hoặc xử lý logic khi đặt phòng ở đây (ví dụ: gửi yêu cầu đặt phòng tới backend)
        console.log('Đặt phòng cho các phòng có ID:', selectedRooms);
        console.log('Ngày nhận phòng:', checkInDates);
        console.log('Ngày trả phòng:', checkOutDates);
        if (selectedRooms.length > 0) {
            setRoomSelect(selectedRooms);
            setCheckInDate(checkInDates);
            setCheckOutDate(checkOutDates);
            navigate(`/oneStepCheckOutHotel/${id}`);
        }
    };

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
            <div className="flex justify-between pb-8">
                {/* Dropdown loại phòng */}
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
                {/* Dropdown sức chứa */}
                <div className="flex items-center justify-between space-x-4">
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
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                    </select>
                </div>
                {/* Ngày nhận phòng */}
                <div className="flex items-center space-x-4">
                    <label htmlFor="checkInDates" className="font-medium">
                        Ngày nhận phòng:
                    </label>
                    <input
                        type="date"
                        id="checkInDates"
                        name="checkInDates"
                        value={checkInDates}
                        min={new Date().toISOString().split('T')[0]} // Không cho phép chọn ngày trong quá khứ
                        onChange={(e) => setCheckInDates(e.target.value)}
                        className="focus:ring-blue-500 focus:border-blue-500 rounded-lg border border-gray-300 px-4 py-2 text-black"
                    />
                </div>
                {/* Ngày trả phòng */}
                <div className="flex items-center space-x-4">
                    <label htmlFor="checkOutDates" className="font-medium">
                        Ngày trả phòng:
                    </label>
                    <input
                        type="date"
                        id="checkOutDates"
                        name="checkOutDates"
                        value={checkOutDates}
                        min={checkInDates} // Ngày trả phòng phải lớn hơn ngày nhận phòng
                        onChange={(e) => setCheckOutDates(e.target.value)}
                        className="focus:ring-blue-500 focus:border-blue-500 rounded-lg border border-gray-300 px-4 py-2 text-black"
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="">
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
                                {filterRoom.length > 0
                                    ? filterRoom
                                    : dataRoom.map((room) => (
                                          <tr key={room.id}>
                                              <td className={`font-mediumdarkMode px-6 py-4 text-center text-sm`}>
                                                  {room.roomnumber}
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
                                      ))}
                            </>
                        ) : null}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
