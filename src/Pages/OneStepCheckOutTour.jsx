import { Link, useNavigate, useParams } from 'react-router-dom';
import { dataTour } from '../Components/data';
import { useEffect, useState } from 'react';
import InputField from '../Components/InputField';
import { Button } from 'semantic-ui-react';
import { useTheme } from '../Layouts/ThemeProvider';
import axios from 'axios';
import FormatDate from '../Components/FormatDate';
import FormatPrice from '../Components/FormatPrice';
function OneStepCheckOutTourPage() {
    const { darkMode, isUser, setOrderTranId, url } = useTheme();

    const navigate = useNavigate();

    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [dataDetail, setDataDetail] = useState();
    const [dataUser, setDataUser] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [quantityAdult, setQuantityAdult] = useState(1);
    const [quantityChild, setQuantityChild] = useState(0);
    const [note, setNote] = useState();
    const [selectedMethod, setSelectedMethod] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [preOrderPrice, setPreOrderPrice] = useState();
    const [city, setCity] = useState();
    const [appTransId, setAppTransId] = useState('');
    const [message, setMessage] = useState('');
    const handleChange = (setter) => (e) => {
        setter(e.target.value);
    };
    useEffect(() => {
        axios
            .get(`${url}/tours/${id}`)
            .then((res) => {
                // console.log(res.data);
                setDataDetail(res.data);
                setIsLoading(true);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(`${url}/users/${isUser}`)
            .then((res) => {
                // console.log(res.data);
                setDataUser(res.data);
                setIsLoading(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (dataUser) {
            setName(dataUser.fullName);
            setEmail(dataUser.email);
            setPhone(dataUser.phoneNumber);
            setAddress(dataUser.address);
        }
    }, [dataUser]);
    // const handleMethodChange = (event) => {
    //     setSelectedMethod(event.target.value);
    // };

    useEffect(() => {
        // console.log(quantityAdult);
        // console.log(dataDetail?.pricesAdult);
        let totalPrice = 0;
        if (isLoading) {
            if (quantityAdult) {
                totalPrice += dataDetail?.pricesAdult * quantityAdult;
            }
            if (quantityChild) {
                totalPrice += dataDetail?.priceChild * quantityChild;
            }
            setTotalPrice(totalPrice);
            setPreOrderPrice(totalPrice * 0.2);
        }
    }, [quantityAdult, quantityChild, isLoading]);

    const handleChangeQuantity = (event) => {
        const quantity = event.target.value;
        if (quantity > 0) {
            setQuantityAdult(quantity);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const location = dataDetail.city;

        console.log(isUser);
        const book = {
            userId: isUser,
            tourId: id,
            nameTour: dataDetail?.name,
            name,
            phone,
            address,
            quantityPeople: [
                {
                    quantityAdult,
                    pricesAdult: dataDetail?.pricesAdult,
                    quantityChild,
                    pricesChild: dataDetail?.priceChild,
                },
            ],
            totalPrice,
            preOrderPrice: preOrderPrice,
            note,
            status: 'Confirm',
            paymentmethod: selectedMethod,
        };
        console.log('book', book);

        if (selectedMethod === 'zalopay') {
            axios
                .post(`${url}/tourBookings`, book)
                .then((res) => {
                    console.log(res.data);
                    localStorage.setItem('bookId', res.data.id);
                    localStorage.setItem('type', 'tour');
                })
                .catch((err) => {
                    console.log(err);
                });

            const paymentPromise = axios
                .post(`${url}/payments/payment_zaloPay`, { amount: preOrderPrice, userId: isUser })
                .then((res) => {
                    console.log('paymentidsssss', res.data.app_trans_id);
                    localStorage.setItem('app_trans_id', res.data.app_trans_id);

                    setOrderTranId(res.data.app_trans_id);
                    return res.data;
                })
                .catch((error) => {
                    console.log(error);
                });

            paymentPromise
                .then((data) => {
                    console.log(data.order_url);
                    window.location.href = data.order_url;
                    axios
                        .post(`${url}/userLocations/locations/${isUser}`, {
                            location,
                        })
                        .then((response) => {
                            console.log(response);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((err) => {
                    console.error('Error:', err);
                });
        } else if (selectedMethod === 'momo') {
            console.log('momo');
        }
    };

    return (
        <div>
            <div className="container-tour">
                <div className="mx-auto flex h-[500px] max-w-[1200px] items-end justify-center">
                    <h3 className="text-5xl font-bold text-white">Đặt Tour</h3>
                </div>
            </div>
            <div className="mx-auto max-w-[1200px] py-10">
                {isLoading && (
                    <div>
                        <div>
                            <h3 className="text-4xl">{dataDetail.title}</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-20 py-5">
                            <div className="mt-4">
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
                                                {dataDetail?.name}
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
                                                {dataDetail?.duration} ngày
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
                                                <FormatDate date={dataDetail?.startDate} size="sm" />
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
                                                <FormatDate date={dataDetail?.endDate} size="sm" />
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
                                                {dataDetail?.vehicle}
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
                                                {dataDetail?.departureLocation}
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
                                                {dataDetail?.quantityTotalParticipate}
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
                                                {dataDetail?.quantityRegistered}
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
                                                <FormatPrice price={dataDetail?.pricesAdult} size="sm" />
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
                                                <FormatPrice price={dataDetail?.priceChild} size="sm" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <InputField
                                    required
                                    label="Tên"
                                    type="text"
                                    placeholder="Nhập tên"
                                    value={name}
                                    onChange={handleChange(setName)}
                                />
                                <InputField
                                    required
                                    label="Email"
                                    type="email"
                                    placeholder="Nhập Email của bạn"
                                    value={email}
                                    onChange={handleChange(setEmail)}
                                />
                                <InputField
                                    required
                                    label="Số điện thoại"
                                    type="text"
                                    placeholder="Nhập số điện thoại"
                                    value={phone}
                                    onChange={handleChange(setPhone)}
                                />
                                <InputField
                                    required
                                    label="Địa chỉ"
                                    type="text"
                                    placeholder="Nhập Địa chỉ"
                                    value={address}
                                    onChange={handleChange(setAddress)}
                                />
                                <InputField
                                    required
                                    min={1}
                                    label="Số người lớn"
                                    type="number"
                                    placeholder="Nhập Số người lớn"
                                    value={quantityAdult}
                                    // onChange={handleChange(setQuantityAdult)}
                                    onChange={handleChangeQuantity}
                                />
                                <InputField
                                    required
                                    min={0}
                                    label="Số trẻ em"
                                    type="number"
                                    placeholder="Nhập Số trẻ em"
                                    value={quantityChild}
                                    onChange={handleChange(setQuantityChild)}
                                />
                                <InputField
                                    label="Ghi chú"
                                    type="textarea"
                                    placeholder="Hãy note lại để chúng tôi có thể liên hệ hổ trợ bạn nhanh chóng"
                                    value={note}
                                    onChange={handleChange(setNote)}
                                />
                                <div className="space-y-4 py-3">
                                    <p className="text-lg font-bold">Phương thức thanh toán:</p>
                                    <div className="space-y-2">
                                        <div className="flex items-center border-b py-3">
                                            <input
                                                type="radio"
                                                id="momo"
                                                name="paymentMethod"
                                                value="momo"
                                                checked={selectedMethod === 'momo'}
                                                onChange={handleChange(setSelectedMethod)}
                                                className="text-blue-600 focus:ring-blue-500 h-4 w-4 border-gray-300"
                                            />
                                            <label htmlFor="momo" className="ml-2 flex items-center gap-2">
                                                <img
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnLbJykiUb4zn5ELjKsW4Dx87ajJDdm6t3yA&s"
                                                    alt=""
                                                    className="h-6 w-6"
                                                />
                                                <p>Momo</p>
                                            </label>
                                        </div>
                                        <div className="flex items-center border-b py-3">
                                            <input
                                                type="radio"
                                                id="zalopay"
                                                name="paymentMethod"
                                                value="zalopay"
                                                checked={selectedMethod === 'zalopay'}
                                                onChange={handleChange(setSelectedMethod)}
                                                className="text-green-600 focus:ring-green-500 h-4 w-4 border-gray-300"
                                            />
                                            <label htmlFor="zalopay" className="ml-2 flex items-center gap-2">
                                                <img
                                                    src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay.png"
                                                    alt=""
                                                    className="h-6 w-6"
                                                />
                                                <p>ZaloPay</p>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-3">
                                    <div className="flex items-center justify-between py-2">
                                        <p className="font-bold">Tổng tiền tạm tính: </p>
                                        <FormatPrice price={totalPrice} totalprice />
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <p className="font-bold">Tiền đặt cọc trước: </p>
                                        <FormatPrice price={preOrderPrice} totalprice />
                                    </div>
                                </div>
                                <div className="flex justify-between gap-4 pt-3">
                                    <Button
                                        onClick={handleSubmit}
                                        // to="/success"
                                        disabled={selectedMethod === undefined}
                                        className={`w-full rounded-md bg-blueButton py-4 text-center text-base font-bold text-white hover:opacity-70`}
                                    >
                                        Đặt Tour
                                    </Button>
                                    {message && (
                                        <div>
                                            <p>{message}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>{' '}
                    </div>
                )}
            </div>
        </div>
    );
}

export default OneStepCheckOutTourPage;
