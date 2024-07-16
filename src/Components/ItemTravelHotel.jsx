import PropTypes from 'prop-types';
import { Rating } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { useTheme } from '../Layouts/ThemeProvider';
const ItemTravelHotel = ({ id, name, image, price, address, city, rating, viewVisit }) => {
    const { darkMode } = useTheme();
    function formatPrice(price) {
        if (price) {
            return price.toLocaleString('vi-VN', { minimumFractionDigits: 0 }) + 'đ/đêm';
        }
    }
    return (
        <div className="mt-15 relative mx-5 mb-52" key={id}>
            <div className="label1 absolute -top-2 left-8 mt-[6px] bg-orange px-2 py-2 text-base font-bold text-white">
                <p>Chỉ từ {formatPrice(price)}</p>
            </div>
            <img src={image} alt={name} className="-mt-[38px] h-[280px] w-[360px] rounded-xl" />
            <Link className="absolute -bottom-40 left-[20px] w-[320px]" to={`/hotel/${id}`}>
                <div
                    className={`${darkMode ? 'bg-darkHF text-white' : 'bg-white text-black'} rounded-xl px-3 py-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}
                >
                    {/* <p className="text-orange font-bold">4 NGÀY</p> */}
                    <p className="line-clamp-2 h-20 py-2 text-2xl font-bold">{name}</p>
                    <div className="flex items-start gap-2 py-2">
                        <MapPin className=" " />
                        <p className="flex h-5 items-start text-base">
                            Địa chỉ: {address},{city}
                        </p>
                    </div>
                    <div className="flex items-center gap-4 pt-10">
                        <Rating
                            defaultRating={rating}
                            maxRating={5}
                            disabled
                            icon="star"
                            size="large"
                            className="gap-2"
                        />
                        <p>({viewVisit} lượt xem)</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};
ItemTravelHotel.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    viewVisit: PropTypes.number.isRequired,
};
export default ItemTravelHotel;
