import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { ChevronLeft, CircleCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Link, useParams } from 'react-router-dom';
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
    Dimmer,
    Loader,
    Input,
} from 'semantic-ui-react';
import { useTitle } from '../../../Components/useTitle';
import { useTheme } from '../../../Layouts/ThemeProvider';
import ModalComponents from '../../../Components/ModalComponents';
import InputField from '../../../Components/InputField';

function AdminQuestionPage() {
    useTitle('Quản lý danh mục giải đáp');
    const { url, darkMode } = useTheme();
    const { id } = useParams();
    const [categoriesHelpCenter, setCategoriesHelpCenter] = useState([]);
    const [categoriesQuestion, setCategoriesQuestion] = useState([]);
    const [deleteId, setDeleteId] = useState();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isSuccessAdd, setIsSuccessAdd] = useState(false);
    const [isSuccessDelete, setIsSuccessDelete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filterValue, setFilterValue] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [openModalAdd, setOpenModalAdd] = useState(false);

    const [dataModalDetails, setDataModalDetails] = useState(null);
    const [questionAdd, setQuestionAdd] = useState({
        answer: '',
        question: '',
        categoriesQuestionId: id,
    });
    const [open, setOpen] = useState(false);

    const handleOpenModalDetails = (e) => {
        setDataModalDetails(e);
        setOpenModal(true);
    };
    const handleOpenModalAdd = (e) => {
        setOpenModalAdd(true);
    };
    const handleCloseModalAdd = (e) => {
        setOpenModalAdd(false);
    };
    const handleCloseModalDetails = () => {
        setOpenModal(false);
    };
    const handleAddQuestionAnswer = (e) => {
        e.preventDefault();
        console.log(questionAdd);
        axios
            .post(`${url}/questionAnswer`, questionAdd)
            .then((response) => {
                setIsSuccessAdd(true);
                setTimeout(() => {
                    setIsSuccessAdd(false);
                    setOpen(false);
                }, 3000);

                setOpenModalAdd(false);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleUpdateQuestionAnswer = (e) => {
        e.preventDefault();
        console.log(dataModalDetails.id);
        axios
            .patch(`${url}/questionAnswer/${dataModalDetails.id}`, dataModalDetails)
            .then((response) => {
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false); // Hide the notification
                    setOpen(false);
                }, 3000);

                setOpenModal(false);

                window.location.reload();
            })
            .catch((error) => {
                // setOpenModal(false);
                console.log(error);
            });
    };

    const handleOpenDelete = (id) => {
        console.log(id);
        setDeleteId(id);
        setOpen(true);
    };
    useEffect(() => {
        axios
            .get(`${url}/questionAnswer/categoriesQuestionId/${id}`)
            .then((response) => {
                setCategoriesQuestion(response.data);
                setIsLoading(true);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        axios
            .get(`${url}/categoriesHelps`)
            .then((response) => {
                setCategoriesHelpCenter(response.data);
                setIsLoading(true);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const handleDelete = () => {
        axios
            .delete(`${url}/questionAnswer/${deleteId}`)
            .then((response) => {
                console.log('Category deleted successfully:', response.data);
                setOpen(false);
                setIsSuccessDelete(true);
                setTimeout(() => {
                    setIsSuccessDelete(false);
                }, 800);
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error deleting category:', error);
            });
    };
    const getCategoryNameById = (categoryId) => {
        const category = categoriesQuestion.find((category) => category._id === categoryId);
        return category ? category.name : 'Unknown Category';
    };
    const filteredData = categoriesQuestion.filter((category) =>
        category.question.toLowerCase().includes(filterValue.toLowerCase()),
    );
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    let currentData = filteredData.length <= itemsPerPage ? filteredData : filteredData.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePaginationChange = (e, { activePage }) => {
        const newCurrentPage = Math.min(activePage, totalPages);
        setCurrentPage(newCurrentPage);
    };
    return (
        <div className="px-4">
            <div className="flex items-center justify-between"></div>
            <div className="my-5 flex items-center justify-between">
                <Link
                    to={`/admin/adminCategoriesQuestion`}
                    className="flex items-center gap-2 rounded-md border border-red p-2 hover:bg-gray-500"
                >
                    <ChevronLeft className="text-red" /> <p className="">Quay lại</p>
                </Link>
                <h3 className="text-4xl font-bold">Quản lý danh mục giải đáp</h3>
                <Button primary onClick={handleOpenModalAdd} className="px-10 py-4">
                    Thêm danh mục
                </Button>
            </div>
            <div className="my-4 flex items-end justify-between gap-10">
                {/* <InputField type="select" label="Danh mục hổ trợ" options={categoriesHelpCenter} /> */}
                <InputField
                    label="Tìm kiếm"
                    placeholder="Tìm kiếm theo tên hoặc địa điểm"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className="w-1/2"
                />
            </div>
            <div className="my-12">
                <Table celled selectable inverted={darkMode}>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell className="w-[40%]">Câu hỏi</TableHeaderCell>
                            <TableHeaderCell>Trả lời</TableHeaderCell>
                            <TableHeaderCell textAlign="center">Lượt tương tác</TableHeaderCell>

                            <TableHeaderCell textAlign="center">Actions</TableHeaderCell>
                        </TableRow>
                    </TableHeader>

                    {isLoading ? (
                        <TableBody className="bg-black">
                            {currentData.map((data) => (
                                <TableRow key={data.id}>
                                    <TableCell className={`${darkMode && 'border bg-darkHF text-white'}`}>
                                        {data.question}
                                    </TableCell>
                                    <TableCell className={`${darkMode && 'border bg-darkHF text-white'}`}>
                                        {data.answer}
                                    </TableCell>

                                    <TableCell className={`${darkMode && 'border bg-darkHF text-white'} text-center`}>
                                        {data.like}
                                    </TableCell>
                                    <TableCell
                                        textAlign="center"
                                        className={`${darkMode && 'border bg-darkHF text-white'} text-center`}
                                    >
                                        <div className="flex items-center justify-center gap-3">
                                            <Popup
                                                position="top center"
                                                content="Chi tiết"
                                                trigger={
                                                    <Button
                                                        icon
                                                        style={{
                                                            background: 'transparent',
                                                            border: 'none',
                                                            padding: 0,
                                                        }}
                                                        onClick={() => handleOpenModalDetails(data)}
                                                    >
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </Button>
                                                }
                                            />

                                            <Popup
                                                position="top center"
                                                content="Xóa sản phẩm"
                                                trigger={
                                                    <Button
                                                        icon
                                                        style={{
                                                            background: 'transparent',
                                                            border: 'none',
                                                            padding: 0,
                                                        }}
                                                        onClick={() => handleOpenDelete(data.id)}
                                                    >
                                                        <Icon name="trash" />
                                                    </Button>
                                                }
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <ModalComponents
                                open={open}
                                handleClose={() => setOpen(false)}
                                handleOpen={() => setOpen(true)}
                                title="Bạn có chắc chắn muốn xóa sản phẩm không?"
                                handleYes={handleDelete}
                                titleYes="Xóa"
                            />
                        </TableBody>
                    ) : (
                        <Dimmer active inverted>
                            <Loader inverted content="Loading" />
                        </Dimmer>
                    )}
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
            <ModalComponents
                open={openModal}
                handleClose={handleCloseModalDetails}
                edit
                title="Chi tiết câu hỏi và trả lời"
                size="lg"
                children={
                    <>
                        {dataModalDetails && (
                            <div>
                                <div className="mb-4">
                                    <InputField
                                        label="Câu hỏi"
                                        value={dataModalDetails.question}
                                        type="textarea"
                                        sizeH="lg"
                                        onChange={(e) =>
                                            setDataModalDetails({ ...dataModalDetails, question: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="mb-4">
                                    <InputField
                                        label="Trả lời"
                                        value={dataModalDetails.answer}
                                        type="textarea"
                                        sizeH="lg"
                                        onChange={(e) =>
                                            setDataModalDetails({ ...dataModalDetails, answer: e.target.value })
                                        }
                                    />
                                </div>
                            </div>
                        )}
                    </>
                }
                titleYes="Cập nhật"
                handleYes={handleUpdateQuestionAnswer}
            />
            <ModalComponents
                open={openModalAdd}
                handleClose={handleCloseModalAdd}
                edit
                title="Thêm câu hỏi và trả lời"
                size="lg"
                children={
                    <div>
                        <div className="mb-4">
                            <InputField
                                label="Câu hỏi"
                                // value={dataModalDetails.question}
                                type="textarea"
                                sizeH="lg"
                                onChange={(e) => setQuestionAdd({ ...questionAdd, question: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <InputField
                                label="Trả lời"
                                // value={dataModalDetails.answer}
                                type="textarea"
                                sizeH="lg"
                                onChange={(e) => setQuestionAdd({ ...questionAdd, answer: e.target.value })}
                            />
                        </div>
                    </div>
                }
                titleYes="Thêm"
                handleYes={handleAddQuestionAnswer}
            />
            {isSuccessAdd && (
                <>
                    <div className="animate-slide-in-right fixed right-1 top-4 z-[100] min-w-56 rounded border-l-4 border-green bg-white px-4 py-6 text-black shadow-2xl">
                        <div className="flex items-center gap-2 text-lg">
                            <CircleCheck style={{ color: '#68FD87' }} />
                            <p>Thêm thành công!</p>
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
            {isSuccessDelete && (
                <>
                    <div className="animate-slide-in-right fixed right-1 top-4 z-[100] min-w-56 rounded border-l-4 border-green bg-white px-4 py-6 text-black shadow-2xl">
                        <div className="flex items-center gap-2 text-lg">
                            <CircleCheck style={{ color: '#68FD87' }} />
                            <p>Xóa thành công!</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default AdminQuestionPage;
