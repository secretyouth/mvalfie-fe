import React, { useState } from 'react'
import classNames from 'classnames'

export default function QuickViewModal({ data = {}, showForm = true, closeForm }) {
    console.log(data);
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
                <h2 className="accent text-uppercase">{data.Boat_name}</h2>

                {
                    data.Content &&
                    data.Content.length &&
                    data.Content.map((content, index) => {
                        switch (content.__component) {
                            case "single.specifications-block":
                                return (
                                    <ul key={index}>
                                        {
                                            content.Specifications.map((specification, i) =>
                                                <li key={i}><strong>{capitalize(specification.Label)}:</strong> {specification.Text}</li>
                                            )
                                        }
                                    </ul>)
                            default:
                        }
                    })
                }
                <div className="flex justify-content-between align-items-center mt-4 quick-view-btn-group">
                    <a href={`/boats/${data.Page_slug}`} className="btn secondary" >Explore More</a>
                    <a href="/become-an-owner" className="btn secondary">Own This Vessel</a>
                </div>
            </div>
        </div>
        )
}