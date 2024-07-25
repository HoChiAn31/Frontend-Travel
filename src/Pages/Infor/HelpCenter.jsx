import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../../Layouts/ThemeProvider';
import { useTitle } from '../../Components/useTitle';

function HelpCenterPage() {
    useTitle('Trung tâm trợ giúp');
    const { url } = useTheme();
    const [activeTab, setActiveTab] = useState('');
    const [dataCategoryAllQuestions, setDataCategoryAllQuestion] = useState([]);
    const [dataCategoryAllDetailQuestions, setDataCategoryAllDetailQuestions] = useState([]);
    const [dataFilter, setDataFilter] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        axios
            .get(`${url}/categoriesHelps`)
            .then((response) => {
                setDataCategoryAllQuestion(response.data);
                if (response.data.length > 0) {
                    setActiveTab(response.data[0].id);
                }
            })
            .catch((error) => console.error('Error fetching data:', error));
        axios
            .get(`${url}/questions`)
            .then((response) => setDataCategoryAllDetailQuestions(response.data))
            .catch((error) => console.error('Error fetching data:', error));
        setIsLoading(true);
    }, [url]);

    useEffect(() => {
        if (dataCategoryAllDetailQuestions && activeTab) {
            const newFilter = dataCategoryAllDetailQuestions.filter((data) => data.categoryId === activeTab);
            setDataFilter(newFilter);
        }
    }, [dataCategoryAllDetailQuestions, activeTab]);

    return (
        <div>
            <div className="bg-blue py-10 text-center text-white">
                <p className="text-3xl font-bold">Trung tâm Hỗ trợ Traveloka</p>
                <p className="py-3 text-xl font-bold">Mọi câu trả lời dành cho bạn</p>
                <input type="text" placeholder="Nhập chủ đề ở đây " className="w-[30vw] rounded-md p-3" />
            </div>
            <div className="mx-auto max-w-[1200px] p-5">
                <h3 className="text-2xl font-bold">Các câu hỏi thường gặp</h3>
                {isLoading && (
                    <div className="my-8 rounded-md border">
                        <div className="flex gap-8">
                            {dataCategoryAllQuestions.map((data) => (
                                <div
                                    key={data.id}
                                    className={`cursor-pointer p-5 text-lg ${activeTab === data.id ? 'border-b-2 border-b-blue text-blue' : ''}`}
                                    onClick={() => setActiveTab(data.id)}
                                >
                                    {data.name}
                                </div>
                            ))}
                        </div>
                        <div>
                            {dataCategoryAllQuestions.map(
                                (data) =>
                                    activeTab === data.id && (
                                        <div key={data.id}>
                                            {dataFilter.map((data) => (
                                                <Link
                                                    key={data.id}
                                                    to={`/helpCenter/${data.id}`}
                                                    state={{ categoryName: data.name, categoryId: data.id }}
                                                    className="flex cursor-pointer items-center justify-between border-t px-4 py-4 hover:bg-gray-300"
                                                >
                                                    <p className="text-lg">{data.name}</p>
                                                    <ChevronRight />
                                                </Link>
                                            ))}
                                        </div>
                                    ),
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HelpCenterPage;
