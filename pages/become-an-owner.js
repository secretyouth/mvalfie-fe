import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import $ from 'jquery'
import st from '../styles/main.module.scss'

import Nav from '../components/nav'
import Footer from '../components/footer'

import api from '../helpers/api'

import PricingComponent from '../components/pricing'
import TextComponent from '../components/text'
import ContactComponent from '../components/contact-form'
import SimpleContactComponent from '../components/simple-contact-form'
import SliderComponent from '../components/slider-component'
import BoatsComponent from '../components/boats'
import ReviewComponent from '../components/review'
import DescriptionComponent from '../components/description'
import BoatDetailsSlider from '../components/boat-detail-slider'
import DynamicForm from '../components/dynamic-form'

const BecomeAnOwner = ({ page }) => {
    const [overlayModal, showOverlayModal] = useState(false)
    const [modalData, setModalData] = useState({ modalFor: 'quick_view' })
    const [intrestPopUpData, setInterestPopUpData] = useState({});

    const router = useRouter()

    useEffect(() => {
        if (page) {
            // handler to play/pause video
            $(window).scroll(() => {
                // get the height of the window
                const windowHeightTrigger = $(window).height() / 6
                const scrollPos = $(window).scrollTop()
                const video = $('#hero-video')

                if (!video.get(0)) return true

                if (scrollPos > windowHeightTrigger) {
                    video.get(0).pause()
                    video.next('.blur').addClass('active')
                } else {
                    video.get(0).play()
                    video.next('.blur').removeClass('active')
                }
            })

            // check if mobile
            let videoSrc = page.Hero_video.url
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                videoSrc = page.Hero_video_mobile ? page.Hero_video_mobile.url : page.Hero_video.url
            }

            // $('#hero-video').attr('src', videoSrc)
            // $('#hero-video').get(0).load()
        }
    }, [router])

    useEffect(() => {
        async function getInterestData() {
            const { data: owner } = await api.get(`become-an-owner`)
            //console.log(boats)
            
            owner.Content.map((content, index) => {
                switch (content.__component) {
                    case 'single.dynamic-forms':
                        setInterestPopUpData(content);
                    default:
                }
            });
        }

        getInterestData();
    }, [])

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

    let interestData = null;

    return (
        <div className={st.container} id="top">
            <Head>
                <title>Boat Syndications In Sydney & Gold Coast | {process.env.Title || 'MV Alfie'}</title>
                <link rel="icon" href="/favicon.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />

                <meta
                    name="description"
                    content="MV Alfie offers an unforgettable experience for all onboard. This luxurious Sunseeker Predator 68 is equipped for your entertainment and relaxation."
                />
                <meta
                    name="keywords"
                    content="Sydney Boat Hire, Sydney Charter Boat, Boat Hire Sydney Harbour, Self Drive Boat Hire Sydney, Sydney Private Boat Hire"
                />
                <meta property="og:url" content="https://www.mvalfieandco.com.au/" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Become An Owner | MV Alfie" />
                <meta
                    property="og:description"
                    content="MV Alfie offers an unforgettable experience for all onboard. This luxurious Sunseeker Predator 68 is equipped for your entertainment and relaxation."
                />
                <meta property="og:image" content="https://www.mvalfieandco.com.au/fb-home.jpg" />
                <script type="text/javascript" id="hs-script-loader" async defer src="//js-na1.hs-scripts.com/9041877.js"></script>
                <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/shell.js"></script>
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
                        {page.Hero_video_title && <h2 className="text-light mb-1 animate__animated animate__fadeInDown animate__delay-1s">{page.Hero_video_title}</h2>}
                        {page.Hero_video_subtitle && <p className="h3 text-light animate__animated animate__fadeIn animate__delay-2s">{page.Hero_video_subtitle}</p>}
                        <div className="text-center animate__animated animate__bounce animate__repeat-2 animate__delay-4s">
                            <i className="text-light budicon-arrow-up-down xs" />
                            <p className="text-light">
                                <small>Scroll to explore</small>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/*{modalData && <QuickViewModal overlay showForm={overlayModal} data={modalData} closeForm={showModal} />}*/}
            {modalData && <DynamicForm overlay showForm={overlayModal} data={modalData} closeForm={showModal} />}

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
                            case 'single.boats':
                                return <BoatsComponent data={content} quick_view={showModal} key={index} />
                            //case 'single.dynamic-forms': {
                                //return (
                                    //<section className="block-container fluid flex-column contact-bg pt-10 pb-10" style={{ backgroundImage: content.Background_image ? `url(${content.Background_image.url})` : undefined }} id="contactForm" key={index}>
                                    //    <div className="blocks one" id="booking">
                                    //        <div className="block primary p-5 mw-lg w-100 relative">
                                    //            <DynamicForm data={content} general />
                                    //        </div>
                                    //    </div>
                                    //</section>
                                //)
                            //}
                            case 'single.contact-form': {
                                switch (content.Form_type) {
                                    case 'Simple': {
                                        return (
                                            <section className="block-container fluid flex-column contact-bg pt-10 pb-10" style={{ backgroundImage: content.Background_image ? `url(${content.Background_image.url})` : undefined }} id="contactForm" key={index}>
                                                <div className="blocks one" id="booking">
                                                    <div className="block primary p-5 mw-lg w-100 relative">
                                                        <SimpleContactComponent data={content} general />
                                                    </div>
                                                </div>
                                            </section>
                                        )
                                    }
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
                            case 'single.reviews':
                                return content.reviews.length > 0 && (<ReviewComponent data={content} key={index} />)
                            case 'nested.repeatative-content':
                                return (
                                    <>
                                        <DescriptionComponent data={content} key={index} />
                                        <div className="flex justify-content-between align-items-center mt-4 about-btns">
                                            <a href="/book" className="btn secondary">Booking Enquiry</a>
                                            <a href="/become-an-owner" className="btn secondary">Become An Owner</a>
                                        </div>
                                    </>
                                )
                            case 'single.boat-details-silder':
                                return (
                                    <BoatDetailsSlider data={content} key={index} interestPopUp={showModal} intresetPopUpData={intrestPopUpData} />
                                )
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
export async function getServerSideProps() {
    const pageContent = await api.get('become-an-owner')

    // Pass post data to the page via props
    return { props: { page: pageContent.data } }
}

export default BecomeAnOwner