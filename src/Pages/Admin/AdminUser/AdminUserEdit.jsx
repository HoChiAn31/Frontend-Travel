import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Loader } from 'semantic-ui-react';
import axios from 'axios';
import { country } from '../../../Services/data';
import InputField from '../../../Components/InputField';
import { useTheme } from '../../../Layouts/ThemeProvider';

const keyRole = [
    { key: 'admin', value: 'admin', label: 'Quản trị viên' },
    { key: 'user', value: 'user', label: 'Người dùng' },
];

function AdminUserEditPage() {
    const { id } = useParams();
    const { url } = useTheme();
    const [userData, setUserData] = useState({});
    const [fullName, setFullName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${url}/users/${id}`)
            .then((response) => {
                const data = response.data;
                setUserData(data);
                setFullName(`${data.firstName} ${data.lastName}`);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
                setIsLoading(false);
            });
    }, [id, url]);

    useEffect(() => {
        setFullName(`${userData.firstName} ${userData.lastName}`);
    }, [userData.firstName, userData.lastName]);

    const handleChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleUpdate = () => {
        setIsLoading(true);

        const updatedData = { ...userData, fullName };

        axios
            .put(`${url}/users/${id}`, updatedData)
            .then((response) => {
                console.log('User updated:', response.data);
                setIsLoading(false);
                navigate(-1);
            })
            .catch((error) => {
                console.error('Error updating user data:', error);
                setIsLoading(false);
            });
    };

    const handleChangeRole = (e, { value }) => {
        setUserData({ ...userData, role: value });
    };

    const handleCityChange = (e) => {
        setUserData({ ...userData, city: e.target.value, district: '', ward: '' });
    };

    const handleDistrictChange = (e) => {
        setUserData({ ...userData, district: e.target.value, ward: '' });
    };

    const handleWardChange = (e) => {
        setUserData({ ...userData, ward: e.target.value });
    };

    const renderCities = () => {
        return country.map((city) => ({
            key: city.codename,
            value: city.codename,
            text: city.name,
        }));
    };

    const renderDistricts = () => {
        if (!userData.city) return [];

        const city = country.find((city) => city.codename === userData.city);
        return city.districts.map((district) => ({
            key: district.codename,
            value: district.codename,
            text: district.name,
        }));
    };

    const renderWards = () => {
        if (!userData.city || !userData.district) return [];

        const city = country.find((city) => city.codename === userData.city);
        const district = city.districts.find((district) => district.codename === userData.district);

        return district.wards.map((ward) => ({
            key: ward.codename,
            value: ward.codename,
            text: ward.name,
        }));
    };

    if (isLoading) {
        return (
            <Loader active inline="centered">
                Loading
            </Loader>
        );
    }

    return (
        <div className="p-5">
            <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-white py-4 pl-[18%] shadow-md">
                <h3 className="text-4xl font-bold">Chi tiết người dùng</h3>
                <div>
                    <Button primary onClick={handleUpdate}>
                        Cập nhật
                    </Button>
                    <Button color="red" onClick={() => navigate(-1)}>
                        Hủy
                    </Button>
                </div>
            </div>
            <div className="mb-5 py-16">
                <Form size="large">
                    <p className="flex items-center justify-between gap-10">
                        <InputField
                            type="text"
                            label="Họ"
                            placeholder="Nhập họ"
                            required
                            value={userData.firstName}
                            onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                        />
                        <InputField
                            type="text"
                            label="Tên"
                            placeholder="Nhập tên"
                            required
                            value={userData.lastName}
                            onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                        />
                    </p>
                    <div className="flex items-center justify-between gap-10">
                        <InputField
                            type="email"
                            label="Email"
                            placeholder="Nhập email"
                            required
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        />
                        <InputField
                            type="text"
                            label="Mật khẩu"
                            placeholder="Nhập mật khẩu"
                            required
                            value={userData.password}
                            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        />
                    </div>
                    <div className="flex items-center justify-between gap-10">
                        <InputField
                            type="text"
                            label="Số điện thoại"
                            placeholder="Nhập số điện thoại"
                            required
                            value={userData.phoneNumber}
                            onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
                        />
                        <InputField
                            label="Vai trò"
                            placeholder="Chọn vai trò"
                            required
                            type="select"
                            options={keyRole}
                            value={userData.role}
                            onChange={handleChangeRole}
                        />
                    </div>

                    <div className="flex items-center justify-between gap-10">
                        <InputField
                            label="Tỉnh/Thành phố:"
                            placeholder="Chọn thành phố"
                            required
                            type="select"
                            options={renderCities()}
                            value={userData.city}
                            onChange={handleCityChange}
                        />
                        <InputField
                            label="Quận/Huyện:"
                            placeholder="Chọn quận/huyện"
                            required
                            type="select"
                            options={renderDistricts()}
                            value={userData.district}
                            onChange={handleDistrictChange}
                        />
                        <InputField
                            label="Xã/Phường:"
                            placeholder="Chọn xã/phường"
                            required
                            type="select"
                            options={renderWards()}
                            value={userData.ward}
                            onChange={handleWardChange}
                        />
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default AdminUserEditPage;
