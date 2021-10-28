import React from 'react';
import useFetch from 'react-fetch-hook';
import { useParams } from 'react-router';

const Screenshot = () => {
    const { id } = useParams();

    const { data, loading, error } = useFetch(`/api/screenshot/${id}`);

    return (
        <div className="screenshot">
            {loading && <p>Loading...</p>}
            {error && <p>Error!</p>}
            {data && <img src={data.path} alt={data.title} />}
        </div>
    );
}

export default Screenshot;