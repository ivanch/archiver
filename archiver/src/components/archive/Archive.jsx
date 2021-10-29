import React from 'react';
import { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

import AddArchive from '../addarchive/AddArchive';

const Archive = () => {
    const [data, setData] = React.useState(null);

    const history = useHistory();

    const getArchive = useCallback(() => {
        axios.get('/api/urls')
        .then(res => {
            setData(res.data);
            console.log(res.data);
        });
    }, []);

    useEffect(() => {
        getArchive();
    }, [getArchive]);


    const deleteUrl = (id) => {
        axios.delete(`/api/url/${id}`).then((response) => {
            getArchive();
        });
    };

    const viewUrl = (id) => {
        history.push(`/screenshot/${id}`);
    };

    const handleAdd = () => {
        getArchive();
    };


    const getUrls = () => {
        if (!data)
            return <p>No data yet.</p>;

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
            <AddArchive handleAdd={handleAdd}/>

            <h2>Archive</h2>

            {getUrls()}

        </div>
    );
}

export default Archive;
