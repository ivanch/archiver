import React from "react";
import axios from "axios";

const AddArchive = (props) => {
    const [url, setUrl] = React.useState("");
    const [message, setMessage] = React.useState("");

    const handleAdd = () => {
        setMessage("Archiving...");
        axios.post("/api/screenshot", { url }, {timeout: 30000})
        .then(response => {
            if(response.status === 200) {
                setUrl("");
                setMessage("Successfully added");
            }
        }).catch(error => {
            setMessage("Error adding: " + error.response.data.message);
        }).finally(() => {
            setTimeout(() => {
                setMessage("");
            }, 5000);

            props.handleAdd();
        });
    };

    return (
        <div>
            <h3>Add Archive</h3>

            <input type="text" placeholder="URL" onChange={e => setUrl(e.target.value)} />
            <button onClick={handleAdd}>Add</button>

            {message !== "" ? <p>{message}</p> : null}
        </div>
    );
}

export default AddArchive;