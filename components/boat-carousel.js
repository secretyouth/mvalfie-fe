import React from 'react'
import BoatsComponent from './boats';
import Slider from './slider';
//import SliderComponent from './slider-component';

export default function BoatsCarouselComponent({ data, quick_view }) {
    //console.log('data', data);
    function Location(text, index) {
        //console.log(text);
        return <span className="text-light boat-slug" key={`location${index}`} >{text}</span >
    }

    const options = {
        centerMode: false,
        itemClass: "carousel-item-padding-40-px",
        infiniteLoop: false,
        arrows: true,
        showDots: true,
        ssr: true,
        autoPlay: true
    }

    const childrens = data.boats && data.boats.map((boat, index) => {
        //console.log('boats',boat);
        let component = null;
        return (
            <section className="boats about-boats" id="boats" key={index}>
                <div className="boat-blocks">
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
                </div>
            </section>
        )
    })

    return (
        <>
            {data.boats.length === 1 ? childrens : data.boats.length > 1 ? <Slider children={childrens} options={options} /> : <></>}
        </>
    )
}
