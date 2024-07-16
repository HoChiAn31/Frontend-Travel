import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';

import {
    Button,
    Form,
    TableRow,
    TableHeaderCell,
    TableHeader,
    TableCell,
    TableBody,
    Table,
    Popup,
    Icon,
    ModalActions,
    Header,
    Modal,
    Pagination,
    Dimmer,
    Loader,
    Input,
} from 'semantic-ui-react';
import axios from 'axios';
import { CircleCheck } from 'lucide-react';
import InputField from '../../../Components/InputField';
import FormatDate from '../../../Components/FormatDate';
import FormatPrice from '../../../Components/FormatPrice';

import { useTheme } from '../../../Layouts/ThemeProvider';
const optionVehicle = [
    { key: 'Xe khách', value: 'Xe khách', label: 'Xe khách' },
    { key: 'Máy bay', value: 'Máy bay', label: 'Máy bay' },
    { key: 'Xe lửa', value: 'Xe lửa', label: 'Xe lửa' },
];
function AdminHotelEditPage() {
    const { darkMode, url } = useTheme();
    useEffect(() => {
        document.title = `Chi tiết ${dataDetail.name}  `;
    }, []);
    const location = useLocation();

    const { dataDetail } = location.state;
    const [hotel, setHotel] = useState({
        name: dataDetail.name,
        address: dataDetail.address,
        city: dataDetail.city,
        image: dataDetail.images[0],
        description: dataDetail.description,
        pricePerNight: dataDetail.pricePerNight,
    });
    // console.log(hotel);
    const handleInputChange = (field, value) => {
        setHotel((prevRoom) => ({
            ...prevRoom,
            [field]: value,
        }));
    };
    // const [name, setName] = useState(dataDetail.name);
    // const [address, setAddress] = useState(dataDetail.address);
    // const [city, setCity] = useState(dataDetail.city);
    // const [image, setImage] = useState(dataDetail.images[0]);
    // const [description, setDescription] = useState(dataDetail.description);
    const [pricePerNight, setPricePerNight] = useState(dataDetail.pricepernight);
    const [dataRoom, setDataRoom] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [roomIdDelete, setRoomIdDelete] = useState();
    const [isSuccess, setIsSuccess] = useState(false);
    // const [valueDescription, setValueDescription] = useState(dataDetail.description);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleOpenDelete = (id) => {
        console.log(id);
        setRoomIdDelete(id);
        setOpen(true);
    };

    const handleDelete = () => {
        axios
            .delete(`${url}/rooms/${roomIdDelete}`)
            .then((response) => {
                console.log('Category deleted successfully:', response.data);
                setOpen(false);
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                }, 800);
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error deleting category:', error);
            });
    };
    useEffect(() => {
        if (dataDetail?.id) {
            axios
                .get(`${url}/rooms/hotel/${dataDetail.id}`)
                .then((response) => {
                    const sortedData = response.data.slice().sort((a, b) => a.roomNumber.localeCompare(b.roomNumber));
                    setDataRoom(sortedData);
                    setIsLoading(true);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, [dataDetail]);

    const handleChange = (setter) => (e) => {
        setter(e.target.value);
    };
    // const handleValueDescription = (e) => {
    //     setValueDescription(e.target.value);
    // };
    // const handleValueName = (e) => {
    //     setName(e.target.value);
    // };
    // useEffect(() => {
    //     if (description) {
    //         console.log('Description:', description);
    //     }
    // }, [description]);
    const handleUpdate = () => {
        console.log('hotel', hotel);
        axios
            .patch(`${url}/hotels/${dataDetail.id}`, hotel)
            .then((response) => {
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    navigate(-1);
                }, 800);
            })
            .catch((error) => {
                console.error('Error posting data:', error);
            });
    };
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }
    // Số mục trên mỗi trang
    const itemsPerPage = 5;
    // Trang hiện tại
    const [currentPage, setCurrentPage] = useState(1);
    // Tính toán vị trí bắt đầu và kết thúc của mục trên trang hiện tại
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, dataRoom.length);

    // Dữ liệu trên trang hiện tại
    let currentData = dataRoom.length <= itemsPerPage ? dataRoom : dataRoom.slice(startIndex, endIndex);

    // Tổng số trang
    const totalPages = Math.ceil(dataRoom.length / itemsPerPage);

    // Hàm xử lý khi chuyển trang
    const handlePaginationChange = (e, { activePage }) => {
        // Đảm bảo activePage không vượt quá totalPages
        const newCurrentPage = Math.min(activePage, totalPages);
        setCurrentPage(newCurrentPage);
    };
    return (
        <div className="p-5">
            {isLoading && (
                <>
                    <div
                        className={`fixed left-0 right-0 top-0 z-50 ml-[250px] flex items-center justify-between shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] ${darkMode ? 'bg-darkHF text-white' : 'bg-white text-black'} px-5 py-4 shadow-md`}
                    >
                        <h3 className="text-4xl font-bold">
                            Chi tiết <span className="text-blue-500">{hotel.name}</span>
                        </h3>
                        <div className="flex gap-5">
                            <Button primary onClick={handleUpdate}>
                                Cập nhật
                            </Button>

                            <Button onClick={() => navigate(-1)} color="red">
                                Hủy
                            </Button>
                        </div>
                    </div>
                    <div className={`mb-5 py-16`}>
                        <div>
                            <p className="font-bold">Hình ảnh:</p>
                            <img src={hotel.image} alt="image" className="h-80 w-80" />
                        </div>
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
                        </Form>
                        <div>
                            <div className="my-6">
                                <div className="my-4 flex items-center justify-between">
                                    <p className="mb-2 font-bold">Danh sách các phòng hiện có:</p>
                                    <Button
                                        onClick={() => navigate(`/admin/adminRoomHotelAdd/${dataDetail.id}`)}
                                        // className="bg-blueButton text-white"
                                        color="primary"
                                    >
                                        Thêm phòng
                                    </Button>
                                </div>
                                <div className="">
                                    <Table celled>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHeaderCell>Tên</TableHeaderCell>

                                                <TableHeaderCell>Loại phòng</TableHeaderCell>
                                                <TableHeaderCell className="text-center">Giá phòng</TableHeaderCell>

                                                <TableHeaderCell textAlign="center">Actions</TableHeaderCell>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody>
                                            {currentData.length > 0 ? (
                                                <>
                                                    {currentData.map((data) => (
                                                        <TableRow key={data.id}>
                                                            <TableCell>{data.roomNumber}</TableCell>
                                                            <TableCell>{data.roomType}</TableCell>
                                                            <TableCell className="text-center">
                                                                <FormatPrice price={data.pricePerNight} hotel />
                                                            </TableCell>

                                                            <TableCell textAlign="center">
                                                                <div className="flex items-center justify-center gap-3">
                                                                    <Popup
                                                                        position="top center"
                                                                        content="Chi tiết"
                                                                        trigger={
                                                                            <Link
                                                                                to={`/admin/adminRoomHotelEdit/${data.id}`}
                                                                                state={{ dataDetail: data }}
                                                                            >
                                                                                <FontAwesomeIcon icon={faEye} />
                                                                            </Link>
                                                                        }
                                                                    />

                                                                    <Popup
                                                                        position="top center"
                                                                        content="Xóa phòng"
                                                                        trigger={
                                                                            <Button
                                                                                icon
                                                                                style={{
                                                                                    background: 'transparent',
                                                                                    border: 'none',
                                                                                    padding: 0,
                                                                                }}
                                                                                onClick={() =>
                                                                                    handleOpenDelete(data.id)
                                                                                }
                                                                            >
                                                                                <Icon name="trash" />
                                                                            </Button>
                                                                        }
                                                                    />
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                    <Modal
                                                        open={open}
                                                        onClose={() => setOpen(false)}
                                                        onOpen={() => setOpen(true)}
                                                    >
                                                        <Header
                                                            icon="archive"
                                                            content="Bạn có chắc chắn muốn xóa sản phẩm không?"
                                                        />
                                                        <ModalActions>
                                                            <Button color="green" onClick={handleDelete}>
                                                                <Icon name="checkmark" /> Yes
                                                            </Button>
                                                            <Button color="red" onClick={() => setOpen(false)}>
                                                                <Icon name="remove" /> No
                                                            </Button>
                                                        </ModalActions>
                                                    </Modal>
                                                </>
                                            ) : (
                                                <div>
                                                    <p>Không tìm thấy phòng nào.</p>
                                                </div>
                                            )}
                                        </TableBody>
                                    </Table>
                                    <div className="text-center">
                                        <Pagination
                                            activePage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={handlePaginationChange}
                                            prevItem={false}
                                            nextItem={false}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
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

export default AdminHotelEditPage;
