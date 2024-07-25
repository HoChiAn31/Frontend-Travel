import { ChevronLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FormatDate from '../../../Components/FormatDate';
import FormatPrice from '../../../Components/FormatPrice';
import { Button, ModalContent, ModalActions, Header, Icon, Modal } from 'semantic-ui-react';
import axios from 'axios';
import { useTheme } from '../../ThemeProvider';
const getStatusClass = (status) => {
    switch (status) {
        case 'Đã thanh toán':
            return 'text-green-500';
        case 'Đang xử lý':
            return 'text-yellow-800';
        case 'Đã hủy':
            return 'text-red-500';
        default:
            return '';
    }
};

const HotelTable = ({ hotels }) => {
    const { url, darkMode } = useTheme();
    const formatPrice = (price) => {
        if (!price) return;
        return price.toLocaleString('vi');
    };
    const [open, setOpen] = useState(false);
    const [isDetail, setIsDetail] = useState(false);
    const [idDetail, setIdDetail] = useState();
    const [dataDetail, setDataDetail] = useState([]);
    const [dataRoom, setDataRoom] = useState([]);
    const [filterRoom, setFilterRoom] = useState([]);
    useEffect(() => {
        axios
            .get(`${url}/rooms`)
            .then((res) => setDataRoom(res.data))
            .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        if (dataRoom.length > 0 && dataDetail.roomId?.length > 0) {
            const filteredRooms = dataRoom
                .filter((room) => dataDetail.roomId.includes(room.id))
                .map((room) => ({
                    id: room.id,
                    roomNumber: room.roomNumber,
                    pricePerNight: room.pricePerNight,
                    roomType: room.roomType,
                }));
            setFilterRoom(filteredRooms);
        }
    }, [dataRoom, dataDetail]);
    const handleDetails = (e) => {
        setDataDetail(e);
        setIdDetail(e);
        setIsDetail(true);
    };
    const handleBack = () => {
        setIsDetail(false);
        setDataDetail('');
    };
    const ItemInfor = ({ label, text }) => (
        <div className="flex w-full items-center gap-2">
            <p className="text-lg">{label}:</p>
            <>{text}</>
        </div>
    );
    return (
        <>
            {!isDetail ? (
                <>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="border px-1 py-2">STT</th>
                                    <th className="border px-4 py-2">Hotel ID</th>
                                    <th className="border px-4 py-2">Tên khách sạn</th>

                                    <th className="border px-4 py-2">Tổng giá</th>
                                    <th className="border px-4 py-2">Trạng thái</th>
                                    <th className="border px-4 py-2">Chi tiết phòng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hotels.map((hotel, index) => (
                                    <tr key={hotel.id}>
                                        <td className="border px-4 py-2 text-center">{index + 1}</td>
                                        <td className="border px-4 py-2 text-center">{hotel.hotelId}</td>
                                        <td className="border px-4 py-2 text-center">{hotel.hotelName}</td>

                                        <td className="border px-4 py-2 text-center">
                                            {formatPrice(hotel.totalPrice)} VND
                                        </td>
                                        <td className={`border px-4 py-2 text-center ${getStatusClass(hotel.status)}`}>
                                            {hotel.status}
                                        </td>
                                        <td className="border px-4 py-2 text-center">
                                            <button
                                                // to={`/orderHotelDetail/${hotel.id}`}
                                                onClick={() => handleDetails(hotel)}
                                                className="text-blue-500 hover:text-blue-700 px-2 py-1"
                                            >
                                                Xem chi tiết
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <>
                    <div className="mb-4">
                        <button className="hover:text-blue-500 flex items-center py-2" onClick={handleBack}>
                            <ChevronLeft className="h-7 w-5" /> Quay lại
                        </button>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-2xl font-bold">Chi tiết phòng</p>
                        <Modal
                            closeIcon
                            open={open}
                            trigger={<Button color="red">Hủy phòng</Button>}
                            onClose={() => setOpen(false)}
                            onOpen={() => setOpen(true)}
                        >
                            <Header icon="archive" content="Bạn có chắc chắn muốn hủy phòng không?" />

                            <ModalActions>
                                <Button color="red" onClick={() => setOpen(false)}>
                                    <Icon name="remove" /> No
                                </Button>
                                <Button color="green" onClick={() => setOpen(false)}>
                                    <Icon name="checkmark" /> Yes
                                </Button>
                            </ModalActions>
                        </Modal>
                    </div>
                    <p className="my-4">Tên khách sạn: {dataDetail.hotelName}</p>
                    <div className="my-4 flex items-center">
                        <ItemInfor
                            label="Ngày nhận phòng"
                            text={<FormatDate date={dataDetail.checkInDate} size="lg" />}
                        />
                        <ItemInfor
                            label="Ngày trả phòng"
                            text={<FormatDate date={dataDetail.checkOutDate} size="lg" />}
                        />
                    </div>
                    <div className="my-4 flex items-center">
                        <ItemInfor
                            label="Tổng tiền"
                            text={<FormatPrice price={dataDetail.totalPrice} totalprice size="lg" />}
                        />
                        <ItemInfor
                            label="Tiền đặt trước"
                            text={<FormatPrice price={dataDetail.preOrderPrice} totalprice size="lg" />}
                        />
                    </div>
                    <div className="my-4 flex items-center">
                        <ItemInfor
                            label="Hình thức thanh toán"
                            text={<p className="text-lg">{dataDetail.paymentMethod}</p>}
                        />
                        <ItemInfor
                            label="Trạng thái thanh toán"
                            text={
                                <p className="text-lg">
                                    {dataDetail.status === 'Confirm'
                                        ? 'Đã Xác Nhận'
                                        : dataDetail.status === 'Pending'
                                          ? 'Đang Chờ'
                                          : dataDetail.status === 'Cancel'
                                            ? 'Đã Hủy'
                                            : 'Đang cập nhật'}
                                </p>
                            }
                        />
                    </div>
                    <div className="w-full">
                        <table className="min-w-full rounded-md border shadow">
                            <thead>
                                <tr>
                                    <th
                                        className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} whitespace-nowrap border-b border-r border-gray-300 px-6 py-4 text-sm font-medium`}
                                    >
                                        Số phòng
                                    </th>
                                    <th
                                        className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} whitespace-nowrap border-b border-r border-gray-300 px-6 py-4 text-sm font-medium`}
                                    >
                                        Loại phòng
                                    </th>
                                    <th
                                        className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} whitespace-nowrap border-b border-r border-gray-300 px-6 py-4 text-sm font-medium`}
                                    >
                                        Giá phòng
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {filterRoom?.map((data) => (
                                    <tr key={data.roomNumber}>
                                        <td
                                            className={`${darkMode ? 'text-gray-400' : 'text-gray-900'} whitespace-nowrap border-r px-6 py-4 text-sm`}
                                        >
                                            {data.roomNumber}
                                        </td>
                                        <td
                                            className={`${darkMode ? 'text-gray-400' : 'text-gray-900'} whitespace-nowrap border-r px-6 py-4 text-sm`}
                                        >
                                            {data.roomType === 'Standard'
                                                ? 'Phòng Tiêu Chuẩn'
                                                : data.roomType === 'Deluxe'
                                                  ? 'Phòng Cao Cấp'
                                                  : data.roomType === 'Suite'
                                                    ? 'Phòng Hạng Sang'
                                                    : 'Đang cập nhật'}
                                        </td>
                                        <td
                                            className={`${darkMode ? 'text-gray-400' : 'text-gray-900'} whitespace-nowrap border-r px-6 py-4 text-sm`}
                                        >
                                            <FormatPrice price={data.pricePerNight} size="sm" hotel />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </>
    );
};

export default HotelTable;
