import { useState, useEffect, useRef } from 'react';
import { Bell, Search, UserRound, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../ThemeProvider';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

function Header() {
    const { darkMode, toggleDarkMode } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const location = useLocation();
    const notificationsRef = useRef(null);

    const LinkNav = ({ to, title }) => {
        return (
            <Link
                to={to}
                className={`block px-3 py-2 text-base lg:inline-block lg:text-lg ${
                    location.pathname === to ? 'text-blueButton' : 'hover:opacity-80'
                }`}
            >
                {title}
            </Link>
        );
    };

    const handleBellClick = () => {
        setIsNotificationsOpen(!isNotificationsOpen);
    };

    const handleClickOutside = (event) => {
        if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
            setIsNotificationsOpen(false);
        }
    };

    useEffect(() => {
        if (isNotificationsOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isNotificationsOpen]);

    return (
        <div
            className={`${
                darkMode ? 'bg-darkHF text-white' : 'bg-white text-black'
            } fixed left-0 right-0 top-0 z-[100] h-[60px] shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}
        >
            <div className="mx-auto flex max-w-[1200px] items-center justify-between p-2 lg:p-0">
                <div className="flex items-center">
                    <img
                        src="https://png.pngtree.com/png-vector/20220619/ourmid/pngtree-plane-travel-logo-vector-template-png-image_5128726.png"
                        alt="Travel AT Logo"
                        className="h-12 w-12 lg:h-16 lg:w-16"
                    />
                    <h1 className="m-0 text-2xl font-bold text-[#19619E] lg:text-3xl">
                        <Link to="/">
                            TRAVEL <span className="text-[#F79517]">SVIP</span>
                        </Link>
                    </h1>
                </div>
                <div className="hidden lg:flex lg:items-center lg:justify-between lg:gap-4">
                    <LinkNav to="/" title="Trang chủ" />
                    <LinkNav to="/about" title="Giới thiệu" />
                    <LinkNav to="/tour" title="Tour" />
                    <LinkNav to="/hotel" title="Khách sạn" />
                    <LinkNav to="/contact" title="Liên hệ" />
                </div>
                <div className="flex items-center justify-between gap-4 lg:gap-8">
                    <div className="cursor-pointer lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <Menu />
                    </div>
                    <div className="hidden items-center gap-4 lg:flex">
                        <div className="relative cursor-pointer" ref={notificationsRef}>
                            <Bell onClick={handleBellClick} className="hover:text-blue" />
                            {isNotificationsOpen && (
                                <div className="absolute right-0 mt-2 w-64 rounded-md bg-white p-4 shadow-lg dark:bg-darkHF dark:text-white">
                                    <h3 className="mb-2 text-lg font-bold">Thông báo</h3>
                                    <ul>
                                        <li className="mb-2">Bạn có một thông báo mới.</li>
                                        <li className="mb-2">Tour mới đã được thêm.</li>
                                        <li className="mb-2">Giảm giá đặc biệt cho bạn.</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        <Link to="/profile" className="cursor-pointer">
                            <UserRound />
                        </Link>
                        <DarkModeSwitch onChange={toggleDarkMode} checked={darkMode} size={20} />
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="lg:hidden">
                    <div className="flex flex-col items-start bg-white p-4 text-black dark:bg-darkHF dark:text-white">
                        <LinkNav to="/" title="Trang chủ" />
                        <LinkNav to="/about" title="Giới thiệu" />
                        <LinkNav to="/tour" title="Tour" />
                        <LinkNav to="/hotel" title="Khách sạn" />
                        <LinkNav to="/contact" title="Liên hệ" />
                        <div className="relative mt-4 w-full">
                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                className="w-full rounded-full border bg-gray-100 px-4 py-2 text-black focus:outline-none dark:bg-darkHF dark:text-white"
                            />
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 transform text-gray-500 dark:text-white" />
                        </div>
                        <div className="mt-4 flex w-full items-center justify-between gap-4">
                            <div className="relative cursor-pointer" ref={notificationsRef}>
                                <Bell onClick={handleBellClick} />
                                {isNotificationsOpen && (
                                    <div className="absolute right-0 mt-2 w-64 rounded-md bg-white p-4 shadow-lg dark:bg-darkHF dark:text-white">
                                        <h3 className="mb-2 text-lg font-bold">Thông báo</h3>
                                        <ul>
                                            <li className="mb-2">Bạn có một thông báo mới.</li>
                                            <li className="mb-2">Tour mới đã được thêm.</li>
                                            <li className="mb-2">Giảm giá đặc biệt cho bạn.</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <Link to="/profile" className="cursor-pointer">
                                <UserRound />
                            </Link>
                            <DarkModeSwitch onChange={toggleDarkMode} checked={darkMode} size={20} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Header;
