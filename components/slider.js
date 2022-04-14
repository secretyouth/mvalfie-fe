import React, { useEffect } from 'react'

import Carousel from 'react-multi-carousel'

/**
 * https://github.com/YIZHUANG/react-multi-carousel
 */
export default function Slider({ options, children }) {
    const settings = {
        responsive: {
            desktop: {
                breakpoint: {
                    max: 6000,
                    min: 0,
                },
                items: 1,
            },
        },
        CustomLeftArrow: ({ onClick }) => <i className="budicon-arrow-right lg" onClick={onClick} />,
        CustomRightArrow: ({ onClick }) => <i className="budicon-arrow-right lg" onClick={onClick} />,
        additionalTransfrom: 0,
        centerMode: false,
        focusOnSelect: false,
        infinite: true,
        itemClass: 'slider-item',
        keyBoardControl: true,
        ...options,
    }
    return <Carousel {...settings}>{children}</Carousel>
}
