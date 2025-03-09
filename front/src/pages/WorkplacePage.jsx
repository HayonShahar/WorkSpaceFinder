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

    // Fetch comments
    fetch(`http://localhost:8080/api/ratings/workspace/${workplace.id}/comments`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Comments not found");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched Comments:", data);
        
        // Extract the comments array from the response
        const commentsArray = data && data.comments && Array.isArray(data.comments) 
          ? data.comments 
          : (Array.isArray(data) ? data : []);
        
        console.log("Comments array:", commentsArray);
        setComments(commentsArray);
      })
      .catch((err) => {
        console.error("Error fetching comments:", err);
        console.error("Error details:", err.message);
        setError("Error fetching comments: " + err.message);
      })
      .finally(() => setLoadingComments(false));

    // Fetch ratings and calculate average - UPDATED URL HERE
    fetch(`http://localhost:8080/api/ratings/workspace/${workplace.id}/ratings`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Ratings not found");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched Ratings:", data);
        
        // Determine the ratings array format
        const ratingsArray = Array.isArray(data) ? data : 
                           (data && Array.isArray(data.ratings) ? data.ratings : []);
        
        console.log("Ratings array:", ratingsArray);
        
        // Calculate average rating
        if (ratingsArray.length > 0) {
          let sum = 0;
          let count = 0;
          
          ratingsArray.forEach(item => {
            // If item is a number
            if (typeof item === 'number') {
              sum += item;
              count++;
            } 
            // If item is an object with rating property
            else if (item && typeof item === 'object' && 'rating' in item) {
              sum += item.rating;
              count++;
            }
          });
          
          const avgRating = count > 0 ? sum / count : 0;
          console.log("Average rating calculated:", avgRating);
          setAverageRating(avgRating);
        } else if (data && typeof data.averageRating === 'number') {
          console.log("Average rating from response:", data.averageRating);
          setAverageRating(data.averageRating);
        } else {
          console.log("No ratings available");
          setAverageRating(0);
        }
      })
      .catch((err) => {
        console.error("Error fetching ratings:", err);
        console.error("Error details:", err.message);
        setError("Error fetching ratings: " + err.message);
      })
      .finally(() => setLoadingRatings(false));
  }, [workplace]);

  // Handle comment submission
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!userName || !newComment) {
      alert("Please enter your name and a comment!");
      return;
    }

    const commentData = {
      workplaceId: workplace.id,
      userName,
      text: newComment,
    };

    try {
      const response = await fetch("http://localhost:8080/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) throw new Error("Failed to submit comment");

      const data = await response.json();
      console.log("New Comment Added:", data);
      
      // Add the new comment to the top of the comments list
      // If the API returns a comment object, convert it to a string matching your existing format
      const newCommentString = typeof data === 'object' && data.text ? data.text : newComment;
      setComments(prevComments => [newCommentString, ...prevComments]);
      
      // Clear the form
      setNewComment("");
      setUserName("");
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Failed to submit comment. Please try again.");
    }
  };

  // Handle rating submission
  const handleSubmitRating = async () => {
    if (!rating) {
      alert("Please select a rating!");
      return;
    }

    const ratingData = {
      workplaceId: workplace.id,
      userId: 1, // Replace with actual user ID
      rating,
      comment: "User rating",
      noiseLevel: 0, // Adjust if needed
    };

    try {
      const response = await fetch("http://localhost:8080/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ratingData),
      });

      if (!response.ok) throw new Error("Failed to submit rating");

      const data = await response.json();
      console.log("Rating submission response:", data);

      // Instead of calculating locally, refetch the ratings
      fetch(`http://localhost:8080/api/ratings/workspace/${workplace.id}/ratings`)
        .then(res => {
          if (!res.ok) throw new Error("Failed to refresh ratings");
          return res.json();
        })
        .then(ratingData => {
          console.log("Refreshed ratings after submission:", ratingData);
          
          // Determine the ratings array format
          const ratingsArray = Array.isArray(ratingData) ? ratingData : 
                             (ratingData && Array.isArray(ratingData.ratings) ? ratingData.ratings : []);
          
          // Calculate new average
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
            console.log("Updated average rating:", avgRating);
            setAverageRating(avgRating);
          }
        })
        .catch(err => {
          console.error("Error refreshing ratings after submission:", err);
        });

      alert("Rating submitted successfully!");
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("Failed to submit rating. Please try again.");
    }
  };

  // Render a comment based on its type
  const renderComment = (comment, index) => {
    console.log("Rendering comment:", comment);
    
    // If comment is just a string
    if (typeof comment === 'string') {
      return (
        <div key={`comment-${index}`} className="comment">
          <p>{comment}</p>
        </div>
      );
    }
    
    // If comment is an object with expected properties
    if (typeof comment === 'object' && comment !== null) {
      // Try to determine the text field (might be text, content, or message)
      const commentText = comment.text || comment.content || comment.message || "No comment text";
      
      // Try to determine the username field
      const username = comment.userName || comment.name || "Anonymous";
      
      // Try to determine the timestamp
      const timestamp = comment.timestamp || comment.createdAt || comment.date;
      
      return (
        <div key={`comment-${index}`} className="comment">
          <p><strong>{username}:</strong> {commentText}</p>
          {timestamp && (
            <p className="timestamp">
              {new Date(timestamp).toLocaleString()}
            </p>
          )}
        </div>
      );
    }
    
    // Fallback for unexpected comment format
    return (
      <div key={`comment-${index}`} className="comment">
        <p>Invalid comment format</p>
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
            <button onClick={handleSubmitRating}>Submit Rating</button>
          </div>

          {averageRating !== null && (
            <div className="average-rating">
              <h3>Average Rating: {averageRating.toFixed(1)} / 5</h3>
            </div>
          )}

          <div className="comments-section">
            <div className="add-comment">
              <h2>Add a Comment</h2>
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

            <div className="existing-comments">
              <h2>Existing Comments</h2>
              {loadingComments ? (
                <p>Loading comments...</p>
              ) : comments.length > 0 ? (
                comments.map((comment, index) => renderComment(comment, index))
              ) : (
                <p>No comments yet. Be the first to comment!</p>
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