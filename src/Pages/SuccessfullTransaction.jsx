import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function SuccessPage() {
    return (
        <div className="my-4 flex h-[340px] flex-col items-center justify-center">
            <title>Thanh toán thành công</title>
            <FontAwesomeIcon icon={faCircleCheck} className="mb-2 h-12 w-12 text-green-500" />
            <p className="text-3xl font-bold text-green-500">Đơn hàng của bạn đã được tiếp nhận</p>
            <div className="my-2 text-center">
                <p>Cảm ơn bạn đã đặt tour</p>
                {/* <p>
            Mã đơn hàng của bạn là: <span className='text-orange'>{codeOrder}</span>
        </p> */}
                <p>Chúng tôi sẽ liên lạc với bạn trong thời gian sớm nhất.</p>
            </div>

            <Link
                to="/"
                className="my-5 rounded-md bg-blueButton px-8 py-4 text-base font-bold text-white hover:opacity-70"
            >
                TIẾP TỤC KHÁM PHÁ TOUR
            </Link>
        </div>
    );
}

export default SuccessPage;
