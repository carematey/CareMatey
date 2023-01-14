import { CircularProgress } from '@chakra-ui/react';
import React from 'react';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
const Pets = () => {
    const { data, isLoading, error } = useSWR(
        '/api/pets/123',
        fetcher
        //some options for useSWR
        // {
        // refreshInterval: 1000,
        // revalidateIfStale: false,
        // revalidateOnFocus: false,
        // revalidateOnReconnect: false,
        // shouldRetryOnError: false,
        // dedupingInterval: 1000,
        // }
    );

    // useSWR hook replaces the below boilerplate code. More info on useSWR here: https://swr.vercel.app/

    // const [pets, setPets] = React.useState([]);
    // const [loading, setLoading] = React.useState(true);

    // React.useEffect(() => {
    //     const fetchPets = async () => {
    //         setLoading(true);
    //         const response = await fetch(
    //             `http://localhost:3000/api/pets/${123}`
    //         );
    //         const data = await response.json();
    //         setPets(data);
    //         setLoading(false);
    //     };
    //     fetchPets();
    // }, []);

    return (
        <>
            {isLoading ? (
                <CircularProgress isIndeterminate color="green.300" />
            ) : error ? (
                <div>Failed to load</div>
            ) : (
                <div>Pets</div>
            )}
        </>
    );
};

export default Pets;
