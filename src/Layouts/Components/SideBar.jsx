import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBook,
    faChartLine,
    faClipboardList,
    faComment,
    faHouse,
    faPlaceOfWorship,
    faTableCellsLarge,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { faSupple } from '@fortawesome/free-brands-svg-icons';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Hotel, Icon, Pyramid, ShoppingBag, ShoppingBasket, TramFront } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { useRef, useState } from 'react';
import { Button, Header, Modal, ModalActions } from 'semantic-ui-react';
import ModalComponents from '../../Components/ModalComponents';
function SideBar() {
    const {
        darkMode,
        widthSidebar,
        setWidthSidebar,
        isUser,

        isLogin,
        setRole,
        setIsUser,
        setIsCheckAccount,
        setIsLogin,
        isCheckAccount,
        setEmail,
        setPassword,
    } = useTheme();

    const location = useLocation();
    const [width, setWidth] = useState(250);
    const [open, setOpen] = useState(false);
    const sidebarRef = useRef(null);
    const navigation = useNavigate();
    const handleMouseDown = (e) => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e) => {
        if (sidebarRef.current) {
            const newWidth = e.clientX - sidebarRef.current.getBoundingClientRect().left;
            if (newWidth > 100 && newWidth < 500) {
                setWidth(newWidth);
                setWidthSidebar(newWidth);
            }
        }
    };

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };
    const myMenuItemStyles = (active) => ({
        '.menu-anchor': {
            backgroundColor: active ? '#444' : 'initial',
            color: active ? '#eee' : '#ccc',
        },
        '.menu-anchor:hover': {
            backgroundColor: '#444',
            color: '#eee',
        },
    });
    const handleLogout = () => {
        // Logic for logging out the user
        console.log('User logged out');
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
        navigation('/');
    };
    return (
        <div className="fixed bottom-0 left-0 top-0 z-[1000] min-h-screen max-w-64">
            <div ref={sidebarRef} style={{ width: `${width}px`, position: 'relative' }}>
                <Sidebar
                    width={`${width}px`}
                    backgroundColor={darkMode ? '#E4E4E4' : ''}
                    className="fixed bottom-0 left-0 top-0 min-h-screen max-w-64"
                    rootStyles={{}}
                >
                    <Menu
                        menuItemStyles={{
                            button: ({ level, active, disabled }) => {
                                if (level === 0)
                                    return {
                                        color: active ? '#009FE5' : undefined,
                                    };
                            },
                        }}
                    >
                        <MenuItem className="text-4xl font-bold text-bluelogo">
                            Travel-<span className="text-orange">AT</span>
                        </MenuItem>
                        <MenuItem
                            icon={<FontAwesomeIcon icon={faHouse} />}
                            active={location.pathname === '/admin'}
                            component={<Link to="/admin" />}
                        >
                            Trang chủ
                        </MenuItem>
                        <SubMenu label=" Đơn đặt hàng" icon={<ShoppingBag className="h-5 w-5" />}>
                            <MenuItem
                                icon={<ShoppingBasket className="h-5 w-5" />}
                                active={location.pathname === '/admin/adminOrderTour'}
                                component={<Link to="/admin/adminOrderTour" />}
                            >
                                Tour
                            </MenuItem>
                            <MenuItem
                                icon={<ShoppingBasket className="h-5 w-5" />}
                                active={location.pathname === '/admin/adminOrderHotel'}
                                component={<Link to="/admin/adminOrderHotel" />}
                            >
                                Khách sạn
                            </MenuItem>
                        </SubMenu>
                        <MenuItem
                            icon={<Pyramid className="h-5 w-5" />}
                            active={location.pathname === '/admin/adminTour'}
                            component={<Link to="/admin/adminTour" />}
                        >
                            Quản lý Tour
                        </MenuItem>
                        <MenuItem
                            icon={<Hotel className="h-5 w-5" />}
                            active={location.pathname === '/admin/adminHotel'}
                            component={<Link to="/admin/adminHotel" />}
                        >
                            Quản lý khách sạn
                        </MenuItem>
                        <MenuItem
                            icon={<FontAwesomeIcon icon={faUser} />}
                            active={location.pathname === '/admin/adminUser'}
                            component={<Link to="/admin/adminUser" />}
                        >
                            Quản lý người dùng
                        </MenuItem>
                        <MenuItem
                            icon={<FontAwesomeIcon icon={faUser} />}
                            active={location.pathname === '/admin/adminCategoriesQuestion'}
                            component={<Link to="/admin/adminCategoriesQuestion" />}
                        >
                            Quản lý danh mục giải đáp
                        </MenuItem>
                        <div className="flex items-center justify-center">
                            <button
                                className="rounded-md bg-red px-10 py-3 text-white hover:opacity-80"
                                onClick={() => setOpen(true)}
                            >
                                Đăng xuất
                            </button>
                        </div>
                    </Menu>
                    <div
                        onMouseDown={handleMouseDown}
                        className="bg-gray-10b0 absolute right-0 top-0 h-screen w-1 cursor-ew-resize"
                    />
                </Sidebar>
            </div>
            <ModalComponents
                open={open}
                handleYes={handleLogout}
                handleClose={() => setOpen(false)}
                title="Bạn có muốn đăng xuất"
                titleYes="Có"
            />
        </div>
    );
}

export default SideBar;
