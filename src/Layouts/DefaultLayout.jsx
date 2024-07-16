import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import ThemeProvider, { useTheme } from './ThemeProvider';
import Header from './Components/Header';
import Footer from './Components/Footer';
import SideBar from './Components/SideBar';

function DefaultLayout({ children }) {
    const { darkMode, toggleDarkMode, widthSidebar } = useTheme();
    const { role } = useTheme();
    const location = useLocation();
    const isAdminPath =
        (location.pathname === '/admin' || location.pathname === '/admin/adminTour') && role === 'admin'; // Check if the current path is /admin and role is admin

    return (
        <>
            {role !== 'admin' ? <Header /> : <SideBar />}

            <div
                className={`${darkMode ? 'bg-darkHF text-white' : 'bg-white text-black'} ${
                    role !== 'admin' ? 'min-h-[62vh] py-[60px]' : `p-5`
                } min-h-screen`}
            >
                <div style={{ paddingLeft: role === 'admin' ? `${widthSidebar}px` : '0' }}>{children}</div>
            </div>
            {role !== 'admin' && <Footer />}
        </>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
