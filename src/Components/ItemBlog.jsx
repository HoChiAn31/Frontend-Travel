import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ItemBlogs = ({ image, id, title, category, author, createdAt }) => {
    return (
        <div
            style={{
                backgroundImage: `url('${image}')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundBlendMode: 'darken',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
            }}
            className="min-h-[400px] w-full overflow-hidden rounded-2xl"
        >
            <div className="flex h-full text-white">
                <div className="mb-5 mt-auto px-5">
                    <Link to={`/blog/details/${id}`}>
                        <div className="transition-opacity duration-300 hover:text-white hover:opacity-80">
                            <p className="font-bold">{category}</p>
                            <p className="flex h-20 items-center text-xl font-medium">{title}</p>
                            <div className="flex gap-4">
                                <p className="text-base">{author}</p>
                                <p className="text-base">{new Date(createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

ItemBlogs.propTypes = {
    image: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
};

export default ItemBlogs;
