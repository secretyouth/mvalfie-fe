import React from 'react'

import Slider from './slider'

export default function SliderComponent({ data }) {
    return (
        <section className="block-container fluid dark-grey">
            <div className="slider-container">
                <div className="gradient-ribbon"></div>
                <Slider
                    options={{
                        responsive: {
                            superDesktiop: {
                                breakpoint: { max: 3000, min: 2000 },
                                items: data.Images_per_slide || 1,
                            },
                            desktop: {
                                breakpoint: { max: 2000, min: 1025 },
                                items: data.Images_per_slide || 1,
                            },
                            tablet: {
                                breakpoint: { max: 1024, min: 0 },
                                items: data.Images_per_slide || 1,
                            },
                        },
                    }}
                >
                    {data.Images.map((image, index) => (
                        <img src={`${image.url}`} key={index} />
                    ))}
                </Slider>
            </div>
        </section>
    )
}
