import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTheme } from '../Layouts/ThemeProvider';
import { CalendarCheck, MapPin, UserRound } from 'lucide-react';
import { format } from 'date-fns';

const ItemTravelTour = ({
    id,
    price,
    name,
    image,
    duration,
    departureLocation,
    startDate,
    quantityTotalParticipate,
    quantityRegistered,
    small,
}) => {
    const { darkMode } = useTheme();
    function formatPrice(price) {
        if (price) {
            return price.toLocaleString('vi-VN', { minimumFractionDigits: 0 }) + 'đ/người';
        }
    }
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return format(date, 'dd/MM/yyyy');
    };
    return (
        <div className="mt-15 relative mx-5 mb-52" key={id}>
            <div className="label1 absolute -top-2 left-8 mt-[6px] bg-orange px-2 py-2 text-base font-bold text-white">
                <p>{formatPrice(price)} </p>
            </div>
            <img
                src={image}
                alt={name}
                className={`-mt-[38px] rounded-xl ${small ? 'h-[240px] w-[316px]' : 'h-[280px] w-[360px]'}`}
            />
            <Link className={`absolute -bottom-40 left-[20px] ${small ? 'w-[280px]' : 'w-[320px]'}`} to={`/tour/${id}`}>
                <div
                    className={`${darkMode ? 'bg-darkHF text-white' : 'bg-white text-black'} rounded-xl px-3 py-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:text-blue`}
                >
                    <p className="font-bold text-orange">{duration} NGÀY</p>
                    <p className={`line-clamp-2 py-2 font-bold ${small ? 'text-xl' : 'h-20 text-2xl'}`}>{name}</p>
                    <div className="flex items-center gap-2 py-2">
                        <MapPin className="h-5 w-5" />
                        <p className={`flex h-5 items-center ${small ? 'text-base' : ''}`}>Từ: {departureLocation}</p>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                        <CalendarCheck className="h-5 w-5" />
                        <p className={`flex h-5 items-center ${small ? 'text-base' : ''}`}>
                            Ngày khởi hành: {formatDate(startDate)}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                        <UserRound className="h-5 w-5" />
                        <p className={`flex h-5 items-center ${small ? 'text-base' : ''}`}>
                            Số chỗ: {quantityTotalParticipate} - Còn trống:{' '}
                            {quantityTotalParticipate - quantityRegistered}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                        <UserRound className="h-5 w-5" />
                        <p className={`flex h-5 items-center ${small ? 'text-base' : ''}`}>
                            Đã đăng ký: {quantityRegistered}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
};
ItemTravelTour.propTypes = {
    id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    departureLocation: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    quantityTotalParticipate: PropTypes.number.isRequired,
    quantityRegistered: PropTypes.number.isRequired,
    small: PropTypes.bool,
};

ItemTravelTour.defaultProps = {
    small: false,
};
export default ItemTravelTour;
