import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, FormField, TextArea, Form, FormGroup } from 'semantic-ui-react';
// import FormFieldComponent from '../../Components/FormFieldComponent';
import axios from 'axios';
import { CircleCheck } from 'lucide-react';
import InputField from '../../../Components/InputField';
import FormatDate from '../../../Components/FormatDate';
import { useTheme } from '../../../Layouts/ThemeProvider';
const optionVehicle = [
    { key: 'Xe khách', value: 'Xe khách', label: 'Xe khách' },
    { key: 'Máy bay', value: 'Máy bay', label: 'Máy bay' },
    { key: 'Xe lửa', value: 'Xe lửa', label: 'Xe lửa' },
];
function AdminTourEditPage() {
    const { darkMode, url } = useTheme();
    useEffect(() => {
        document.title = `Chi tiết ${dataDetail.name}  `;
    }, []);
    const location = useLocation();
    const { dataDetail } = location.state;
    const [name, setName] = useState(dataDetail.name);
    const [city, setCity] = useState(dataDetail.city);
    const [image, setImage] = useState(dataDetail.image);
    const [duration, setDuration] = useState(dataDetail.duration);
    const [description, setDescription] = useState([]);
    const [intro, setIntro] = useState([]);
    const [startDate, setStartDate] = useState(dataDetail.startDate);
    const [endDate, setEndDate] = useState(dataDetail.endDate);
    const [priceChild, setPriceChild] = useState(dataDetail.priceChild);
    const [pricesAdult, setPricesAdult] = useState(dataDetail.pricesAdult);
    const [quantityRegistered, setQuantityRegistered] = useState(dataDetail.quantityRegistered);
    const [quantityTotalParticipate, setQuantityTotalParticipate] = useState(dataDetail.quantityTotalParticipate);
    const [vehicle, setVehicle] = useState(dataDetail.vehicle);
    const [isLoading, setIsLoading] = useState(false);
    // const [valueDescription, setValueDescription] = useState(dataDetail.description);
    const navigate = useNavigate();
    useEffect(() => {
        if (dataDetail?.descriptionId) {
            axios
                .get(`${url}/tourSchedules/${dataDetail.descriptionId}`)
                .then((response) => {
                    setDescription(response.data);
                    setIsLoading(true);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        if (dataDetail?.introId) {
            axios
                .get(`${url}/tourIntroductions/${dataDetail.introId}`)
                .then((response) => {
                    setIntro(response.data);
                    setIsLoading(true);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, [dataDetail]);
    const [isSuccess, setIsSuccess] = useState(false);
    const handleChange = (setter) => (e) => {
        setter(e.target.value);
    };
    // useEffect(() => {
    //     if (description) {
    //         console.log('Description:', description);
    //     }
    // }, [description]);
    const handleUpdate = () => {
        // axios
        //     .patch(`https://backend-book-store-two.vercel.app/categorySupplier/${dataDetail._id}`, {
        //         name: valueName,
        //         description: valueDescription,
        //     })
        //     .then((response) => {
        //         setIsSuccess(true);
        //         setTimeout(() => {
        //             setIsSuccess(false);
        //             navigate('/suppliersCategory');
        //         }, 800);
        //     })
        //     .catch((error) => {
        //         console.error('Error posting data:', error);
        //     });
    };
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }
    return (
        <div className="p-5">
            {isLoading && (
                <>
                    <div
                        className={`fixed left-0 right-0 top-0 z-50 ml-[250px] flex items-center justify-between shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] ${darkMode ? 'bg-darkHF text-white' : 'bg-white text-black'} px-5 py-4 shadow-md`}
                    >
                        <h3 className="text-4xl font-bold">
                            Chi tiết <span className="text-blue-500">{dataDetail.name}</span>
                        </h3>
                        <div>
                            <Button primary onClick={handleUpdate}>
                                Cập nhật
                            </Button>
                            <Link to="/admin/adminTour">
                                <Button color="red">Hủy</Button>
                            </Link>
                        </div>
                    </div>
                    <div className={`mb-5 py-16`}>
                        <div>
                            <p className="font-bold">Hình ảnh:</p>
                            <img src={image} alt="image" className="h-80 w-80" />
                        </div>
                        <Form size="large">
                            <InputField
                                type="text"
                                label="Tên"
                                placeholder="Nhập tên"
                                required
                                value={name}
                                onChange={handleChange(setName)}
                            />
                            <InputField
                                type="text"
                                label="Thành phố"
                                placeholder="Nhập Thành phố"
                                required
                                value={city}
                                onChange={handleChange(setCity)}
                            />
                            <div className="grid grid-cols-2 gap-20">
                                <InputField
                                    type="number"
                                    label="Số ngày đi"
                                    placeholder="Nhập Số ngày đi"
                                    required
                                    min={0}
                                    value={duration}
                                    onChange={handleChange(setDuration)}
                                />
                                <InputField
                                    type="number"
                                    label="Số người tham gia"
                                    placeholder="Nhập Số người tham gia"
                                    required
                                    value={quantityTotalParticipate}
                                    onChange={handleChange(setQuantityTotalParticipate)}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-20">
                                <InputField
                                    type="date"
                                    label="Ngày bắt đầu"
                                    placeholder="Nhập Ngày bắt đầu"
                                    required
                                    value={formatDate(startDate)}
                                    // value="2018-07-22"
                                    onChange={handleChange(setStartDate)}
                                />
                                <InputField
                                    type="date"
                                    label="Ngày kết thúc"
                                    placeholder="Nhập Ngày kết thúc"
                                    required
                                    value={formatDate(endDate)}
                                    onChange={handleChange(setEndDate)}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-20">
                                <InputField
                                    type="number"
                                    label="Giá người lớn"
                                    placeholder="Nhập Giá"
                                    required
                                    value={pricesAdult}
                                    onChange={handleChange(setPricesAdult)}
                                />
                                <InputField
                                    type="number"
                                    label="Giá trẻ em"
                                    placeholder="Nhập Giá"
                                    required
                                    value={priceChild}
                                    onChange={handleChange(setPriceChild)}
                                />
                            </div>

                            <InputField
                                type="select"
                                label="Phương tiện"
                                placeholder="Nhập Phương tiện"
                                required
                                options={optionVehicle}
                                value={vehicle}
                                onChange={handleChange(setVehicle)}
                            />
                            <div>
                                <div className="flex gap-2">
                                    <p className="font-bold">Mô tả:</p>
                                    <Link
                                        to={`/admin/adminTourEdit/adminTourEditDescription/${dataDetail.id}`}
                                        state={{ dataDetail: dataDetail }}
                                        className="hover:underline"
                                    >
                                        {' '}
                                        Xem chi tiết
                                    </Link>
                                </div>
                                <div className="flex gap-2">
                                    <p className="font-bold">Giới thiệu:</p>
                                    <Link
                                        to={`/admin/adminTourEdit/adminTourEditIntro/${dataDetail.id}`}
                                        state={{ dataDetail: dataDetail }}
                                        className="hover:underline"
                                    >
                                        {' '}
                                        Xem chi tiết
                                    </Link>
                                </div>
                                {/* <p>Mô tả:</p>
                                {description.description.map((desc, index) => (
                                    <div key={index}>
                                        <InputField type="text" value={desc.title} />

                                        <InputField type="text" value={desc.imageCaption} />
                                        <img src={desc.image} alt={desc.imageCaption} className="h-80 w-80" />

                                        <button
                                        // onClick={() => handleDeleteDescription(index)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                        // onClick={() =>
                                        //     handleEditDescription(index, {
                                        //         ...desc,
                                        //         title: prompt('Enter new title', desc.title),
                                        //     })
                                        // }
                                        >
                                            Edit
                                        </button>
                                    </div>
                                ))} */}
                            </div>
                        </Form>
                    </div>
                </>
            )}
            {isSuccess && (
                <>
                    <div className="animate-slide-in-right fixed right-1 top-4 z-[100] min-w-56 rounded border-l-4 border-green bg-white px-4 py-6 text-black shadow-2xl">
                        <div className="flex items-center gap-2 text-lg">
                            <CircleCheck style={{ color: '#68FD87' }} />
                            <p>Cập nhật thành công!</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default AdminTourEditPage;
