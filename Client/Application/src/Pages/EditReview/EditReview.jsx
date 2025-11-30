import React, { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../../Components/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { UpdateReview } from "../../../services/review";

function EditReview() {
    const navigate = useNavigate();
    const { state } = useLocation(); 

   
    if (!state) {
        return (
            <div className="text-center mt-5">
                <h3>Error: No review selected</h3>
                <button
                    className="btn btn-primary mt-3"
                    onClick={() => navigate("/allReviews")}
                >
                    Go Back
                </button>
            </div>
        );
    }

    
    const [rating, setRating] = useState(state.rating || 0);
    const [review, setReview] = useState(state.review || "");

    const onCancel = () => {
        navigate("/allReviews");
    };

    const onUpdate = async () => {
       // e.preventDefault(); 

       // console.log("Updating Review ID:", state.review_id);

        const response = await UpdateReview(rating, review, state.review_id);

       // console.log("Update Response:", response);

        if (response?.status === "success") {
            toast.success("Review Updated Successfully!");
            navigate("/allReviews");
        } else {
            toast.error("Failed to update review!");
        }
    };

    return (
        <div className="bg-light min-vh-100">
            <Navbar />

            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow p-4">
                            <h2 className="mb-4 fw-bold">
                                Edit Review for{" "}
                                <span className="text-primary">{state.title}</span>
                            </h2>

                            <form>
                               
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Rating (1–10)</label>
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
                                    <button
                                        onClick={onUpdate}
                                        type="button"
                                        className="btn btn-success w-50"
                                    >
                                        Update Review
                                    </button>

                                    <button
                                        onClick={onCancel}
                                        type="button"
                                        className="btn btn-secondary w-50"
                                    >
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

export default EditReview;
