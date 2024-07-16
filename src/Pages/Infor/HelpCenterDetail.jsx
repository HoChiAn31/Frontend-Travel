import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import Breadcrumb from '../../Components/Breadcrumb';
import axios from 'axios';
import { useTheme } from '../../Layouts/ThemeProvider';
function HelpCenterDetailPage() {
    const { id } = useParams();
    const location = useLocation();
    const { categoryName } = location.state;
    const { url } = useTheme();
    const breadcrumbItems = [{ label: 'Trung tâm trợ giúp', href: '/helpCenter' }, { label: categoryName }];
    const [dataCategoryAllDetailQuestionDetail, setDataCategoryAllDetailQuestionDetail] = useState([]);
    const [dataFilter, setDataFilter] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        axios
            .get(`${url}/questionAnswer/categoriesQuestionId/${id}`)
            .then((response) => {
                setDataFilter(response.data);
                setIsLoading(true);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <div>
            <div className="bg-blue py-10 text-center text-white">
                <p className="text-3xl font-bold">Trung tâm Hỗ trợ Traveloka</p>
                <p className="py-3 text-xl font-bold">Mọi câu trả lời dành cho bạn</p>
            </div>
            <div className="mx-auto max-w-[1200px]">
                <Breadcrumb items={breadcrumbItems} />
                <div>
                    <p className="py-3 text-2xl font-bold">Các câu hỏi chi tiết</p>
                </div>
                <div>
                    {isLoading && (
                        <div>
                            {dataFilter.map((dataDetail) => (
                                <Link
                                    to={`/helpCenterDetailAnswer/${id}/${dataDetail._id}`}
                                    state={{
                                        question: dataDetail.question,
                                        answer: dataDetail.answer,
                                        categoryName: categoryName,
                                    }}
                                    className="flex cursor-pointer items-center justify-between border-t px-4 py-4 hover:bg-gray-300"
                                >
                                    <p className="text-lg">{dataDetail.question}</p>
                                    <ChevronRight />
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HelpCenterDetailPage;
