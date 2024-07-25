import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../Layouts/ThemeProvider';
import axios from 'axios';

function ConfirmAccountPage() {
    const navigate = useNavigate();
    const {
        isForgetPassword,
        email,
        setIsForgetPassword,
        setPathRequired,
        setIsCheckAccount,
        isLogin,
        setIsLogin,
        pathRequired,
        url,
        role,
        isAdmin,
    } = useTheme();
    const [otp, setOtp] = useState();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleChange = (setter) => (e) => {
        setter(e.target.value);
    };
    useEffect(() => {
        setIsLogin(false);
        localStorage.setItem('isLogin', 'false');
    }, []);
    useEffect(() => {
        if (email) {
            axios
                .post(`${url}/login/sendOtp`, {
                    email: email,
                })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isForgetPassword) {
            if (otp) {
                axios
                    .post(`${url}/login/verifyOtp`, {
                        otp: otp,
                        email: email,
                    })
                    .then((response) => {
                        // console.log(response.data);
                        navigate('/resetPassword');
                        setIsForgetPassword(false);
                        // navigate('/');
                    })
                    .catch((error) => {
                        // console.log(error);
                        alert('OTP không chính xác!');
                    });
            } else {
                alert('Vui lòng nhập OTP được gửi về mail của bạn!');
            }
        } else {
            if (otp) {
                axios
                    .post(`${url}/login/verifyOtp`, {
                        otp: otp,
                        email: email,
                    })
                    .then((response) => {
                        setIsCheckAccount(true);
                        setIsLogin(true);
                        localStorage.setItem('isLogin', 'true');
                        if (isAdmin === true) {
                            navigate('/admin');
                            setPathRequired('');
                            window.location.reload();
                        } else {
                            if (pathRequired) {
                                navigate(pathRequired);
                                setPathRequired('');
                                window.location.reload();
                            } else {
                                navigate('/');
                            }
                        }
                    })
                    .catch((error) => {
                        // console.log(error);
                        alert('OTP không chính xác!');
                    });
            } else {
                alert('Vui lòng nhập OTP được gửi về mail của bạn!');
            }
        }
    };

    return (
        <div className="mx-auto flex max-w-[1200px]">
            <div className="flex w-1/2 items-center">
                <img
                    src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo="
                    alt=" "
                    className="h-[500px] w-[500px]"
                />
            </div>
            <div className="flex w-1/2 flex-col items-center justify-center">
                <div className="w-full max-w-lg space-y-8 p-8">
                    <h2 className="text-center text-3xl font-bold">Nhập mã OTP</h2>
                    <form className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div className="py-2">
                                <p> OTP:</p>
                                <input
                                    type="text"
                                    required
                                    className="w-full rounded-md border border-gray-300 px-2 py-3 text-black focus:border-blue focus:outline-none focus:ring-blue"
                                    placeholder="Nhập OTP gửi đến email của bạn"
                                    value={otp}
                                    onChange={handleChange(setOtp)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                // to={isForgetPassword ? '/resetPassword' : '/'}
                                onClick={handleSubmit}
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-blueButton px-4 py-3 text-base font-medium text-white hover:opacity-80"
                            >
                                Tiếp tục
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ConfirmAccountPage;
