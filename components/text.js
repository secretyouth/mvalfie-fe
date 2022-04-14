import React from 'react'
import marked from 'marked'

export default function TextComponent({ data }) {
    return (
        <section className="block-container fluid flex-column pt-5 pb-5 text-light">
            <div className="blocks one mb-5">
                <div className="block p-5 mw-xl">
                    {data.Title && <h2 className="h2 accent animate__animated animate__fadeInDown">{data.Title}</h2>}
                    {data.Content && <div className="mb-4 markdown" dangerouslySetInnerHTML={{ __html: marked(data.Content) }} />}

                    {data.Button_visible && data.Button_url && (
                        <a href={data.Button_url} className="btn mt-3">
                            {data.Button_text}
                        </a>
                    )}

                    {data.Embed_pdf && (
                        <embed
                            src={`https://drive.google.com/viewerng/
    viewer?embedded=true&url=${data.Embed_pdf.url}`}
                            width="100%"
                            height="100%"
                            className="pdf-embed"
                        ></embed>
                    )}
                </div>
            </div>
        </section>
    )
}
