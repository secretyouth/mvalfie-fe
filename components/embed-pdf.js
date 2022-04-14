import React from 'react'
import marked from 'marked'

export default function PDFEmbed({ data }) {
    return (
        <section className="block-container fluid flex-column pt-5 pb-5 text-light">
            <div className="blocks one mb-5">
                <div className="block p-5 mw-xl">
                    <embed
                        src={`https://drive.google.com/viewerng/
viewer?embedded=true&url=${data.PDF.url`}
                        width="100%"
                        height="100%"
                        className="pdf-embed"
                    ></embed>
                </div>
            </div>
        </section>
    )
}
