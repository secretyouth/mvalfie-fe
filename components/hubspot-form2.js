import React, { useState } from 'react'
import classNames from 'classnames'

export default function HubSpotFormModalNav({ data = {}, showForm = true, closeForm }) {

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

    const capitalize = (s) => {
        s = s.toLowerCase();
        return s[0].toUpperCase() + s.slice(1);
    }

    return (
        <div className={formClass}>
            <div className="modal-container mt-3 mw-lg w-100 text-light markdown">
                <i className="budicon-cross-ui icon-btn close lg" onClick={animateFormClose} />
                <h2 className="accent">{data.FormName}</h2>
                <div id="my-hubspot-form-nav"></div>
            </div>
        </div>
    )
}