import { Button, Dropdown, Form, FormField, FormGroup } from 'semantic-ui-react';
import useIntersectionObserver from '../Components/useIntersectionObserver';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../Layouts/ThemeProvider';
import { useEffect, useState } from 'react';
import ItemTravelHotel from '../Components/ItemTravelHotel';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { useFilter } from '../Layouts/FilterContext';
import { dataLocations } from '../Components/data';
import { useTitle } from '../Components/useTitle';

function HotelPage() {
    useTitle('Khách sạn');
    const { filters, updateFilter, setIsFilter, setOption, setIsLoadOption, isLoadOption } = useFilter();
    const navigate = useNavigate();
    const { darkMode, url } = useTheme();
    const [ref1, isVisible1] = useIntersectionObserver({ threshold: 0.1 });
    const [ref2, isVisible2] = useIntersectionObserver({ threshold: 0.1 });
    const [dataHotel, setDataHotel] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSearch, setIsSearch] = useState(false);

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
    }, []);

    const handleChangeNameHotel = (e, { value }) => {
        setIsLoadOption(1);
        updateFilter('city', value);
        setIsSearch(true);
    };

    const handleSearchHotel = (e) => {
        e.preventDefault();
        setOption('hotel');
        navigate('/searchCategory');
        setIsFilter(true);
    };

    return (
        <div>
            <div className="container-tour">
                <div className="mx-auto flex h-[500px] max-w-[1200px] items-end justify-center">
                    <h3 className="text-5xl font-bold text-white">Khách sạn</h3>
                </div>
            </div>
            <div className="mx-auto max-w-[1200px] py-20">
                <div
                    ref={ref2}
                    className={`pb-20 ${
                        isVisible2 ? 'animate-fade animate-delay-100 animate-duration-1000 animate-ease-linear' : ''
                    }`}
                >
                    <Form>
                        <FormGroup widths="equal">
                            <FormField>
                                <label className="text-base font-bold text-orange">Tên/Địa điểm khách sạn</label>
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
                                <input placeholder="Nhập số người đi" min={0} />
                            </FormField>

                            <Button
                                disabled={!isSearch}
                                onClick={handleSearchHotel}
                                type="submit"
                                className="flex w-[20%] items-center justify-center rounded-md bg-blueButton text-white hover:opacity-80"
                            >
                                Tìm kiếm
                            </Button>
                        </FormGroup>
                    </Form>
                </div>
                <div
                    ref={ref1}
                    className={`py-10 ${
                        isVisible1 ? 'animate-duration-800 animate-fade-up animate-delay-100 animate-once' : ''
                    }`}
                >
                    <p className="py-3 text-center font-mono text-2xl italic text-orange">Danh sách</p>
                    <h3 className="pb-12 text-center text-5xl font-bold">Khách sạn</h3>
                    {isLoading && (
                        <div className="my-0 grid grid-cols-3">
                            {dataHotel.map((data) => (
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HotelPage;
