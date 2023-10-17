import {useState, useContext, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'
import ReviewForm from './ReviewForm'
import ReviewList from './ReviewList'

const ProductDetails = () => {

    const {reviews, productData, getProducts}: any = useContext(UserContext)
    const [reviewToggle, setReviewToggle] = useState(false)

    const toggleReviews = () => {
        setReviewToggle(prevState => !prevState)
    }

    const setReviewsTrue = () => {
        setReviewToggle(true)
    }

    useEffect(()=> {
        getProducts()
    }, [])

    const Navigate = useNavigate()
    let {productId} = useParams()
    const foundProduct = productData.find((item:any) => item['_id'] === productId)

    const filteredReviews = reviews?.filter((item:any) => item.product === foundProduct._id)

    return (
        <div className='productDetails'>
            <button onClick={()=> Navigate(-1)}>Back</button>
            <div className='productDetails2'>
                <div className='productDetailsImg'>
                    <img src={foundProduct['imgUrl']} alt="productImg" />
                </div>

                <div className='productDetailsInfo'>
                    <h1>{foundProduct['title']}</h1>
                    <h2>${foundProduct['price']}</h2>
                    <h3>Description: <span>{foundProduct['description']}</span></h3>
                    <div className='reviewsDiv'>
                        {!reviewToggle ? <>
                            <p onClick={toggleReviews}>View Reviews</p>
                            
                        </>
                        :
                        <>
                            <p onClick={toggleReviews}>Hide Reviews</p>
                            
                        </>}
                        <div>
                            <ReviewForm productId={foundProduct['_id']} setReviewTrue={setReviewsTrue} />

                                {filteredReviews.length > 0 ? <>
                                {reviewToggle && <ReviewList reviews={filteredReviews}/>}
                                </>
                                :
                                <>
                                {reviewToggle && <p>No Reviews yet</p>}
                                </>}
                        </div>
                        
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default ProductDetails

//Add Review form
//Add Reviews / Review list
//Figure out syling for it