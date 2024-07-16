import { CircleAlert, CircleCheck, TriangleAlert } from 'lucide-react';
import { useTheme } from '../Layouts/ThemeProvider';
import PropTypes from 'prop-types';
function NotificationComponent({ success, fail }) {
    const { darkMode } = useTheme();
    return (
        <>
            {success && (
                <div
                    className={`${darkMode ? 'bg-black1 text-white' : 'bg-white text-black'} animate-slide-in-right fixed right-1 top-4 z-[100] min-w-56 rounded border-l-4 border-green px-4 py-6 shadow-2xl`}
                >
                    <div className="flex items-center gap-2 text-lg">
                        <CircleCheck style={{ color: '#68FD87' }} />
                        <p>Cập nhật thành công!</p>
                    </div>
                </div>
            )}
            {fail && (
                <div
                    className={`${darkMode ? 'bg-black1 text-white' : 'bg-white text-black'} animate-slide-in-right fixed right-1 top-4 z-[100] min-w-56 rounded border-l-4 border-red px-4 py-6 shadow-2xl`}
                >
                    <div className="flex items-center gap-2 text-lg">
                        <TriangleAlert className="text-red" />
                        <p>Cập nhật thất bại!</p>
                    </div>
                </div>
            )}
        </>
    );
}
NotificationComponent.propTypes = {
    success: PropTypes.bool,
    fail: PropTypes.bool,
};

NotificationComponent.defaultProps = {
    success: false,
    fail: false,
};
export default NotificationComponent;
