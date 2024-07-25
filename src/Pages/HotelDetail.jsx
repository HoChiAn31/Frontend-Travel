import { Button, Rating } from 'semantic-ui-react';
// import useIntersectionObserver from '../Components/useIntersectionObserver';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
    AirVent,
    ChevronUp,
    CigaretteOff,
    CircleCheck,
    CircleParking,
    Coffee,
    DoorClosed,
    Headset,
    MapPin,
    PlaneTakeoff,
    Presentation,
    ShieldCheck,
    ThumbsUp,
    Utensils,
    Waves,
    Wifi,
} from 'lucide-react';

import { useEffect, useState } from 'react';
import '../Components/Css/HotelDetail.css';
import { useTheme } from '../Layouts/ThemeProvider';
import axios from 'axios';
import ModalComponents from '../Components/ModalComponents';
import FormatDate from '../Components/FormatDate';
import { useTitle } from '../Components/useTitle';
function HotelDetailPage() {
    useTitle('Chi tiết');
    const { darkMode, isUser, isLogin, setPathRequired, url } = useTheme();
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [dataHotelDetail, setDataHotelDetail] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [dataHotel, setDataHotel] = useState([]);
    const [open, setOpen] = useState(false);
    const [dataUser, setDataUser] = useState([]);
    const [dataReview, setDataReview] = useState([]);
    const [dataCombined, setDataCombined] = useState([]);
    const [openReviewModal, setOpenReviewModal] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [userComment, setUserComment] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [loader, setLoader] = useState(0);
    const [ratingPercentage, setRatingPercentage] = useState();
    const [averageRating, setAverageRating] = useState(0);
    useEffect(() => {
        axios
            .get(`${url}/hotels`)
            .then((res) => {
                setDataHotel(res.data);
                setIsLoading(true);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(`${url}/users`)
            .then((res) => {
                setDataUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(`${url}/reviews/post/${id}`)
            .then((res) => {
                setDataReview(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    useEffect(() => {
        if (loader > 0) {
            axios
                .get(`${url}/reviews/post/${id}`)
                .then((res) => {
                    setDataReview(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [loader]);

    useEffect(() => {
        if (isLoading) {
            const dataFilter = dataHotel.find((data) => data.id === id);
            setDataHotelDetail(dataFilter);
        }
    }, [isLoading]);
    useEffect(() => {
        if (dataUser && dataReview) {
            const combinedData = dataReview
                .filter((review) => review.postId === id)
                .map((review) => {
                    const user = dataUser.find((user) => user.id === review.userId);
                    return user ? { ...user, review } : null;
                })
                .filter((user) => user !== null);
            setDataCombined(combinedData);
        }
    }, [dataUser, dataReview]);
    useEffect(() => {
        if (dataReview.length > 0) {
            const ratingCounts = dataReview.reduce((acc, review) => {
                acc[review.rating] = (acc[review.rating] || 0) + 1;
                return acc;
            }, {});

            // Tính số lượng rating
            const numberOfRatings = dataReview.length;

            //Tính tổng các ratings
            const totalRatings = dataReview.reduce((sum, review) => sum + review.rating, 0);
            // Tính phần trăm cho từng rating
            const ratingPercentages = Object.keys(ratingCounts).reduce((acc, rating) => {
                acc[rating] = (ratingCounts[rating] / numberOfRatings) * 100;
                return acc;
            }, {});
            const averageRating = numberOfRatings > 0 ? totalRatings / numberOfRatings : 0;
            setAverageRating(averageRating);
            const starPercentages = {
                star1: ratingPercentages['1'] || 0,
                star2: ratingPercentages['2'] || 0,
                star3: ratingPercentages['3'] || 0,
                star4: ratingPercentages['4'] || 0,
                star5: ratingPercentages['5'] || 0,
            };
            // Tính trung bình

            setRatingPercentage(starPercentages);
        }
    }, [dataReview]);

    const ItemTravelHotel = ({ id, name, image, price, address, city, rating, viewVisit, small }) => {
        function formatPrice(price) {
            if (price) {
                return price.toLocaleString('vi-VN', { minimumFractionDigits: 0 }) + 'đ/đêm';
            }
        }
        return (
            <div className={`mt-15 relative mx-5 ${small ? 'mb-40' : 'mb-52'}`} key={id}>
                <div className="label1 absolute -top-2 left-8 mt-[6px] bg-orange px-2 py-2 text-base font-bold text-white">
                    <p>Chỉ từ {formatPrice(price)}</p>
                </div>
                <img
                    src={image}
                    alt={name}
                    className={`-mt-[38px] rounded-xl ${small ? 'h-[210px] w-[316px]' : 'h-[280px] w-[360px]'}`}
                />
                <Link
                    className={`absolute left-[20px] ${small ? '-bottom-28 w-[280px]' : '-bottom-40 w-[320px]'}`}
                    to={`/hotel/${id}`}
                >
                    <div
                        className={`${darkMode ? 'bg-darkHF text-white' : 'bg-white text-black'} rounded-xl px-3 py-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}
                    >
                        {/* <p className="text-orange font-bold">4 NGÀY</p> */}
                        <p className={`line-clamp-2 text-lg font-bold ${small ? 'h-14' : 'h-20 py-2'}`}>{name}</p>
                        <div className="flex items-start gap-2 py-2">
                            <MapPin className=" " />
                            <p className={`flex h-5 items-start ${small ? 'text-sm' : 'text-base'}`}>
                                Địa chỉ: {address},{city}
                            </p>
                        </div>
                        <div className={`flex items-center gap-4 ${small ? 'py-3' : 'pt-10'}`}>
                            <Rating
                                defaultRating={rating}
                                maxRating={5}
                                disabled
                                icon="star"
                                size="large"
                                className="gap-2"
                            />
                            <p className="text-sm">({viewVisit} lượt xem)</p>
                        </div>
                    </div>
                </Link>
            </div>
        );
    };
    const ItemUtilities = ({ icon: Icon, name }) => (
        <div className="flex items-center gap-2">
            <Icon className="text-[#3ae065]" />
            <p>{name}</p>
        </div>
    );
    const RatingBar = ({ label, rating }) => {
        return (
            <div className="mb-4">
                <div className="flex items-center justify-between gap-4">
                    <span className="w-[30%]">{label}</span>
                    <div className="h-4 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                        <div className={`h-4 rounded-full bg-blue`} style={{ width: `${rating}%` }}></div>
                    </div>
                </div>
            </div>
        );
    };
    const [questions, setQuestions] = useState([
        {
            question: 'Giờ nhận phòng và trả phòng là lúc nào?',
            answer: 'Giờ nhận phòng thường là từ 14:00 và giờ trả phòng là trước 12:00. Nếu bạn cần nhận phòng sớm hoặc trả phòng muộn, vui lòng liên hệ với lễ tân để kiểm tra khả năng phục vụ.',
        },
        {
            question: 'Khách sạn có phòng tập gym hoặc spa không?',
            answer: 'Khách sạn có phòng tập gym và khu vực spa. Các dịch vụ này có thể yêu cầu đặt lịch trước, vui lòng liên hệ với lễ tân để biết thêm thông tin và đặt lịch.',
        },
        {
            question: 'Khách sạn có cho phép vật nuôi không?',
            answer: 'Chính sách về vật nuôi có thể khác nhau giữa các khách sạn. Vui lòng liên hệ với lễ tân để biết thông tin chi tiết về việc cho phép vật nuôi và các quy định liên quan.',
        },
        {
            question: 'Khách sạn có cung cấp dịch vụ giặt ủi không?',
            answer: 'Khách sạn cung cấp dịch vụ giặt ủi với các tùy chọn dịch vụ như giặt khô và giặt thường. Vui lòng liên hệ với lễ tân để biết thêm chi tiết và đặt dịch vụ.',
        },
        {
            question: 'Khách sạn có tổ chức các tour du lịch không?',
            answer: 'Khách sạn có dịch vụ tổ chức các tour du lịch và hoạt động giải trí. Bạn có thể liên hệ với lễ tân để biết thêm thông tin về các tour có sẵn và cách đặt tour.',
        },
    ]);

    const handleToggleQuestion = (index) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question, i) => (i === index ? { ...question, isOpen: !question.isOpen } : question)),
        );
    };
    const ItemCommnet = ({ image, name, rating, content, date, like }) => (
        <div className="my-4 flex items-start border-b pb-4">
            <div className="flex w-1/4 items-center gap-4">
                <img src={image} alt={name} className="h-16 w-16 rounded-full object-cover" />
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-900'}text-lg font-bold`}>{name}</p>
            </div>
            <div className="w-4/5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-yellow-400">
                        <Rating defaultRating={rating} maxRating={5} disabled size="large" />
                    </div>
                    <p className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} text-sm`}>
                        <FormatDate date={date} size="sm" />
                    </p>
                </div>
                <p className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} py-2`}>{content}</p>
                <div className="text-blue-500 flex cursor-pointer items-center gap-2 hover:text-blue">
                    <ThumbsUp className="h-5 w-5" />
                    <p className="text-sm">Thích đánh giá này</p>
                    {like > 0 ? <p className="text-sm">({like})</p> : null}
                </div>
            </div>
        </div>
    );
    const handleBookHotel = () => {
        if (isLogin && isUser !== '') {
            navigate(`/selectRoom/${id}`);
        } else {
            setOpen(true);
        }
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleLogin = () => {
        setOpen(false);
        setPathRequired(location.pathname);
        navigate('/login');
    };
    const handleOpenReviewModal = () => {
        if (isLogin && isUser !== '') {
            setOpenReviewModal(true);
        } else {
            setOpen(true);
        }
    };
    const handleCloseReviewModal = () => {
        setOpenReviewModal(false);
    };
    const handleSubmitReview = (e) => {
        e.preventDefault();
        setOpenReviewModal(false);
        const review = {
            postId: id,
            userId: isUser,
            rating: userRating,
            comment: userComment,
        };
        axios
            .post(`${url}/reviews`, review)
            .then((response) => {
                setTimeout(() => {
                    // window.location.reload();
                    setLoader(loader + 1);
                }, 300);
            })
            .catch((error) => {
                console.error('Error submitting review:', error);
            });

        // Clear the inputs after submission
        setUserRating(0);
        setUserComment('');
        handleCloseReviewModal();
    };
    return (
        <div className="mx-auto max-w-[1200px] py-10">
            {isLoading && (
                <>
                    <div>
                        <h3 className="mb-6 text-4xl font-bold">{dataHotelDetail.name}</h3>
                    </div>
                    <div className="flex items-start justify-between gap-8">
                        <div className="w-[70%]">
                            <div className="py-4">
                                <img src={dataHotelDetail.images} alt={dataHotelDetail.name} />
                            </div>
                            <div className="py-4">
                                <p className="pb-3 text-2xl font-bold">Mô tả:</p>
                                <p>{dataHotelDetail.description}</p>
                            </div>
                            <div className="py-4">
                                <p className="pb-3 text-2xl font-bold">Cơ sở vật chất:</p>
                                <div className="grid grid-cols-3 gap-6 py-4">
                                    <ItemUtilities icon={Wifi} name="Wifi miễn phí" />
                                    <ItemUtilities icon={AirVent} name="Điều hòa không khí" />
                                    <ItemUtilities icon={CircleParking} name="Bãi giữ xe miễn phí" />
                                    <ItemUtilities icon={CigaretteOff} name="Phòng không hút thuốc" />
                                    <ItemUtilities icon={PlaneTakeoff} name="Xe đưa đón sân bay" />
                                    <ItemUtilities icon={Headset} name="Lễ Tân hỗ trợ 24/24" />
                                    <ItemUtilities icon={Utensils} name="Nhà hàng" />
                                    <ItemUtilities icon={DoorClosed} name="Thang máy" />
                                    <ItemUtilities icon={Coffee} name="Bữa ăn sáng" />
                                    <ItemUtilities icon={Waves} name="Hồ bơi" />
                                    <ItemUtilities icon={Presentation} name="Hội nghị văn phòng" />
                                    <ItemUtilities icon={ShieldCheck} name="An ninh 24/7" />
                                </div>
                            </div>

                            <div className="py-4">
                                <div className="flex items-center justify-between">
                                    <p className="pb-3 text-2xl font-bold">Đánh giá từ khách hàng</p>
                                    <Rating defaultRating={averageRating} maxRating={5} disabled size="large" />
                                </div>

                                <div>
                                    <div>
                                        <RatingBar
                                            label="Tuyệt vời"
                                            rating={ratingPercentage ? ratingPercentage.star5 : 0}
                                        />
                                        <RatingBar label="Tốt" rating={ratingPercentage ? ratingPercentage.star4 : 0} />
                                        <RatingBar
                                            label="Trung bình"
                                            rating={ratingPercentage ? ratingPercentage.star3 : 0}
                                        />
                                        <RatingBar label="Tệ" rating={ratingPercentage ? ratingPercentage.star2 : 0} />
                                        <RatingBar
                                            label="Rất tệ"
                                            rating={ratingPercentage ? ratingPercentage.star1 : 0}
                                        />
                                    </div>
                                </div>
                                <Button
                                    onClick={handleOpenReviewModal}
                                    className="rounded-md bg-blueButton px-6 py-3 text-white hover:opacity-70"
                                >
                                    Viết Đánh giá
                                </Button>
                                <div className="py-4">
                                    {dataCombined.length > 0 &&
                                        dataCombined
                                            .sort((a, b) => new Date(b.review.createdAt) - new Date(a.review.createdAt))
                                            .map((data) => (
                                                <ItemCommnet
                                                    image={data.image}
                                                    name={data.fullName}
                                                    rating={data.review.rating}
                                                    content={data.review.comment}
                                                    date={data.review.createdAt}
                                                />
                                            ))}
                                </div>
                                <div className="py-4">
                                    <p className="pb-3 text-2xl font-bold">Các câu hỏi thường gặp</p>
                                    {questions.map((question, index) => (
                                        <div key={index} className="mb-4">
                                            <button
                                                className={`flex w-full items-center justify-between border border-gray-300 p-4 ${
                                                    question.isOpen ? 'rounded-t-md' : 'rounded-md'
                                                } hover:opacity-80`}
                                                onClick={() => handleToggleQuestion(index)}
                                            >
                                                <span className="font-medium">{question.question}</span>
                                                <span className={`transform ${question.isOpen ? '-rotate-180' : ''}`}>
                                                    <ChevronUp className="text-blue" />
                                                </span>
                                            </button>
                                            {question.isOpen && (
                                                <div className="rounded-b-md border-x border-b p-4">
                                                    <p className="">{question.answer}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="w-[30%]">
                            <div className="border py-5 text-center">
                                <p className="mb-4 text-lg font-medium">Giá chỉ từ: 500.000 vnd</p>
                                <Button
                                    onClick={handleBookHotel}
                                    className="rounded-md bg-blueButton px-32 py-3 text-white hover:opacity-70"
                                >
                                    Đặt phòng
                                </Button>
                            </div>
                            <div className="mt-5">
                                <p className="text-center text-2xl font-bold">DANH SÁCH KHÁCH SẠN PHỔ BIẾN</p>

                                <div>
                                    {dataHotel.slice(0, 3).map((data) => (
                                        <ItemTravelHotel
                                            id={data.id}
                                            price={data.pricePerNight}
                                            name={data.name}
                                            image={data.images[0]}
                                            address={data.address}
                                            city={data.city}
                                            rating={data.rating}
                                            viewVisit={data.viewVisit}
                                            small
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <ModalComponents
                title="Vui lòng đăng nhập!"
                // content={<p>Vui lòng đăng nhập để đặt tour.</p>}
                open={open}
                titleYes="Đăng nhập"
                handleYes={handleLogin}
                handleClose={handleClose}
            />
            <ModalComponents
                open={openReviewModal}
                handleClose={handleCloseReviewModal}
                handleYes={handleSubmitReview}
                titleYes="Gửi đánh giá"
                title="Đánh giá khách sạn"
                children={
                    <div className="">
                        <div className="">
                            <Rating
                                icon="star"
                                rating={userRating}
                                maxRating={5}
                                onRate={(event, data) => setUserRating(data.rating)}
                                className="pb-4"
                            />
                            <textarea
                                placeholder="Nhập bình luận của bạn..."
                                value={userComment}
                                onChange={(e) => setUserComment(e.target.value)}
                                rows={4}
                                className="w-full rounded-md border border-gray-300 p-2"
                            ></textarea>
                        </div>
                    </div>
                }
            />
        </div>
    );
}

export default HotelDetailPage;
