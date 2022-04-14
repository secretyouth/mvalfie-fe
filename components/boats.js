import React from 'react'

export default function BoatsComponent({ data, quick_view }) {

    function Location(text, index) {
        console.log(text);
        return <span className="text-light boat-slug" key={`location${index}`} >{text}</span >
    }

    return (

        <section className="boats about-boats" id="boats">
            <div className="boat-blocks">
                {data.boats && data.boats.map((boat, index) => {
                    let component = null;
                    return (
                        <div className="boat-block text-md" style={{ backgroundImage: `url(${boat.Main_image.url})` }} key={index}>
                            <div className="internal">
                                <h2 className="text-light mb-1 animate__animated animate__fadeInDown animate__delay-2s">{boat.Boat_name}</h2>

                                {
                                    boat &&
                                    boat.Content.map((content, index) => {
                                        switch (content.__component) {
                                            case 'single.specifications-block':
                                                content.Specifications &&
                                                    content.Specifications.map(function (specification, index) {
                                                        switch (specification.Label) {
                                                            case 'Location': {
                                                                component = <span className="text-light boat-slug" key={`location${index}`} >{specification.Text}</span >
                                                            }
                                                            default:
                                                            /*return <div key={index} />*/
                                                        }
                                                    })
                                                break;
                                            default:
                                        }
                                    })
                                }
                                {component}
                                <a href={`/boats/${boat.Page_slug}`} className="btn block primary">Explore {boat.Boat_name}</a>
                                {
                                    quick_view &&
                                    <a href="#" className="quick-view" onClick={(event) => {
                                        event.preventDefault();
                                        quick_view({ ...boat, modalFor: 'quick_view' })
                                    }
                                    }>Quick View <i className="budicon-alert-sign"></i></a>
                                }
                            </div>
                        </div>
                    )
                })}

            </div>
        </section>
    )
}
