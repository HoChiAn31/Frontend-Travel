import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import 'core-js/stable/atob';
const ThemeContext = createContext();

function ThemeProviders({ children }) {
    const [url, setUrl] = useState('https://backend-travel156-65w8.vercel.app');
    const [isReload, setiIsReload] = useState(0);
    const [roomSelect, setRoomSelect] = useState([]);
    const [checkInDate, setCheckInDate] = useState();
    const [checkOutDate, setCheckOutDate] = useState();
    const [quantityPeopleHotel, setQuantityPeopleHotel] = useState();
    const [isForgetPassword, setIsForgetPassword] = useState(false);
    const [orderTranId, setOrderTranId] = useState();
    const [pathRequired, setPathRequired] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    // =============================================================
    // const [isUser, setIsUser] = useState('3e7ba291-a673-465e-9d2b-63afd476fc86');
    // const [isLogin, setIsLogin] = useState(true);
    // const [role, setRole] = useState('user');
    // const [email, setEmail] = useState('');
    const [isUser, setIsUser] = useState(() => localStorage.getItem('isUser') || '');
    const [isLogin, setIsLogin] = useState(() => localStorage.getItem('isLogin') || '');
    const [role, setRole] = useState(() => localStorage.getItem('role') || '');

    const [isForget, setIsForget] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isCheckAccount, setIsCheckAccount] = useState(() => localStorage.getItem('isAccount') || '');
    const [tokens, setTokens] = useState();
    // width sidebar
    const [widthSidebar, setWidthSidebar] = useState(250);
    // =============================================================
    const [error, setError] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        // Read initial value from localStorage
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true'; // Convert string to boolean
    });
    // console.log('isLogin: ', isLogin);
    const toggleDarkMode = () => {
        setDarkMode((prev) => {
            const newMode = !prev;
            localStorage.setItem('darkMode', newMode); // Save new mode to localStorage
            document.documentElement.classList.toggle('dark', newMode);
            return newMode;
        });
    };

    // Ensure the document's classList is updated when darkMode changes
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    useEffect(() => {
        if (email && password) {
            axios
                .post(`${url}/login`, {
                    email: email,
                    password: password,
                })
                .then((response) => {
                    const token = jwtDecode(response.data.token);

                    setTokens(token);
                    setIsLogin(true);
                    if (token.role === 'admin') {
                        setIsAdmin(true);
                    }

                    localStorage.setItem('isLogin', 'true');
                    // localStorage.setItem('role', tokens.role);
                    // Điều hướng người dùng sau khi đăng nhập thành công
                })
                .catch((error) => {
                    setError(true);
                });
        }
    }, [email, password]);
    useEffect(() => {
        if (isCheckAccount === true) {
            setEmail(tokens.email);
            setRole(tokens.role);
            setIsUser(true);
            localStorage.setItem('isUser', tokens.id_user);
            localStorage.setItem('isAccount', 'true');

            localStorage.setItem('role', tokens.role);
        }
    }, [isCheckAccount]);

    return (
        <ThemeContext.Provider
            value={{
                url,
                isReload,
                setiIsReload,
                darkMode,
                toggleDarkMode,
                roomSelect,
                setRoomSelect,
                checkInDate,
                setCheckInDate,
                checkOutDate,
                setCheckOutDate,
                role,
                setRole,
                isForgetPassword,
                setIsForgetPassword,
                isLogin,
                setIsLogin,
                email,
                setEmail,
                password,
                setPassword,
                error,
                setError,
                isCheckAccount,
                setIsCheckAccount,
                isUser,
                setIsUser,
                orderTranId,
                setOrderTranId,
                setQuantityPeopleHotel,
                quantityPeopleHotel,
                pathRequired,
                setPathRequired,
                setWidthSidebar,
                widthSidebar,
                setIsAdmin,
                isAdmin,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProviders;

export const useTheme = () => useContext(ThemeContext);
