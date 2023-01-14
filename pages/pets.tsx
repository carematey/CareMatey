import { Box, Button, CircularProgress, Heading } from '@chakra-ui/react';
import React from 'react';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
const Pets = () => {
    const { data, isLoading, error, mutate } = useSWR(
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
                <>
                    <Box>
                        <Heading>Pets</Heading>
                        {data &&
                            data?.sections?.map(
                                (section: {
                                    id: number;
                                    title: string;
                                    content: string;
                                }) => (
                                    <Box key={section.id}>
                                        <Heading as="h2" size="md">
                                            {section.title}
                                        </Heading>
                                        <p>{section.content}</p>
                                    </Box>
                                )
                            )}
                    </Box>
                    {/* this button is an example of using mutate to update the local data and revalidate (refetch) the data from the API. 
                    Local data is rolled back if the API request fails. Uncomment newSections variable and the mutate() function to see it roll back */}
                    {/* <Button
                        onClick={async () => {
                            // const newSections = [
                            //     {
                            //         title: 'Updated Feeding Directions',
                            //         content: `Here are the instructions on how to feed my pets while I am away:\n
                            //              - My dog, [dog's name], needs to be fed twice a day, once in the morning and once in the evening. \n
                            //              - They eat [brand and type of food] and you'll find the food in [location].\n
                            //              - My cat, [cat's name], needs to be fed once a day in the morning. \n
                            //              - They eat [brand and type of food] and you'll find the food in [location].\n
                            //              - Please make sure to leave enough water for both of them, you'll find water and water bowls in [location].\n
                            //              - If you're unsure about anything, don't hesitate to contact me.`,
                            //     },
                            //     {
                            //         title: 'Updated Walking Directions',
                            //         content: `Here are the instructions on how to walk my pets while I am away:\n
                            //              - My dog, [dog's name], needs to be walked twice a day, once in the morning and once in the evening. \n
                            //              - The usual walking route is [route or location], but feel free to change it up and explore new areas.\n
                            //              - Make sure to bring poop bags and clean up after [dog's name].\n
                            //              - My cat, [cat's name], is indoor cat and doesn't need to be walked. \n
                            //              - If you have any questions or concerns, don't hesitate to contact me.`,
                            //     },
                            // ];
                            // send a request to the API to update the data
                            // await requestDataUpdate(newSections) // this is a fake function that would send a request to the API to update the data
                            // update the local data immediately and revalidate (refetch)
                            // NOTE: key is not required when using useSWR's mutate as it's pre-bound
                            // mutate({ ...data, sections: newSections });
                        }}
                    >
                        Update
                    </Button> */}
                </>
            )}
        </>
    );
};

export default Pets;
