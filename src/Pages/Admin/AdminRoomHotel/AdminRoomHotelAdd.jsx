import axios from 'axios';
import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InputField from '../../../Components/InputField';
import { CirclePlus, CircleX, ChevronLeft } from 'lucide-react';
import { useTheme } from '../../../Layouts/ThemeProvider';
const optionTypeRoom = [
    { key: 'Standard', value: 'Standard', label: 'Tiêu chuẩn' },
    { key: 'Deluxe', value: 'Deluxe', label: 'Sang trọng' },
    { key: 'Suite', value: 'Suite', label: 'Thượng hạng' },
];
function AdminHotelRoomAddPage() {
    const { id } = useParams();
    const { darkMode, url } = useTheme();
    const navigate = useNavigate();
    const [room, setRoom] = useState({
        hotelId: id,
        roomnumber: 'Standard',
        image: 'https://pinkpeachhh.home.blog/wp-content/uploads/2020/12/luxury-bedroom-suite-resort-high-rise-hotel-with-working-table.jpg?w=1024',
        roomType: '',
        maxGuests: '',
        pricePerNight: '',
    });

    const handleInputChange = (field, value) => {
        setRoom((prevRoom) => ({
            ...prevRoom,
            [field]: value,
        }));
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setRoom((prevRoom) => ({
                ...prevRoom,
                image: reader.result,
            }));
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const fileInputRef = useRef(null);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleAddRoom = () => {
        axios
            .post(`${url}/rooms`, room)
            .then((response) => {
                console.log('Room added successfully:', response.data);
                navigate(-1); // Go back to the previous page
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="">
            <div
                className={`fixed left-0 right-0 top-0 z-[100] ml-[250px] px-5 pt-3 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] ${darkMode ? 'bg-darkHF text-white' : 'bg-white text-black'}`}
            >
                <div className="text-3xl">Thêm phòng</div>
                <div className="my-4 flex items-center justify-between">
                    <button
                        className="flex items-center gap-2 rounded-md border border-red p-2 hover:bg-gray-500"
                        onClick={() => navigate(-1)}
                    >
                        <ChevronLeft className="text-red" /> <p className="">Quay lại</p>
                    </button>
                    <button
                        className="flex items-center gap-2 rounded-md border border-blueButton p-2 hover:bg-gray-500"
                        onClick={handleAddRoom}
                    >
                        <CirclePlus className="text-blueButton" /> <p className="">Thêm phòng</p>
                    </button>
                </div>
            </div>
            <div className="pt-[100px]">
                <div className="my-5 rounded-md border-2 px-4 py-5">
                    <InputField
                        label="Tên phòng"
                        type="text"
                        value={room.roomnumber}
                        onChange={(e) => handleInputChange('roomnumber', e.target.value)}
                    />
                    <div>
                        <p className="font-bold">Hình ảnh:</p>
                        {room.image ? (
                            <div className="group relative w-80">
                                <img
                                    src={room.image}
                                    alt={room.roomnumber}
                                    className="h-80 w-80 cursor-pointer rounded-md"
                                    onClick={handleImageClick}
                                />
                                <div className="absolute inset-0 flex h-80 max-w-80 cursor-pointer items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
                                    <p className="font-bold text-white">Sửa ảnh</p>
                                </div>
                            </div>
                        ) : (
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                            />
                        )}
                    </div>
                    <InputField
                        label="Loại phòng"
                        type="select"
                        options={optionTypeRoom}
                        value={room.roomType}
                        onChange={(e) => handleInputChange('roomType', e.target.value)}
                    />
                    <InputField
                        label="Số khách tối đa"
                        type="number"
                        value={room.maxGuests}
                        onChange={(e) => handleInputChange('maxGuests', e.target.value)}
                    />
                    <InputField
                        label="Giá mỗi đêm"
                        type="number"
                        value={room.pricePerNight}
                        onChange={(e) => handleInputChange('pricePerNight', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}

export default AdminHotelRoomAddPage;
