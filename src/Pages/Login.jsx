import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useTheme } from '../Layouts/ThemeProvider';
function LoginPage() {
    const navigate = useNavigate();
    const { setPassword, setEmail, error, isLogin, setIsCheckAccount } = useTheme();
    const [valueEmail, setValueEmail] = useState();
    const [valuePassword, setValuePassword] = useState();
    const handleChange = (setter) => (e) => {
        setter(e.target.value);
    };
    const handleLogin = (e) => {
        e.preventDefault();
        if (valueEmail && valuePassword) {
            setEmail(valueEmail);
            setPassword(valuePassword);
        } else {
            alert('Vui lòng nhập đầy đủ thông tin');
        }
    };
    useEffect(() => {
        if (error) {
            alert('Email hoặc mật khẩu không đúng. Vui lòng thử lại.');
        }
    }, [error]);
    useEffect(() => {
        if (isLogin === true) {
            navigate('/confirmAccount');
            setIsCheckAccount(false);
            localStorage.setItem('isAccount', 'false');
        }
    }, [isLogin]);
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
                    <h2 className="text-center text-3xl font-bold">Đăng nhập</h2>
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
                                    onChange={handleChange(setValueEmail)}
                                />
                            </div>
                            <div className="py-5"></div>
                            <div>
                                <label htmlFor="password" className="text-base font-bold">
                                    Mật khẩu:
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="w-full rounded-md border border-gray-300 px-2 py-3 text-black focus:border-blue focus:outline-none focus:ring-blue"
                                    placeholder="Mật khẩu"
                                    onChange={handleChange(setValuePassword)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            <div className="text-sm">
                                <Link to="/forgotPassword" className="font-medium text-blueButton hover:opacity-80">
                                    Quên mật khẩu?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                // type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-blueButton px-4 py-3 text-base font-medium text-white hover:opacity-80"
                                onClick={handleLogin}
                            >
                                Đăng nhập
                            </button>
                        </div>
                        <div className="border-[0.2px] border-gray-200"></div>
                        <div className="mt-6">
                            <button
                                type="button"
                                className="relative flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 px-4 py-3 text-sm font-medium hover:bg-gray-200 hover:text-blueButton"
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png"
                                    alt=""
                                    className="h-6 w-6"
                                />
                                Đăng nhập với Google
                            </button>
                            <div className="py-3"></div>
                            <button
                                type="button"
                                className="relative flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-200 hover:text-blueButton"
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png"
                                    alt=""
                                    className="h-6 w-6"
                                />
                                Đăng nhập với Facebook
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

export default LoginPage;

//yarn add @react-oauth/google

// import { Link } from 'react-router-dom';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

// function LoginPage() {
//     const handleSuccess = (response) => {
//         console.log(response);
//         // Lấy thông tin người dùng từ response
//         const { profileObj } = response;
//         const userEmail = profileObj.email;
//         const userName = profileObj.name;
//         const userImage = profileObj.imageUrl;

//         console.log('Email:', userEmail);
//         console.log('Name:', userName);
//         console.log('Image URL:', userImage);

//         // Ví dụ: Lưu thông tin vào localStorage hoặc state
//         localStorage.setItem('userEmail', userEmail);
//         localStorage.setItem('userName', userName);
//         localStorage.setItem('userImage', userImage);
//     };

//     const handleFailure = (response) => {
//         console.error('Login Failed:', response);
//         // Xử lý lỗi đăng nhập
//     };

//     return (
//         <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
//             <div className="mx-auto flex max-w-[1200px]">
//                 <div className="flex w-1/2 items-center">
//                     <img
//                         src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo="
//                         alt=" "
//                         className="h-[500px] w-[500px]"
//                     />
//                 </div>
//                 <div className="flex w-1/2 flex-col items-center justify-center">
//                     <div className="w-full max-w-lg space-y-8 p-8">
//                         <h2 className="text-center text-3xl font-bold text-gray-900">Đăng nhập</h2>
//                         <form className="mt-8 space-y-6" action="#" method="POST">
//                             <input type="hidden" name="remember" value="true" />
//                             <div className="-space-y-px rounded-md shadow-sm">
//                                 <div>
//                                     <label htmlFor="email-address" className="text-base font-bold">
//                                         Email:
//                                     </label>
//                                     <input
//                                         id="email-address"
//                                         name="email"
//                                         type="email"
//                                         autoComplete="email"
//                                         required
//                                         className="w-full rounded-md border border-gray-300 px-2 py-3 focus:border-blue focus:outline-none focus:ring-blue"
//                                         placeholder="Email"
//                                     />
//                                 </div>
//                                 <div className="py-5"></div>
//                                 <div>
//                                     <label htmlFor="password" className="text-base font-bold">
//                                         Mật khẩu:
//                                     </label>
//                                     <input
//                                         id="password"
//                                         name="password"
//                                         type="password"
//                                         autoComplete="current-password"
//                                         required
//                                         className="w-full rounded-md border border-gray-300 px-2 py-3 focus:border-blue focus:outline-none focus:ring-blue"
//                                         placeholder="Mật khẩu"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="flex items-center justify-end">
//                                 <div className="text-sm">
//                                     <Link to="/forgotPassword" className="font-medium text-blueButton hover:opacity-80">
//                                         Quên mật khẩu?
//                                     </Link>
//                                 </div>
//                             </div>

//                             <div>
//                                 <button
//                                     type="submit"
//                                     className="group relative flex w-full justify-center rounded-md border border-transparent bg-blueButton px-4 py-3 text-sm font-medium text-white hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                                 >
//                                     Đăng nhập
//                                 </button>
//                             </div>
//                             <div className="border-[0.2px] border-gray-200"></div>
//                             <div className="mt-6">
//                                 <GoogleLogin
//                                     onSuccess={handleSuccess}
//                                     onFailure={handleFailure}
//                                     // Các tham số khác như `buttonText`, `theme`, `size` có thể thêm vào đây
//                                     textButton="Đăng nhập với Google"
//                                 />
//                                 <div className="py-3"></div>
//                                 <button
//                                     type="button"
//                                     className="relative flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-2 text-xl font-medium text-gray-700 hover:bg-gray-200 hover:text-blueButton"
//                                 >
//                                     <img
//                                         src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png"
//                                         alt=""
//                                         className="h-6 w-6"
//                                     />
//                                     Đăng nhập với Facebook
//                                 </button>
//                             </div>
//                             <div className="flex items-center justify-between">
//                                 <span className="text-sm">
//                                     Chưa có tài khoản?{' '}
//                                     <Link to="/register" className="font-medium text-blueButton hover:opacity-80">
//                                         Đăng ký
//                                     </Link>
//                                 </span>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </GoogleOAuthProvider>
//     );
// }

// export default LoginPage;
