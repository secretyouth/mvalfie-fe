import React, { useState } from 'react'
import classNames from 'classnames'

export default function Modal({ data = {}, showForm = true, closeForm }) {

    const [close, closeAnimation] = useState(false)

    const formClass = classNames({
        modal: true,
        hide: !showForm,
        'mt-3': true,
        overlay: true,
        animate__animated: true,
        animate__fadeIn: showForm && !close,
        animate__fadeOut: close,
    })

    const animateFormClose = () => {
        closeAnimation(true)
        setTimeout(() => {
            closeForm()
            closeAnimation(false)
        }, 750)
    }

    return (
        <div className={formClass} >
            <div className="modal-container mt-3 mw-lg w-100 text-light markdown">
                <i className="budicon-cross-ui icon-btn close lg" onClick={animateFormClose} />
                <h2>{data.title}</h2>
                {data.status && <h3 className="accent text-uppercase">{data.status}</h3>}
                <ul>
                    <li><strong>Date:</strong> {data.date}</li>
                    <li><strong>Start Time:</strong> {data.startTime}</li>
                    <li><strong>End Time:</strong> {data.endTime}</li>
                </ul>
            </div>
        </div>
    )
}
