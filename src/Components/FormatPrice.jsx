import React from 'react';
import PropTypes from 'prop-types';

const formatPrice = (price, totalprice, hotel) => {
    if (price) {
        return (
            price.toLocaleString('vi-VN', { minimumFractionDigits: 0 }) +
            (totalprice ? ' đ' : hotel ? ' đ/đêm' : ' đ/người')
        );
    }
    return '';
};

const FormatPrice = ({ price, className, size, totalprice, hotel }) => {
    const sizeClass = size === 'sm' ? 'text-sm' : size === 'base' ? 'text-base' : size === 'lg' ? 'text-lg' : '';
    return <p className={`${sizeClass} ${className}`}>{formatPrice(price, totalprice, hotel)}</p>;
};

FormatPrice.propTypes = {
    price: PropTypes.number,
    className: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'base', 'lg']),
    totalprice: PropTypes.bool,
    hotel: PropTypes.bool,
};

FormatPrice.defaultProps = {
    className: '',
    size: 'base',
    totalprice: false,
    hotel: false,
};

export default FormatPrice;
