import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ChevronRight, ThumbsDown, ThumbsUp } from 'lucide-react';
import Breadcrumb from '../../Components/Breadcrumb';
function HelpCenterDetailAnswerPage() {
    const location = useLocation();
    const { answer, question, categoryName } = location.state;
    const breadcrumbItems = [
        { label: 'Trung tâm trợ giúp', href: '/helpCenter' },
        { label: categoryName, href: '#back' },
        { label: 'Câu trả lời' },
    ];

    return (
        <div>
            <div className="bg-blue py-10 text-center text-white">
                <p className="text-3xl font-bold">Trung tâm Hỗ trợ Traveloka</p>
                <p className="py-3 text-xl font-bold">Mọi câu trả lời dành cho bạn</p>
            </div>
            <div className="mx-auto max-w-[1200px]">
                <Breadcrumb items={breadcrumbItems} />
                <div>
                    <p className="py-3 text-4xl font-bold">{question}</p>
                </div>
                <div>
                    <p className="w-1/2 py-3 text-lg">{answer}</p>
                </div>
                <div>
                    <p>Bạn thấy thông tin này có hữu ích không?</p>
                    <div className="flex items-center gap-10 py-5">
                        <ThumbsUp className="cursor-pointer hover:text-blue" />
                        <ThumbsDown className="cursor-pointer hover:text-blue" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HelpCenterDetailAnswerPage;
