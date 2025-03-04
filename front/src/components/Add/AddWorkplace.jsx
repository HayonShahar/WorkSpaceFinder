import React, { useState } from 'react';
import '../../styles/AddWorkplace.css';

const AddWorkplace = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [type, setType] = useState('');
    const [image_url, setImageUrl] = useState(null);  // Make sure the state variable is named image_url
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to handle form submission
        console.log({ name, address, type, image_url, description });  // Ensure image_url is used here
    };

    return (
        <div className="add-workplace-container">
            <h2>Add New Workplace</h2>
            <form className="add-workplace-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Workplace Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter workplace name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter workplace address"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <select
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                    >
                        <option value="">Select workplace type</option>
                        <option value="COWORKING">COWORKING</option>
                        <option value="OFFICE">OFFICE</option>
                        <option value="CAFE">CAFE</option>
                        <option value="LIBRARY">LIBRARY</option>

                    </select>
                </div>


                {/* Description Box */}
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter a short description of the workplace"
                        rows="4"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image_url">Image</label>
                    <input
                        type="file"
                        id="image_url"
                        onChange={(e) => setImageUrl(e.target.files[0])}  // Ensure image_url is used here
                    />
                </div>

                <button type="submit">Add Workplace</button>
            </form>
        </div>
    );
};

export default AddWorkplace;
