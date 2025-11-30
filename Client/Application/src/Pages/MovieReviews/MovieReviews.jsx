import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { addReview } from "../../../services/review";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

function MovieReview() {
  const navigate = useNavigate()
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const title1 = localStorage.getItem('title')
  const movie_id = localStorage.getItem('selectedmovie_id')
  const user_id = localStorage.getItem('user_id')
  const onCancel = () => {
    navigate('/allReviews')
  }

  const onSubmit = async () => {
    console.log(movie_id, rating, review, user_id)
    const response = await addReview(movie_id, rating, review, user_id)
    if (response['status'] == 'success')
      toast.success("review added")
    else {
      console.log(error)
    }
  }


  return (
    <div className="bg-light min-vh-100">
      <Navbar />

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow p-4">
              <h2 className="mb-4 fw-bold">
                Create Review for <span className="text-primary">{title1}</span>
              </h2>

              <form >

                <div className="mb-3">
                  <label className="form-label fw-semibold">Rating (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Your Review</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Write your thoughts here..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  ></textarea>
                </div>


                <div className="d-flex gap-3">
                  <button onClick={onSubmit} type="submit" className="btn btn-success w-50">
                    Submit Review
                  </button>
                  <button onClick={onCancel} type="button" className="btn btn-secondary w-50">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieReview