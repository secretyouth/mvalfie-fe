import React, { useEffect, useState } from 'react'
import marked from 'marked'

export default function SpecificationsWrapper({ data, toggleSpecs }) {
    const [show, showSpecifications] = useState(true)

    const showSpecs = (e) => {
        showSpecifications(!show)
        toggleSpecs({ ...data, show: true, closeSpecs: showSpecifications(false)})
    }


    return (
        <>
        <section className="block-container flex-column align-items-center dark">
            <div className="blocks one mw-lg">
                <div className="block p-5 text-md">
                    {data.Title && <h2 className="h1 accent animate__animated animate__fadeInDown">{data.Title}</h2>}
                    {data.Content_area && <div className="mb-4 markdown" dangerouslySetInnerHTML={{ __html: marked(data.Content_area) }} />}

                    {data.Show_specifications && (
                        <button className="btn mt-3" onClick={showSpecs}>
                            Full Specifications
                        </button>
                    )}

                </div>
            </div>
        </section>
        </>
    )
}
