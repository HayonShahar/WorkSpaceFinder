import React, { useState, useEffect } from 'react';
import '../styles/Promote.css';

const PromotionBox = ({ title, description, price, onClick }) => {
    return (
        <div className="promotion-box" onClick={onClick}>
            <div className="card">
                <div className="first-content">
                    <span>{title}</span>
                </div>
                <div className="second-content">
                    <div>
                        <h3>{title}</h3>
                        <p>{description}</p>
                        <p className="price">${price.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

function PromotePage() {
    const [selectedPromotion, setSelectedPromotion] = useState(null);
    const [workSpacesArray, setWorkSpacesArray] = useState([]);
    const [workSpaceId, setWorkSpaceId] = useState(null);
    const [promotionStatus, setPromotionStatus] = useState(null); // Track promotion status message

    const userId = localStorage.getItem('userId') || 1;

    const promotions = [
        {
            id: 1,
            title: 'Basic Promotion',
            description: 'Get basic visibility.',
            price: 5,
        },
        {
            id: 2,
            title: 'Standard Promotion',
            description: 'Get medium visibility and additional features.',
            price: 10,
        },
        {
            id: 3,
            title: 'Premium Promotion',
            description: 'Get maximum visibility and exclusive features.',
            price: 20,
        },
    ];

    const getWorkSpaces = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/workSpace');
            const data = await response.json(); // await the json() call
            console.log(data);  // Log workspaces to check the response
            setWorkSpacesArray(data.workSpaces);
        } catch (error) {
            console.error('Error fetching workspaces:', error);
        }
    };

    useEffect(() => {
        getWorkSpaces();
    }, []);

    const handlePromotionClick = (promotion) => {
        setSelectedPromotion(promotion);
        setPromotionStatus(null); // Reset any previous status
    };

    const handleConfirmSelection = async () => {
        if (!selectedPromotion || !workSpaceId) return; // Ensure both are selected

        const promotionData = {
            workSpaceId: workSpaceId,  // the selected workspace id
            userId: userId,            // the logged-in user id
            promoteRoll: {
                id: selectedPromotion.id,  // the selected promotion id
            }
        };

        try {
            console.log('Sending promotion request...');

            const response = await fetch('http://localhost:8080/api/promotes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(promotionData),  // Send the data as a JSON object
            });

            const data = await response.json();  // Await the response as JSON
            console.log('Received response:', data);  // Log the response data

            if (response.ok) {
                setPromotionStatus({
                    success: true,
                    message: `You have selected the ${selectedPromotion.title} for $${selectedPromotion.price}`,
                });

                // Pop-up for success
                //alert(`Success: You have selected the ${selectedPromotion.title} for $${selectedPromotion.price}`);
                alert(`succes: ${data.message}`);
                // Reset selections and show only the 3 options again
                setSelectedPromotion(null);
                setWorkSpaceId(null);
            } else {
                setPromotionStatus({
                    success: false,
                    message: data.message || 'There was an error with the promotion selection',
                });

                // Pop-up for failure
                alert(`Failure: ${data.message || 'There was an error with the promotion selection'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setPromotionStatus({
                success: false,
                message: 'Failed to submit promotion',
            });

            // Pop-up for failure
            alert('Failure: Failed to submit promotion');
        }
    };

    return (
        <div className="promote-page">
            <h2>Select a Promotion</h2>

            {/* Display message after promotion attempt */}
            {promotionStatus && (
                <div className={`promotion-status ${promotionStatus.success ? 'success' : 'failure'}`}>
                    <p>{promotionStatus.message}</p>
                </div>
            )}

            <div className="promotion-list">
                {promotions.map((promotion) => (
                    <PromotionBox
                        key={promotion.id}
                        title={promotion.title}
                        description={promotion.description}
                        price={promotion.price}
                        onClick={() => handlePromotionClick(promotion)}
                    />
                ))}
            </div>

            {selectedPromotion && (
                <div className="selected-promotion">
                    <h3>Selected Promotion:</h3>
                    <p><strong>{selectedPromotion.title}</strong></p>
                    <p>{selectedPromotion.description}</p>
                    <p className="price">Price: ${selectedPromotion.price.toFixed(2)}</p>
                    <button onClick={handleConfirmSelection}>Confirm Selection</button>
                    <select onChange={(e) => setWorkSpaceId(e.target.value)} value={workSpaceId || ""}>
                        <option value="">Select Workspace</option>
                        {workSpacesArray.map((workSpace) => (
                            <option key={workSpace.id} value={workSpace.id}>
                                {workSpace.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
}

export default PromotePage;
