import { useEffect, useState } from 'react';
import { useTheme } from '../../../Layouts/ThemeProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import InputField from '../../../Components/InputField';
import { CircleCheck } from 'lucide-react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
const optionVehicle = [
    { key: 'Xe khách', value: 'Xe khách', label: 'Xe khách' },
    { key: 'Máy bay', value: 'Máy bay', label: 'Máy bay' },
    { key: 'Xe lửa', value: 'Xe lửa', label: 'Xe lửa' },
];
function AdminTourAddPage() {
    // const { darkMode, url } = useTheme();
    // const location = useLocation();
    // const { idDescription, idIntro } = location.state || {};
    // const [tour, setTour] = useState({
    //     name: '',
    //     city: '',
    //     descriptionId: '',
    //     introId: '',
    //     image: 'https://www.vietnamairlines.com/~/media/Images/HeroBannerDestination/Vietnam/Herro%20banner/DANANG/Hero%20banner/1300x450/Danang_banner_2600x1111_0.jpg',

    //     duration: '',
    //     startDate: '',
    //     endDate: '',
    //     pricesAdult: '',
    //     priceChild: '',
    //     departureLocation: '',
    //     quantityTotalParticipate: '',
    //     quantityRegistered: 0,
    //     vehicle: 'Xe khách',
    // });
    // const [isSuccess, setIsSuccess] = useState(false);
    // const navigate = useNavigate();
    // const handleInputChange = (field, value) => {
    //     setTour((prevRoom) => ({
    //         ...prevRoom,
    //         [field]: value,
    //     }));
    // };
    // useEffect(() => {
    //     if (idDescription) {
    //         handleInputChange('descriptionId', idDescription);
    //     }
    // }, [idDescription]);
    // useEffect(() => {
    //     if (idIntro) {
    //         handleInputChange('introId', idIntro);
    //     }
    // }, [idIntro]);
    // const handleAdd = () => {
    //     if (idDescription && idIntro) {
    //         //  axios
    //         // .post(`${url}/tours`, tour)
    //         // .then((response) => {
    //         //     setIsSuccess(true);
    //         //     setTimeout(() => {
    //         //         setIsSuccess(false);
    //         //         navigate(-1);
    //         //     }, 800);
    //         // })
    //         // .catch((error) => {
    //         //     console.error('Error posting data:', error);
    //         //     setIsLoading(false);
    //         // });
    //     } else {
    //         alert('Vui lòng điền đầy đủ thông tin cho mô tả và giới thiệu');
    //     }

    //     // setIsLoading(true);
    //     // console.log('hotel', hotel);
    //     // axios
    //     //     .post(`${url}/hotels`, hotel)
    //     //     .then((response) => {
    //     //         setIsSuccess(true);
    //     //         setTimeout(() => {
    //     //             setIsSuccess(false);
    //     //             navigate(-1);
    //     //         }, 800);
    //     //     })
    //     //     .catch((error) => {
    //     //         console.error('Error posting data:', error);
    //     //         setIsLoading(false);
    //     //     });
    // };
    const { darkMode, url } = useTheme();
    const location = useLocation();
    console.log('location', location);
    const { idDescription, idIntro } = location.state || {};
    const navigate = useNavigate();

    // console.log('idDescription', idDescription);
    // console.log('idIntro', idIntro);

    const initialState = {
        name: '',
        city: '',
        descriptionId: '',
        introId: '',
        image: 'https://www.vietnamairlines.com/~/media/Images/HeroBannerDestination/Vietnam/Herro%20banner/DANANG/Hero%20banner/1300x450/Danang_banner_2600x1111_0.jpg',
        duration: '',
        startDate: '',
        endDate: '',
        pricesAdult: '',
        priceChild: '',
        departureLocation: '',
        quantityTotalParticipate: '',
        quantityRegistered: 0,
        vehicle: 'Xe khách',
    };

    const [tour, setTour] = useState(initialState);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const savedTour = JSON.parse(localStorage.getItem('tour'));
        if (savedTour) {
            setTour(savedTour);
        }
    }, []);

    useEffect(() => {
        if (idDescription) {
            handleInputChange('descriptionId', idDescription);
        }
    }, [idDescription]);

    useEffect(() => {
        if (idIntro) {
            handleInputChange('introId', idIntro);
        }
    }, [idIntro]);

    const handleInputChange = (field, value) => {
        setTour((prevTour) => {
            const updatedTour = { ...prevTour, [field]: value };
            localStorage.setItem('tour', JSON.stringify(updatedTour));
            return updatedTour;
        });
    };

    const handleAdd = () => {
        if (localStorage.getItem('descriptionId') !== '' && localStorage.getItem('introId') !== '') {
            axios
                .post(`${url}/tours`, tour)
                .then((response) => {
                    setIsSuccess(true);
                    localStorage.removeItem('tour');
                    setTimeout(() => {
                        setIsSuccess(false);
                        navigate('/admin/adminTour');
                    }, 800);
                })
                .catch((error) => {
                    console.error('Error posting data:', error);
                });
        } else {
            alert('Vui lòng điền đầy đủ thông tin cho mô tả và giới thiệu');
        }
    };
    return (
        <div className="p-5">
            <>
                <div
                    className={`fixed left-0 right-0 top-0 z-50 ml-[250px] flex items-center justify-between shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] ${darkMode ? 'bg-darkHF text-white' : 'bg-white text-black'} px-5 py-4 shadow-md`}
                >
                    <h3 className="text-4xl font-bold">Thêm khách sạn mới</h3>
                    <div>
                        <Button primary onClick={handleAdd}>
                            Thêm
                        </Button>

                        <Button onClick={() => navigate(-1)} color="red">
                            Hủy
                        </Button>
                    </div>
                </div>
                <div className={`mb-5 py-16`}>
                    <div>
                        <InputField
                            type="text"
                            label="Tên"
                            placeholder="Nhập tên"
                            required
                            value={tour.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                        <div className="flex items-center gap-10">
                            <InputField
                                type="text"
                                label="Thành phố"
                                placeholder="Nhập Thành phố"
                                required
                                value={tour.city}
                                onChange={(e) => handleInputChange('city', e.target.value)}
                            />
                            <InputField
                                type="text"
                                label="Địa chỉ"
                                placeholder="Nhập địa chỉ khởi hành"
                                required
                                value={tour.departureLocation}
                                onChange={(e) => handleInputChange('departureLocation', e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-10">
                            <InputField
                                type="date"
                                label="Ngày bắt đầu"
                                placeholder="Nhập Ngày bắt đầu"
                                required
                                value={tour.startDate}
                                onChange={(e) => handleInputChange('startDate', e.target.value)}
                            />
                            <InputField
                                type="date"
                                label="Ngày kết thúc"
                                placeholder="Nhập Ngày kết thúc"
                                required
                                min={tour.startDate}
                                value={tour.endDate}
                                onChange={(e) => handleInputChange('endDate', e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-10">
                            <InputField
                                type="number"
                                label="Giá người lớn"
                                placeholder="Nhập giá người lớn"
                                required
                                value={tour.pricesAdult}
                                onChange={(e) => handleInputChange('pricesAdult', e.target.value)}
                            />
                            <InputField
                                type="text"
                                label="Giá trẻ em"
                                placeholder="Nhập giá trẻ em"
                                required
                                value={tour.priceChild}
                                onChange={(e) => handleInputChange('priceChild', e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-10">
                            <InputField
                                type="number"
                                label="Số người tham gia"
                                placeholder="Nhập số người tham gia"
                                required
                                value={tour.quantityTotalParticipate}
                                onChange={(e) => handleInputChange('quantityTotalParticipate', e.target.value)}
                            />
                            <InputField
                                type="number"
                                label="Số ngày đi"
                                placeholder="Nhập số ngày đi"
                                required
                                value={tour.duration}
                                onChange={(e) => handleInputChange('duration', e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-10">
                            <InputField
                                type="select"
                                label="Phương tiện đi chuyển"
                                placeholder="Nhập phương tiện"
                                required
                                options={optionVehicle}
                                value={tour.vehicle}
                                onChange={(e) => handleInputChange('vehicle', e.target.value)}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <p>Mô tả:</p>
                                <Link
                                    to={`/admin/adminTour/adminTourAddDescription`}
                                    state={{ city: tour.city }}
                                    className="text-base"
                                >
                                    Thêm mô tả
                                </Link>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <p>Lịch trình:</p>
                                <Link to={`/admin/adminTour/adminTourAddIntro`} className="text-base">
                                    Thêm lịch trình
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>

            {isSuccess && (
                <>
                    <div className="animate-slide-in-right fixed right-1 top-4 z-[100] min-w-56 rounded border-l-4 border-green bg-white px-4 py-6 text-black shadow-2xl">
                        <div className="flex items-center gap-2 text-lg">
                            <CircleCheck style={{ color: '#68FD87' }} />
                            <p>Thêm thành công!</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default AdminTourAddPage;
