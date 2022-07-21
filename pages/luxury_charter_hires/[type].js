import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Head from 'next/head'
import Link from 'next/link'
import st from '../../styles/main.module.scss'
import $ from 'jquery'
import Nav from '../../components/nav'
import Footer from '../../components/footer'

// Components
import PricingComponent from '../../components/pricing'
import TextComponent from '../../components/text'
import ContactComponent from '../../components/contact-form'
import DynamicFormComponent from '../../components/dynamic-form'
import SimpleContactComponent from '../../components/simple-contact-form'
import SliderComponent from '../../components/slider-component'
import BoatsComponent from '../../components/boats'
import FAQComponent from '../../components/faq'

import api from '../../helpers/api'
import DescriptionComponent from '../../components/description'
import BoatDetails from '../../components/boat-details'
import QuickViewModal from '../../components/quick-view-modal'
import ReviewComponent from '../../components/review'

const LuxuryHirePage = ({ page, error = '' }) => {
    const [overlayModal, showOverlayModal] = useState(false)
    const [modalData, setModalData] = useState({ modalFor: 'quick_view' })

    if (!page) return <div />

    const showModal = (data) => {
        if (data === undefined) {
            data = null
        }

        if (data != null) {
            $('body').addClass('modal-open')
        } else {
            $('body').removeClass('modal-open')
        }

        setModalData(data ? data : {})
        //console.log('modalData', data);
        showOverlayModal(!overlayModal)
    }

    return (
        <div className={st.container} id="top">
            <Head>
                <title key="title">
                    {page.Page_title} | {process.env.Title || 'Alfie & Co'}
                </title>
                <meta
                    name="description"
                    content={
                        page.Page_description ||
                        'Alfie & Co offer private and luxurious vessels, to give our customers access to true exclusivity. Enjoy one of the most sophisticated boating experiences across the country.'
                    }
                    key="description"
                />
                <meta property="og:url" content={`https://www.mvalfieandco.com.au/luxury_charter_hires/${page.Page_slug}`} key="og-url" />
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

            <section className="video-hero about-us-video-hero">
                <div className="video-wrapper about-us-video-wrapper">
                    <video
                        playsInline
                        muted
                        loop
                        autoPlay
                        preload="auto"
                        poster="video-poster-min.jpg"
                        className="video"
                        src={page ? page.Hero_video.url : ''}
                        id="hero-video"
                        type="video/mp4"
                    />
                    <div className="blur" />
                    <div className="video-overlay text-center pb-3 about-us-overlay-text">
                        {page.Hero_video_title && (
                            <h2 className="text-light mb-1 animate__animated animate__fadeInDown animate__delay-1s">{page.Hero_video_title}</h2>
                        )}
                        {page.Hero_video_subtitle && (
                            <p className="h3 mt-0 text-light animate__animated animate__fadeIn animate__delay-2s">{page.Hero_video_subtitle}</p>
                        )}
                        <div className="text-center animate__animated animate__bounce animate__repeat-2 animate__delay-4s">
                            <i className="text-light budicon-arrow-up-down xs" />
                            <p className="text-light">
                                <small>Scroll to explore</small>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {modalData && <QuickViewModal overlay showForm={overlayModal} data={modalData} closeForm={showModal} />}

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
                            case 'single.faq':
                                return <FAQComponent data={content} key={index} />
                            case 'single.boats':
                                return <BoatsComponent data={content} key={index} />
                            case 'single.boat-details':
                                return <BoatDetails data={content} key={index} quick_view={showModal} />
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
                            case 'nested.repeatative-content':
                                return (
                                    <>
                                        <DescriptionComponent data={content} key={index} />
                                        <div className="flex justify-content-between align-items-center mt-4 about-btns">
                                            <a href="/book" className="btn secondary">
                                                Booking Enquiry
                                            </a>
                                            <a href="/become-an-owner" className="btn secondary">
                                                Become An Owner
                                            </a>
                                        </div>
                                    </>
                                )
                            case 'single.reviews':
                                return content.reviews.length > 0 && <ReviewComponent data={content} key={index} />
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
    //console.log(params);
    const pageContent = await api.get(`luxury-charter-hires?Page_slug=${params.type}`)
    //console.log('pagecontent', pageContent);

    // Pass post data to the page via props
    return { props: { page: pageContent.data[0] } }
}

export default LuxuryHirePage
