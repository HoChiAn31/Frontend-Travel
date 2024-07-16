import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
    const navigate = useNavigate();

    const handleClick = (href, event) => {
        if (href === '#back') {
            event.preventDefault();
            navigate(-1); // Go back to the previous page
        }
    };

    return (
        <nav className="flex w-full py-5">
            <ol className="list-reset flex">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        {index > 0 && <span className="mx-2 text-gray-500">/</span>}
                        {item.href ? (
                            <Link
                                to={item.href ? item.href : '#'}
                                className="text-lg text-blue hover:underline"
                                onClick={(event) => handleClick(item.href, event)}
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-lg">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

Breadcrumb.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            href: PropTypes.string,
            label: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default Breadcrumb;
