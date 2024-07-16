import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

const ModalComponents = ({
    title,
    content,
    open,

    handleClose,
    handleYes,
    titleYes,
    children,
    edit,
    size,
}) => {
    const modalRef = useRef(null);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleClose();
        }
    };

    return (
        <>
            {open && (
                // className="flex h-screen items-center justify-center"
                <div>
                    <div
                        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50"
                        onClick={handleClickOutside}
                    >
                        <div
                            className={`${size === 'lg' ? 'max-w-[800px]' : 'max-w-[500px]'} w-full animate-fade-down rounded bg-white py-6 shadow-lg animate-duration-700 animate-once animate-ease-out`}
                            ref={modalRef}
                        >
                            <div className="mb-4 border-b px-6 pb-4 text-lg font-bold text-black">{title}</div>
                            <div className="px-6">
                                {children ? <>{children}</> : <div className="mb-10 text-black">{content}</div>}

                                <div className="flex justify-end">
                                    <Button
                                        className="mr-2 rounded-md bg-green1 px-6 py-3 text-white hover:opacity-80"
                                        onClick={handleYes}
                                    >
                                        {titleYes}
                                    </Button>
                                    <Button
                                        className="bg-red-500 rounded-md bg-red px-6 py-3 text-white hover:opacity-80"
                                        onClick={() => handleClose()}
                                    >
                                        Hủy
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
ModalComponents.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleYes: PropTypes.func.isRequired,
    titleYes: PropTypes.string.isRequired,
    children: PropTypes.node,
    edit: PropTypes.bool,
    size: PropTypes.oneOf(['lg', 'md']), // Adjust according to your requirements
};

ModalComponents.defaultProps = {
    content: '',
    children: null,
    edit: false,
    size: 'md',
};
export default ModalComponents;
