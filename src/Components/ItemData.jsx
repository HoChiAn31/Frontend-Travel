import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ItemData = ({ icon, name, quantity, bgColor, price }) => (
    <div
        className={`flex w-full items-center gap-4 rounded-md px-2 py-2 text-white shadow-sm`}
        style={{ backgroundColor: bgColor }}
    >
        <FontAwesomeIcon icon={icon} className="m-4 text-3xl" />
        <div className="flex flex-col">
            <p className="text-2xl">{name}</p>
            <p className="text-2xl">
                {price ? `${quantity.toLocaleString('vi-VN', { minimumFractionDigits: 0 })}đ` : quantity}
            </p>
        </div>
    </div>
);

ItemData.propTypes = {
    icon: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    bgColor: PropTypes.string.isRequired,
    price: PropTypes.bool.isRequired,
};

export default ItemData;
