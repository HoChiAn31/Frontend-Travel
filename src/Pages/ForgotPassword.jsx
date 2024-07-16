import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../Layouts/ThemeProvider';
import { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';

function ForgotPasswordPage() {
    const { setPassword, setEmail, setIsForgetPassword, url } = useTheme();
    const navigate = useNavigate();
    const [valueEmail, setValueEmail] = useState();
    const [dataUser, setDataUser] = useState();
    useEffect(() => {
        axios
            .get(`${url}/users`)
            .then((res) => {
                setDataUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const hanldeChangeValue = (e) => {
        setValueEmail(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (valueEmail) {
            const user = dataUser.find((user) => user.email === valueEmail);
            if (user) {
                setEmail(valueEmail);
                setIsForgetPassword(true);
                navigate('/confirmAccount');
            } else {
                alert('Email không tồn tại');
            }
        } else {
            alert('Vui lòng nhập email');
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
                    <h2 className="text-center text-3xl font-bold">Nhập email của bạn</h2>
                    <form className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email-address" className="text-base font-bold">
                                    Email:
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="w-full rounded-md border border-gray-300 px-2 py-3 focus:border-blue focus:outline-none focus:ring-blue"
                                    placeholder="Email"
                                    onChange={hanldeChangeValue}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            <div className="text-sm">
                                <Link to="#" className="font-medium text-blueButton hover:opacity-80">
                                    Quên mật khẩu?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <Button
                                // to="/confirmAccount"
                                onClick={handleSubmit}
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-blueButton px-4 py-3 text-base font-medium text-white hover:opacity-80"
                            >
                                Tiếp tục
                            </Button>
                        </div>
                        <div className="border-[0.2px] border-gray-200"></div>
                        <div className="mt-6">
                            <button
                                type="button"
                                className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 px-4 py-3 text-sm font-medium hover:bg-gray-200 hover:text-blueButton"
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png"
                                    alt=""
                                    className="h-6 w-6"
                                />
                                Đăng ký với Google
                            </button>
                            <div className="py-3"></div>
                            <button
                                type="button"
                                className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 px-4 py-3 text-sm font-medium hover:bg-gray-200 hover:text-blueButton"
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png"
                                    alt=""
                                    className="h-6 w-6"
                                />
                                Đăng ký với Facebook
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">
                                Chưa có tài khoản?{' '}
                                <Link to="/register" className="font-medium text-blueButton hover:opacity-80">
                                    Đăng ký
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;
