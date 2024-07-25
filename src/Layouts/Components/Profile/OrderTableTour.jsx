import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Header, Icon, ModalActions } from 'semantic-ui-react';
import FormatPrice from '../../../Components/FormatPrice';
import FormatDate from '../../../Components/FormatDate';
import { ChevronLeft } from 'lucide-react';
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

const OrderTableTour = () => {
    const { darkMode, url } = useTheme();
    const [dataTourBooking, setDataTourBooking] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [dataTour, setDataTour] = useState();
    const [isDetails, setIsDetails] = useState(false);
    const [open, setOpen] = useState(false);

    const formatPrice = (price) => {
        if (!price) return;
        return price.toLocaleString('vi');
    };

    useEffect(() => {
        axios
            .get(`${url}/tourBookings`)
            .then((res) => {
                setDataTourBooking(res.data);
                setIsLoading(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (isDetails) {
            axios
                .get(`${url}/tours/${selectedOrder.tourId}`)
                .then((res) => {
                    setDataTour(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [isDetails]);
    const handleDetails = (order) => {
        setSelectedOrder(order);
        setIsDetails(true);
    };
    const handleBack = () => {
        setIsDetails(false);
        setSelectedOrder('');
    };
    const ItemInfor = ({ label, text }) => (
        <div className="flex w-full items-center gap-2">
            <p className="text-lg">{label}:</p>
            <>{text}</>
        </div>
    );
    return (
        <>
            {!isDetails ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="border px-1 py-2">STT</th>
                                <th className="border px-4 py-2">Tour ID</th>
                                <th className="border px-4 py-2">Tên tour</th>
                                <th className="border px-4 py-2">Tổng giá</th>
                                <th className="border px-4 py-2">Trạng thái</th>
                                <th className="border px-4 py-2">Chi tiết tour</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading && (
                                <>
                                    {dataTourBooking.map((order, index) => (
                                        <tr key={order.id}>
                                            <td className="border px-4 py-2 text-center">{index + 1}</td>
                                            <td className="border px-4 py-2 text-center">{order.tourId}</td>
                                            <td className="border px-4 py-2 text-center">{order.nameTour}</td>
                                            <td className="border px-4 py-2 text-center">
                                                {formatPrice(order.totalPrice)} VND
                                            </td>
                                            <td
                                                className={`border px-4 py-2 text-center ${getStatusClass(order.status)}`}
                                            >
                                                {order.status}
                                            </td>
                                            <td className="border px-4 py-2 text-center">
                                                <button
                                                    onClick={() => handleDetails(order)}
                                                    className="text-blue-500 hover:text-blue-700 px-2 py-1"
                                                >
                                                    Xem chi tiết
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <>
                    <div className="mb-4">
                        <button className="hover:text-blue-500 flex items-center py-2" onClick={handleBack}>
                            <ChevronLeft className="h-7 w-5" /> Quay lại
                        </button>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-2xl font-bold">Chi tiết Tour</p>
                        <Modal
                            closeIcon
                            open={open}
                            trigger={<Button color="red">Hủy tour</Button>}
                            onClose={() => setOpen(false)}
                            onOpen={() => setOpen(true)}
                        >
                            <Header icon="archive" content="Bạn có chắc chắn muốn hủy tour không?" />

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
                    <p className="my-4">Tên tour: {selectedOrder?.nameTour}</p>
                    {/* <div className="my-4 flex items-center">
                   <ItemInfor
                       label="Ngày nhận phòng"
                       text={<FormatDate date={selectedOrder.checkInDate} size="lg" />}
                   />
                   <ItemInfor
                       label="Ngày trả phòng"
                       text={<FormatDate date={selectedOrder.checkOutDate} size="lg" />}
                   />
               </div> */}
                    <div className="my-4 flex items-center">
                        <ItemInfor
                            label="Tổng tiền"
                            text={<FormatPrice price={selectedOrder?.totalPrice} totalprice size="lg" />}
                        />
                        <ItemInfor
                            label="Tiền đặt trước"
                            text={<FormatPrice price={selectedOrder?.preOrderPrice} totalprice size="lg" />}
                        />
                    </div>
                    <div className="my-4 flex items-center">
                        <ItemInfor
                            label="Hình thức thanh toán"
                            text={<p className="text-lg">{selectedOrder?.paymentmethod}</p>}
                        />
                        <ItemInfor
                            label="Trạng thái thanh toán"
                            text={
                                <p className="text-lg">
                                    {selectedOrder?.status === 'Confirm'
                                        ? 'Đã Xác Nhận'
                                        : selectedOrder?.status === 'Pending'
                                          ? 'Đang Chờ'
                                          : selectedOrder?.status === 'Cancel'
                                            ? 'Đã Hủy'
                                            : 'Đang cập nhật'}
                                </p>
                            }
                        />
                    </div>
                    <table className="min-w-full rounded-md border shadow">
                        <tbody className="divide-y">
                            <tr>
                                <td
                                    className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} w-1/4 whitespace-nowrap rounded-lg border-r border-gray-300 px-6 py-4 text-sm font-medium`}
                                >
                                    Hành trình
                                </td>
                                <td
                                    className={`${darkMode ? 'text-gray-400' : 'text-gray-900'} whitespace-nowrap rounded-lg px-6 py-4 text-sm`}
                                >
                                    {dataTour?.name}
                                </td>
                            </tr>
                            <tr>
                                <td
                                    className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} whitespace-nowrap rounded-lg border-r border-gray-300 px-6 py-4 text-sm font-medium`}
                                >
                                    Số ngày đi
                                </td>
                                <td
                                    className={`${darkMode ? 'text-gray-400' : 'text-gray-900'} whitespace-nowrap rounded-lg px-6 py-4 text-sm`}
                                >
                                    {dataTour?.duration} ngày
                                </td>
                            </tr>
                            <tr>
                                <td
                                    className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} whitespace-nowrap rounded-lg border-r border-gray-300 px-6 py-4 text-sm font-medium`}
                                >
                                    Ngày đi
                                </td>
                                <td
                                    className={`${darkMode ? 'text-gray-400' : 'text-gray-900'} whitespace-nowrap rounded-lg px-6 py-4 text-sm`}
                                >
                                    <FormatDate date={dataTour?.startDate} size="sm" />
                                </td>
                            </tr>
                            <tr>
                                <td
                                    className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} whitespace-nowrap rounded-lg border-r border-gray-300 px-6 py-4 text-sm font-medium`}
                                >
                                    Ngày về
                                </td>
                                <td
                                    className={`${darkMode ? 'text-gray-400' : 'text-gray-900'} whitespace-nowrap rounded-lg px-6 py-4 text-sm`}
                                >
                                    <FormatDate date={dataTour?.endDate} size="sm" />
                                </td>
                            </tr>
                            <tr>
                                <td
                                    className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} whitespace-nowrap rounded-lg border-r border-gray-300 px-6 py-4 text-sm font-medium`}
                                >
                                    Phương tiện
                                </td>
                                <td
                                    className={`${darkMode ? 'text-gray-400' : 'text-gray-900'} whitespace-nowrap rounded-lg px-6 py-4 text-sm`}
                                >
                                    {dataTour?.vehicle}
                                </td>
                            </tr>
                            <tr>
                                <td
                                    className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} whitespace-nowrap rounded-lg border-r border-gray-300 px-6 py-4 text-sm font-medium`}
                                >
                                    Số lượng người lớn
                                </td>
                                <td
                                    className={`${darkMode ? 'text-gray-400' : 'text-gray-900'} whitespace-nowrap rounded-lg px-6 py-4 text-sm`}
                                >
                                    {selectedOrder.quantityPeople.map((data) => data.quantityAdult)}
                                </td>
                            </tr>
                            <tr>
                                <td
                                    className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} whitespace-nowrap rounded-lg border-r border-gray-300 px-6 py-4 text-sm font-medium`}
                                >
                                    Số lượng trẻ em
                                </td>
                                <td
                                    className={`${darkMode ? 'text-gray-400' : 'text-gray-900'} whitespace-nowrap rounded-lg px-6 py-4 text-sm`}
                                >
                                    {selectedOrder.quantityPeople.map((data) => data.quantityChild)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {/* <div className="w-full">
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
               </div> */}
                </>
            )}
        </>
    );
};

export default OrderTableTour;
