import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { toast } from "react-toastify";
import { movies } from '../../../services/movies'
import img1 from '../../assets/Bahubali.jpeg'
import img2 from '../../assets/salaaaaaaar.jpeg'
import img3 from '../../assets/spirit.jpg'
import img4 from '../../assets/RRR_Poster.jpg'
import img5 from '../../assets/darling.jpg'
import img6 from '../../assets/image.png'


import { Link, useNavigate } from 'react-router-dom'


function AllMovies() {
    const navigate = useNavigate()
    const [movie, setMovies] = useState([])
    const onReview = (movie_id, title) => {
        localStorage.setItem("selectedmovie_id", movie_id)
        localStorage.setItem("title", title)
        navigate('/movieReviews')
    }
    const getMovies = async () => {
       
        const response = await movies()
        
        if (response['status'] == 'success') {
            setMovies(response.data)
        }
        else {
            toast.error("unable to fetch")
           
        }
    }
    useEffect(() => {
        getMovies()
    }, [])



    const rendermovies = () => {
        const poster = [img1, img2, img3, img4, img5, img6]
        return (
            <div className="row mt-4">
                {movie.map((m, index) => (

                    <div className="col-md-4 d-flex justify-content-center mb-4" key={index}>

                        <div className="card shadow-lg border-0" style={{ width: "18rem", borderRadius: "15px" }}>
                            <img
                                src={poster[index]}
                                className="card-img-top"
                                alt={m.title}
                                style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px", height: "250px", objectFit: "cover" }}
                            />
                            <div className="card-body" style={{ backgroundColor: "#f3faff", borderBottomLeftRadius: "15px", borderBottomRightRadius: "15px" }}>
                                <h5 className="card-title text-primary">{m.title}</h5>
                                <h6 className="text-secondary">Release Date: {new Date(m.release_date).toLocaleDateString()}</h6>
                                <button onClick={() => onReview(m.movie_id, m.title)} className="btn btn-success mt-2 w-100">Review this Movie</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }


    return (
        <div className='container' >
            <Navbar />
            {movie && rendermovies()}
        </div>
    )
}

export default AllMovies
