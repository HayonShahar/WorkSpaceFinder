import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/WorkplacePage.css";

const WorkplacePage = () => {
  const location = useLocation();
  const workplace = location.state;

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [loadingComments, setLoadingComments] = useState(true);
  const [loadingRatings, setLoadingRatings] = useState(true);
  const [error, setError] = useState("");

  // Fetch comments and ratings when the component mounts
  useEffect(() => {
    if (!workplace) {
      console.error("Workplace data is missing");
      setError("Workplace data not found");
      setLoadingComments(false);
      setLoadingRatings(false);
      return;
    }

    console.log("Workplace ID:", workplace.id, "Full workplace data:", workplace);

    console.log(workplace.id)
    // Fetch comments
    fetch(`http://localhost:8080/api/ratings/${workplace.id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Comments not found");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched Comments:", data.ratings);
        
        // Extract the comments array from the response
        const commentsArray = data && data.ratings && Array.isArray(data.ratings) 
          ? data.ratings 
          : (Array.isArray(data) ? data : []);
        
        console.log("Comments array:", commentsArray);
        setComments(commentsArray);
      })
      .catch((err) => {
        console.error("Error fetching comments:", err);
        setError("Error fetching comments: " + err.message);
      })
      .finally(() => setLoadingComments(false));

    // Fetch ratings and calculate average
    fetch(`http://localhost:8080/api/ratings/${workplace.id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Ratings not found");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched Ratings:", data);
        
        // Calculate average rating
        const ratingsArray = Array.isArray(data) ? data : (data && Array.isArray(data.ratings) ? data.ratings : []);
        
        if (ratingsArray.length > 0) {
          let sum = 0;
          let count = 0;
          
          ratingsArray.forEach(item => {
            if (typeof item === 'number') {
              sum += item;
              count++;
            } else if (item && typeof item === 'object' && 'rating' in item) {
              sum += item.rating;
              count++;
            }
          });
          
          const avgRating = count > 0 ? sum / count : 0;
          setAverageRating(avgRating);
        } else if (data && typeof data.averageRating === 'number') {
          setAverageRating(data.averageRating);
        } else {
          setAverageRating(0);
        }
      })
      .catch((err) => {
        console.error("Error fetching ratings:", err);
        setError("Error fetching ratings: " + err.message);
      })
      .finally(() => setLoadingRatings(false));
  }, [workplace]);

  // Handle comment and rating submission together
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName || !newComment || !rating) {
      alert("Please enter your name, a comment, and select a rating!");
      return;
    }

    const ratingData = {
      workSpace_id: 2,
      user_id: 1, // Replace with actual user ID
      rating: +rating,
      comment: newComment,
    };

    console.log(ratingData)

    try {
      const ratingResponse = await fetch("http://localhost:8080/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ratingData),
      });

      if (!ratingResponse.ok){
        console.log(ratingResponse)
        return;
      }

      console.log(ratingResponse)

      // Refresh comments and ratings
      refreshComments();
      fetchRatings();

      // Clear the form
      setNewComment("");
      setUserName("");
      setRating(null);

      alert("Comment and Rating submitted successfully!");

    } catch (error) {
      console.error("Error submitting comment and rating:", error);
      alert("Failed to submit comment and rating. Please try again.");
    }
  };

  // Helper function to refresh comments
  const refreshComments = () => {
    fetch(`http://localhost:8080/api/ratings/${workplace.id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to refresh comments");
        }
        return res.json();
      })
      .then((data) => {
        const commentsArray = data && data.comments && Array.isArray(data.comments) 
          ? data.comments 
          : (Array.isArray(data) ? data : []);
        
        setComments(commentsArray);
      })
      .catch((err) => {
        console.error("Error refreshing comments:", err);
      });
  };

  // Helper function to fetch ratings
  const fetchRatings = () => {
    fetch(`http://localhost:8080/api/ratings/${workplace.id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to refresh ratings");
        }
        return res.json();
      })
      .then((data) => {
        const ratingsArray = Array.isArray(data) ? data : (data && Array.isArray(data.ratings) ? data.ratings : []);
        
        if (ratingsArray.length > 0) {
          let sum = 0;
          let count = 0;
          
          ratingsArray.forEach(item => {
            if (typeof item === 'number') {
              sum += item;
              count++;
            } else if (item && typeof item === 'object' && 'rating' in item) {
              sum += item.rating;
              count++;
            }
          });
          
          const avgRating = count > 0 ? sum / count : 0;
          setAverageRating(avgRating);
        }
      })
      .catch((err) => {
        console.error("Error fetching ratings:", err);
      });
  };

  // Render a comment based on its type
  const renderComment = (comment, index) => {
    console.log(comment)
    const commentText = comment.comment || comment.content || comment.message || "No comment text";
    const username = comment.userName || comment.name || "Anonymous";
    const timestamp = comment.timestamp || comment.createdAt || comment.date;
    
    return (
      <div key={`comment-${index}`} className="comment">
        <p><strong>{username}:</strong> {commentText}</p>
        {timestamp && (
          <p className="timestamp">{new Date(timestamp).toLocaleString()}</p>
        )}
      </div>
    );
  };

  const encodedAddress = encodeURIComponent(workplace?.address || "");
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

          <div className="maps-links">
            <h3>Get Directions:</h3>
            <p>
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">Google Maps</a> |
              <a href={wazeUrl} target="_blank" rel="noopener noreferrer">Waze</a>
            </p>
          </div>

          {workplace.imageUrl && <img src={workplace.imageUrl} alt={workplace.name} className="workplace-image" />}

          <div className="rating-container">
            <h2>Rate this Workplace:</h2>
            <div className="stars">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`star ${hoverRating >= index + 1 || rating >= index + 1 ? 'filled' : ''}`}
                  onMouseEnter={() => setHoverRating(index + 1)}
                  onMouseLeave={() => setHoverRating(null)}
                  onClick={() => setRating(index + 1)}
                >
                  ★
                </span>
              ))}
            </div>
            {rating && <p className="rated-message">You rated this workplace {rating} out of 5 stars!</p>}
          </div>

          {averageRating !== null && (
            <div className="average-rating">
              <h3>Average Rating: {averageRating.toFixed(1)} / 5</h3>
            </div>
          )}

          <div className="comments-section">
            <div className="add-comment">
              <h2>Add a Comment and Rating</h2>
              <form onSubmit={handleSubmit} className="comment-form">
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
                <button type="submit">Post Comment and Rating</button>
              </form>
            </div>

            <div className="existing-comments">
              <h2>Existing Comments</h2>
              {loadingComments ? (
                <p>Loading comments...</p>
              ) : comments.length > 0 ? (
                comments.map((comment, index) => renderComment(comment, index))
              ) : (
                <p id="comments-massage">No comments yet. Be the first to comment!</p>
              )}

              {error && <p className="error-message">{error}</p>}
            </div>
          </div>
        </>
      ) : (
        <p>Workplace not found</p>
      )}
    </div>
  );
};

export default WorkplacePage;
