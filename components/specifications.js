import React, { useState } from 'react'
import classNames from 'classnames'

export default function Specifications({ specifications = [], show = true, background, setShow }) {
    const [close, closeAnimation] = useState(false)

    const formClass = classNames({
        specifications: true,
        hide: !show,
        overlay: true,
        'mt-3': true,
        animate__animated: true,
        animate__fadeIn: show && !close,
        animate__fadeOut: close,
    })

    const animateFormClose = () => {
        closeAnimation(true)
        setTimeout(() => {
            closeAnimation(false)
            setShow(false)
        }, 750)
    }

    const loopOut = (start, end, specifications) => {
        const content = []

        for (let index = start; index < end; index++) {
           content.push(
                <li className="mb-3" key={index}>
                    <p className="h4 mb-0">{specifications[index].Label}</p>
                    <p className="mb-0">{specifications[index].Text}</p>
                </li>
           )
        }

        return <>{content}</>
    }

    return (
        <div className={formClass} style={{ backgroundImage: `url(${background})` }}>
            <i className="budicon-cross-ui icon-btn light close lg" onClick={animateFormClose} />
            <div className="w-100 mw-xl">
                <h3 className="h2 text-light animate__animated animate__fadeInDown animate__delay-1s">Specifications</h3>

                <div className="split boat-specs">
                    <ul className="text-right text-light pr-10 animate__animated animate__fadeInLeft animate__delay-1s">
                        { loopOut(0, Math.ceil(specifications.length / 2), specifications) }
                    </ul>
                    <ul className="text-light pl-10 animate__animated animate__fadeInRight animate__delay-1s">
                        { loopOut(Math.ceil(specifications.length / 2), specifications.length, specifications) }
                    </ul>
                </div>
            </div>
        </div>
    )
}
