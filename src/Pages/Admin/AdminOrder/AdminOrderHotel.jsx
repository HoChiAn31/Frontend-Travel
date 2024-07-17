import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
// import ReactFrappeChart from 'react-frappe-charts';
import { Link } from 'react-router-dom';
import {
    TableRow,
    TableHeaderCell,
    TableHeader,
    TableCell,
    TableBody,
    Table,
    Popup,
    Icon,
    ModalActions,
    Button,
    Header,
    Modal,
    Pagination,
    Loader,
    Dimmer,
} from 'semantic-ui-react';
import { useTheme } from '../../../Layouts/ThemeProvider';

function AdminOrderHotelPage() {
    useEffect(() => {
        document.title = 'Đơn đặt Tour';
    }, []);
    const { url } = useTheme();
    const [dataPayment, setDataPayment] = useState([]);
    const [deleteCategoryId, setDeleteCategoryId] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState('Tất cả');
    const [dataFilter, setDataFilter] = useState([]);

    useEffect(() => {
        axios
            .get(`${url}/hotelBookings`)
            .then((response) => {
                // Sort the data by createdAt in descending order
                const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setDataPayment(sortedData);
                setIsLoading(true);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // ====================================================================
    // Số mục trên mỗi trang
    const itemsPerPage = 5;
    // Trang hiện tại
    const [currentPage, setCurrentPage] = useState(1);
    // Tính toán vị trí bắt đầu và kết thúc của mục trên trang hiện tại
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, dataPayment.length);

    // Dữ liệu trên trang hiện tại
    let currentData = dataPayment.length <= itemsPerPage ? dataPayment : dataPayment.slice(startIndex, endIndex);

    // Tổng số trang
    const totalPages = Math.ceil(dataPayment.length / itemsPerPage);

    // Hàm xử lý khi chuyển trang
    const handlePaginationChange = (e, { activePage }) => {
        // Đảm bảo activePage không vượt quá totalPages
        const newCurrentPage = Math.min(activePage, totalPages);
        setCurrentPage(newCurrentPage);
    };

    useEffect(() => {
        if (filter) {
            let filterData = dataPayment.filter((data) => data.orderStatus === filter);
            if (filterData.length === 0) {
                setDataFilter([]);
            } else {
                setDataFilter(filterData);
            }
        }
    }, [filter, dataPayment]);

    function formatPrice(price) {
        return price.toLocaleString('de-DE') + 'đ';
    }
    function formatDate(data) {
        const date = parseISO(data);
        return format(date, 'dd/MM/yyyy HH:mm:ss');
    }
    console.log(currentData);
    return (
        <div className="px-5">
            <div>
                <div className="my-4">
                    <div className="py-3">
                        <p className="text-3xl font-bold">Các đơn hàng khách sạn</p>
                    </div>
                    <div className="mb-6 flex w-1/2 items-center">
                        <select
                            className="mt-1 w-1/2 rounded border border-gray-300 p-2"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="Tất cả">Tất cả đơn hàng</option>
                            <option value="Đã đặt hàng">Đã đặt hàng</option>
                            <option value="Đã thanh toán">Đã thanh toán</option>
                            <option value="Đã giao hàng">Đã giao hàng</option>
                            <option value="Giao hàng thành công">Giao hàng thành công</option>
                            <option value="Hủy đơn">Huỷ đơn</option>
                        </select>
                    </div>
                    {/* ================================= */}
                    {isLoading ? (
                        <div className="mb-12">
                            <Table celled>
                                <TableHeader>
                                    <TableRow>
                                        <TableHeaderCell>Mã đơn hàng</TableHeaderCell>
                                        <TableHeaderCell>Tên</TableHeaderCell>
                                        {/* <TableHeaderCell>Địa chỉ</TableHeaderCell> */}
                                        <TableHeaderCell textAlign="center">Ngày đặt hàng</TableHeaderCell>
                                        <TableHeaderCell textAlign="center">Tổng tiền</TableHeaderCell>

                                        <TableHeaderCell textAlign="center">Mô tả</TableHeaderCell>
                                        <TableHeaderCell textAlign="center">Actions</TableHeaderCell>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {(filter === 'Tất cả' ? currentData : dataFilter).map((data) => (
                                        <TableRow key={data.id}>
                                            <TableCell>{data.id}</TableCell>
                                            <TableCell>{data.name}</TableCell>
                                            {/* <TableCell>{data.address}</TableCell> */}
                                            <TableCell textAlign="center">{formatDate(data.createdAt)}</TableCell>

                                            <TableCell textAlign="center">{formatPrice(data.totalPrice)}</TableCell>

                                            <TableCell textAlign="center">
                                                {data.id ? (
                                                    data.status === 'Pending' ? (
                                                        <div className="rounded-md bg-[#FFF0ED] font-bold text-blue">
                                                            Đã chờ xác nhận
                                                        </div>
                                                    ) : data.status === 'Confirm' ? (
                                                        <div className="rounded-md bg-[#FFF0ED] font-bold text-[#ED7644]">
                                                            Đã xác nhận
                                                        </div>
                                                    ) : data.status === 'Cancel' ? (
                                                        <div className="rounded-md bg-[#F2F7F4] py-2 font-bold text-[#EB5656]">
                                                            Hủy hóa đơn
                                                        </div>
                                                    ) : null
                                                ) : null}
                                            </TableCell>

                                            <TableCell textAlign="center">
                                                {data.id ? (
                                                    <Popup
                                                        position="top center"
                                                        content="Chi tiết"
                                                        trigger={
                                                            <Link
                                                                to={`/admin/adminOrderHotel/${data.id}`}
                                                                state={{ dataDetail: data }}
                                                            >
                                                                <FontAwesomeIcon icon={faEye} />
                                                            </Link>
                                                        }
                                                    />
                                                ) : null}
                                            </TableCell>
                                        </TableRow>
                                    ))}
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
                    ) : (
                        <Dimmer active inverted>
                            <Loader inverted>Loading</Loader>
                        </Dimmer>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminOrderHotelPage;
