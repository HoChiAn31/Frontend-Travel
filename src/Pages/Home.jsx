import React, { useEffect, useState } from 'react';
import { TabPane, Tab, Form, FormField, Button, FormGroup, Dropdown } from 'semantic-ui-react';
import useIntersectionObserver from '../Components/useIntersectionObserver';
import Slider from 'react-slick';
import { BadgeDollarSign, Banknote, Gem, Headset, Smartphone, ThumbsUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../Components/Css/Home.css';
import { useTheme } from '../Layouts/ThemeProvider';
import ItemTravelTour from '../Components/ItemTravelTour';
import { useFilter } from '../Layouts/FilterContext';
import ItemTravelHotel from '../Components/ItemTravelHotel';
import ItemShouldIconAT from '../Components/ItemShouldIconAT';
import { settingsTravelLocation, settingsRecommenTour } from '../Services/settings';
import { optionsDay } from '../Services/option';
import { dataBlog, dataLocations } from '../Components/data';
import ItemBlogs from '../Components/ItemBlog';

function HomePage() {
    const { filters, updateFilter, setIsFilter, setOption, setIsLoadOption, isLoadOption } = useFilter();
    const navigate = useNavigate();
    const { isLogin, isUser, url } = useTheme();
    const [ref1, isVisible1] = useIntersectionObserver({ threshold: 0.3 });
    const [ref2, isVisible2] = useIntersectionObserver({ threshold: 0.3 });
    const [ref3, isVisible3] = useIntersectionObserver({ threshold: 0.3 });
    const [ref4, isVisible4] = useIntersectionObserver({ threshold: 0.3 });
    const [ref5, isVisible5] = useIntersectionObserver({ threshold: 0.3 });
    const [ref6, isVisible6] = useIntersectionObserver({ threshold: 0.3 });
    const [ref7, isVisible7] = useIntersectionObserver({ threshold: 0.3 });
    const [ref8, isVisible8] = useIntersectionObserver({ threshold: 0.3 });
    const [dataTour, setDataTour] = useState([]);
    const [dataHotel, setDataHotel] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingRecommen, setIsLoadingRecommen] = useState(false);
    const [dataRecommenTour, setDataRecommenTour] = useState();
    // ==============================================================
    const [isSearch, setIsSearch] = useState(false);
    const panes = [
        {
            menuItem: 'Tìm kiếm tour',
            render: () => (
                <TabPane>
                    <Form>
                        <FormGroup widths={4}>
                            <FormField>
                                <label className="text-base font-bold text-orange">Tên Tour/Địa điểm</label>
                                {/* <input placeholder="Nhập tên tour" onChange={handleChangeName} name="name" /> */}
                                <Dropdown
                                    placeholder="Nhập/Chọn địa điểm"
                                    fluid
                                    selection
                                    options={dataLocations}
                                    onChange={handleChangeName}
                                    name="name"
                                />
                            </FormField>
                            <FormField>
                                <label className="text-base font-bold text-orange">Số ngày đi</label>
                                <Dropdown
                                    placeholder="Chọn số ngày đi"
                                    fluid
                                    selection
                                    options={optionsDay}
                                    onChange={handleChangeDuration}
                                />
                            </FormField>
                            <FormField>
                                <label className="text-base font-bold text-orange">Ngày đi </label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={filters.startDate}
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={handleChangeStartDate}
                                />
                            </FormField>

                            <Button
                                disabled={!isSearch}
                                onClick={handleSearch}
                                type="submit"
                                className="flex w-[20%] items-center justify-center rounded-md bg-blueButton text-white hover:opacity-80"
                            >
                                Tìm kiếm
                            </Button>
                        </FormGroup>
                    </Form>
                </TabPane>
            ),
        },
        {
            menuItem: 'Tìm kiếm khách sạn',
            render: () => (
                <TabPane>
                    <Form>
                        <FormGroup widths={5}>
                            <FormField>
                                <label className="text-base font-bold text-orange">Địa điểm</label>
                                {/* <input placeholder="Nhập tên tour" name="city" onChange={handleChangeNameHotel} /> */}
                                <Dropdown
                                    placeholder="Nhập Tên/Địa điểm"
                                    search
                                    selection
                                    options={dataLocations}
                                    onChange={handleChangeNameHotel}
                                />
                            </FormField>
                            <FormField>
                                <label className="text-base font-bold text-orange">Ngày nhận phòng</label>
                                <input placeholder="Chọn ngày khởi hành" type="date" />
                            </FormField>
                            <FormField>
                                <label className="text-base font-bold text-orange">Ngày trả phòng</label>
                                <input placeholder="Chọn ngày trở về" type="date" />
                            </FormField>
                            <FormField>
                                <label className="text-base font-bold text-orange">Số người đi</label>
                                <input
                                    name="quantityPeople"
                                    placeholder="Nhập só người di"
                                    type="number"
                                    onChange={haneleChangeQuantityPeopleHotel}
                                />
                            </FormField>

                            <Button
                                onClick={handleSearchHotel}
                                type="submit"
                                className="flex w-[20%] items-center justify-center rounded-md bg-blueButton text-white hover:opacity-80"
                            >
                                Tìm kiếm
                            </Button>
                        </FormGroup>
                    </Form>
                </TabPane>
            ),
        },
    ];

    const handleChangeName = (e) => {
        const { name, value } = e.target;
        setIsLoadOption(0);
        updateFilter(name, value);
        setIsSearch(true);
    };
    const handleChangeNameHotel = (e) => {
        const { name, value } = e.target;
        setIsLoadOption(1);
        updateFilter(name, value);
        setIsSearch(true);
    };
    const haneleChangeQuantityPeopleHotel = (e) => {
        const { name, value } = e.target;
        updateFilter(name, value);
        setIsSearch(true);
    };

    const handleChangeDuration = (e, { value }) => {
        updateFilter('duration', value);
        setIsSearch(true);
    };
    const handleChangeStartDate = (e) => {
        const { name, value } = e.target;
        updateFilter(name, value);
        setIsSearch(true);
    };
    const handleSearch = (e) => {
        e.preventDefault();
        if (isSearch) {
            if (filters.name !== '') {
                updateFilter('city', '');
            }
            axios
                .post(`${url}/userLocations/locations/${isUser}`, {
                    location: filters.name,
                })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
            navigate('/searchCategory');
            setIsFilter(true);
        }
    };

    const handleSearchHotel = (e) => {
        e.preventDefault();
        setOption('hotel');
        axios
            .post(`${url}/userHotels/${isUser}`, {
                city: filters.name,
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        navigate('/searchCategory');
        setIsFilter(true);
    };
    // ==============================================================
    useEffect(() => {
        axios
            .get(`${url}/tours`)
            .then((res) => {
                setDataTour(res.data);
                setIsLoading(true);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(`${url}/hotels`)
            .then((res) => {
                setDataHotel(res.data);
                setIsLoading(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    useEffect(() => {
        if (isLogin && isUser !== '') {
            axios
                .get(`${url}/userLocations/recommendations/${isUser}`)
                .then((res) => {
                    setDataRecommenTour(res.data);
                    setIsLoadingRecommen(true);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);
    console.log(dataHotel);
    const ItemTravelLocation = ({ src, alt, title }) => (
        <div className="mx-5">
            <div className="label absolute -top-2 left-8 mt-[6px] bg-orange px-2 py-1 text-xl font-bold">
                <p>{title}</p>
            </div>
            <img src={src} alt={src} className="-mt-[33px] h-[300px] w-[300px] rounded-3xl" />
        </div>
    );

    return (
        <div>
            <div className="container-home">
                <div className="mx-auto flex h-[500px] max-w-[1200px] items-center justify-start">
                    <h3 className="w-[480px] text-5xl font-bold text-white shadow-inner">
                        Khám phá địa điểm yêu thích của bạn với chúng tôi
                    </h3>
                </div>
            </div>
            <div className="mx-auto -mt-[200px] max-w-[1200px]">
                <Tab panes={panes} className="container-tab" />
            </div>
            <div className="">
                <div className="mx-auto mt-[120px] max-w-[1200px]">
                    {/* Welcome To */}
                    <div className="flex items-center gap-10 py-10">
                        <img
                            ref={ref1}
                            src="https://kenh14cdn.com/2016/14937295-1616800005292535-8189886237117236751-n-1478500827944.jpg"
                            alt=""
                            className={`h-[550px] w-[550px] rounded-3xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] brightness-75 filter ${
                                isVisible1
                                    ? 'animate-fade-right animate-delay-100 animate-duration-500 animate-once animate-ease-linear'
                                    : ''
                            }`}
                        />
                        <div
                            ref={ref2}
                            className={`w-1/2 ${
                                isVisible2
                                    ? 'animate-fade-left animate-delay-100 animate-duration-500 animate-once animate-ease-linear'
                                    : ''
                            }`}
                        >
                            <p className="text-3xl font-bold">Đã đến lúc bắt đầu cuộc phiêu lưu của bạn</p>
                            <p className="text-base">
                                Chào mừng bạn đến với Travel AT - người bạn đồng hành lý tưởng cho những chuyến đi mơ
                                ước. Khám phá thế giới đầy màu sắc với những hành trình độc đáo, từ những bãi biển hoang
                                sơ đến các thành phố sôi động, từ những vùng đất cổ kính đầy lịch sử đến những thắng
                                cảnh thiên nhiên hùng vĩ. Travel AT cam kết mang đến cho bạn những trải nghiệm tuyệt vời
                                và kỷ niệm đáng nhớ, với các dịch vụ chuyên nghiệp và những hành trình thiết kế riêng
                                phù hợp với mọi sở thích. Hãy cùng Travel AT biến giấc mơ khám phá của bạn thành hiện
                                thực!
                            </p>
                        </div>
                    </div>
                    {/* Đề xuất */}
                    {isLogin && isUser !== '' && (
                        <div
                            ref={ref3}
                            className={`py-20 ${
                                isVisible3 ? 'animate-duration-800 animate-fade-up animate-delay-100 animate-once' : ''
                            }`}
                        >
                            <p className="font-mono py-3 text-center text-2xl italic text-orange">Danh sách</p>
                            <h3 className="text-center text-5xl font-bold">Các tour du lịch đề xuất cho bạn</h3>
                            <div className="my-10">
                                <Slider {...settingsRecommenTour}>
                                    {isLoadingRecommen &&
                                        dataRecommenTour.recommendations.map((data) => (
                                            <ItemTravelTour
                                                key={data.id}
                                                id={data.id}
                                                price={data.priceChild}
                                                name={data.name}
                                                image={data.image}
                                                duration={data.duration}
                                                departureLocation={data.departureLocation}
                                                startDate={data.startDate}
                                                quantityTotalParticipate={data.quantityTotalParticipate}
                                                quantityRegistered={data.quantityRegistered}
                                            />
                                        ))}
                                </Slider>
                            </div>
                        </div>
                    )}

                    {/* Danh sách điểm du lịch */}
                    <div
                        ref={ref4}
                        className={`py-20 ${
                            isVisible4 ? 'animate-duration-800 animate-fade-up animate-delay-100 animate-once' : ''
                        }`}
                    >
                        <p className="font-mono py-3 text-center text-2xl italic text-orange">Danh sách</p>
                        <h3 className="text-center text-5xl font-bold">Địa điểm du lịch</h3>
                        <div className="my-10">
                            <Slider {...settingsTravelLocation}>
                                <ItemTravelLocation
                                    src="https://dulichviet.com.vn/images/bandidau/du-lich-mien-nam.jpg"
                                    title="Du lịch miền Nam"
                                />
                                <ItemTravelLocation
                                    src="https://cf.bstatic.com/xdata/images/city/600x600/688853.jpg?k=f6427c8fccdf777e4bbc75fcd245e7c66204280181bea23350388c76c57348d1&o="
                                    title="Du lịch miền Bắc"
                                />
                                <ItemTravelLocation
                                    src="https://vietrektravel.com/ckeditor/plugins/fileman/Uploads/Tour-du-lich-mien-Trung/Tour-du-lich-mien-Trung-5.png"
                                    title="Du lịch miền Trung"
                                />
                                <ItemTravelLocation
                                    src="https://vcdn1-dulich.vnecdn.net/2022/06/03/cauvang-1654247842-9403-1654247849.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=Swd6JjpStebEzT6WARcoOA"
                                    title="Du lịch Đà Nẵng"
                                />
                                <ItemTravelLocation
                                    src="https://i2-vnexpress.vnecdn.net/2021/03/22/NhaTrang-KhoaTran-27-1616120145.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=9BMNnjV_o665_kwWTgfOSQ"
                                    title="Du lịch Nha Trang"
                                />
                                <ItemTravelLocation
                                    src="https://kemholiday.com/image/catalog/inbound/tay-ninh/5-khung-canh-hung-vi-cua-nui-ba-den.jpg"
                                    title="Du lịch Tây Ninh"
                                />
                                <ItemTravelLocation
                                    src="https://owa.bestprice.vn/images/articles/uploads/cap-nhat-tong-hop-nhung-noi-nen-di-o-da-lat-dep-nhat-5edb1e975a4b2.jpg"
                                    title="Du lịch Đà Lạt"
                                />
                                <ItemTravelLocation
                                    src="https://sacotravel.com/wp-content/uploads/2023/07/thac-ban-gioc.jpg
                                    "
                                    title="Du lịch Cao Bằng"
                                />
                            </Slider>
                        </div>
                    </div>
                    {/* Danh sách tour phổ biến */}
                    <div
                        ref={ref5}
                        className={`py-10 ${
                            isVisible5 ? 'animate-duration-800 animate-fade-up animate-delay-100 animate-once' : ''
                        }`}
                    >
                        <p className="font-mono py-3 text-center text-2xl italic text-orange">Danh sách</p>
                        <h3 className="pb-12 text-center text-5xl font-bold">Tour du lịch phổ biến</h3>
                        <div className="my-0 grid grid-cols-3">
                            {isLoading && (
                                <>
                                    {dataTour.slice(0, 6).map((data) => (
                                        <ItemTravelTour
                                            key={data.id}
                                            id={data.id}
                                            price={data.priceChild}
                                            name={data.name}
                                            image={data.image}
                                            duration={data.duration}
                                            departureLocation={data.departureLocation}
                                            startDate={data.startDate}
                                            quantityTotalParticipate={data.quantityTotalParticipate}
                                            quantityRegistered={data.quantityRegistered}
                                        />
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                    {/* ================================================== */}

                    <div
                        ref={ref5}
                        className={`py-10 ${
                            isVisible5 ? 'animate-duration-800 animate-fade-up animate-delay-100 animate-once' : ''
                        }`}
                    >
                        <p className="font-mono py-3 text-center text-2xl italic text-orange">Danh sách</p>
                        <h3 className="pb-12 text-center text-5xl font-bold">Khách sạn phổ biến</h3>
                        <div className="my-0 grid grid-cols-3">
                            {/* <Slider {...settingsTour}> */}
                            {isLoading && (
                                <>
                                    {dataHotel.slice(0, 6).map((data) => (
                                        <ItemTravelHotel
                                            key={data.id}
                                            id={data.id}
                                            price={data.pricePerNight}
                                            name={data.name}
                                            image={data.images[0]}
                                            address={data.address}
                                            city={data.city}
                                            rating={data.rating}
                                            viewVisit={data.viewVisit}
                                        />
                                    ))}
                                </>
                            )}
                            {/* </Slider> */}
                        </div>
                    </div>
                    {/* ================================================== */}

                    {/* Bài đăng gần đây */}
                    <div
                        ref={ref6}
                        className={`py-10 ${
                            isVisible6 ? 'animate-duration-800 animate-fade-up animate-delay-100 animate-once' : ''
                        }`}
                    >
                        <p className="font-mono py-3 text-center text-2xl italic text-orange">Danh sách</p>
                        <h3 className="pb-12 text-center text-5xl font-bold">Bài đăng gần đây</h3>
                        <div className="grid grid-cols-3 gap-20">
                            {dataBlog.slice(0, 6).map((data) => (
                                <ItemBlogs
                                    key={data.id}
                                    image={data.image}
                                    id={data.id}
                                    title={data.title}
                                    category={data.category}
                                    author={data.author}
                                    createdAt={data.createdAt}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className={`mx-auto my-10 max-w-[1200px]`}>
                <div
                    ref={ref7}
                    className={` ${
                        isVisible7 ? 'animate-duration-1500 animate-fade-down animate-delay-100 animate-once' : ''
                    }`}
                >
                    <p className="py-10 text-center text-3xl font-bold">Vì sao nên chọn TRAVELAT?</p>
                    <div className="grid grid-cols-3 gap-y-20">
                        <ItemShouldIconAT
                            icon={Gem}
                            title="Kinh nghiệm và uy tín"
                            content="Nhiều năm kinh nghiệm trong ngành du lịch"
                        />
                        <ItemShouldIconAT icon={BadgeDollarSign} title="Thanh toán" content="An toàn và tiện lợi" />
                        <ItemShouldIconAT icon={Smartphone} title="Đặt tour" content="Dễ dàng & nhanh chóng" />
                        <ItemShouldIconAT icon={Banknote} title="Giá cả" content="Luôn ở mức tốt nhất" />
                        <ItemShouldIconAT
                            icon={ThumbsUp}
                            title="Sản phẩm & Dịch vụ"
                            content="Đa dạng – Chất lượng – An toàn"
                        />
                        <ItemShouldIconAT icon={Headset} title="Hỗ trợ" content="Hotline & trực tuyến 24/7" />
                    </div>
                </div>
            </div>
            <div className="container-contact mt-16 flex flex-col items-center justify-center text-white">
                <div
                    ref={ref8}
                    className={`contact text-center ${
                        isVisible8 ? 'animate-fade animate-delay-100 animate-duration-1000 animate-once' : ''
                    }`}
                >
                    <p className="text-3xl font-bold">CHÚNG TÔI LÀ CÔNG TY DU LỊCH TRAVEL AT</p>
                    <p className="my-5">Hãy đăng ký bản tin của chúng tôi để nhận thông tin cập nhật và khuyến mãi. </p>
                    <div className="flex items-center gap-4">
                        <input
                            placeholder="Nhập email"
                            type="email"
                            className="h-[50px] w-[400px] rounded-md px-3 py-4 text-black outline-none"
                        />
                        <Button content="Đăng ký" className="h-[50px] rounded-md bg-orange px-10 py-5 text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
