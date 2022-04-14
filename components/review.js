import React from 'react'
import marked from 'marked'
import Slider from './slider'
import { Rating } from 'react-simple-star-rating'

export default function ReviewComponent({ data }) {

    const childrens = data && Object.values(data.reviews).map((review, index) => {
        //console.log(review);
        return (
            <div key={index}>
                <h3 className="h3 accent animate__animated animate__fadeInDown">{review.User}</h3>
                <p className="">{review.Comments}</p>
                {/*<p className="">{review.Rating}</p>*/}
                <Rating ratingValue={review.Rating} allowHalfIcon={true} allowHover={false} iconsCount={5} readonly={true} fillColor="#8f7255" />
            </div>
        )
    })

    const options = {
        centerMode: false,
        responsive: {
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 2,
                partialVisibilityGutter: 40 // this is needed to tell the amount of px that should be visible.
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
                partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
            }
        },
        itemClass: "carousel-item-padding-40-px",
        infiniteLoop: false,
        arrows: false,
        showDots: true,
        ssr: true,
        autoPlay: true
    }

    return (
        <section className="block-container fluid flex-column pt-5 pb-5 text-light what-our-client-aboutus become-owner-section">
            <div className="blocks one mb-5">
                <div className="block p-5 mw-xl">
                    {data.Title && <h2 className="h2 accent animate__animated animate__fadeInDown">{data.Title}</h2>}
                    <Slider options={options} children={childrens} />
                </div>
            </div>
        </section>
    )
}
