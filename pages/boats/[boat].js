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
import CtaButtons from '../../components/cta-buttons'

import api from '../../helpers/api'
import HubspotPortalForm from '../../components/hubspot-portal-form'
import $ from 'jquery'
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
                <title key="title">
                    {page.Boat_name} | {process.env.Title || 'Alfie & Co'}
                </title>
                <meta
                    name="description"
                    content={
                        page.Page_description ||
                        'Alfie & Co offer private and luxurious vessels, to give our customers access to true exclusivity. Enjoy one of the most sophisticated boating experiences across the country.'
                    }
                    key="description"
                />
                <meta property="og:url" content={`https://www.mvalfieandco.com.au/boats/${page.Page_slug}`} key="og-url" />
                <meta property="og:title" content={`${page.Page_title} | Alfie & Co`} key="og-title" />
                <meta
                    property="og:description"
                    content={
                        page.Page_description ||
                        'Alfie & Co offer private and luxurious vessels, to give our customers access to true exclusivity. Enjoy one of the most sophisticated boating experiences across the country.'
                    }
                    key="og-description"
                />
                {page.Facebook_image && <meta property="og:image" content={`${page.Facebook_image.url}`} key="og-image" />}
            </Head>

            <Nav />

            {page.Hero_video && (
                <HeroVideoComponent
                    video={page.Hero_video.url}
                    videoMobile={page.Hero_video_mobile && page.Hero_video_mobile.url}
                    poster={page.Hero_video_image.url}
                    title={page.Hero_video_title}
                    subtitle={page.Hero_video_subtitle}
                    name={page.Boat_name}
                />
            )}

            {/* { page.HeroBanner && <section className="hero-image" style={{ backgroundImage: `url(${page.HeroBanner.url})` }}></section> } */}

            {specs.show && (
                <Specifications specifications={specs.Specifications} show={specs.show} background={specs.Background_image.url} setShow={hideSpecs} />
            )}

            <div className="parralax-container">
                {page.Content &&
                    page.Content.length > 0 &&
                    page.Content.map((content, index) => {
                        switch (content.__component) {
                            case 'single.content-block':
                                return <TextComponent data={content} key={index} />
                            case 'single.cta-buttons':
                                return <CtaButtons data={content} key={index} />
                            case 'single.slider':
                                return <SliderComponent data={content} key={index} />
                            case 'single.pricing-table':
                                return <PricingComponent data={content} key={index} />
                            case 'single.specifications-block':
                                return <SpecificationsComponent data={content} key={index} toggleSpecs={toggleSpecs} />
                            case 'single.boats':
                                return <BoatsComponent data={content} key={index} />
                            case 'single.dynamic-forms': {
                                return (
                                    <section
                                        className="block-container fluid flex-column contact-bg pt-10 pb-10"
                                        style={{ backgroundImage: content.Background_image ? `url(${content.Background_image.url})` : undefined }}
                                        id="contactForm"
                                        key={index}
                                    >
                                        <div className="blocks one" id="booking">
                                            <div className="block primary p-5 mw-lg w-100 relative">
                                                <DynamicFormComponent data={content} general />
                                            </div>
                                        </div>
                                    </section>
                                )
                            }
                            case 'single.contact-form': {
                                switch (content.Form_type) {
                                    case 'Simple': {
                                        return (
                                            <section
                                                className="block-container fluid flex-column contact-bg pt-10 pb-10"
                                                style={{
                                                    backgroundImage: content.Background_image ? `url(${content.Background_image.url})` : undefined,
                                                }}
                                                id="contactForm"
                                                key={index}
                                            >
                                                <div className="blocks one" id="booking">
                                                    <div className="block primary p-5 mw-lg w-100 relative">
                                                        <SimpleContactComponent data={content} general />
                                                    </div>
                                                </div>
                                            </section>
                                        )
                                    }
                                    default: {
                                        return (
                                            page.Charter && (
                                                <section
                                                    className="block-container fluid flex-column contact-bg pt-10 pb-10"
                                                    style={{
                                                        backgroundImage: content.Background_image
                                                            ? `url(${content.Background_image.url})`
                                                            : undefined,
                                                    }}
                                                    id="contactForm"
                                                    key={index}
                                                >
                                                    <div className="blocks one" id="booking">
                                                        <div className="block primary p-5 mw-lg w-100 relative">
                                                            <ContactComponent data={content} general />
                                                        </div>
                                                    </div>
                                                </section>
                                            )
                                        )
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
