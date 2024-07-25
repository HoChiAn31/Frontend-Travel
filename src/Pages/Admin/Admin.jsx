import { faBagShopping, faBook, faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useMemo, useState } from 'react';
import ReactFrappeChart from 'react-frappe-charts';
import axios from 'axios';
import ItemData from '../../Components/ItemData';
import { useTheme } from '../../Layouts/ThemeProvider';
import { Dimmer, Loader } from 'semantic-ui-react';

const generateFakeVisitData = () => {
    const data = [];
    for (let i = 1; i <= 31; i++) {
        const date = i < 10 ? `0${i}/07` : `${i}/07`;
        const visits = Math.floor(Math.random() * 1000) + 50; // Số lượt ghé thăm ngẫu nhiên từ 50 đến 1050
        data.push({ date, visits });
    }
    return data;
};

const VisitChart = ({ data }) => {
    const chartData = useMemo(
        () => ({
            labels: data.map((item) => item.date),
            datasets: [
                {
                    name: 'Lượt ghé thăm',
                    type: 'line',
                    values: data.map((item) => item.visits),
                },
            ],
        }),
        [data],
    );

    return (
        <>
            <h2>Số lượt ghé thăm theo ngày trong tháng 7</h2>
            <ReactFrappeChart
                type="line"
                data={chartData}
                height={250}
                lineOptions={{ regionFill: 1 }}
                className="custom-chart"
            />
        </>
    );
};

const AdminPage = () => {
    const { url } = useTheme();
    const [dataTour, setDataTour] = useState([]);
    const [dataHotel, setDataHotel] = useState([]);
    const [dataUser, setDataUser] = useState([]);
    const [dataOrderTour, setDataOrderTour] = useState([]);
    const [quantityHotel, setQuantityHotel] = useState();
    const [quantityTour, setQuantityTour] = useState();

    const [dataOrderHotel, setDataOrderHotel] = useState([]);
    const [totalPreOrder, setTotalPreOrder] = useState(0);
    const [quantityOrder, setQuantityOrder] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [visitData, setVisitData] = useState([]);
    const [isCheckLoad, setIsCheckLoad] = useState(false);
    useEffect(() => {
        const fetchTours = () => {
            axios
                .get(`${url}/tours`)
                .then((res) => {
                    setDataTour(res.data);
                    setIsLoading(true);
                })
                .catch((err) => {
                    console.log('Error fetching tours:', err);
                });
        };

        const fetchHotels = () => {
            axios
                .get(`${url}/hotels`)
                .then((res) => {
                    setDataHotel(res.data);
                    setIsLoading(true);
                })
                .catch((err) => {
                    console.log('Error fetching hotels:', err);
                });
        };

        const fetchTourBookings = () => {
            axios
                .get(`${url}/tourBookings`)
                .then((res) => {
                    setDataOrderTour(res.data);
                })
                .catch((err) => {
                    console.log('Error fetching tour bookings:', err);
                });
        };

        const fetchHotelBookings = () => {
            axios
                .get(`${url}/hotelBookings`)
                .then((res) => {
                    setDataOrderHotel(res.data);
                })
                .catch((err) => {
                    console.log('Error fetching hotel bookings:', err);
                });
        };

        fetchTours();
        fetchHotels();
        // fetchUsers();
        fetchTourBookings();
        fetchHotelBookings();
    }, [url]);
    useEffect(() => {
        if (dataHotel.length > 0) {
            setQuantityHotel(dataHotel.length);
        }
        if (dataTour.length > 0) {
            setQuantityTour(dataTour.length);
        }
    }, [dataHotel, dataTour]);
    useEffect(() => {
        if (isLoading) {
            const totalOrders = dataOrderTour.length + dataOrderHotel.length;
            setQuantityOrder(totalOrders);

            const totalPreOrders = [
                ...dataOrderTour.filter((item) => item.status === 'Confirmed'),
                ...dataOrderHotel.filter((item) => item.status === 'Confirmed'),
            ].reduce((sum, item) => sum + item.preOrderPrice, 0);

            setTotalPreOrder(totalPreOrders);
            setIsCheckLoad(true);
        }
    }, [dataOrderTour, dataOrderHotel, isLoading]);

    useEffect(() => {
        setVisitData(generateFakeVisitData());
    }, []);

    const formatNumber = (number) => `${number.toLocaleString('de-DE')}đ`;

    return (
        <div>
            {isCheckLoad ? (
                <div>
                    <div className="my-5 flex justify-between gap-8">
                        <ItemData
                            icon={faBook}
                            name="Tour"
                            quantity={quantityTour > 0 ? quantityTour : 'Đang cập nhật'}
                            bgColor="#9593FE"
                        />
                        <ItemData
                            icon={faBagShopping}
                            name="Khách sạn"
                            quantity={quantityHotel > 0 ? quantityHotel : 'Đang cập nhật'}
                            bgColor="#5CDAB4"
                        />
                        {/* <ItemData icon={faUser} name="Người dùng" quantity={dataUser.length} bgColor="#54C7E8" /> */}
                        <ItemData icon={faBagShopping} name="Đơn đặt hàng" quantity={quantityOrder} bgColor="#5CDAB4" />
                        <ItemData
                            icon={faBagShopping}
                            name="Tổng tiền đặt trước"
                            quantity={formatNumber(totalPreOrder)}
                            bgColor="#5CDAB4"
                            price
                        />
                    </div>
                    <div className="w-full rounded-md bg-white p-4 shadow-md">
                        <VisitChart data={visitData} />
                    </div>
                </div>
            ) : (
                <Dimmer active inverted>
                    <Loader inverted content="Loading" />
                </Dimmer>
            )}
        </div>
    );
};

export default AdminPage;
