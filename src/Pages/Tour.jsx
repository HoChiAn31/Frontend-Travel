import { Button, Dropdown, Form, FormField, FormGroup } from 'semantic-ui-react';
import useIntersectionObserver from '../Components/useIntersectionObserver';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';

import ItemTravelTour from '../Components/ItemTravelTour';
import { useFilter } from '../Layouts/FilterContext';
import { useTheme } from '../Layouts/ThemeProvider';
import { settingsRecommenTour } from '../Services/settings';
import { optionsDay } from '../Services/option';
import { dataLocations } from '../Components/data';
import { useTitle } from '../Components/useTitle';
function TourPage() {
    useTitle('Tour');
    const { filters, updateFilter, setIsFilter, setIsLoadOption } = useFilter();
    const navigate = useNavigate();
    const { isLogin, isUser, url } = useTheme();
    const [ref1, isVisible1] = useIntersectionObserver({ threshold: 0.1 });
    const [ref2, isVisible2] = useIntersectionObserver({ threshold: 0.1 });
    const [ref3, isVisible3] = useIntersectionObserver({ threshold: 0.1 });

    const [dataTour, setDataTour] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [isLoadingRecommen, setIsLoadingRecommen] = useState(false);
    const [dataRecommenTour, setDataRecommenTour] = useState();
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
    }, []);
    const handleChangeName = (e) => {
        const { name, value } = e.target;
        setIsLoadOption(0);
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
    return (
        <div>
            <div className="container-tour">
                <div className="mx-auto flex h-[300px] max-w-[1200px] items-end justify-center sm:h-[400px] lg:h-[500px]">
                    <h3 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">Tour</h3>
                </div>
            </div>
            <div className="mx-auto max-w-[1200px] py-10 sm:py-20">
                <div
                    ref={ref2}
                    className={`pb-20 ${
                        isVisible2 ? 'animate-fade animate-delay-100 animate-duration-1000 animate-ease-linear' : ''
                    }`}
                >
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
                                {/* <input placeholder="Chọn ngày khởi hành" type="date" /> */}
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
                                    // className="focus:ring-blue-500 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2"
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
                </div>
                {isLogin && isUser !== '' && (
                    <div
                        ref={ref3}
                        className={`py-20 ${
                            isVisible3 ? 'animate-duration-800 animate-fade-up animate-delay-100 animate-once' : ''
                        }`}
                    >
                        <p className="py-3 text-center font-mono text-2xl italic text-orange">Danh sách</p>
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
                <div
                    ref={ref1}
                    className={`py-10 ${
                        isVisible1 ? 'animate-duration-800 animate-fade-up animate-delay-100 animate-once' : ''
                    }`}
                >
                    <p className="py-3 text-center font-mono text-xl italic text-orange sm:text-2xl">Danh sách</p>
                    <h3 className="pb-12 text-center text-3xl font-bold sm:text-4xl lg:text-5xl">Tour du lịch</h3>
                    {isLoading && (
                        <div className="my-0 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {dataTour.map((data) => (
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
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TourPage;
