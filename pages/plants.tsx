import React from 'react';
import { fetcher } from '../utils/fetcher';
import useSWR from 'swr';

const Plants = () => {
    const {
        data: plants,
        isLoading,
        error,
    } = useSWR(`/api/plants/${123}`, fetcher);

    return <div>Plants</div>;
};

export default Plants;
