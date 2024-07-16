import axios from 'axios';
import { CircleCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ModalContent, ModalActions, Button, Header, Icon, Modal, Select, Dimmer, Loader } from 'semantic-ui-react';
import { useTheme } from '../../../Layouts/ThemeProvider';
import FormatPrice from '../../../Components/FormatPrice';
import FormatDate from '../../../Components/FormatDate';
const countryOptions = [
    { key: 'cancelOrder1', value: 'Hết hàng', text: 'Hết hàng' },
    { key: 'cancelOrder2', value: 'Sai sót thông tin sản phẩm', text: 'Sai sót thông tin sản phẩm' },
    { key: 'cancelOrder3', value: 'Yêu cầu của khách hàng', text: 'Yêu cầu của khách hàng' },
    { key: 'cancelOrder4', value: 'Sản phẩm bị hỏng hoặc lỗi', text: 'Sản phẩm bị hỏng hoặc lỗi' },
    { key: 'cancelOrder5', value: 'cancelOrder5', text: 'Không thể liên lạc với khách hàng' },
    {
        key: 'cancelOrder6',
        value: 'Không nhận được tiền từ khách đã thanh toán',
        text: 'Quá trình thanh toán của khách bị lỗi phát sinh, cụ thể không nhận được tiền',
    },
];
function AdminOrderHotelDetailPage() {
    const { isReload, setiIsReload, url } = useTheme();
    useEffect(() => {
        document.title = `Chi tiết ${dataDetail.name}`;
    }, []);
    const location = useLocation();
    const { id } = useParams();
    const { dataDetail } = location.state;
    console.log('dataDetail', dataDetail);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [orderStatus, setOrderStatus] = useState(dataDetail.orderStatus);
    const [dataRoom, setDataRoom] = useState([]);
    const [dataProduct, setDataProduct] = useState([]);
    const [dataUser, setDataUser] = useState([]);
    const [dataFilter, setDataFilter] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [valueRassonStatus, setValueRassonStatus] = useState();
    const [showNotification, setShowNotification] = useState(false);
    const [showNotificationCancel, setShowNotificationCancel] = useState(false);

    const handleStatusChange = (event) => {
        setOrderStatus(event.target.value);
    };
    useEffect(() => {
        axios
            .get(`${url}/hotels`)
            .then((response) => {
                setDataProduct(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        console.log(dataProduct);
        axios
            .get(`${url}/users`)
            .then((response) => {
                setDataUser(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        axios
            .get(`${url}/rooms/${dataDetail.roomId}`)
            .then((response) => {
                setDataRoom(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        if (dataProduct.length > 0 && dataUser.length > 0 && dataRoom) {
            const filterHotel = dataProduct.find((product) => product.id === dataDetail.hotelId);
            const filterUser = dataUser.find((user) => user.id === dataDetail.userId);
            setDataFilter({
                hotel: filterHotel,
                hotelBooking: dataDetail,
                user: filterUser,
                room: dataRoom,
            });
            setIsLoading(true);
        }
    }, [dataProduct, dataUser, dataRoom]);
    console.log(dataFilter);
    useEffect(() => {
        if (isLoading) {
            console.log(dataFilter);
        }
    }, [isLoading]);

    function formatPrice(price) {
        return price.toLocaleString('de-DE') + 'đ';
    }
    const handleChangeCancel = (e, data) => {
        setValueRassonStatus(data.value);
    };
    const handleConfirmOrder = () => {
        axios
            .patch(`${url}/tourBookings/${dataDetail.id}`, {
                status: 'Confirmed',
            })
            .then((response) => {
                setShowNotification(true); // Hiển thị thông báo
                setTimeout(() => {
                    setShowNotification(false); // Ẩn thông báo sau 5 giây
                    setiIsReload(isReload + 1);
                    navigate('/theOrder');
                }, 800);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };
    const handleCancelOrder = () => {
        console.log(valueRassonStatus);
        setOpen(false);
        axios
            .patch(`${url}/tourBookings/${id}`, {
                orderStatus: 'Canceled',
                reasonStatus: valueRassonStatus,
            })
            .then((response) => {
                setShowNotificationCancel(true); // Hiển thị thông báo
                setTimeout(() => {
                    setShowNotificationCancel(false);
                    navigate(-1);
                }, 800);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };
    return (
        <div className="rounded-lg bg-white p-6">
            {isLoading ? (
                <>
                    <div className="flex items-center justify-between">
                        <h2 className="mb-6 text-3xl font-bold text-gray-800">Chi tiết đơn đặt phòng</h2>
                        {dataDetail.status === 'Confirmed' && (
                            // || dataDetail.orderStatus === 'Đã thanh toán'
                            <Modal
                                closeIcon
                                open={open}
                                trigger={<Button color="red">Hủy đơn hàng</Button>}
                                onClose={() => setOpen(false)}
                                onOpen={() => setOpen(true)}
                            >
                                <Header icon="archive" content="Bạn có chắc chắn muốn hủy đơn hàng này không?" />
                                <ModalContent>
                                    <p className="mb-2 text-xl">Lý do hủy đơn:</p>
                                    <Select
                                        placeholder="Select your country"
                                        options={countryOptions}
                                        className="w-full"
                                        onChange={handleChangeCancel}
                                    />
                                </ModalContent>
                                <ModalActions>
                                    <Button color="red" onClick={() => setOpen(false)}>
                                        <Icon name="remove" /> Không
                                    </Button>
                                    <Button color="green" onClick={handleCancelOrder}>
                                        <Icon name="checkmark" /> Có
                                    </Button>
                                </ModalActions>
                            </Modal>
                        )}
                    </div>
                    <div className="mb-6">
                        <div className="my-4 flex items-center justify-between">
                            <div className="w-1/2">
                                <strong className="mr-2 text-lg text-gray-700">Mã đơn hàng:</strong>
                                <span className="text-base text-gray-900">{dataFilter.hotelBooking.id}</span>
                            </div>
                            <div className="w-1/2">
                                <strong className="mr-2 text-lg text-gray-700">Tên khách hàng:</strong>
                                <span className="text-base text-gray-900">{dataDetail.name}</span>
                            </div>
                        </div>
                        <div className="my-4 flex items-center justify-between">
                            <div className="w-1/2">
                                <strong className="mr-2 text-lg text-gray-700">Địa chỉ khách hàng:</strong>
                                <span className="text-base text-gray-900">{dataDetail.address}</span>
                            </div>
                            <div className="w-1/2">
                                <strong className="mr-2 text-lg text-gray-700">Ngày đặt phòng:</strong>
                                <span className="text-base text-gray-900">
                                    {new Date(dataDetail.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                        <div className="my-4 flex items-center justify-between">
                            <div className="flex w-1/2">
                                <strong className="mr-2 text-lg text-gray-700">Ngày nhận phòng:</strong>
                                <span className="text-gray-900">
                                    <FormatDate date={dataDetail.checkInDate} size="base" />
                                </span>
                            </div>
                            <div className="flex w-1/2">
                                <strong className="mr-2 text-lg text-gray-700">Ngày trả phòng:</strong>
                                <span className="text-gray-900">
                                    <FormatDate date={dataDetail.checkOutDate} size="base" />
                                </span>
                            </div>
                        </div>

                        <div className="my-4 flex items-center justify-between">
                            <div className="w-1/2">
                                <strong className="mr-2 text-lg text-gray-700">Phương thức thanh toán:</strong>
                                <span className="text-base text-gray-900">{dataDetail.paymentMethod}</span>
                            </div>
                            <div className="w-1/2">
                                <strong className="mr-2 text-lg text-gray-700">Trang thái đơn hàng:</strong>
                                <span className="text-gray-900">
                                    {dataDetail.status === 'Confirmed'
                                        ? 'Đã thanh toán'
                                        : dataDetail.status === 'Canceled'
                                          ? 'Đã hủy đơn hàng'
                                          : null}
                                </span>
                            </div>
                        </div>
                        <div className="my-4">
                            <div className="flex w-1/2 items-center">
                                <strong className="mr-2 text-lg text-gray-700">Tổng giá trị đơn hàng:</strong>
                                <span className="text-gray-900">
                                    <FormatPrice price={dataDetail.totalPrice} totalprice size="base" />
                                </span>
                            </div>
                        </div>

                        <div className="my-4">
                            <div className="flex w-1/2 items-center">
                                <strong className="mr-2 text-lg text-gray-700">
                                    Số tiền đã thanh toán cho đơn hàng:
                                </strong>
                                <span className="text-gray-900">
                                    <FormatPrice price={dataDetail.preOrderPrice} totalprice />
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="my-10">
                        <p className="font-medium">Khách sạn:</p>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-200 bg-white">
                                <thead>
                                    <tr>
                                        <th className="border-b px-10 py-2 text-center">Tên khách sạn</th>
                                        {/* <th className="border-b px-10 py-2 text-center">Khách sạn</th> */}
                                        <th className="border-b px-4 py-2 text-center">Địa chỉ</th>
                                        <th className="border-b px-4 py-2 text-center">Giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border-b px-4 py-2 text-center text-gray-900">
                                            {dataFilter.hotel.name}
                                        </td>
                                        {/* <td className="flex items-center justify-center border-b px-4 py-2">
                                            <img
                                                src={dataFilter.hotel.images[0]}
                                                alt={dataFilter.hotel.name}
                                                className="mr-4 h-32 w-32 rounded-md object-cover"
                                            />
                                        </td> */}

                                        <td className="border-b px-4 py-2 text-center text-gray-900">
                                            {dataFilter.hotel.address}, {dataFilter.hotel.city}
                                        </td>
                                        <td className="border-b px-4 py-2 text-center text-gray-900">
                                            <FormatPrice price={dataFilter.hotel.pricePerNight} hotel />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="my-10">
                        <p className="font-medium">Phòng:</p>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-200 bg-white">
                                <thead>
                                    <tr>
                                        {/* <th className="border-b px-10 py-2 text-center">Phòng</th> */}
                                        <th className="border-b px-10 py-2 text-center">Tên phòng</th>
                                        <th className="border-b px-4 py-2 text-center">Loại phòng</th>
                                        <th className="border-b px-4 py-2 text-center">Số người tối đa</th>
                                        <th className="border-b px-4 py-2 text-center">Giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {/* <td className="flex items-center justify-center border-b px-4 py-2">
                                            <img
                                                src={dataFilter.room.image}
                                                alt={dataFilter.room.roomNumber}
                                                className="mr-4 h-32 w-32 rounded-md object-cover"
                                            />
                                        </td> */}
                                        <td className="border-b px-4 py-2 text-center text-gray-900">
                                            {dataFilter.room.roomNumber}
                                        </td>
                                        <td className="border-b px-4 py-2 text-center text-gray-900">
                                            {dataFilter.room.roomType}
                                        </td>
                                        <td className="border-b px-4 py-2 text-center text-gray-900">
                                            {dataFilter.room.maxGuests}
                                        </td>
                                        <td className="border-b px-4 py-2 text-center text-gray-900">
                                            <FormatPrice price={dataFilter.room.pricePerNight} hotel />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="mt-6 flex flex-col items-center">
                        <div className="mb-4">
                            <div className="mt-8 flex items-center justify-center">
                                <Button
                                    className="hover:bg-blueHover min-w-[320px] rounded bg-blueButton px-12 py-3 text-lg text-white focus:outline-none"
                                    onClick={handleConfirmOrder}
                                    disabled={dataDetail.status === 'Canceled' || dataDetail.status === 'Confirmed'}
                                >
                                    {dataDetail.status === 'Confirmed' ? 'Đã xác nhận' : 'Xác nhận đơn hàng'}
                                </Button>
                            </div>
                        </div>
                    </div>
                    {showNotification && (
                        <div className="border-green-500 animate-slide-in-right fixed right-4 top-4 rounded border-l-2 bg-white px-4 py-4 text-black shadow-2xl">
                            <div className="flex items-center justify-between gap-2 text-lg">
                                <CircleCheck style={{ color: '#68FD87' }} />
                                <p>Đơn hàng đã được gửi thành công!</p>
                            </div>
                        </div>
                    )}

                    {showNotificationCancel && (
                        <div className="border-green-500 animate-slide-in-right fixed right-4 top-4 rounded border-l-2 bg-white px-4 py-4 text-black shadow-2xl">
                            <div className="flex items-center justify-between gap-2 text-lg">
                                <CircleCheck style={{ color: '#68FD87' }} />
                                <p>Hủy đơn thành công!</p>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <Dimmer active inverted>
                    <Loader inverted content="Loading" />
                </Dimmer>
            )}
        </div>
    );
}

export default AdminOrderHotelDetailPage;
