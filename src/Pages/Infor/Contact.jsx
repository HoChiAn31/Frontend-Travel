import { ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ContactPage() {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    };
    const handleResigter = () => {
        navigate('/register');
    };
    const handleToggleQuestion = (index) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question, i) => (i === index ? { ...question, isOpen: !question.isOpen } : question)),
        );
    };
    const handleToggleQuestion1 = (index) => {
        setQuestions1((prevQuestions) =>
            prevQuestions.map((question, i) => (i === index ? { ...question, isOpen: !question.isOpen } : question)),
        );
    };
    const [questions, setQuestions] = useState([
        {
            question: 'Gọi cho bộ phận Dịch Vụ Khách Hàng của chúng tôi',
            answer: 'Cung cấp mã đặt chỗ của bạn khi liên hệ với chúng tôi',
            answer1: 'Số điên thoại của chúng tôi: 0979797979',
        },
        {
            question: 'Gửi thư điện tử cho bộ phận Dịch Vụ Khách Hàng của chúng tôi',
            answer: 'Vui lòng gửi thư điện tử đến bộ phận Dịch Vụ Khách Hàng của chúng tôi tại travelAt@gmail.com',
        },
    ]);
    const [questions1, setQuestions1] = useState([
        {
            question: 'Cách đặt phòng khách sạn',
            answer: 'Cung cấp mã đặt chỗ của bạn khi liên hệ với chúng tôi',
            answer1: 'Số điên thoại của chúng tôi: 0979797979',
        },
        {
            question: 'Đặt chỗ trực tiếp để đảm bảo an toàn',
            answer: 'Vui lòng gửi thư điện tử đến bộ phận Dịch Vụ Khách Hàng của chúng tôi tại travelAt@gmail.com',
        },
        {
            question: 'Cách huỷ phòng và hoàn tiền khách sạn ',
            answer: 'Vui lòng gửi thư điện tử đến bộ phận Dịch Vụ Khách Hàng của chúng tôi tại travelAt@gmail.com',
        },
        {
            question: 'Cách sửa hoặc đổi tên thông tin người đặt phòng khách sạn',
            answer: 'Vui lòng gửi thư điện tử đến bộ phận Dịch Vụ Khách Hàng của chúng tôi tại travelAt@gmail.com',
        },
        {
            question: 'Cách làm thủ tục trực tuyến ',
            answer: 'Vui lòng gửi thư điện tử đến bộ phận Dịch Vụ Khách Hàng của chúng tôi tại travelAt@gmail.com',
        },
        {
            question: 'Làm cách nào để kiểm tra trạng thái hoàn tiền của tôi',
            answer: 'Vui lòng gửi thư điện tử đến bộ phận Dịch Vụ Khách Hàng của chúng tôi tại travelAt@gmail.com',
        },
    ]);

    return (
        <div className="">
            <div className="bg-blue py-10 text-center text-white">
                <p className="text-3xl font-bold">Liên hệ chúng tôi</p>
                <p className="py-3 text-xl font-bold">Chúng tôi luôn sẵn sàng hỗ trợ, dù bạn ở bất cứ nơi đâu!</p>
            </div>
            <div className="mx-auto flex max-w-[1200px] gap-16 p-5">
                <div className="w-1/2">
                    <p className="text-xl font-bold">Xin chào bạn,</p>
                    <p className="text-2xl font-bold">Chúng tôi có thể giúp gì cho bạn?</p>
                    <div className="my-4 rounded-md bg-blue px-2 py-3 text-base font-medium leading-7 text-white">
                        Để thắc của bạn được giải quyết nhanh hơn, vui lòng{' '}
                        <span onClick={handleLogin} className="cursor-pointer underline">
                            đăng nhập
                        </span>{' '}
                        hoặc{' '}
                        <span onClick={handleResigter} className="cursor-pointer underline">
                            đăng ký
                        </span>{' '}
                        tài khoản Traveloka, hoặc tải ứng dụng của chúng tôi bằng cách quét mã QR ở bên trái.
                    </div>

                    <div className="py-4">
                        <p className="pb-3 text-2xl font-bold">Các câu hỏi thường gặp</p>
                        {questions.map((question, index) => (
                            <div key={index} className="mb-4">
                                <button
                                    className={`flex w-full items-center justify-between border border-gray-300 p-4 ${
                                        question.isOpen ? 'rounded-t-md' : 'rounded-md'
                                    } hover:opacity-80`}
                                    onClick={() => handleToggleQuestion(index)}
                                >
                                    <span className="font-medium">{question.question}</span>
                                    <span className={`transform ${question.isOpen ? '-rotate-180' : ''}`}>
                                        <ChevronUp className="text-blue" />
                                    </span>
                                </button>
                                {question.isOpen && (
                                    <div className="rounded-b-md border-x border-b p-4">
                                        <p className="text-base">{question.answer}</p>
                                        <p className="text-base">{question?.answer1}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-1/2">
                    <div className="py-4">
                        <p className="pb-3 text-2xl font-bold">Các câu hỏi phổ biến</p>
                        {questions1.map((question, index) => (
                            <div key={index} className="mb-4">
                                <button
                                    className={`flex w-full items-center justify-between border border-gray-300 p-4 ${
                                        question.isOpen ? 'rounded-t-md' : 'rounded-md'
                                    } hover:opacity-80`}
                                    onClick={() => handleToggleQuestion1(index)}
                                >
                                    <span className="font-medium">{question.question}</span>
                                    <span className={`transform ${question.isOpen ? '-rotate-180' : ''}`}>
                                        <ChevronUp className="text-blue" />
                                    </span>
                                </button>
                                {question.isOpen && (
                                    <div className="rounded-b-md border-x border-b p-4">
                                        <p className="text-base">{question.answer}</p>
                                        <p className="text-base">{question?.answer1}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-[1200px] p-5"></div>
        </div>
    );
}

export default ContactPage;
