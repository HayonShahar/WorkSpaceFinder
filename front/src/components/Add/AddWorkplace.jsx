import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '../../styles/AddWorkplace.css';
import { useNavigate } from 'react-router-dom';

const AddWorkplace = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [type, setType] = useState('');
    const [file, setFile] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const isConnected = () => {
        const token = localStorage.getItem("token");
        console.log(token);
        if (!token) {
            return true;
        }
        return false;
    }

    const userId = localStorage.getItem("userId");

    const handleSubmit = async (e) => {
        if (!file) {
            setErrorMessage("Something went wrong with photo upload");
            setTimeout(() => {
                setErrorMessage('');
            }, 2000); // Hide error message after 2 seconds
            return;
        }

        e.preventDefault();

        const formData = new FormData();
        const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
        console.log(UPLOAD_PRESET);

        formData.append('file', file);
        formData.append('folder', 'workspaces');
        formData.append('upload_preset', UPLOAD_PRESET);

        try {
            const imageUploadResponse = await axios.post(
                'https://api.cloudinary.com/v1_1/dbx2lizfn/image/upload',
                formData
            );
            const uploadedImageUrl = imageUploadResponse.data.secure_url;

            const workplaceData = {
                name,
                address,
                type,
                description,
                image_url: uploadedImageUrl,
                upload_user_id: userId
            };
            console.log('Workplace:', workplaceData);

            const serverResponse = await axios.post('http://localhost:8080/api/workSpace', workplaceData);
            console.log('Workplace added successfully:', serverResponse.data);

            setName('');
            setAddress('');
            setType('');
            setDescription('');
            setFile('');
            setErrorMessage('');
            setSuccessMessage(serverResponse.data.message);

            setTimeout(() => {
                setSuccessMessage('');
            }, 2000); // Hide success message after 2 seconds
        } catch (error) {
            console.error('Error uploading image or saving workplace:', error);
            setErrorMessage("There was an error uploading or saving the workplace.");
            setTimeout(() => {
                setErrorMessage('');
            }, 2000); // Hide error message after 2 seconds
        }
    };

    useEffect(() => {
        if(!isConnected){
            navigate("/");
        }
    },[])

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
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>

                <button type="submit">Add Workplace</button>
                <div className='add-workspace-message'>
                    <span className='errorMessage'>{errorMessage}</span>
                    <span className='successMessage'>{successMessage}</span>
                </div>
            </form>
        </div>
    );
};

export default AddWorkplace;
