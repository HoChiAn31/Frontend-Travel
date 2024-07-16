import { useEffect, useState } from 'react';
import HotelTable from './OrderTableHotel';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../ThemeProvider';
import axios from 'axios';
import { Button } from 'semantic-ui-react';

function OrderHotel() {
    const { isLogin, isUser, isCheckAccount, setPathRequired, url } = useTheme();
    const navigate = useNavigate();

    const [dataHotel, setDataHotel] = useState([]);
    const [dataBookHotel, setDataBookHotel] = useState([]);
    const [dataRoomHotel, setDataRoomHotel] = useState([]);
    const [dataFilter, setDataFilter] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [dataRoomOrder, setDataRoomOrder] = useState([]);
    useEffect(() => {
        axios
            .get(`${url}/hotels`)
            .then((res) => {
                setDataHotel(res.data);
                setIsLoading(true);
            })
            .catch((err) => console.log(err));
        axios
            .get(`${url}/hotelBookings/userId/${isUser}`)
            .then((res) => {
                setDataBookHotel(res.data);
                setIsLoading(true);
            })
            .catch((err) => console.log(err));
        axios
            .get(`${url}/rooms`)
            .then((res) => {
                setDataRoomHotel(res.data);
                setIsLoading(true);
            })
            .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        if (isLoading) {
            // console.log(dataBookHotel);
        }
    }, [isLoading]);
    useEffect(() => {
        if (isLoading) {
            if (dataHotel && dataBookHotel && dataRoomHotel) {
                const dataOrderHotel = dataHotel.filter((hotel) =>
                    dataBookHotel.some((booking) => booking.hotelId === hotel.id),
                );
                const dataFilter = dataOrderHotel.map((hotel) => {
                    // const roomBooked = dataBookHotel.filter((booking) => booking.hotelId === hotel.id);
                    const roomBooked = dataBookHotel
                        .filter((booking) => booking.hotelId === hotel.id)
                        .map((booking) => {
                            const roomDetails = dataRoomHotel.find((room) => room.id === booking.roomId);
                            return {
                                ...booking,
                                hotelName: hotel.name, // Thêm trường name từ hotel vào booking
                                roomNumber: roomDetails ? roomDetails.roomNumber : '', // Thêm trường roomName từ room vào booking
                            };
                        });
                    const roomAvailable = dataRoomHotel.filter(
                        (room) => !roomBooked.some((booking) => booking.roomId === room.id),
                    );
                    return {
                        hotel,
                        roomBooked,
                        roomAvailable,
                    };
                });

                setDataFilter(dataFilter);
            }
        }
    }, [isLoading, dataHotel, dataBookHotel, dataRoomHotel]);
    useEffect(() => {
        if (dataFilter.length > 0) {
            const dataFilters = dataFilter.find((data) => data);
            setDataRoomOrder(dataFilters.roomBooked);
        }
    }, [dataFilter]);
    const handleLogin = () => {
        navigate('/login');
        setPathRequired('/profile');
    };
    return (
        <div>
            {isLogin && isCheckAccount && isUser !== '' ? (
                <HotelTable hotels={dataRoomOrder} />
            ) : (
                <div className="flex h-[68vh] flex-col items-center justify-center">
                    <p>Hãy đăng nhập/đăng ký để xem danh sách khách sạn đã đặt!</p>
                    <Button
                        onClick={handleLogin}
                        className="my-4 rounded-md bg-blueButton px-16 py-4 text-white hover:opacity-70"
                    >
                        Đăng nhập
                    </Button>
                </div>
            )}
        </div>
    );
}

export default OrderHotel;
