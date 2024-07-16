import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
    Button,
    FormField,
    TextArea,
    Form,
    FormGroup,
    Radio,
    Header,
    ModalContent,
    ModalActions,
    Icon,
    Modal,
    Dropdown,
    Popup,
    Input,
    Loader,
} from 'semantic-ui-react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { country } from '../../../Services/data';
// import { Email } from '@mui/icons-material';
import InputField from '../../../Components/InputField';
import { useTheme } from '../../../Layouts/ThemeProvider';

const keyRole = [
    { key: 'admin', value: 'admin', label: 'Quản trị viên' },
    { key: 'user', value: 'user', label: 'Người dùng' },
];
const keyGender = [
    { key: 'male', value: 'male', label: 'Nam' },
    { key: 'female', value: 'female', label: 'Nữ' },
];
function AdminUserAddPage() {
    useEffect(() => {
        document.label = 'Thêm người dùng';
    }, []);
    const { url } = useTheme();
    const [valueCity, setValueCity] = useState('');
    const [valueDistrict, setValueDistrict] = useState('');
    const [valueWard, setValueWard] = useState('');
    const [firstName, SetFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [valueName, setValueName] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [role, setRole] = useState();
    const [password, setPassword] = useState();
    const [valueAddress, setValueAddress] = useState();
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const handleChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleValueName = (e) => {
        setValueName(e.target.value);
    };
    const handleChangePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleUpdate = () => {
        setIsLoading(true);

        const userData = {
            fullName: firstName + ' ' + lastName,
            firstName,
            password,
            lastName,
            phoneNumber,
            email,
            addresses: valueWard + ', ' + valueDistrict + ', ' + valueCity,
            role,
        };
        axios
            .post(`${url}/users`, userData)
            .then((response) => {
                console.log('User created:', response.data);
                setIsLoading(false);

                navigate(-1);
            })
            .catch((error) => {
                console.error('Error posting data:', error);
            });
    };

    const handleChangeRole = (e, { value }) => {
        setRole(value);
    };

    // ------------------------Address-----------------------------------

    const handleCityChange = (e) => {
        setValueCity(e.target.value);
        setValueDistrict('');
    };

    const handleDistrictChange = (e) => {
        setValueDistrict(e.target.value);
    };
    const handleWardChange = (e) => {
        setValueWard(e.target.value);
    };
    const renderCities = () => {
        return country.map((city) => ({
            key: city.codename,
            value: city.codename,
            text: city.name,
        }));
    };

    const renderDistricts = () => {
        if (!valueCity) return [];

        const city = country.find((city) => city.codename === valueCity);
        return city.districts.map((district) => ({
            key: district.codename,
            value: district.codename,
            text: district.name,
        }));
    };

    const renderWards = () => {
        if (!valueCity || !valueDistrict) return [];

        const city = country.find((city) => city.codename === valueCity);
        const district = city.districts.find((district) => district.codename === valueDistrict);

        return district.wards.map((ward) => ({
            key: ward.codename,
            value: ward.codename,
            text: ward.name,
        }));
    };
    return (
        <div className="p-5">
            <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-white py-4 pl-[18%] shadow-md">
                <h3 className="text-4xl font-bold">Thêm người dùng {} </h3>
                <div>
                    <Button primary onClick={handleUpdate}>
                        Thêm
                    </Button>
                    <Link onClick={() => navigate(-1)}>
                        <Button color="red">Hủy</Button>
                    </Link>
                </div>
            </div>
            <div className="mb-5 py-16">
                <Form size="large">
                    <p className="flex items-center justify-between gap-10">
                        <InputField
                            type="text"
                            label="Họ"
                            placeholder="Nhập họ "
                            required
                            value={firstName}
                            onChange={handleChange(SetFirstName)}
                        />
                        <InputField
                            type="text"
                            label="Tên"
                            placeholder="Nhập tên "
                            required
                            value={lastName}
                            onChange={handleChange(setLastName)}
                        />
                    </p>
                    <div className="flex items-center justify-between gap-10">
                        <InputField
                            type="email"
                            label="Email"
                            placeholder="Nhập mô tả sản phẩm"
                            required
                            // value={dataDetail.Email}
                            value={email}
                            onChange={handleChange(setEmail)}
                        />
                        <InputField
                            type="text"
                            label="Mật khẩu"
                            placeholder="Nhập mật khẩu"
                            required
                            // value={dataDetail.Email}
                            value={password}
                            onChange={handleChange(setPassword)}
                        />
                    </div>
                    <div className="flex items-center justify-between gap-10">
                        <InputField
                            type="text"
                            label="Số điện thoại"
                            placeholder="Nhập số điện thoại"
                            required
                            value={phoneNumber}
                            onChange={handleChangePhoneNumber}
                        />
                        <InputField
                            label="Vai trò"
                            placeholder="Chọn vai trò"
                            required
                            type="select"
                            options={keyRole}
                            value={role}
                            onChange={handleChange(setRole)}
                        />
                    </div>

                    <div className="flex items-center justify-between gap-10">
                        <InputField
                            label="Tỉnh/Thành phố:"
                            placeholder="Chọn thành phố"
                            required
                            type="select"
                            options={renderCities()}
                            value={valueCity}
                            onChange={handleCityChange}
                        />
                        <InputField
                            label="Quận/Huyện:"
                            placeholder="Chọn quận/huyện"
                            required
                            type="select"
                            options={renderDistricts()}
                            value={valueDistrict}
                            onChange={handleDistrictChange}
                        />
                        <InputField
                            label="Xã/Phường:"
                            placeholder="Chọn xã/phường"
                            required
                            type="select"
                            options={renderWards()}
                            value={valueWard}
                            onChange={handleWardChange}
                        />
                    </div>
                </Form>
            </div>
            {isLoading && (
                <>
                    <div className="z-1000 fixed left-0 top-0 h-full w-full bg-black opacity-50"></div>
                    <div className="animation-fadeInOut fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform rounded px-8 py-4 text-2xl text-white">
                        <Loader active inverted inline="centered">
                            Loading
                        </Loader>
                    </div>
                </>
            )}
        </div>
    );
}

export default AdminUserAddPage;
