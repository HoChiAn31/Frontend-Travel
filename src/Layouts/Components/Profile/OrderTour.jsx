import OrderTableTour from './OrderTableTour';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../ThemeProvider';
import { Button } from 'semantic-ui-react';

function OrderTour() {
    const { isLogin, isUser, isCheckAccount, setPathRequired } = useTheme();
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
        setPathRequired('/profile');
    };
    return (
        <div>
            {isLogin && isCheckAccount && isUser !== '' ? (
                <div>
                    <OrderTableTour />
                </div>
            ) : (
                <div className="flex h-[68vh] flex-col items-center justify-center">
                    <p>Hãy đăng nhập/đăng ký để xem danh sách tour đã đặt!</p>
                    <Button
                        onClick={handleLogin}
                        className="my-4 rounded-md bg-blueButton px-16 py-4 text-white hover:opacity-70"
                    >
                        Đăng nhập
                    </Button>
                </div>
            )}
        </div>
    );
}

export default OrderTour;

//
