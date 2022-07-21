import React from 'react'
import marked from 'marked'

export default function BoatDetails({ data, quick_view }) {
    console.log(data)
    let component = null
    return (
        <section className="boats about-boats gold-coast-main" id="boats">
            <div className="gold-coast-content-block">
                <h2 className="text-light mb-1 animate__animated animate__fadeInDown animate__delay-2s">{data.Title}</h2>
                {data.description && (
                    <div className="mb-4 markdown content-p text-light" dangerouslySetInnerHTML={{ __html: marked(data.description) }} />
                )}
            </div>
            <div className="boat-blocks gold-coast-img-block">
                {data.boat && (
                    <div className="boat-block text-md" style={{ backgroundImage: `url(${data.boat.Main_image.url})` }}>
                        <div className="internal">
                            <h2 className="text-light mb-1 animate__animated animate__fadeInDown animate__delay-2s">{data.boat.Boat_name}</h2>
                            {data.boat &&
                                data.boat.Content.map((content, index) => {
                                    switch (content.__component) {
                                        case 'single.specifications-block':
                                            content.Specifications &&
                                                content.Specifications.map(function (specification, index) {
                                                    switch (specification.Label) {
                                                        case 'Location': {
                                                            component = (
                                                                <span className="text-light boat-slug" key={`location${index}`}>
                                                                    {specification.Text}
                                                                </span>
                                                            )
                                                        }
                                                        default:
                                                        /*return <div key={index} />*/
                                                    }
                                                })
                                            break
                                        default:
                                    }
                                })}
                            {component}
                            <a href={`/boats/${data.boat.Page_slug}`} className="btn block primary">
                                Explore {data.boat.Boat_name}
                            </a>
                            {quick_view && (
                                <a
                                    href="#"
                                    className="quick-view"
                                    onClick={(event) => {
                                        event.preventDefault()
                                        quick_view({ ...data.boat, modalFor: 'quick_view' })
                                    }}
                                >
                                    Quick View <i className="budicon-alert-sign"></i>
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
