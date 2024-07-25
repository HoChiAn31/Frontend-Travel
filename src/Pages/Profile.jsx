import { useState } from 'react';
import AccountProfile from '../Layouts/Components/Profile/AccountProfile';
import OrderTour from '../Layouts/Components/Profile/OrderTour';
import OrderHotel from '../Layouts/Components/Profile/OrderHotel';
import { useTheme } from '../Layouts/ThemeProvider';
import { ModalContent, ModalActions, Button, Header, Icon, Modal } from 'semantic-ui-react';
import { useTitle } from '../Components/useTitle';
function UserPage() {
    useTitle('Hồ sơ tài khoản');
    const {
        isUser,
        darkMode,
        isLogin,
        setRole,
        setIsUser,
        setIsCheckAccount,
        setIsLogin,
        isCheckAccount,
        setEmail,
        setPassword,
    } = useTheme();

    const [activeTab, setActiveTab] = useState('account');
    const [open, setOpen] = useState(false);
    const handleLogout = () => {
        // Logic for logging out the user
        setOpen(false);
        setRole('');
        setIsUser('');
        setIsLogin(false);
        setIsCheckAccount(false);
        setEmail('');
        setPassword('');
        localStorage.setItem('isUser', '');
        localStorage.setItem('isLogin', 'false');
        localStorage.setItem('isAccount', 'false');
        localStorage.setItem('role', '');
        window.location.reload();
    };

    return (
        <div className="mx-auto max-w-[1200px]">
            <div className="my-5 flex gap-6">
                <div
                    className={`${darkMode ? 'bg-darkOutStanding' : ''} h-[80vh] w-1/4 rounded-md p-5 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]`}
                >
                    <ul className="space-y-4">
                        <li
                            className={`cursor-pointer rounded-lg p-3 transition-colors duration-300 ${
                                activeTab === 'account'
                                    ? 'bg-blue-600 border-blue-600 border shadow-lg'
                                    : 'hover:bg-gray-200'
                            }`}
                            onClick={() => setActiveTab('account')}
                        >
                            Hồ Sơ Tài Khoản
                        </li>
                        <li
                            className={`cursor-pointer rounded-lg p-3 transition-colors duration-300 ${
                                activeTab === 'ordersTour'
                                    ? 'bg-blue-600 border-blue-600 border shadow-lg'
                                    : 'hover:bg-gray-200'
                            }`}
                            onClick={() => setActiveTab('ordersTour')}
                        >
                            Danh sách tour đã đặt
                        </li>
                        <li
                            className={`cursor-pointer rounded-lg p-3 transition-colors duration-300 ${
                                activeTab === 'ordersHotel'
                                    ? 'bg-blue-600 border-blue-600 border shadow-lg'
                                    : 'hover:bg-gray-200'
                            }`}
                            onClick={() => setActiveTab('ordersHotel')}
                        >
                            Danh sách khách sạn đã đặt
                        </li>
                    </ul>

                    {isLogin && isCheckAccount && isUser !== '' ? (
                        <Modal
                            closeIcon
                            open={open}
                            trigger={
                                <Button
                                    onClick={handleLogout}
                                    className={`${darkMode ? 'bg-transparent' : 'bg-white'} mt-10 w-full rounded-lg py-3 text-red shadow-[0_2px_10px_rgb(0,0,0,0.2)] transition-colors duration-300 hover:bg-red hover:text-white`}
                                >
                                    Đăng xuất
                                </Button>
                            }
                            onClose={() => setOpen(false)}
                            onOpen={() => setOpen(true)}
                        >
                            <Header icon="archive" content="Bạn có muốn đăng xuất không?" />
                            {/* <ModalContent >
                            <p>Bạn có muốn đăng xuất không?</p>
                        </ModalContent> */}
                            <ModalActions>
                                <Button color="red" onClick={() => setOpen(false)}>
                                    <Icon name="remove" /> Không
                                </Button>
                                <Button color="green" onClick={handleLogout}>
                                    <Icon name="checkmark" /> Có
                                </Button>
                            </ModalActions>
                        </Modal>
                    ) : null}
                </div>
                <div
                    className={` ${darkMode ? 'bg-darkOutStanding' : ''} w-3/4 rounded-md px-10 py-5 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]`}
                >
                    {activeTab === 'account' && <AccountProfile />}
                    {activeTab === 'ordersTour' && <OrderTour />}
                    {activeTab === 'ordersHotel' && <OrderHotel />}
                </div>
            </div>
        </div>
    );
}

export default UserPage;
