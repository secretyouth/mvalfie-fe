import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import $ from 'jquery'
import st from '../styles/main.module.scss'

import Nav from '../components/nav'
import Footer from '../components/footer'
import Slider from '../components/slider'
import Contact from '../components/contact'

import api from '../helpers/api'

import PricingComponent from '../components/pricing'
import TextComponent from '../components/text'
import DynamicFormComponent from '../components/dynamic-form'
import ContactComponent from '../components/contact-form'
import SimpleContactComponent from '../components/simple-contact-form'
import SliderComponent from '../components/slider-component'
import BoatsComponent from '../components/boats'
import QuickViewModal from '../components/quick-view-modal'

const Homepage = ({ page }) => {
    //console.log(page);
    const [overlayModal, showOverlayModal] = useState(false)
    const [modalData, setModalData] = useState({ modalFor: 'quick_view' })
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

    console.log([page.Content])

    return (
        <div className={st.container} id="top">
            <Nav />

            <section className="video-hero">
                <div className="video-wrapper">
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
                    <div className="video-overlay text-center pb-3">
                        {page.Hero_video_title && (
                            <h2 className="text-light mb-1 animate__animated animate__fadeInDown animate__delay-1s">{page.Hero_video_title}</h2>
                        )}
                        {page.Hero_video_subtitle && (
                            <p className="h3 text-light animate__animated animate__fadeIn animate__delay-2s">{page.Hero_video_subtitle}</p>
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
                            case 'single.boats':
                                return <BoatsComponent data={content} key={index} quick_view={showModal} />
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
    const pageContent = await api.get('homepage')

    // Pass post data to the page via props
    return { props: { page: pageContent.data } }
}

export default Homepage
