import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../Layouts/ThemeProvider';
import axios from 'axios';

function RegisterPage() {
    const { url } = useTheme();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Mật khẩu và xác nhận không giống nhau!');
            return;
        }

        const users = {
            firstName,
            lastName,
            fullName: `${firstName} ${lastName}`,
            email,
            phoneNumber: phone,
            password,
        };
        axios
            .post(`${url}/users`, users)
            .then((response) => {
                alert('Đăng ký thành công!');
                navigate('/login');
            })
            .catch((error) => {
                console.error('Error registering user:', error);
                alert('Đăng ký thất bại. Vui lòng thử lại!');
            });
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
                    <h2 className="text-center text-3xl font-bold text-gray-900">Đăng ký</h2>
                    <form className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div className="space-y-4 rounded-md shadow-sm">
                            <div className="py-2">
                                <p> Họ:</p>
                                <input
                                    type="text"
                                    // required
                                    className="w-full rounded-md border border-gray-300 px-2 py-3 focus:border-blue focus:outline-none focus:ring-blue"
                                    placeholder="Nhập tên bạn"
                                    value={firstName}
                                    onChange={handleChange(setFirstName)}
                                />
                            </div>
                            <div className="py-2">
                                <p> Tên:</p>
                                <input
                                    type="text"
                                    required
                                    className="w-full rounded-md border border-gray-300 px-2 py-3 focus:border-blue focus:outline-none focus:ring-blue"
                                    placeholder="Nhập tên người dùng"
                                    value={lastName}
                                    onChange={handleChange(setLastName)}
                                />
                            </div>

                            <div className="py-2">
                                <p> Số điện thoại:</p>
                                <input
                                    type="text"
                                    required
                                    className="w-full rounded-md border border-gray-300 px-2 py-3 focus:border-blue focus:outline-none focus:ring-blue"
                                    placeholder="Nhập số điện thoại của bạn"
                                    value={phone}
                                    onChange={handleChange(setPhone)}
                                />
                            </div>
                            <div className="py-2">
                                <p> Email:</p>
                                <input
                                    type="email"
                                    required
                                    className="w-full rounded-md border border-gray-300 px-2 py-3 focus:border-blue focus:outline-none focus:ring-blue"
                                    placeholder="Nhập mật khẩu của bạn"
                                    value={email}
                                    onChange={handleChange(setEmail)}
                                />
                            </div>
                            <div className="py-2">
                                <p> Mật khẩu:</p>
                                <input
                                    type="password"
                                    required
                                    className="w-full rounded-md border border-gray-300 px-2 py-3 focus:border-blue focus:outline-none focus:ring-blue"
                                    placeholder="Nhập mật khẩu của bạn"
                                    value={password}
                                    onChange={handleChange(setPassword)}
                                />
                            </div>
                            <div className="py-2">
                                <p> Xác nhận mật khẩu:</p>
                                <input
                                    type="password"
                                    required
                                    className="w-full rounded-md border border-gray-300 px-2 py-3 focus:border-blue focus:outline-none focus:ring-blue"
                                    placeholder="Nhập mật khẩu của bạn"
                                    value={confirmPassword}
                                    onChange={handleChange(setConfirmPassword)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-blueButton px-4 py-3 text-base font-bold text-white hover:opacity-80"
                                onClick={handleSubmit}
                            >
                                Đăng ký
                            </button>
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
                                Đã có tài khoản?{' '}
                                <Link to="/login" className="font-medium text-blueButton hover:opacity-80">
                                    Đăng nhập
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
