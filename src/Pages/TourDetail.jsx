// import { useParams } from 'react-router-dom';
import { CalendarCheck, MapPin, UserRound } from 'lucide-react';
import { ModalContent, ModalActions, Button, Header, Icon, Modal } from 'semantic-ui-react';
import { dataTour } from '../Components/data';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import '../Components/Css/Tour.css';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import ItemTravelTour from '../Components/ItemTravelTour';
import ModalComponents from '../Components/ModalComponents';
import { useTheme } from '../Layouts/ThemeProvider';
// import { Button, Modal } from 'react-bootstrap';

function TourDetailPage() {
    const { id } = useParams();
    const { isUser, isLogin, setPathRequired, darkMode, url } = useTheme();
    console.log('isLogin', isLogin);
    const location = useLocation();
    const navigate = useNavigate();
    const [dataTour, setDataTour] = useState([]);
    const [dataSchedule, setDataSchedule] = useState([]);
    const [dataDetail, setDataDetail] = useState();
    const [dataIntro, setDataIntro] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        axios
            .get(`${url}/tours`)
            .then((res) => {
                console.log(res.data);
                setDataTour(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(`${url}/tourSchedules`)
            .then((res) => {
                console.log(res.data);
                setDataSchedule(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(`${url}/tourIntroductions`)
            .then((res) => {
                console.log(res.data);
                setDataIntro(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    useEffect(() => {
        if ((dataTour.length > 0) & (dataSchedule.length > 0) & (dataIntro.length > 0)) {
            const dataFilterTour = dataTour.find((data) => data.id === id);

            const dataFilterSchedule = dataSchedule.find((filter) => filter.id === dataFilterTour.descriptionId);
            const dataFilterIntro = dataIntro.find((filter) => filter.id === dataFilterTour.introId);
            // console.log(dataFilter);
            setDataDetail({
                ...dataFilterTour,
                description: dataFilterSchedule.description,
                intro: dataFilterIntro.intro,
            });
            setIsLoading(true);
            // setDataDetail(dataFilter);
        }
    }, [dataTour, dataSchedule, dataIntro]);
    if (dataDetail) {
        console.log(dataDetail);
    }
    const formatDate = (isoDate) => {
        if (isoDate) {
            const date = new Date(isoDate);
            return format(date, 'dd/MM/yyyy');
        }
    };
    function formatPrice(price) {
        if (price) {
            return price.toLocaleString('vi-VN', { minimumFractionDigits: 0 }) + ' đ/người';
        }
    }
    const handleBookTour = (e) => {
        e.preventDefault();
        if (isLogin && isUser !== '') {
            navigate(`/oneStepCheckOutTour/${id}`);
        } else {
            setOpen(true);
        }
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleLogin = () => {
        setOpen(false);
        const pathname = location.pathname;
        setPathRequired(pathname);
        navigate('/login');
    };
    return (
        <div>
            <div className="mx-auto max-w-[1200px] px-4 py-10">
                <div className="">
                    <div>
                        <h3 className="mb-6 text-4xl font-bold">{dataDetail?.name}</h3>
                    </div>
                    {isLoading && (
                        <div className="flex items-start justify-between gap-8">
                            <div className="w-[70%]">
                                <div>
                                    <p className="mb-6 text-2xl font-bold">#1.Tổng quát</p>
                                    {dataDetail?.intro.map((section, index) => (
                                        <div key={index} className="mb-8">
                                            <h2 className="mb-4 text-2xl font-semibold">
                                                Giới thiệu tổng quát về tour
                                            </h2>
                                            {section.image && (
                                                <div className="mb-4">
                                                    <img
                                                        src={section.image}
                                                        alt={section.title}
                                                        className="h-auto w-full"
                                                    />
                                                    <p className="mt-2 text-center text-sm text-gray-600">
                                                        {section.imageCaption}
                                                    </p>
                                                </div>
                                            )}
                                            {section.description && (
                                                <p className="mb-4 text-lg">{section.description}</p>
                                            )}
                                            {section.highlights && (
                                                <ul className="list-inside list-disc">
                                                    {section.highlights.map((highlight, idx) => (
                                                        <li key={idx} className="mb-2 text-lg">
                                                            {highlight}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <p className="mb-6 text-2xl font-bold">#2.Điểm nhấn của hành trình</p>
                                    <div className="mt-4 rounded-md border shadow">
                                        <table className="min-w-full">
                                            <tbody className="divide-y">
                                                <tr>
                                                    <td className="w-1/5 whitespace-nowrap rounded-lg border-r border-gray-300 px-6 py-4 text-sm font-medium text-gray-700">
                                                        Hành trình
                                                    </td>
                                                    <td className="whitespace-nowrap rounded-lg px-6 py-4 text-sm">
                                                        {dataDetail?.name}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="whitespace-nowrap border-r border-gray-300 px-6 py-4 text-sm font-medium text-gray-700">
                                                        Lịch trình
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                        {dataDetail?.duration} ngày
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="whitespace-nowrap border-r border-gray-300 px-6 py-4 text-sm font-medium text-gray-700">
                                                        Ngày đi
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                        {formatDate(dataDetail?.startDate)}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="whitespace-nowrap border-r border-gray-300 px-6 py-4 text-sm font-medium text-gray-700">
                                                        Ngày về
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                        {formatDate(dataDetail?.endDate)}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="whitespace-nowrap border-r border-gray-300 px-6 py-4 text-sm font-medium text-gray-700">
                                                        Vận chuyển
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                        {dataDetail?.vehicle}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="whitespace-nowrap border-r border-gray-300 px-6 py-4 text-sm font-medium text-gray-700">
                                                        Điểm xuất phát
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                        {dataDetail?.departureLocation}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="whitespace-nowrap rounded-lg border-r border-gray-300 px-6 py-4 text-sm font-medium text-gray-700">
                                                        Số người tham gia
                                                    </td>
                                                    <td className="whitespace-nowrap rounded-lg px-6 py-4 text-sm">
                                                        {dataDetail?.quantityTotalParticipate}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="whitespace-nowrap rounded-lg border-r border-gray-300 px-6 py-4 text-sm font-medium text-gray-700">
                                                        Đã đăng ký
                                                    </td>
                                                    <td className="whitespace-nowrap rounded-lg px-6 py-4 text-sm">
                                                        {dataDetail?.quantityRegistered}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="whitespace-nowrap rounded-lg border-r border-gray-300 px-6 py-4 text-sm font-medium text-gray-700">
                                                        Giá người lớn
                                                    </td>
                                                    <td className="whitespace-nowrap rounded-lg px-6 py-4 text-sm">
                                                        {formatPrice(dataDetail?.pricesAdult)}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="whitespace-nowrap rounded-lg border-r border-gray-300 px-6 py-4 text-sm font-medium text-gray-700">
                                                        Giá trẻ em
                                                    </td>
                                                    <td className="whitespace-nowrap rounded-lg px-6 py-4 text-sm">
                                                        {formatPrice(dataDetail?.priceChild)}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="container mx-auto py-4">
                                    <p className="mb-6 text-3xl font-bold">Lịch Trình Tour</p>
                                    {dataDetail?.description.map((day, index) => (
                                        <div key={index} className="mb-8">
                                            <h2 className="mb-4 text-xl font-semibold">{day.title}</h2>
                                            <div className="mb-4">
                                                <img src={day.image} alt={day.title} className="h-auto w-full" />
                                                <p className="mt-2 text-center text-sm text-gray-600">
                                                    {day.imageCaption}
                                                </p>
                                            </div>
                                            {day.events.map((event, idx) => (
                                                <div key={idx} className="mb-2">
                                                    <p className="text-lg">
                                                        {event.time && (
                                                            <span className="font-bold">{event.time}: </span>
                                                        )}
                                                        {event.description}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-[30%]">
                                <div className="border py-5 text-center">
                                    <p className="mb-4 text-lg font-medium">Giá chỉ từ: 500.000 vnd</p>
                                    <button
                                        onClick={handleBookTour}
                                        // to={`/oneStepCheckOutTour/${id}`}
                                        className="rounded-md bg-blueButton px-32 py-3 text-white hover:opacity-70"
                                    >
                                        Đặt tour
                                    </button>
                                </div>
                                <div className="mt-5">
                                    <p className="text-center text-2xl font-bold">DANH SÁCH TOUR LIÊN QUAN</p>
                                    {isLoading && (
                                        <div>
                                            {dataTour.slice(0, 3).map((data) => (
                                                <ItemTravelTour
                                                    id={data.id}
                                                    price={data.priceChild}
                                                    name={data.name}
                                                    image={data.image}
                                                    duration={data.duration}
                                                    departureLocation={data.departureLocation}
                                                    startDate={data.startDate}
                                                    quantityTotalParticipate={data.quantityTotalParticipate}
                                                    quantityRegistered={data.quantityRegistered}
                                                    small
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <ModalComponents
                        title="Vui lòng đăng nhập để đặt tour!"
                        // content={<p>Vui lòng đăng nhập để đặt tour.</p>}
                        open={open}
                        titleYes="Đăng nhập"
                        handleYes={handleLogin}
                        handleClose={handleClose}
                    />
                </div>
            </div>
        </div>
    );
}

export default TourDetailPage;
