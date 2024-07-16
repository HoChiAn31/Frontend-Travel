import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../ThemeProvider';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import InputField from '../../../Components/InputField';
import { CircleCheck } from 'lucide-react';

function AccountProfile() {
    const { isLogin, isUser, isCheckAccount, setPathRequired, url } = useTheme();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [imageLoad, setImageLoad] = useState();
    const [dataUser, setDataUser] = useState();
    const [dateFilterUser, setDateFilterUser] = useState();
    const [isSuccess, setIsSuccess] = useState(false);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    console.log('isUser', isUser);
    console.log('isLogin', isLogin);
    console.log('isCheckAccount:', isCheckAccount);

    // const handleImageChange = (e) => {
    //     console.log(e.target.files[0]);
    //     const file = e.target.files; // Lấy file đầu tiên

    //     if (file) {
    //         setImage(file); // Cập nhật state với file
    //     }
    // };
    const handleChange = (setter) => (e) => {
        setter(e.target.value);
    };
    useEffect(() => {
        if (isUser) {
            axios
                .get(`${url}/users/${isUser}`)
                .then((res) => {
                    console.log(res.data);
                    setDataUser(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);
    useEffect(() => {
        if (dataUser) {
            setFirstName(dataUser.firstName);
            setLastName(dataUser.lastName);
            setPhoneNumber(dataUser.phoneNumber);
            setEmail(dataUser.email);
            setAddress(dataUser.address);
            setImage(dataUser.image);
        }
    }, [dataUser]);
    // const handleUpdateInfor = (e) => {
    //     e.preventDefault();
    //     axios
    //         .patch(`${url}/users/${isUser}`, {
    //             firstName: firstName,
    //             lastName: lastName,
    //             phoneNumber: phoneNumber,
    //             email: email,
    //             address: address,
    //             file: image,
    //         })
    //         .then((res) => {
    //             setIsSuccess(true);
    //             setTimeout(() => {
    //                 setIsSuccess(false);
    //                 window.location.reload();
    //             }, 800);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };
    // const handleImageChange = (event) => {
    //     console.log(event.target.files[0]);

    //     const file = event.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             console.log(reader.result);
    //             setImage(reader.result);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log(reader.result);
                setImageLoad(reader.result);
            };
            reader.readAsDataURL(file);
            setImage(file); // Set the file object directly
        }
    };
    const handleUpdateInfor = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('phoneNumber', phoneNumber);
        formData.append('email', email);
        formData.append('address', address);

        if (image) {
            formData.append('image', image); // Ensure this matches 'image' in Multer
        }

        try {
            await axios.patch(`${url}/users/${isUser}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                window.location.reload();
            }, 800);
        } catch (err) {
            console.error(err);
        }
    };

    // const handleUpdateInfor = async (e) => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     console.log('firstName', firstName);
    //     formData.append('firstName', firstName);
    //     formData.append('lastName', lastName);
    //     formData.append('phoneNumber', phoneNumber);
    //     formData.append('email', email);
    //     formData.append('address', address);
    //     console.log(image);
    //     if (image) {
    //         console.log(image);
    //         formData.append('image', image);
    //     }

    //     try {
    //         await axios.patch(`${url}/users/${isUser}`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });
    //         setIsSuccess(true);
    //         setTimeout(() => {
    //             setIsSuccess(false);
    //             window.location.reload();
    //         }, 800);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };
    const handleLogin = () => {
        navigate('/login');
        setPathRequired('/profile');
    };
    return (
        <div className=" ">
            {isLogin && isCheckAccount && isUser !== '' ? (
                <div className="flex flex-col items-center">
                    <div className="relative mb-10">
                        <div className="flex flex-col items-center">
                            <img
                                src={imageLoad ? imageLoad : image ? image : 'https://via.placeholder.com/150'}
                                alt="Profile"
                                className="h-32 w-32 rounded-full object-cover shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                            />

                            <div className="mt-4 flex items-center justify-center">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="bg-blue-500 w-[96px] cursor-pointer text-white"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full items-center justify-between gap-8">
                        <div className="w-full py-2">
                            <InputField
                                label="Họ"
                                type="text"
                                placeholder="Nhập Họ:"
                                value={firstName}
                                onChange={handleChange(setFirstName)}
                            />
                        </div>
                        <div className="w-full py-2">
                            <InputField
                                label="Tên"
                                type="text"
                                placeholder="Nhập tên:"
                                value={lastName}
                                onChange={handleChange(setLastName)}
                            />
                        </div>
                    </div>
                    <div className="w-full py-2">
                        <InputField
                            label="Số điện thoại"
                            type="text"
                            placeholder="Nhập Số điện thoại:"
                            value={phoneNumber}
                            onChange={handleChange(setPhoneNumber)}
                        />
                    </div>
                    <div className="w-full py-2">
                        <InputField
                            label="Email"
                            type="email"
                            placeholder="Nhập email:"
                            value={email}
                            onChange={handleChange(setEmail)}
                        />
                    </div>
                    <div className="w-full py-2">
                        <InputField
                            label="Địa chỉ"
                            type="text"
                            placeholder="Nhập text:"
                            value={address}
                            onChange={handleChange(setAddress)}
                        />
                    </div>

                    <button
                        className="bg-blue-500 my-4 w-1/2 rounded-md bg-blueButton py-2 text-white hover:opacity-70"
                        onClick={handleUpdateInfor}
                    >
                        Cập nhật thông tin
                    </button>
                </div>
            ) : (
                <div className="flex h-[68vh] flex-col items-center justify-center">
                    <p>Hãy đăng nhập/đăng ký để hồ sơ tài khoản!</p>
                    <Button
                        onClick={handleLogin}
                        className="my-4 rounded-md bg-blueButton px-16 py-4 text-white hover:opacity-70"
                    >
                        Đăng nhập
                    </Button>
                </div>
            )}
            {isSuccess && (
                <div className="animate-slide-in-right fixed right-1 top-4 z-[100] min-w-56 rounded border-l-4 border-green bg-white px-4 py-6 text-black shadow-2xl">
                    <div className="flex items-center gap-2 text-lg">
                        <CircleCheck style={{ color: '#68FD87' }} />
                        <p>Cập nhật thông tin thành công!</p>
                    </div>
                </div>
            )}
        </div>
    );
}
export default AccountProfile;
