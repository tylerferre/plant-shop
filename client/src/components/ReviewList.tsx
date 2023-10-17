import React from 'react'
import Review from './Review'


const ReviewList = (props: any) => {
    return (
        <div className='ReviewList'>
            {props.reviews.map((review:any, index:number) => <Review {...review} key={index}/>)}
        </div>
    )
}

export default ReviewList