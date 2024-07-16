import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { CircleCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
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
    Button,
    Pagination,
    Dimmer,
    Loader,
} from 'semantic-ui-react';
import { useTitle } from '../../../Components/useTitle';
import { useTheme } from '../../../Layouts/ThemeProvider';
import ModalComponents from '../../../Components/ModalComponents';
import InputField from '../../../Components/InputField';

function AdminCategoriesQuestionPage() {
    useTitle('Quản lý danh mục giải đáp');
    const { url, darkMode } = useTheme();
    const [categoriesHelpCenter, setCategoriesHelpCenter] = useState([]);
    const [categoriesQuestion, setDataCategoriesQuestion] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    const [isSuccessAdd, setIsSuccessAdd] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filterValueCategoriesHelp, setFilterValueCategoriesHelp] = useState('');
    const [dataFilterValueCategoriesHelp, setDataFilterValueCategoriesHelp] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const [open, setOpen] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [categoriesAddQuestion, setCategoriesAddQuestion] = useState({
        categoryId: '1a146bee-9691-480a-946e-415c2c4f9eeb',
        name: '',
    });

    // Handle add modal
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    // Fetch categories help center on mount
    useEffect(() => {
        axios
            .get(`${url}/categoriesHelps`)
            .then((response) => setCategoriesHelpCenter(response.data))
            .catch((error) => console.error('Error fetching data:', error));
    }, [url]);

    // Set default filter value when categoriesHelpCenter changes
    useEffect(() => {
        if (categoriesHelpCenter.length > 0) {
            setFilterValueCategoriesHelp(categoriesHelpCenter[0].id);
        }
    }, [categoriesHelpCenter]);

    // Fetch questions and categories help center on mount
    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`${url}/questions`)
            .then((response) => setDataCategoriesQuestion(response.data))
            .catch((error) => console.error('Error fetching data:', error))
            .finally(() => setIsLoading(false));

        axios
            .get(`${url}/categoriesHelps`)
            .then((response) => setCategoriesHelpCenter(response.data))
            .catch((error) => console.error('Error fetching data:', error))
            .finally(() => setIsLoading(false));
    }, [url]);

    // Filter questions based on selected category
    useEffect(() => {
        const filters = categoriesQuestion.filter((data) => data.categoryId === filterValueCategoriesHelp);
        setDataFilterValueCategoriesHelp(filters);
    }, [filterValueCategoriesHelp, categoriesQuestion]);

    // Handle add category question
    const handleAddCategoriesQuestion = () => {
        axios
            .post(`${url}/questions`, categoriesAddQuestion)
            .then(() => {
                setOpenAdd(false);
                setIsSuccessAdd(true);
                setTimeout(() => setIsSuccessAdd(false), 800);
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error adding category question:', error);
                setOpenAdd(false);
            });
    };

    // Handle delete category question
    const handleDelete = () => {
        axios
            .delete(`${url}/questions/${deleteId}`)
            .then(() => {
                setOpen(false);
                setIsSuccess(true);
                setTimeout(() => setIsSuccess(false), 800);
                window.location.reload();
            })
            .catch((error) => console.error('Error deleting category:', error));
    };

    const filteredData = dataFilterValueCategoriesHelp.filter((category) =>
        category.name.toLowerCase().includes(filterValue.toLowerCase()),
    );

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const currentData = filteredData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePaginationChange = (e, { activePage }) => setCurrentPage(Math.min(activePage, totalPages));

    return (
        <div className="p-8">
            <div className="flex items-center justify-between">
                <h3 className="text-4xl font-bold">Quản lý danh mục giải đáp</h3>
                <Button primary onClick={handleOpenAdd} className="px-10 py-4">
                    Thêm danh mục
                </Button>
            </div>
            <div className="my-4 flex items-end justify-between gap-10">
                <InputField
                    type="select"
                    label="Danh mục hổ trợ"
                    placeholder="Chọn mục hổ trợ"
                    options={categoriesHelpCenter}
                    onChange={(e) => setFilterValueCategoriesHelp(e.target.value)}
                    defaultValue={categoriesHelpCenter.map((data) => data.id)}
                />
                <InputField
                    label="Tìm kiếm câu hỏi"
                    icon="search"
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
                            <TableHeaderCell>Tên</TableHeaderCell>
                            <TableHeaderCell textAlign="center">Actions</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    {isLoading ? (
                        <Dimmer active inverted>
                            <Loader inverted content="Loading" />
                        </Dimmer>
                    ) : (
                        <TableBody className="bg-black">
                            {currentData.map((data) => (
                                <TableRow key={data.id}>
                                    <TableCell className={`${darkMode && 'border bg-darkHF text-white'}`}>
                                        {data.name}
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
                                                    <Link
                                                        to={`/admin/adminCategoriesQuestion/${data.id}`}
                                                        state={{ dataDetail: data }}
                                                    >
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </Link>
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
                                                        onClick={() => {
                                                            setDeleteId(data.id);
                                                            setOpen(true);
                                                        }}
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
                open={openAdd}
                handleClose={handleCloseAdd}
                edit
                title="Thêm danh mục"
                size="lg"
                children={
                    <div>
                        <div className="mb-4">
                            <InputField
                                placeholder="Nhập tên"
                                label="Tên"
                                value={categoriesAddQuestion.name}
                                type="text"
                                onChange={(e) =>
                                    setCategoriesAddQuestion({
                                        ...categoriesAddQuestion,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="mb-4">
                            <InputField
                                label="Danh mục hổ trợ"
                                type="select"
                                placeholder="Chọn mục hổ trợ"
                                options={categoriesHelpCenter}
                                onChange={(e) =>
                                    setCategoriesAddQuestion({
                                        ...categoriesAddQuestion,
                                        categoryId: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                }
                titleYes="Cập nhật"
                handleYes={handleAddCategoriesQuestion}
            />
            {isSuccessAdd && (
                <div className="animate-slide-in-right fixed right-1 top-4 z-[100] min-w-56 rounded border-l-4 border-green bg-white px-4 py-6 text-black shadow-2xl">
                    <div className="flex items-center gap-2 text-lg">
                        <CircleCheck style={{ color: '#68FD87' }} />
                        <p>Thêm thành công!</p>
                    </div>
                </div>
            )}
            {isSuccess && (
                <div className="animate-slide-in-right fixed right-1 top-4 z-[100] min-w-56 rounded border-l-4 border-green bg-white px-4 py-6 text-black shadow-2xl">
                    <div className="flex items-center gap-2 text-lg">
                        <CircleCheck style={{ color: '#68FD87' }} />
                        <p>Xóa thành công!</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminCategoriesQuestionPage;
