import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../Layouts/ThemeProvider';
import { CircleAlert, CircleCheck, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import NotificationComponent from '../Components/Notification';

function ResetPasswordPage() {
    const navigate = useNavigate();
    const { email, darkMode, setEmail, url } = useTheme();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordViewedOnce, setPasswordViewedOnce] = useState(true);
    const [isNotificationSuccessful, setIsNotificationSuccessful] = useState(false);
    const [isNotificationFail, setIsNotificationFail] = useState(false);

    const [confirmPasswordViewedOnce, setConfirmPasswordViewedOnce] = useState(true);
    console.log(password);
    const handleChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        if (password && confirmPassword) {
            if (password === confirmPassword) {
                axios
                    .patch(`${url}/users/updateUser/${email}`, {
                        password: confirmPassword,
                    })
                    .then((res) => {
                        console.log(res.data);
                        setIsNotificationSuccessful(true);
                        setTimeout(() => {
                            setIsNotificationSuccessful(false);
                            setEmail('');
                            navigate('/login');
                        }, 800);
                    })
                    .catch((err) => {
                        console.log(err);
                        setIsNotificationFail(true);
                        setTimeout(() => {
                            setIsNotificationFail(false);
                        }, 800);
                    });
            } else {
                alert('Mật khẩu và xác nhận mật khẩu phải giống nhau');
            }
        } else {
            alert('Vui lòng nhập mật khẩu và xác nhận mật khẩu');
        }
    };
    const hanldeChangePasswordVisible = () => {
        setPasswordViewedOnce(!passwordViewedOnce);
    };
    const hanldeChangeConfirmPasswordVisible = () => {
        setConfirmPasswordViewedOnce(!confirmPasswordViewedOnce);
    };
    // const togglePasswordVisibility = (field) => {
    //     // if (field === 'password') {
    //     //     if (!passwordViewedOnce) {
    //     //         setPasswordVisible(!passwordVisible);
    //     //         setPasswordViewedOnce(true);
    //     //     }
    //     // } else if (field === 'confirmPassword') {
    //     //     if (!confirmPasswordViewedOnce) {
    //     //         setConfirmPasswordVisible(!confirmPasswordVisible);
    //     //         setConfirmPasswordViewedOnce(true);
    //     //     }
    //     // }
    // };

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
                    <h2 className="text-center text-3xl font-bold">Nhập mật khẩu mới</h2>
                    <form className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div className="relative py-2">
                                <p>Mật khẩu:</p>
                                <input
                                    type={passwordViewedOnce ? 'password' : 'text'}
                                    required
                                    className={`${darkMode ? 'text-black' : ''} w-full rounded-md border border-gray-300 px-2 py-3 focus:border-blue focus:outline-none focus:ring-blue`}
                                    placeholder="Nhập mật khẩu của bạn"
                                    value={password}
                                    onChange={handleChange(setPassword)}
                                />

                                {password && (
                                    <button
                                        type="button"
                                        className="absolute right-2 top-[64%] -translate-y-1/2 transform bg-white"
                                        onClick={hanldeChangePasswordVisible}
                                    >
                                        {passwordViewedOnce ? (
                                            <EyeOff className={`${darkMode ? 'text-black' : ''}`} />
                                        ) : (
                                            <Eye className={`${darkMode ? 'text-black' : ''}`} />
                                        )}
                                    </button>
                                )}
                            </div>
                            <div className="relative py-2">
                                <p>Xác nhận mật khẩu:</p>
                                <input
                                    type={confirmPasswordViewedOnce ? 'password' : 'text'}
                                    required
                                    className={`${darkMode ? 'text-black' : ''} w-full rounded-md border border-gray-300 px-2 py-3 focus:border-blue focus:outline-none focus:ring-blue`}
                                    placeholder="Nhập mật khẩu của bạn"
                                    value={confirmPassword}
                                    onChange={handleChange(setConfirmPassword)}
                                />
                                {confirmPassword && (
                                    <button
                                        type="button"
                                        className="absolute right-2 top-[64%] -translate-y-1/2 transform bg-white"
                                        onClick={hanldeChangeConfirmPasswordVisible}
                                    >
                                        {confirmPasswordViewedOnce ? (
                                            <EyeOff className={`${darkMode ? 'text-black' : ''}`} />
                                        ) : (
                                            <Eye className={`${darkMode ? 'text-black' : ''}`} />
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={handleChangePassword}
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-blueButton px-4 py-3 text-base font-medium text-white hover:opacity-80"
                            >
                                Tạo mật khẩu
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {isNotificationSuccessful && <NotificationComponent success />}

            {isNotificationFail && <NotificationComponent fail />}
        </div>
    );
}

export default ResetPasswordPage;
