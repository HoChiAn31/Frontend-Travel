import axios from 'axios';
import { CircleCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ModalContent, ModalActions, Button, Header, Icon, Modal, Select, Dimmer, Loader } from 'semantic-ui-react';
import { useTheme } from '../../../Layouts/ThemeProvider';
import FormatPrice from '../../../Components/FormatPrice';
import FormatDate from '../../../Components/FormatDate';

const countryOptions = [
    { key: 'cancelOrder1', value: 'Hết hàng', text: 'Hết hàng' },
    { key: 'cancelOrder2', value: 'Sai sót thông tin sản phẩm', text: 'Sai sót thông tin sản phẩm' },
    { key: 'cancelOrder3', value: 'Yêu cầu của khách hàng', text: 'Yêu cầu của khách hàng' },
    { key: 'cancelOrder4', value: 'Sản phẩm bị hỏng hoặc lỗi', text: 'Sản phẩm bị hỏng hoặc lỗi' },
    { key: 'cancelOrder5', value: 'Không thể liên lạc với khách hàng', text: 'Không thể liên lạc với khách hàng' },
    {
        key: 'cancelOrder6',
        value: 'Không nhận được tiền từ khách đã thanh toán',
        text: 'Quá trình thanh toán của khách bị lỗi phát sinh, cụ thể không nhận được tiền',
    },
];

function AdminOrderTourDetailPage() {
    const { isReload, setIsReload, url, darkMode } = useTheme();
    useEffect(() => {
        document.title = 'Chi tiết đơn hàng';
    }, []);

    const location = useLocation();
    const { dataDetail } = location.state;
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [orderStatus, setOrderStatus] = useState(dataDetail.orderStatus);
    const [dataProduct, setDataProduct] = useState([]);
    const [dataUser, setDataUser] = useState([]);
    const [dataFilter, setDataFilter] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [valueRassonStatus, setValueRassonStatus] = useState();
    const [showNotification, setShowNotification] = useState(false);
    const [showNotificationCancel, setShowNotificationCancel] = useState(false);

    useEffect(() => {
        axios
            .get(`${url}/tours`)
            .then((response) => {
                setDataProduct(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        axios
            .get(`${url}/users`)
            .then((response) => {
                setDataUser(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [url]);

    useEffect(() => {
        if (dataProduct.length > 0 && dataUser.length > 0) {
            const filterTour = dataProduct.find((product) => product.id === dataDetail.tourId);
            const filterUser = dataUser.find((user) => user.id === dataDetail.userId);

            setDataFilter({
                tour: filterTour,
                tourBooking: dataDetail,
                user: filterUser,
            });
            setIsLoading(true);
        }
    }, [dataProduct, dataUser, dataDetail]);
    const handleConfirmOrder = () => {
        axios
            .patch(`${url}/tours/${dataDetail.id}`, { status: 'Confirmed' })
            .then(() => {
                setShowNotification(true);
                setTimeout(() => {
                    setShowNotification(false);
                    setIsReload(isReload + 1);
                    navigate('/theOrder');
                }, 800);
            })
            .catch((error) => {
                console.error('Error updating order:', error);
            });
    };

    const handleChangeCancel = (e, data) => {
        setValueRassonStatus(data.value);
    };

    const handleCancelOrder = () => {
        setOpen(false);
        axios
            .patch(`${url}/tours/${dataDetail.id}`, {
                orderStatus: 'Canceled',
                reasonStatus: valueRassonStatus,
            })
            .then(() => {
                setShowNotificationCancel(true);
                setTimeout(() => {
                    setShowNotificationCancel(false);
                    navigate(-1);
                }, 800);
            })
            .catch((error) => {
                console.error('Error canceling order:', error);
            });
    };

    return (
        <div className="rounded-lg bg-white p-6">
            {isLoading ? (
                <>
                    <div className="flex items-center justify-between">
                        <h2 className="mb-6 text-3xl font-bold text-gray-800">Chi tiết đơn hàng</h2>
                        {(dataDetail.status === 'Pending' || dataDetail.status === 'Confirmed') && (
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
                                <span className="text-gray-900">{dataFilter.tourBooking.id}</span>
                            </div>
                            <div className="w-1/2">
                                <strong className="mr-2 text-lg text-gray-700">Tên khách hàng:</strong>
                                <span className="text-gray-900">{dataDetail.name}</span>
                            </div>
                        </div>
                        <div className="my-4 flex items-center justify-between">
                            <div className="w-1/2">
                                <strong className="mr-2 text-lg text-gray-700">Địa chỉ nhận hàng:</strong>
                                <span className="text-gray-900">{dataDetail.address}</span>
                            </div>
                            <div className="w-1/2">
                                <strong className="mr-2 text-lg text-gray-700">Ngày đặt hàng:</strong>
                                <span className="text-gray-900">
                                    {new Date(dataDetail.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                        <div className="my-4 flex items-center justify-between">
                            <div className="w-1/2">
                                <strong className="mr-2 text-lg text-gray-700">Phương thức thanh toán:</strong>
                                <span className="text-gray-900">{dataDetail.paymentmethod}</span>
                            </div>
                            <div className="w-1/2">
                                <strong className="mr-2 text-lg text-gray-700">Trạng thái đơn hàng:</strong>
                                <span className="text-gray-900">
                                    {dataDetail.status === 'Confirmed'
                                        ? 'Đã thanh toán'
                                        : dataDetail.status === 'Canceled'
                                          ? 'Đã hủy đơn hàng'
                                          : null}
                                </span>
                            </div>
                        </div>
                        <div className="my-4 flex items-center justify-between">
                            <div className="w-1/2">
                                <strong className="mr-2 text-lg text-gray-700">Số người lớn:</strong>
                                <span className="text-gray-900">
                                    {dataFilter?.tourBooking?.quantityPeople.map((data) => data.quantityAdult)}
                                </span>
                            </div>
                            <div className="w-1/2">
                                <strong className="mr-2 text-lg text-gray-700">Số trẻ em:</strong>
                                <span className="text-gray-900">
                                    {dataFilter?.tourBooking?.quantityPeople.map((data) => data.quantityChild)}
                                </span>
                            </div>
                        </div>
                        <div className="my-4">
                            <div className="flex w-1/2">
                                <strong className="mr-2 text-lg text-gray-700">Tổng giá trị đơn hàng:</strong>
                                <span className="text-gray-900">
                                    <FormatPrice price={dataDetail.totalPrice} totalprice />
                                </span>
                            </div>
                        </div>
                        <div className="my-4">
                            <div className="flex w-1/2">
                                <strong className="mr-2 text-lg text-gray-700">
                                    Số tiền đã thanh toán cho đơn hàng:
                                </strong>
                                <span className="text-gray-900">
                                    <FormatPrice price={dataDetail.preOrderPrice} totalprice />
                                </span>
                            </div>
                        </div>
                        {dataDetail.debt > 0 && (
                            <div className="my-4">
                                <div className="flex w-1/2">
                                    <strong className="mr-2 text-lg text-gray-700">Số tiền còn nợ:</strong>
                                    <span className="text-red-600">
                                        <FormatPrice price={dataDetail.debt} totalprice />
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                    {dataFilter && (
                        <div className="mt-4">
                            <p className="text-xl font-bold">Chi tiết tour:</p>
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
                                            {dataFilter.tour?.name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} whitespace-nowrap rounded-lg border-r border-gray-300 px-6 py-4 text-sm font-medium`}
                                        >
                                            Lịch trình
                                        </td>
                                        <td
                                            className={`${darkMode ? 'text-gray-400' : 'text-gray-900'} whitespace-nowrap rounded-lg px-6 py-4 text-sm`}
                                        >
                                            {dataFilter.tour?.duration} ngày
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
                                            <FormatDate date={dataFilter.tour?.startDate} size="sm" />
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
                                            <FormatDate date={dataFilter.tour?.endDate} size="sm" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} whitespace-nowrap rounded-lg border-r border-gray-300 px-6 py-4 text-sm font-medium`}
                                        >
                                            Vận chuyển
                                        </td>
                                        <td
                                            className={`${darkMode ? 'text-gray-400' : 'text-gray-900'} whitespace-nowrap rounded-lg px-6 py-4 text-sm`}
                                        >
                                            {dataFilter.tour?.vehicle}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} whitespace-nowrap rounded-lg border-r border-gray-300 px-6 py-4 text-sm font-medium`}
                                        >
                                            Điểm xuất phát
                                        </td>
                                        <td
                                            className={`${darkMode ? 'text-gray-400' : 'text-gray-900'} whitespace-nowrap rounded-lg px-6 py-4 text-sm`}
                                        >
                                            {dataFilter.tour?.departureLocation}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} whitespace-nowrap rounded-lg border-r border-gray-300 px-6 py-4 text-sm font-medium`}
                                        >
                                            Số người tham gia
                                        </td>
                                        <td
                                            className={`${darkMode ? 'text-gray-400' : 'text-gray-900'} whitespace-nowrap rounded-lg px-6 py-4 text-sm`}
                                        >
                                            {dataFilter.tour?.quantityTotalParticipate}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} whitespace-nowrap rounded-lg border-r border-gray-300 px-6 py-4 text-sm font-medium`}
                                        >
                                            Đã đăng ký
                                        </td>
                                        <td
                                            className={`${darkMode ? 'text-gray-400' : 'text-gray-900'} whitespace-nowrap rounded-lg px-6 py-4 text-sm`}
                                        >
                                            {dataFilter.tour?.quantityRegistered}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} whitespace-nowrap rounded-lg border-r border-gray-300 px-6 py-4 text-sm font-medium`}
                                        >
                                            Giá người lớn
                                        </td>
                                        <td
                                            className={`${darkMode ? 'text-gray-400' : 'text-gray-900'} whitespace-nowrap rounded-lg px-6 py-4 text-sm`}
                                        >
                                            <FormatPrice price={dataFilter.tour?.pricesAdult} size="sm" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} whitespace-nowrap rounded-lg border-r border-gray-300 px-6 py-4 text-sm font-medium`}
                                        >
                                            Giá trẻ em
                                        </td>
                                        <td
                                            className={`${darkMode ? 'text-gray-400' : 'text-gray-900'} whitespace-nowrap rounded-lg px-6 py-4 text-sm`}
                                        >
                                            <FormatPrice price={dataFilter.tour?.priceChild} size="sm" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                    {dataDetail.status === 'Pending' && (
                        <div className="flex justify-center">
                            <Button color="blue" onClick={handleConfirmOrder}>
                                Xác nhận đơn hàng
                            </Button>
                        </div>
                    )}
                    {showNotification && (
                        <div className="fixed inset-x-0 bottom-0 flex items-center justify-center">
                            <div className="notification bg-green-100 border-green-500 text-green-700 border-b border-t px-4 py-3">
                                <span className="flex items-center">
                                    <CircleCheck className="mr-2" />
                                    Đơn hàng đã được xác nhận.
                                </span>
                            </div>
                        </div>
                    )}
                    {showNotificationCancel && (
                        <div className="fixed inset-x-0 bottom-0 flex items-center justify-center">
                            <div className="notification bg-red-100 border-red-500 text-red-700 border-b border-t px-4 py-3">
                                <span className="flex items-center">
                                    <CircleCheck className="mr-2" />
                                    Đơn hàng đã được hủy.
                                </span>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <Dimmer active inverted>
                    <Loader inverted>Loading...</Loader>
                </Dimmer>
            )}
        </div>
    );
}

export default AdminOrderTourDetailPage;
