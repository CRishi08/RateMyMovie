import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { reviews } from "../../../services/review"
import { reviewDelete } from "../../../services/review";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function AllReviews() {

  const [review, setReview] = useState([])
  const movie_title = localStorage.getItem('title')
  const getReviews = async () => {
    const response = await reviews()
    console.log(response)
    if (response['status'] === 'success') {
      setReview(response.data)
    }
    else {
      toast.error("unable to fetch")

    }
  }
  useEffect(() => {
    getReviews()
  }, [])

  const onDelete = async (review_id) => {

    const response = await reviewDelete(review_id)

    if (response['status'] === 'success') {
      toast.success("deleted succesfully")
      getReviews()
    }
    else {
      toast.error("unable to delete")
    }

  }
  const navigate = useNavigate()

  const onEdit = (review_id, title) => {
    navigate('/editReview', {
      state: {
        review_id: review_id,
        title: title,
      }
    })

  }

  return (
    <div className="bg-light min-vh-100">
      <Navbar />

      <div className="container mt-4">
        <h2 className="mb-4 fw-bold">All Reviews</h2>

        {review.length === 0 && <p>No reviews available.</p>}
        {review.map((rev) => (

          <div
            key={rev.review_id}
            className="p-4 mb-3 rounded"
            style={{ border: "1px solid #e3e3e3", background: "white" }}
          >


            <div className="d-flex align-items-center">
              <h4 className="fw-bold mb-0">
                {rev.title}
              </h4>

              <span
                className="ms-2 px-2 py-1 text-white rounded"
                style={{ backgroundColor: "#0d6efd", fontWeight: "bold" }}
              >
                {rev.rating}/10
              </span>
            </div>


            <p className="mt-2">{rev.review}</p>


            <p className="text-muted small">
              Last updated: {rev.LastUpdatedDate?.slice(0, 10)}
            </p>


            <div className="mt-3">
              <button onClick={() => onEdit(rev.review_id, rev.title)} className="btn btn-primary btn-sm me-2">Edit</button>
              <button onClick={() => onDelete(rev.review_id)} className="btn btn-danger btn-sm">Delete</button>
              {/* <button onClick={getReviewsList}>click</button> */}
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default AllReviews;
