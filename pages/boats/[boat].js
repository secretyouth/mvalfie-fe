import React, { useEffect, useState } from 'react'

import Head from 'next/head'
import st from '../../styles/main.module.scss'

import Nav from '../../components/nav'
import Footer from '../../components/footer'

// Components
import Specifications from '../../components/specifications'
import PricingComponent from '../../components/pricing'
import HeroVideoComponent from '../../components/video-hero'
import TextComponent from '../../components/text'
import DynamicFormComponent from '../../components/dynamic-form'
import ContactComponent from '../../components/contact-form'
import SimpleContactComponent from '../../components/simple-contact-form'
import SliderComponent from '../../components/slider-component'
import SpecificationsComponent from '../../components/specifications-component'
import BoatsComponent from '../../components/boats'

import api from '../../helpers/api'
import HubspotPortalForm from '../../components/hubspot-portal-form';
import $ from 'jquery';
//import Error from '../_error';

export default function Boat({ page, error = '' }) {
    const [specs, setSpecs] = useState({ show: false })

    //if (error != '')
    //    return <Error statusCode={error} />

    if (!page) return <div />

    const toggleSpecs = (data) => {
        setSpecs(data)
    }

    const hideSpecs = () => {
        setSpecs({ ...specs, show: false })
    }

    return (
        <div className={st.container} id="top">
            <Head>
                <title>{page.Boat_name} | {process.env.Title || 'MV Alfie'}</title>
                <link rel="icon" href="/favicon.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />

                <meta name="description" content={page.Page_description} />
                <meta
                    name="keywords"
                    content="Sydney Charter Boat, Sydney Harbour Boat, Sydney Boat Hire, Boat Hire Rates, Booking Price, Booking Rates"
                />
                <meta property="og:url" content={`https://www.mvalfieandco.com.au/${page.Page_slug}`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`${page.Page_title} | MV Alfie`} />
                <meta property="og:description" content={page.Page_description} />
                {page.Facebook_image ? (
                    <meta property="og:image" content={`${page.Facebook_image.url}`} />
                ) : (
                    <meta property="og:image" content="https://www.mvalfieandco.com.au/fb-home.jpg" />
                )}
                <script type="text/javascript" id="hs-script-loader" async defer src="//js-na1.hs-scripts.com/9041877.js"></script> 
            </Head>

            <Nav />

            { page.Hero_video && <HeroVideoComponent video={page.Hero_video.url} videoMobile={page.Hero_video_mobile && page.Hero_video_mobile.url} poster={page.Hero_video_image.url} title={page.Hero_video_title} subtitle={page.Hero_video_subtitle} name={page.Boat_name} /> }

            {/* { page.HeroBanner && <section className="hero-image" style={{ backgroundImage: `url(${page.HeroBanner.url})` }}></section> } */}

            { specs.show &&
                <Specifications specifications={specs.Specifications} show={specs.show} background={specs.Background_image.url} setShow={hideSpecs} />
            }

            <div className="parralax-container">
                {page.Content &&
                    page.Content.length > 0 &&
                    page.Content.map((content, index) => {
                        switch (content.__component) {
                            case 'single.content-block':
                                return <TextComponent data={content} key={index} />
                            case 'single.slider':
                                return <SliderComponent data={content} key={index} />
                            case 'single.pricing-table':
                                return <PricingComponent data={content} key={index} />
                            case 'single.specifications-block':
                                return <SpecificationsComponent data={content} key={index} toggleSpecs={toggleSpecs} />
                            case 'single.boats':
                                return <BoatsComponent data={content} key={index} />
                            case 'single.dynamic-forms1': {
                                return (
                                    <section className="block-container fluid flex-column contact-bg pt-10 pb-10" style={{ backgroundImage: content.Background_image ? `url(${content.Background_image.url})` : undefined }} id="contactForm" key={index}>
                                        <div className="blocks one" id="booking">
                                            <div className="block primary p-5 mw-lg w-100 relative">
                                                <DynamicFormComponent data={content} general />
                                            </div>
                                        </div>
                                    </section>
                                )
                            }
                            case 'single.contact-form1': {
                                switch(content.Form_type) {
                                    case 'Simple': {
                                        return (
                                        <section className="block-container fluid flex-column contact-bg pt-10 pb-10" style={{ backgroundImage: content.Background_image ? `url(${content.Background_image.url})` : undefined }} id="contactForm" key={index}>
                                            <div className="blocks one" id="booking">
                                                <div className="block primary p-5 mw-lg w-100 relative">
                                                    <SimpleContactComponent data={content} general />
                                                </div>
                                            </div>
                                        </section>
                                    )}
                                    default: {
                                        return page.Charter && (<section className="block-container fluid flex-column contact-bg pt-10 pb-10" style={{ backgroundImage: content.Background_image ? `url(${content.Background_image.url})` : undefined }} id="contactForm" key={index}>
                                            <div className="blocks one" id="booking">
                                                <div className="block primary p-5 mw-lg w-100 relative">
                                                    <ContactComponent data={content} general />
                                                </div>
                                            </div>
                                        </section>)
                                    }
                                }
                            }
                            case 'single.hubspot-form':
                                return <HubspotPortalForm data={content} key={index} boat_name={page.Boat_name} />
                            default:
                                return <div key={index} />
                        }
                    })}
                </div>

            <Footer />
        </div>
    )
}

// This also gets called at build time
export async function getServerSideProps({ params }) {
    const pageContent = await api.get(`boats?Page_slug=${params.boat}`)
    //let errorcode = pageContent.status || false;

    //if (errorcode) {
    //    return {
    //        props: { error: errorcode }
    //    }
    //}
    // Pass post data to the page via props
    return { props: { page: pageContent.data[0] } }
}
  
