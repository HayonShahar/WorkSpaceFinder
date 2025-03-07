import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/WorkplacePage.css';

const WorkplacePage = () => {
  const location = useLocation();
  const workplace = location.state;

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState(""); // User input for name
  const [rating, setRating] = useState(null); // Store user rating
  const [hoverRating, setHoverRating] = useState(null); // For hover effect
  const [averageRating, setAverageRating] = useState(null); // Store average rating

  // Fetch comments and ratings when the component mounts
  useEffect(() => {
    if (workplace) {
      // Fetch comments for the workplace
      fetch(`http://localhost:8080/api/comments/${workplace.id}`)
        .then((res) => res.json())
        .then((data) => setComments(data))
        .catch((err) => console.error("Error fetching comments:", err));

      // Fetch all ratings for the workplace and calculate average
      fetch(`http://localhost:8080/api/ratings/${workplace.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.length > 0) {
            // Calculate average rating
            const totalRating = data.reduce((sum, rating) => sum + rating, 0);
            const avgRating = totalRating / data.length;
            setAverageRating(avgRating); // Set average rating
          }
        })
        .catch((err) => console.error("Error fetching ratings:", err));
    }
  }, [workplace]);

  // Handle submitting a new comment
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!userName || !newComment) {
      alert("Please enter your name and a comment!");
      return;
    }

    const commentData = {
      workplaceId: workplace.id,
      userName: userName,
      text: newComment,
    };

    try {
      const response = await fetch("http://localhost:8080/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }

      const data = await response.json();
      setComments([data, ...comments]); // Add new comment to the top
      setNewComment(""); // Clear input
      setUserName(""); // Clear name input
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  // Handle rating hover
  const handleMouseEnter = (index) => {
    setHoverRating(index + 1); // Set hover rating
  };

  const handleMouseLeave = () => {
    setHoverRating(null); // Reset hover rating when mouse leaves
  };

  // Handle rating click
  const handleRatingClick = (index) => {
    setRating(index + 1); // Set the actual rating when clicked
  };

  // Google Maps and Waze URLs
  const encodedAddress = encodeURIComponent(workplace.address);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  const wazeUrl = `https://www.waze.com/ul?q=${encodedAddress}&navigate=yes`;

  return (
    <div className="workplace-page">
      {workplace ? (
        <>
          <h1>{workplace.name}</h1>
          <p><strong>Type:</strong> {workplace.type}</p>
          <p><strong>Address:</strong> {workplace.address}</p>
          <p><strong>Description:</strong> {workplace.description}</p>

          {workplace.imageUrl && <img src={workplace.imageUrl} alt={workplace.name} className="workplace-image" />}

          {/* Links to Google Maps and Waze */}
          <div className="maps-links">
            <h3>Get Directions:</h3>
            <p>
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">Google Maps</a> | 
              <a href={wazeUrl} target="_blank" rel="noopener noreferrer">Waze</a>
            </p>
          </div>

          {/* Rating System */}
          <div className="rating-container">
            <h2>Rate this Workplace:</h2>
            <div className="stars">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`star ${hoverRating >= index + 1 || rating >= index + 1 ? 'filled' : ''}`}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleRatingClick(index)}
                >
                  ★
                </span>
              ))}
            </div>
            {rating && <p className="rated-message">You rated this workplace {rating} out of 5 stars!</p>}
          </div>

          {/* Display Average Rating */}
          {averageRating !== null && (
            <div className="average-rating">
              <h3>Average Rating: {averageRating.toFixed(1)} / 5</h3>
            </div>
          )}

          {/* Comments Section */}
          <div className="comments-section">
            <h2>Comments</h2>

            {/* Display Existing Comments */}
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <p><strong>{comment.userName}:</strong> {comment.text}</p>
                  <p className="timestamp">{new Date(comment.timestamp).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p>No comments yet. Be the first to comment!</p>
            )}

            {/* Add a New Comment */}
            <form onSubmit={handleSubmitComment} className="comment-form">
              <input
                type="text"
                placeholder="Your Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <textarea
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              ></textarea>
              <button type="submit">Post Comment</button>
            </form>
          </div>


        </>
      ) : (
        <p>Workplace not found</p>
      )}
    </div>
  );
};

export default WorkplacePage;
