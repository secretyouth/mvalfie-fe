import React from 'react'
import marked from 'marked'

export default function DescriptionComponent({ data }) {
    //console.log(data);
    return (
        <section className="block-container fluid flex-column pt-5 pb-5 text-light description-wrapper about-wrapper">
            <div className="blocks one">
                <div className="block mw-xl content-block">
                    {data.Title && <h2 className="h2 accent animate__animated animate__fadeInDown">{data.Title}</h2>}
                    {data.Content &&
                        data.Content.map((content, index) => {
                            return content.Content2 && (<div className="mb-4 markdown content-p" dangerouslySetInnerHTML={{ __html: marked(content.Content2) }} key={index} />)
                        })
                    }
                </div>
            </div>
        </section>
    )
}
