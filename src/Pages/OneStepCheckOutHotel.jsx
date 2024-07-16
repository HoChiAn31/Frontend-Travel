import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import InputField from '../Components/InputField';
import { Button } from 'semantic-ui-react';
import { useTheme } from '../Layouts/ThemeProvider';
import axios from 'axios';
import FormatDate from '../Components/FormatDate';
import FormatPrice from '../Components/FormatPrice';
function OneStepCheckOutHotelPage() {
    const { darkMode, isUser, roomSelect, checkInDate, checkOutDate, quantityPeopleHotel, setOrderTranId, url } =
        useTheme();

    const { id } = useParams();
    // console.log('roomSelect', roomSelect);
    // console.log('checkInDate', checkInDate);
    // console.log('checkOutDate', checkOutDate);
    // const [roomSelects, setRoomSelects] = useState([]);
    const [dataRoom, setDataRoom] = useState([]);
    const [dataRoomss, setDataRoomss] = useState();
    const [dataHotel, setDataHotel] = useState();
    const [filter, setFilter] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [dataUser, setDataUser] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [note, setNote] = useState();
    const [selectedMethod, setSelectedMethod] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [preOrderPrice, setPreOrderPrice] = useState();

    // useEffect(() => {
    //     setRoomSelects(roomSelect);
    // }, []);
    const handleChange = (setter) => (e) => {
        setter(e.target.value);
    };
    useEffect(() => {
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
        axios
            .get(`${url}/hotels/${id}`)
            .then((res) => {
                console.log(res.data);
                setDataHotel(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(`${url}/rooms/hotel/${id}`)
            .then((res) => {
                setDataRoom(res.data);
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
    useEffect(() => {
        let totalPrice = 0;
        filter.map((data) => {
            totalPrice += data.pricePerNight;
        });
        setTotalPrice(totalPrice);
        setPreOrderPrice(totalPrice * 0.2);
    }, [filter]);
    useEffect(() => {
        if (dataRoom) {
            const newFilter = dataRoom.filter((data) => {
                return roomSelect.some((room) => room === data.id);
            });
            console.log('newFilter', newFilter);
            setFilter(newFilter);
            setIsLoading(true);
        }
    }, [dataRoom, roomSelect]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const book = {
            userId: isUser,
            hotelId: id,
            roomId: roomSelect,
            name,
            phone,
            address,
            checkInDate,
            checkOutDate,
            totalPrice,
            preOrderPrice,
            note,
            status: 'Confirm',
            paymentMethod: selectedMethod,
        };
        console.log('book', book);

        if (selectedMethod === 'zaloPay') {
            axios
                .post(`${url}/hotelBookings`, book)
                .then((res) => {
                    console.log(res.data);
                    localStorage.setItem('bookId', res.data.id);
                    localStorage.setItem('type', 'hotel');
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
                        .post(`${url}/userHotels/${isUser}`, {
                            city: dataHotel?.city,
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
                    <h3 className="text-5xl font-bold text-white">Đặt Phòng</h3>
                </div>
            </div>
            <div className="mx-auto max-w-[1200px] py-10">
                {isLoading && (
                    <div>
                        <div>{/* <h3 className="text-4xl">{dataRoomss.title}</h3> */}</div>
                        <div className="grid grid-cols-2 gap-20 py-5">
                            <div className="mt-4">
                                <table className="min-w-full rounded-md border shadow">
                                    <tbody className="divide-y">
                                        <tr>
                                            <td
                                                className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} w-1/4 whitespace-nowrap rounded-lg border-r border-gray-300 px-6 py-4 text-sm font-medium`}
                                            >
                                                Khách sạn
                                            </td>
                                            <td
                                                className={`${darkMode ? 'text-gray-400' : 'text-gray-900'} whitespace-nowrap rounded-lg px-6 py-4 text-sm`}
                                            >
                                                {dataHotel?.name}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td
                                                className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} whitespace-nowrap rounded-lg border-r border-gray-300 px-6 py-4 text-sm font-medium`}
                                            >
                                                Ngày nhận phòng
                                            </td>
                                            <td
                                                className={`${darkMode ? 'text-gray-400' : 'text-gray-900'} whitespace-nowrap rounded-lg px-6 py-4 text-sm`}
                                            >
                                                <FormatDate date={checkInDate} size="sm" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} whitespace-nowrap rounded-lg border-r border-gray-300 px-6 py-4 text-sm font-medium`}
                                            >
                                                Ngày trả phòng
                                            </td>
                                            <td
                                                className={`${darkMode ? 'text-gray-400' : 'text-gray-900'} whitespace-nowrap rounded-lg px-6 py-4 text-sm`}
                                            >
                                                <FormatDate date={checkOutDate} size="sm" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} whitespace-nowrap rounded-lg border-r border-gray-300 px-6 py-4 text-sm font-medium`}
                                            >
                                                Số lượng
                                            </td>
                                            <td
                                                className={`${darkMode ? 'text-gray-400' : 'text-gray-900'} whitespace-nowrap rounded-lg px-6 py-4 text-sm`}
                                            >
                                                {quantityPeopleHotel}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td
                                                className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} whitespace-nowrap rounded-lg border-r border-gray-300 px-6 py-4 text-sm font-medium`}
                                            >
                                                Giá phòng
                                            </td>
                                            <td
                                                className={`${darkMode ? 'text-gray-400' : 'text-gray-900'} whitespace-nowrap rounded-lg px-6 py-4 text-sm`}
                                            >
                                                <FormatPrice price={dataHotel?.pricePerNight} size="sm" hotel />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p className="mt-6">Các phòng đã đặt:</p>
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
                                        {filter.map((data) => (
                                            <tr key={data.roomNumber}>
                                                <td
                                                    className={`${darkMode ? 'text-gray-400' : 'text-gray-900'} whitespace-nowrap border-r px-6 py-4 text-sm`}
                                                >
                                                    {data.roomNumber}
                                                </td>
                                                <td
                                                    className={`${darkMode ? 'text-gray-400' : 'text-gray-900'} whitespace-nowrap border-r px-6 py-4 text-sm`}
                                                >
                                                    {data.roomType}
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
                                                id="zaloPay"
                                                name="paymentMethod"
                                                value="zaloPay"
                                                checked={selectedMethod === 'zaloPay'}
                                                onChange={handleChange(setSelectedMethod)}
                                                className="text-green-600 focus:ring-green-500 h-4 w-4 border-gray-300"
                                            />
                                            <label htmlFor="zaloPay" className="ml-2 flex items-center gap-2">
                                                <img
                                                    src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-zaloPay.png"
                                                    alt=""
                                                    className="h-6 w-6"
                                                />
                                                <p>zaloPay</p>
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
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OneStepCheckOutHotelPage;
