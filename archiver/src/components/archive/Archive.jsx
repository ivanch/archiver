import React from 'react';
import useFetch from 'react-fetch-hook';
import { useHistory } from 'react-router';

const Archive = () => {
    const { data, loading, error } = useFetch('/api/urls');
    const history = useHistory();

    const deleteUrl = (id) => {
    };

    const viewUrl = (id) => {
        history.push(`/screenshot/${id}`);
    };


    const getUrls = () => {
        if (loading)
            return <p>Loading...</p>;

        if (error)
            return <p>Error :(</p>;

        if (!data)
            return <p>No data :(</p>;

        return Object.entries(data.urls).map(([key, value]) => {
            return (
                <div key={value.id}>
                    <a href={value.url}>{value.title}</a>
                    <button onClick={() => viewUrl(value.id)}>View</button>
                    <button onClick={() => deleteUrl(value.id)}>Delete</button>
                </div>
            );
        });
    };

    return (
        <div>
            <h2>Archive</h2>

            {getUrls()}

        </div>
    );
}

export default Archive;
