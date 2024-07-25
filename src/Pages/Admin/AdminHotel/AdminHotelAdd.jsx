import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import axios from 'axios';
import { CircleCheck } from 'lucide-react';
import InputField from '../../../Components/InputField';
import { useTheme } from '../../../Layouts/ThemeProvider';
import { useTitle } from '../../../Components/useTitle';

function AdminHotelAddPage() {
    useTitle('Thêm khách sạn');

    const { darkMode, url } = useTheme();

    const [hotel, setHotel] = useState({
        name: '',
        address: '',
        city: '',
        description: '',
        pricePerNight: '',
    });
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (field, value) => {
        setHotel((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleImageChange = (e) => {
        const files = e.target.files; // Lấy danh sách file từ input
        const filesArray = Array.from(files); // Chuyển đổi thành mảng
        setImages(filesArray); // Cập nhật state images
    };

    const handleAdd = () => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('name', hotel.name);
        formData.append('address', hotel.address);
        formData.append('city', hotel.city);
        formData.append('description', hotel.description);
        formData.append('pricePerNight', hotel.pricePerNight);
        images.forEach((image) => {
            formData.append('images', image);
        });

        axios
            .post(`${url}/hotels`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    navigate(-1);
                }, 800);
            })
            .catch((error) => {
                console.error('Error posting data:', error);
                setIsLoading(false);
            });
    };

    return (
        <div className="p-5">
            <div
                className={`fixed left-0 right-0 top-0 z-50 ml-[250px] flex items-center justify-between shadow-md ${darkMode ? 'bg-darkHF text-white' : 'bg-white text-black'} px-5 py-4`}
            >
                <h3 className="text-4xl font-bold">Thêm khách sạn mới</h3>
                <div>
                    <Button primary onClick={handleAdd} loading={isLoading}>
                        Thêm
                    </Button>
                    <Link to="/suppliersCategory">
                        <Button color="red">Hủy</Button>
                    </Link>
                </div>
            </div>
            <div className={`mb-5 py-16`}>
                <Form size="large">
                    <InputField
                        type="text"
                        label="Tên"
                        placeholder="Nhập tên"
                        required
                        value={hotel.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                    <div className="flex items-center gap-10">
                        <InputField
                            type="text"
                            label="Địa chỉ"
                            placeholder="Nhập Địa chỉ"
                            required
                            value={hotel.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                        />
                        <InputField
                            type="text"
                            label="Thành phố"
                            placeholder="Nhập Thành phố"
                            required
                            value={hotel.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-20">
                        <InputField
                            type="number"
                            label="Giá phòng"
                            placeholder="Nhập Giá"
                            required
                            value={hotel.pricePerNight}
                            onChange={(e) => handleInputChange('pricePerNight', e.target.value)}
                        />
                    </div>
                    <div className="">
                        <InputField
                            type="textarea"
                            label="Mô tả"
                            placeholder="Nhập Mô tả"
                            required
                            value={hotel.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="mb-2 block">Hình ảnh</label>
                        <input type="file" multiple accept="image/*" onChange={handleImageChange} />
                    </div>
                </Form>
            </div>

            {isSuccess && (
                <div className="animate-slide-in-right fixed right-1 top-4 z-[100] min-w-56 rounded border-l-4 border-green bg-white px-4 py-6 text-black shadow-2xl">
                    <div className="flex items-center gap-2 text-lg">
                        <CircleCheck style={{ color: '#68FD87' }} />
                        <p>Thêm thành công!</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminHotelAddPage;
