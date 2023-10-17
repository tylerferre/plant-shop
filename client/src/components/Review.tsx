import {useContext, useState} from 'react'
import { UserContext } from '../context/UserProvider'

const Review = (props:any) => {
    const {user, deleteReview, upVote, downVote}:any = useContext(UserContext)
    const {user: {firstName, lastName, _id}} = props
    const [reviewDelete, setReviewDelete] = useState(false)

    return (
        <div className='review'>
            <p>{`${firstName} ${lastName}`}: {props['review']}</p>
            {!reviewDelete ? <div className='votes'>
                <p>{props['upVote'].length}<span onClick={()=> upVote(props['_id'])} className="material-symbols-rounded">thumb_up</span></p>
                <p>{props['downVote'].length}<span onClick={()=> downVote(props['_id'])} className="material-symbols-rounded">thumb_down</span></p>
                {user['_id'] === _id && <button onClick={()=> setReviewDelete(true)}>X</button>}
            </div>
            :
            <div className='reviewDelete'>
                <p>Delete this comment?</p>
                <div>
                    <button className='deleteYes' onClick={()=> {
                        deleteReview(props['_id'])
                        setReviewDelete(false)
                        }} >Yes</button>
                    <button onClick={()=> setReviewDelete(false)} className='deleteNo'>No</button>
                </div>
            </div>}
        </div>
    )
}

export default Review