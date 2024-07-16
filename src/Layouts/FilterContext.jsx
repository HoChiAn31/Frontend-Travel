import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
    const [option, setOption] = useState('tour');
    const [isLoadOption, setIsLoadOption] = useState(0);
    console.log(option);
    const [filters, setFilters] = useState({
        name: '',
        city: '',
        duration: 0,
        vehicle: '',
        priceChild: [5000000, 10000000],
        startDate: '',
    });
    console.log(filters);
    console.log('================================================================');
    useEffect(() => {
        if (isLoadOption === 1) {
            console.log('render FilterProvider');
            setFilters({});
            console.log(filters);

            // if (option === 'hotel') {
            setFilters({
                city: '',
                priceChild: [5000000, 10000000],
                quantityPeople: 0,
                // vehicle: '',
                // priceChild: [5000000, 10000000],
                // startDate: '',
                // endDate: '',
            });
            // }
        }
        if (isLoadOption === 0) {
            // if (option === 'tour') {
            setFilters({
                name: '',
                city: '',
                duration: 0,
                vehicle: '',
                priceChild: [5000000, 10000000],
                startDate: '',
            });
            // }
        }
    }, [isLoadOption]);

    const updateFilter = (key, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value,
        }));
    };
    const [isFilter, setIsFilter] = useState(false);

    return (
        <FilterContext.Provider
            value={{ filters, isLoadOption, updateFilter, setIsLoadOption, isFilter, setIsFilter, setOption, option }}
        >
            {children}
        </FilterContext.Provider>
    );
};

FilterProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
