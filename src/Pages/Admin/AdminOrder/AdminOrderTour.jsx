import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import { Link } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHeaderCell,
    TableRow,
    Popup,
    Pagination,
    Loader,
    Dimmer,
} from 'semantic-ui-react';
import { useTheme } from '../../../Layouts/ThemeProvider';

function AdminOrderTourPage() {
    useEffect(() => {
        document.title = 'Đơn đặt Tour';
    }, []);

    const { url } = useTheme();
    const [dataPayment, setDataPayment] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState('Tất cả');
    const [dataFilter, setDataFilter] = useState([]);
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios
            .get(`${url}/tourBookings`)
            .then((response) => {
                const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setDataPayment(sortedData);
                setIsLoading(true);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [url]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, dataPayment.length);
    const currentData = dataPayment.length <= itemsPerPage ? dataPayment : dataPayment.slice(startIndex, endIndex);
    const totalPages = Math.ceil(dataPayment.length / itemsPerPage);

    const handlePaginationChange = (e, { activePage }) => {
        const newCurrentPage = Math.min(activePage, totalPages);
        setCurrentPage(newCurrentPage);
    };

    useEffect(() => {
        if (filter) {
            const filterData = dataPayment.filter((data) => data.orderStatus === filter);
            setDataFilter(filterData.length ? filterData : []);
        }
    }, [filter, dataPayment]);

    const formatPrice = (price) => `${price.toLocaleString('de-DE')}đ`;
    const formatDate = (data) => format(parseISO(data), 'dd/MM/yyyy HH:mm:ss');

    return (
        <div className="px-5">
            <div className="my-4">
                <div className="py-3">
                    <p className="text-3xl font-bold">Các đơn hàng</p>
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
                {isLoading ? (
                    <div className="mb-12">
                        <Table celled>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderCell>Mã đơn hàng</TableHeaderCell>
                                    <TableHeaderCell>Tên</TableHeaderCell>
                                    <TableHeaderCell>Địa chỉ</TableHeaderCell>
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
                                        <TableCell>{data.address}</TableCell>
                                        <TableCell textAlign="center">{formatDate(data.createdAt)}</TableCell>
                                        <TableCell textAlign="center">{formatPrice(data.totalPrice)}</TableCell>
                                        <TableCell textAlign="center">
                                            {data.id ? (
                                                data.status === 'Pending' ? (
                                                    <div className="rounded-md bg-[#FFF0ED] font-bold text-blue">
                                                        Đã chờ xác nhận
                                                    </div>
                                                ) : data.status === 'Confirmed' ? (
                                                    <div className="rounded-md bg-[#FFF0ED] font-bold text-[#ED7644]">
                                                        Đã xác nhận
                                                    </div>
                                                ) : data.status === 'Canceled' ? (
                                                    <div className="rounded-md bg-[#F2F7F4] py-2 font-bold text-[#EB5656]">
                                                        Hủy hóa đơn
                                                    </div>
                                                ) : null
                                            ) : null}
                                        </TableCell>
                                        <TableCell
                                            textAlign="center"
                                            // className="flex items-center justify-center gap-3"
                                        >
                                            {data.id && (
                                                <Popup
                                                    position="top center"
                                                    content="Chi tiết"
                                                    trigger={
                                                        <Link
                                                            to={`/admin/adminOrderTour/${data.id}`}
                                                            state={{ dataDetail: data }}
                                                        >
                                                            <FontAwesomeIcon icon={faEye} />
                                                        </Link>
                                                    }
                                                />
                                            )}
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
    );
}

export default AdminOrderTourPage;
