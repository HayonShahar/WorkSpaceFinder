import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";  // Import axios
import "../styles/WorkplacePage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const WorkplacePage = () => {
  const location = useLocation();
  const workplace = location.state;
  const navigate = useNavigate()

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [loadingComments, setLoadingComments] = useState(true);
  const [loadingRatings, setLoadingRatings] = useState(true);
  const [error, setError] = useState("");
  const [seccuss, setSeccuss] = useState("");

  const userId = localStorage.getItem("userId");

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    
    if (!workplace) {
      console.error("Workplace data is missing");
      setError("Workplace data not found");
      return;
    }

    console.log("Workplace ID:", workplace.id, "Full workplace data:", workplace);

    // Fetch comments and ratings when the component is mounted
    fetchComments();
    fetchRatings();
  }, [workplace]);

  const fetchComments = () => {
    setLoadingComments(true);
    axios
      .get(`http://localhost:8080/api/ratings/${workplace.id}`)
      .then((response) => {
        console.log("Fetched Comments:", response.data.ratings);
        setComments(response.data.ratings || []);
      })
      .catch((err) => {
        console.error("Error fetching comments:", err);
        setError("Error fetching comments: " + err);
      })
      .finally(() => setLoadingComments(false));
  };

  const fetchRatings = () => {
    setLoadingRatings(true);
    axios
      .get(`http://localhost:8080/api/ratings/${workplace.id}`)
      .then((response) => {
        console.log("Fetched Ratings:", response.data);
        const ratingsArray = response.data.ratings || [];
        let sum = 0;
        let count = 0;

        ratingsArray.forEach((item) => {
          if (typeof item === 'number') {
            sum += item;
            count++;
          } else if (item && typeof item === 'object' && 'rating' in item) {
            sum += item.rating;
            count++;
          }
        });

        setAverageRating(count > 0 ? sum / count : 0);
      })
      .catch((err) => {
        console.error("Error fetching ratings:", err);
        setError("Error fetching ratings: " + err);
      })
      .finally(() => setLoadingRatings(false));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName || !newComment || !rating) {
      setError("Please enter your name, a comment, and select a rating!");
      setTimeout(() => {
        setError('');
      }, 1500)
      return;
    }

    const ratingData = {
      workSpace_id: workplace.id,
      user_id: userId,
      rating: +rating,
      comment: newComment,
    };

    console.log("Submitting rating data:", ratingData);

    try {
      const ratingResponse = await axios.post("http://localhost:8080/api/ratings", ratingData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log(ratingResponse.data.success);
      if (!ratingResponse.data.success) {
        setError(ratingResponse.data.message)
        console.log(ratingResponse.data.success);
        console.log(ratingResponse.data.message);
        return;
      }

      setSeccuss(ratingResponse.data.message);
      // console.log(response.data.message);

      console.log("Rating submitted successfully:", ratingResponse.data);
      fetchComments();
      fetchRatings();

      setNewComment("");
      setUserName("");
      setRating(null);

      setTimeout(() => {
        setError("");
        setSeccuss("");
      }, 1500);

    } catch (error) {
      console.error("Error submitting comment and rating:", error);
    }
  };

  const renderComment = (comment, index) => {
    console.log(comment);

    const commentText = comment.comment || comment.content || comment.message || "No comment text";
    const username = comment.userDTO.first_name + " " + comment.userDTO.last_name || "Anonymous";
    const timestamp = comment.created_at

    return (
      <div key={`comment-${index}`} className="comment">
        <p><strong>{username}:</strong> {commentText}</p>
        {timestamp && (
          <div className="comment-bottom">
            <p className="timestamp">{new Date(timestamp).toLocaleString()}</p>
            <button id="trashBTN" style={{ backgroundColor: "none" }} onClick={() => deleteRate(comment.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        )}
      </div>
    );
  };

  const deleteRate = async (id) => {
    axios.delete(`http://localhost:8080/api/ratings/${id}`)
      .then(response => {
        console.log('Deleted', response.data);
        if(response.data.success){
          fetchComments();
          fetchRatings();

          setTimeout(() => {
            setSeccuss(response.data.message);
          }, 1500)
          setSeccuss('');
          return;
        }

        setTimeout(() => {
          setError(response.data.message);
        }, 1500)

        setTimeout(() => {
          setError('');
          setSeccuss('');
        }, 1500)

      })
      .catch(error => {
        console.error('Error', error);
      });
  }

  const encodedAddress = encodeURIComponent(workplace?.address || "");
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  const wazeUrl = `https://www.waze.com/ul?q=${encodedAddress}&navigate=yes`;

  return (
    <div className="workplace-page">
      {workplace ? (
        <>
          <h1>{workplace.name}</h1>
          <img className="page-img" src={workplace.imageUrl}></img>
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
            <div>
              {error && <p className="error-message">{error}</p>}
              {seccuss && <p className="seccuss-message">{seccuss}</p>}
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
