import React, { useEffect } from 'react';

const Pets = () => {
    useEffect(() => {
        fetch(`/api/pets/123`);

        return () => {};
    }, []);

    return <div>Pets</div>;
};

export default Pets;
