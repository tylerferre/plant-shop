import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'


const ReviewForm = (props:any) => {
    const Navigate = useNavigate()
    const {postReview, user}:any = useContext(UserContext)
    const {setReviewTrue, productId} = props

    const initReview:any = {review: ''}
    const [reviewData, setReviewData] = useState(initReview)

    const handleChange = (e:any) => {
        const {name, value} = e.target
        setReviewData((prevState:object) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e:any) => {
        if(user['firstName']){
            e.preventDefault()

            postReview(reviewData, productId)
            setReviewData(initReview)
            setReviewTrue()
        }else{
            e.preventDefault()

            Navigate('/auth')
        }

        
    }

    return (
        <form onSubmit={handleSubmit} className='reviewForm'>
            <input 
            type="text"
            name='review'
            placeholder='Add a Review'
            value={reviewData['review']}
            onChange={handleChange}
            />
            <button>Post</button>
        </form>
    )
}

export default ReviewForm