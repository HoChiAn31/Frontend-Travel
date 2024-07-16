import { useEffect } from 'react';
import PropTypes from 'prop-types';

export function useTitle(title) {
    useEffect(() => {
        const prevTitle = document.title;
        document.title = title;

        return () => {
            document.title = prevTitle;
        };
    }, [title]); // Add title as a dependency
}

// Optional: If you want to enforce prop types in a wrapper component
const TitleComponent = ({ title }) => {
    useTitle(title);
    return null; // This component does not render anything
};

TitleComponent.propTypes = {
    title: PropTypes.string.isRequired,
};

export default TitleComponent;
