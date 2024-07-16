import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

const formatDate = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    return format(date, 'dd/MM/yyyy');
};

const FormatDate = ({ date, className = '', size = 'base' }) => {
    const sizeClass = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base';

    return <p className={`${sizeClass} ${className}`}>{formatDate(date)}</p>;
};

FormatDate.propTypes = {
    date: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'lg', 'base']),
};

export default FormatDate;
