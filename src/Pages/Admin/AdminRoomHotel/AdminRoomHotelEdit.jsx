import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../../Layouts/ThemeProvider';
import { useState } from 'react';
import { Button } from 'semantic-ui-react';
import InputField from '../../../Components/InputField';
import axios from 'axios';
import { CircleCheck } from 'lucide-react';
const optionTypeRoom = [
    { key: 'Standard', value: 'Standard', label: 'Tiêu chuẩn' },
    { key: 'Deluxe', value: 'Deluxe', label: 'Sang trọng' },
    { key: 'Suite', value: 'Suite', label: 'Thượng hạng' },
];
function AdminRoomHotelEditPage() {
    const { darkMode, url } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const { dataDetail } = location.state;
    const [roomNumber, setroomNumber] = useState(dataDetail.roomNumber);
    const [image, setImage] = useState(dataDetail.image);
    const [roomType, setRoomType] = useState(dataDetail.roomType);
    const [maxGuests, setMaxGuests] = useState(dataDetail.maxGuests);
    const [pricePerNight, setPricePerNight] = useState(dataDetail.pricePerNight);
    const [showNotification, setShowNotification] = useState(false);
    const [defaultImage, setDefaultImage] = useState(
        'https://pinkpeachhh.home.blog/wp-content/uploads/2020/12/luxury-bedroom-suite-resort-high-rise-hotel-with-working-table.jpg?w=1024',
    );
    const handleUpdate = () => {
        const room = {
            roomNumber: roomNumber,
            roomType: roomType,
            maxGuests: maxGuests,
            pricePerNight: pricePerNight,
        };
        console.log(room);
        axios
            .patch(`${url}/rooms/${id}`, room)
            .then((response) => {
                setShowNotification(true); // Hiển thị thông báo
                setTimeout(() => {
                    setShowNotification(false); // Hide the notification
                    navigate(-1);
                }, 3000);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const handleChange = (setter) => (e) => {
        setter(e.target.value);
    };
    return (
        <div>
            <div
                className={`fixed left-0 right-0 top-0 z-50 ml-[250px] flex items-center justify-between shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] ${darkMode ? 'bg-darkHF text-white' : 'bg-white text-black'} px-5 py-4 shadow-md`}
            >
                <h3 className="text-4xl font-bold">
                    Chi tiết phòng <span className="text-blue-500">{roomNumber}</span>
                </h3>
                <div className="flex gap-5 px-5">
                    <Button primary onClick={handleUpdate}>
                        Cập nhật
                    </Button>
                    <Button onClick={() => navigate(-1)} color="red">
                        Hủy
                    </Button>
                </div>
            </div>
            <div className="pt-16">
                <p className="text-base font-bold">Hình ảnh:</p>
                <div className="grid grid-cols-5 py-5">
                    <img src={image} alt="" className="h-48 w-40" />
                </div>
            </div>
            <div>
                <div className="grid grid-cols-2 gap-20">
                    <InputField
                        type="text"
                        label="Tên"
                        placeholder="Nhập tên"
                        required
                        value={roomNumber}
                        onChange={handleChange(setroomNumber)}
                    />
                    <InputField
                        type="select"
                        label="Loại phòng"
                        placeholder="Chọn loại phòng"
                        required
                        options={optionTypeRoom}
                        value={roomType}
                        onChange={handleChange(setRoomType)}
                    />
                </div>

                <div className="grid grid-cols-2 gap-20">
                    <InputField
                        type="number"
                        label="Số người ở"
                        placeholder="Nhập số người ở"
                        required
                        value={maxGuests}
                        // value="2018-07-22"
                        onChange={handleChange(setMaxGuests)}
                    />
                    <InputField
                        type="number"
                        label="Giá phòng"
                        placeholder="Nhập giá phòng"
                        required
                        value={pricePerNight}
                        onChange={handleChange(setPricePerNight)}
                    />
                </div>
            </div>
            {showNotification && (
                <div className="animate-slide-in-right fixed right-1 top-4 z-[100] rounded border-l-4 border-green bg-white px-4 py-6 text-black shadow-2xl">
                    <div className="flex items-center justify-between gap-2 text-lg">
                        <CircleCheck className="text-green" />
                        <p>Cập nhật sản phẩm thành công!</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminRoomHotelEditPage;
