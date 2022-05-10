import React from 'react'
import marked from 'marked'

export default function VideoComponent({ data }) {
    return (
        <section className="block-container fluid flex-column pt-5 pb-5 text-light">
            <div className="blocks one mb-5">
                <div className="block p-5 mw-xl">
                    <div className="video-wrapper">
                        <video playsInline autoPlay muted loop className="video" src={data.media.url} />
                    </div>
                </div>
            </div>
        </section>
    )
}
