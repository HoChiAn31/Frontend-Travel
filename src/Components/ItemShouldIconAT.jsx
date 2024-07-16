import PropTypes from 'prop-types';

const ItemShouldIconAT = ({ icon: Icon, title, content }) => (
    <div className="flex flex-col items-center">
        <Icon className="h-20 w-20 text-bluelogo" />
        <p className="py-3 text-xl font-bold">{title}</p>
        <p>{content}</p>
    </div>
);

ItemShouldIconAT.propTypes = {
    icon: PropTypes.elementType.isRequired, // Ensures `icon` is a valid React component
    title: PropTypes.string.isRequired, // Ensures `title` is a string
    content: PropTypes.string.isRequired, // Ensures `content` is a string
};

export default ItemShouldIconAT;
