import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import axios from 'axios';

import { useFilter } from '../Layouts/FilterContext';
import ItemTravelTour from '../Components/ItemTravelTour';
import ItemTravelHotel from '../Components/ItemTravelHotel';
import { Loader } from 'semantic-ui-react';
import { useTheme } from '../Layouts/ThemeProvider';
import { useTitle } from '../Components/useTitle';

const SearchCategoryPage = () => {
    useTitle('Tìm kiếm');
    const { filters, isFilter, option } = useFilter();
    const { url } = useTheme();
    const [searchResultsTour, setSearchResultsTour] = useState([]);
    const [searchResultsHotel, setSearchResultsHotel] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [dataTour, setDataTour] = useState([]);
    const [dataHotel, setDataHotel] = useState([]);
    useEffect(() => {
        if (option === 'tour') {
            fetchSearchResultsTour();
        }
        if (option === 'hotel') {
            console.log(filters);
            fetchSearchResultsHotel();
        }
    }, [filters, option, isFilter]);

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
    const fetchSearchResultsHotel = async () => {
        try {
            const filteredFilters = { ...filters };
            if (filteredFilters.city === '') delete filteredFilters.city;
            if (
                Array.isArray(filteredFilters.priceChild) &&
                filteredFilters.priceChild[0] !== 5000000 &&
                filteredFilters.priceChild[1] !== 10000000
            ) {
                filteredFilters.pricePerNight = filteredFilters.priceChild.join(',');
                delete filteredFilters.priceChild;
            } else {
                delete filteredFilters.priceChild;
            }
            if (filteredFilters.quantityPeople === 0) delete filteredFilters.quantityPeople;
            const params = new URLSearchParams(filteredFilters).toString();
            const url = `${url}/hotels/filter?${params}`;
            console.log(params);
            const response = await axios.get(url);
            console.log(response.data);
            setSearchResultsHotel(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const fetchSearchResultsTour = async () => {
        try {
            // Xóa các giá trị mặc định trước khi xây dựng query string
            const filteredFilters = { ...filters };
            if (filteredFilters.name === '') delete filteredFilters.name;
            if (filteredFilters.city === '') delete filteredFilters.city;
            if (filteredFilters.duration === 0) delete filteredFilters.duration;
            if (filteredFilters.vehicle === '') delete filteredFilters.vehicle;
            if (
                Array.isArray(filteredFilters.priceChild) &&
                filteredFilters.priceChild[0] !== 5000000 &&
                filteredFilters.priceChild[1] !== 10000000
            ) {
                filteredFilters.priceChild = filteredFilters.priceChild.join(',');
            } else {
                delete filteredFilters.priceChild;
            }
            if (filteredFilters.startDate === '') delete filteredFilters.startDate;

            const params = new URLSearchParams(filteredFilters).toString();
            const url = `${url}/tours/filter?${params}`;
            console.log(params);

            const response = await axios.get(url);
            console.log(response.data);
            setSearchResultsTour(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };
    return (
        <div className="mx-auto max-w-[1200px] py-10">
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-4">
                    <h1 className="mb-4 text-2xl font-bold">Kết quả tìm kiếm</h1>
                    <div>
                        <ul>
                            {isLoading ? (
                                <>
                                    {option === 'tour' ? (
                                        <>
                                            {searchResultsTour.length > 0 ? (
                                                <div className="flex w-full flex-wrap justify-between">
                                                    {searchResultsTour.map((data) => (
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
                                            ) : searchResultsTour.length < 1 && isFilter === true ? (
                                                <div>
                                                    Hiện tại chúng tôi chưa có tour mà bạn tìm. Bạn hãy thử tìm thêm các
                                                    tour khác nhé.
                                                </div>
                                            ) : (
                                                <div className="flex w-full flex-wrap justify-between">
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
                                        </>
                                    ) : option === 'hotel' ? (
                                        <>
                                            {searchResultsHotel.length > 0 ? (
                                                <div className="flex w-full flex-wrap justify-between">
                                                    {searchResultsHotel.map((data) => (
                                                        <ItemTravelHotel
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
                                            ) : searchResultsHotel.length < 1 && isFilter === true ? (
                                                <div>Không tìm thấy kết quả phù hợp</div>
                                            ) : (
                                                <div className="flex w-full flex-wrap justify-between">
                                                    {dataHotel.map((data) => (
                                                        <ItemTravelHotel
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
                                        </>
                                    ) : (
                                        <div>Lỗi hệ thống! Xin lỗi vì sự bất tiện này. Hãy thử lại sau nhé!</div>
                                    )}
                                </>
                            ) : (
                                <div>
                                    <Loader active />
                                </div>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchCategoryPage;
