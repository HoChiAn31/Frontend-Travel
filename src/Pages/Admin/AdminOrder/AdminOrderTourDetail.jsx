// import axios from 'axios';
// import { CircleCheck } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { ModalContent, ModalActions, Button, Header, Icon, Modal, Select, Dimmer, Loader } from 'semantic-ui-react';
// import { useTheme } from '../../../Layouts/ThemeProvider';
// import FormatPrice from '../../../Components/FormatPrice';
// const countryOptions = [
//     { key: 'cancelOrder1', value: 'Hết hàng', text: 'Hết hàng' },
//     { key: 'cancelOrder2', value: 'Sai sót thông tin sản phẩm', text: 'Sai sót thông tin sản phẩm' },
//     { key: 'cancelOrder3', value: 'Yêu cầu của khách hàng', text: 'Yêu cầu của khách hàng' },
//     { key: 'cancelOrder4', value: 'Sản phẩm bị hỏng hoặc lỗi', text: 'Sản phẩm bị hỏng hoặc lỗi' },
//     { key: 'cancelOrder5', value: 'cancelOrder5', text: 'Không thể liên lạc với khách hàng' },
//     {
//         key: 'cancelOrder6',
//         value: 'Không nhận được tiền từ khách đã thanh toán',
//         text: 'Quá trình thanh toán của khách bị lỗi phát sinh, cụ thể không nhận được tiền',
//     },
// ];
// function AdminOrderTourDetailPage() {
//     const { isReload, setiIsReload, url } = useTheme();
//     useEffect(() => {
//         document.title = 'Chi tiết đơn hàng';
//     }, []);
//     const location = useLocation();
//     const { dataDetail } = location.state;
//     // console.log(dataDetail);
//     const navigate = useNavigate();
//     const [open, setOpen] = useState(false);
//     const [orderStatus, setOrderStatus] = useState(dataDetail.orderStatus);
//     const [dataProduct, setDataProduct] = useState([]);
//     const [dataUser, setDataUser] = useState([]);
//     const [dataFilter, setDataFilter] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [valueRassonStatus, setValueRassonStatus] = useState();
//     const [showNotification, setShowNotification] = useState(false);
//     const [showNotificationCancel, setShowNotificationCancel] = useState(false);

//     const handleStatusChange = (event) => {
//         setOrderStatus(event.target.value);
//     };
//     useEffect(() => {
//         axios
//             .get(`${url}/tours`)
//             .then((response) => {
//                 setDataProduct(response.data);
//             })
//             .catch((error) => {
//                 console.error('Error fetching data:', error);
//             });
//         axios
//             .get(`${url}/users`)
//             .then((response) => {
//                 setDataUser(response.data);
//             })
//             .catch((error) => {
//                 console.error('Error fetching data:', error);
//             });
//     }, []);

//     useEffect(() => {
//         if (dataProduct.length > 0 && dataUser.length > 0) {
//             const filterTour = dataProduct.find((product) => product.id === dataDetail.tourId);
//             const filterUser = dataUser.find((user) => user.id === dataDetail.userId);

//             setDataFilter({
//                 tour: filterTour,
//                 tourBooking: dataDetail,
//                 user: filterUser,
//             });
//             setIsLoading(true);
//         }
//     }, [dataProduct, dataUser]);
//     console.log(dataFilter);
//     const handleConfirmOrder = () => {
//         axios
//             .patch(`${url}/tours/${dataDetail.id}`, {
//                 status: 'Confirmed',
//             })
//             .then((response) => {
//                 setShowNotification(true); // Hiển thị thông báo
//                 setTimeout(() => {
//                     setShowNotification(false); // Ẩn thông báo sau 5 giây
//                     setiIsReload(isReload + 1);
//                     navigate('/theOrder');
//                 }, 800);
//             })
//             .catch((error) => {
//                 console.error('Error fetching data:', error);
//             });
//     };
//     const handleChangeCancel = (e, data) => {
//         setValueRassonStatus(data.value);
//     };
//     const handleCancelOrder = () => {
//         console.log(valueRassonStatus);
//         setOpen(false);
//         axios
//             .patch(`${url}/tours/${dataDetail.id}`, {
//                 orderStatus: 'Canceled',
//                 reasonStatus: valueRassonStatus,
//             })
//             .then((response) => {
//                 setShowNotificationCancel(true); // Hiển thị thông báo
//                 setTimeout(() => {
//                     setShowNotificationCancel(false);
//                     navigate(-1);
//                 }, 800);
//             })
//             .catch((error) => {
//                 console.error('Error fetching data:', error);
//             });
//     };
//     return (
//         <div className="rounded-lg bg-white p-6">
//             {isLoading ? (
//                 <>
//                     <div className="flex items-center justify-between">
//                         <h2 className="mb-6 text-3xl font-bold text-gray-800">Chi tiết đơn hàng</h2>
//                         {dataDetail.status === 'Pending' ||
//                             (dataDetail.status === 'Confirmed' && (
//                                 <Modal
//                                     closeIcon
//                                     open={open}
//                                     trigger={<Button color="red">Hủy đơn hàng</Button>}
//                                     onClose={() => setOpen(false)}
//                                     onOpen={() => setOpen(true)}
//                                 >
//                                     <Header icon="archive" content="Bạn có chắc chắn muốn hủy đơn hàng này không?" />
//                                     <ModalContent>
//                                         <p className="mb-2 text-xl">Lý do hủy đơn:</p>
//                                         <Select
//                                             placeholder="Select your country"
//                                             options={countryOptions}
//                                             className="w-full"
//                                             onChange={handleChangeCancel}
//                                         />
//                                     </ModalContent>
//                                     <ModalActions>
//                                         <Button color="red" onClick={() => setOpen(false)}>
//                                             <Icon name="remove" /> Không
//                                         </Button>
//                                         <Button color="green" onClick={handleCancelOrder}>
//                                             <Icon name="checkmark" /> Có
//                                         </Button>
//                                     </ModalActions>
//                                 </Modal>
//                             ))}
//                     </div>
//                     <div className="mb-6">
//                         <div className="my-4 flex items-center justify-between">
//                             <div className="w-1/2">
//                                 <strong className="mr-2 text-lg text-gray-700">Mã đơn hàng:</strong>
//                                 <span className="text-gray-900">{dataFilter.tourBooking.id}</span>
//                             </div>
//                             <div className="w-1/2">
//                                 <strong className="mr-2 text-lg text-gray-700">Tên khách hàng:</strong>
//                                 <span className="text-gray-900">{dataDetail.name}</span>
//                             </div>
//                         </div>
//                         <div className="my-4 flex items-center justify-between">
//                             <div className="w-1/2">
//                                 <strong className="mr-2 text-lg text-gray-700">Địa chỉ nhận hàng:</strong>
//                                 <span className="text-gray-900">{dataDetail.address}</span>
//                             </div>
//                             <div className="w-1/2">
//                                 <strong className="mr-2 text-lg text-gray-700">Ngày đặt hàng:</strong>
//                                 <span className="text-gray-900">
//                                     {new Date(dataDetail.createdAt).toLocaleDateString()}
//                                 </span>
//                             </div>
//                         </div>
//                         <div className="my-4 flex items-center justify-between">
//                             <div className="w-1/2">
//                                 <strong className="mr-2 text-lg text-gray-700">Phương thức thanh toán:</strong>
//                                 <span className="text-gray-900">{dataDetail.paymentmethod}</span>
//                             </div>
//                             <div className="w-1/2">
//                                 <strong className="mr-2 text-lg text-gray-700">Trang thái đơn hàng:</strong>
//                                 <span className="text-gray-900">
//                                     {dataDetail.status === 'Confirmed'
//                                         ? 'Đã thanh toán'
//                                         : dataDetail.status === 'Canceled'
//                                           ? 'Đã hủy đơn hàng'
//                                           : null}
//                                 </span>
//                             </div>
//                         </div>
//                         <div className="my-4 flex items-center justify-between">
//                             <div className="w-1/2">
//                                 <strong className="mr-2 text-lg text-gray-700">Số người lớn:</strong>
//                                 <span className="text-gray-900">
//                                     {dataFilter?.tourBooking?.quantityPeople.map((data) => data.quantityAdult)}
//                                 </span>
//                             </div>
//                             <div className="w-1/2">
//                                 <strong className="mr-2 text-lg text-gray-700">Số trẻ em:</strong>
//                                 <span className="text-gray-900">
//                                     {dataFilter?.tourBooking?.quantityPeople.map((data) => data.quantityChild)}
//                                 </span>
//                             </div>
//                         </div>
//                         <div className="my-4">
//                             <div className="flex w-1/2">
//                                 <strong className="mr-2 text-lg text-gray-700">Tổng giá trị đơn hàng:</strong>
//                                 <span className="text-gray-900">
//                                     <FormatPrice price={dataDetail.totalPrice} totalprice />
//                                 </span>
//                             </div>
//                         </div>

//                         <div className="my-4">
//                             <div className="flex w-1/2">
//                                 <strong className="mr-2 text-lg text-gray-700">
//                                     Số tiền đã thanh toán cho đơn hàng:
//                                 </strong>
//                                 <span className="text-gray-900">
//                                     <FormatPrice price={dataDetail.preOrderPrice} totalprice />
//                                 </span>
//                             </div>
//                         </div>
//                     </div>
//                     <h3 className="mb-4 text-2xl font-semibold text-gray-800">Tour</h3>
//                     <div className="overflow-x-auto">
//                         <table className="min-w-full border border-gray-200 bg-white">
//                             <thead>
//                                 <tr>
//                                     <th className="border-b px-10 py-2 text-left">Sản phẩm</th>
//                                     <th className="border-b px-4 py-2 text-center">Địa chỉ</th>

//                                     <th className="border-b px-4 py-2 text-center">Giá</th>
//                                     {/* <th className="border-b px-4 py-2 text-center">Số lượng</th>
//                                     <th className="border-b px-4 py-2 text-center">Tổng tiền</th> */}
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr>
//                                     <td className="flex items-center border-b px-4 py-2">
//                                         <img
//                                             src={dataFilter.tour.image}
//                                             alt={dataFilter.tour.name}
//                                             className="mr-4 h-32 w-32 rounded-md object-cover"
//                                         />
//                                         <div>
//                                             <div className="font-semibold text-gray-900">{dataFilter.tour.name}</div>
//                                         </div>
//                                     </td>
//                                     <td className="border-b px-4 py-2 text-center text-gray-900">
//                                         {dataFilter.tour.city}
//                                     </td>
//                                     <td className="border-b px-4 py-2 text-center text-gray-900">
//                                         <FormatPrice price={dataFilter.tour.priceChild} />
//                                     </td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </div>
//                     <div className="mt-6 flex flex-col items-center">
//                         <div className="mb-4">
//                             <div className="mt-8 flex items-center justify-center">
//                                 <Button
//                                     className="hover:bg-blueHover min-w-[320px] rounded bg-blueButton px-12 py-3 text-lg text-white focus:outline-none"
//                                     onClick={handleConfirmOrder}
//                                     disabled={dataDetail.status === 'Canceled' || dataDetail.status === 'Confirmed'}
//                                 >
//                                     {dataDetail.status === 'Confirmed' ? 'Đã xác nhận' : 'Xác nhận đơn hàng'}
//                                 </Button>
//                             </div>
//                         </div>
//                     </div>
//                     {showNotification && (
//                         <div className="border-green-500 animate-slide-in-right fixed right-4 top-4 rounded border-l-2 bg-white px-4 py-4 text-black shadow-2xl">
//                             <div className="flex items-center justify-between gap-2 text-lg">
//                                 <CircleCheck style={{ color: '#68FD87' }} />
//                                 <p>Đơn hàng đã được gửi thành công!</p>
//                             </div>
//                         </div>
//                     )}

//                     {showNotificationCancel && (
//                         <div className="border-green-500 animate-slide-in-right fixed right-4 top-4 rounded border-l-2 bg-white px-4 py-4 text-black shadow-2xl">
//                             <div className="flex items-center justify-between gap-2 text-lg">
//                                 <CircleCheck style={{ color: '#68FD87' }} />
//                                 <p>Hủy đơn thành công!</p>
//                             </div>
//                         </div>
//                     )}
//                 </>
//             ) : (
//                 <Dimmer active inverted>
//                     <Loader inverted content="Loading" />
//                 </Dimmer>
//             )}
//         </div>
//     );
// }

// export default AdminOrderTourDetailPage;

import axios from 'axios';
import { CircleCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ModalContent, ModalActions, Button, Header, Icon, Modal, Select, Dimmer, Loader } from 'semantic-ui-react';
import { useTheme } from '../../../Layouts/ThemeProvider';
import FormatPrice from '../../../Components/FormatPrice';

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
    const { isReload, setIsReload, url } = useTheme();
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
                                    <FormatPrice price={dataDetail.totalPrice - dataDetail.debt} totalprice />
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
                    <h2 className="mb-6 text-3xl font-bold text-gray-800">Chi tiết đơn hàng</h2>
                    {dataFilter?.tour?.intro.map((data) => (
                        <div key={data.title} className="my-4">
                            <strong className="text-lg text-gray-700">{data.title}:</strong>
                            <div className="mt-2 text-gray-900" dangerouslySetInnerHTML={{ __html: data.detail }} />
                        </div>
                    ))}
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
