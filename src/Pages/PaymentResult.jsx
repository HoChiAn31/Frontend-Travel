import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../Layouts/ThemeProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useTitle } from '../Components/useTitle';

const PaymentResult = () => {
    const { orderTranId, setOrderTranId, url } = useTheme(); // Sử dụng setOrderTranId để xóa sau khi sử dụng
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [message, setMessage] = useState(0);
    const type = localStorage.getItem('type');
    const transactionId = localStorage.getItem('bookId');
    useTitle('Thanh toán');
    useEffect(() => {
        if (message === 1) {
            document.title = 'Thanh toán thành công';
        } else if (message === 0) {
            document.title = 'Thanh toán thất bại';
        } else {
            document.title = 'Error';
        }
    }, [message]);
    useEffect(() => {
        // Lấy app_trans_id từ localStorage
        const appTransId = localStorage.getItem('app_trans_id');

        if (appTransId) {
            const checkPaymentStatus = async () => {
                try {
                    const response = await axios.post(`${url}/payments/check-status-order-zaloPay`, {
                        app_trans_id: appTransId,
                    });
                    console.log(response);
                    if (response.data.return_code === 1 && response.data.sub_return_code === 1) {
                        setMessage(1);
                    } else {
                        setMessage(0);
                    }
                    setIsLoading(true);
                } catch (error) {
                    console.error('Error checking payment status:', error);
                    setMessage(0);
                    setIsLoading(true);
                } finally {
                    // Xóa app_trans_id sau khi sử dụng
                    localStorage.removeItem('app_trans_id');
                    setOrderTranId(null); // Cập nhật state trong theme context (nếu cần thiết)
                    setIsLoading(true);
                }
            };

            checkPaymentStatus();
        } else {
            setMessage(0);
            setIsLoading(true);
        }
    }, [setOrderTranId]);
    useEffect(() => {
        if (isLoading) {
            if (type === 'tour' && message !== 1 && transactionId) {
                axios
                    .delete(`${url}/tourBookings/${transactionId}`)
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .finally(() => {
                        localStorage.removeItem('bookId');
                        localStorage.removeItem('type');
                    });
            }
        }
    }, [type, message, transactionId, isLoading]);
    return (
        <div>
            <div className="my-4 flex h-[340px] flex-col items-center justify-center">
                {message === 1 ? (
                    <>
                        <FontAwesomeIcon icon={faCircleCheck} className="mb-2 h-12 w-12 text-green" />
                        <p className="text-3xl font-bold text-green">Đơn hàng của bạn đã được tiếp nhận</p>
                        <div className="my-2 text-center">
                            {type === 'tour' ? (
                                <p>Cảm ơn bạn đã đặt tour.</p>
                            ) : type === 'hotel' ? (
                                <p>Cảm ơn bạn đã đặt khách sạn.</p>
                            ) : null}

                            <p>Chúng tôi sẽ liên lạc với bạn trong thời gian sớm nhất.</p>
                        </div>

                        <Link
                            to="/"
                            className="my-5 rounded-md bg-blueButton px-8 py-4 text-base font-bold text-white hover:opacity-70"
                        >
                            TIẾP TỤC KHÁM PHÁ TOUR
                        </Link>
                    </>
                ) : message === 0 ? (
                    <>
                        <FontAwesomeIcon icon={faCircleExclamation} className="mb-2 h-12 w-12 text-red" />
                        <p className="text-3xl font-bold text-red">Thanh toán thất bại</p>
                        <div className="my-2 text-center">
                            <p>Bạn hãy thử lại nhé!</p>

                            <p>Nếu bạn gặp lỗi trong quá trình thanh toán thì hãy liên hệ ngay cho chúng tôi.</p>
                        </div>

                        <Link
                            to="/"
                            className="my-5 rounded-md bg-blueButton px-8 py-4 text-base font-bold text-white hover:opacity-70"
                        >
                            QUAY VỀ TRANG CHỦ
                        </Link>
                    </>
                ) : (
                    <>
                        <title>Đã xảy ra lỗi</title>
                    </>
                )}
            </div>
        </div>
    );
};

export default PaymentResult;
