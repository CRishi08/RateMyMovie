import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { MyReview } from '../../../services/review'
import { myReviewDelete } from '../../../services/review'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
function MyReviews() {
  const [myReviews, setMyReviews] = useState([])
  const myReviewsList = async () => {
    try {
      
      const response = await MyReview()
      
      if (response['status'] == 'success') {
        setMyReviews(response.data)

      }
    }
    catch (ex) {
      console.log(`exception:`, ex)
    }
  }

  useEffect(() => {
    myReviewsList()
  }, [])

  const onDelete = async (review_id) => {
    const response = await myReviewDelete(review_id)
    if (response['status'] == 'success')
      toast.success('deleted Succesfully')
    myReviewsList()
  }
  const navigate = useNavigate()
  const onEdit = (review_id, title) => {
    navigate('/editReview', {
      state: {
        review_id: review_id,
        title: title
      }
    })
  }
  return (
    <div className="bg-light min-vh-100">
      <Navbar />

      <div className="container mt-4">
        <h2 className="mb-4 fw-bold">My Reviews</h2>

        {myReviews.length === 0 && <p>No reviews available.</p>}
        {myReviews.map((rev) => (

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
              <button onClick={() => { onEdit(rev.review_id, rev.title) }} className="btn btn-primary btn-sm me-2">Edit</button>
              <button onClick={() => { onDelete(rev.review_id) }} className="btn btn-danger btn-sm">Delete</button>
              {/* <button onClick={getReviewsList}>click</button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyReviews
