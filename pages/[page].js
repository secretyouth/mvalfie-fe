import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Head from 'next/head'
import Link from 'next/link'
import st from '../styles/main.module.scss'

import Nav from '../components/nav'
import Footer from '../components/footer'

// Components
import PricingComponent from '../components/pricing'
import TextComponent from '../components/text'
import VideoComponent from '../components/video'
import ContactComponent from '../components/contact-form'
import DynamicFormComponent from '../components/dynamic-form'
import SimpleContactComponent from '../components/simple-contact-form'
import SliderComponent from '../components/slider-component'
import BoatsComponent from '../components/boats'
import FAQComponent from '../components/faq'

import api from '../helpers/api'
import HubspotPortalForm from '../components/hubspot-portal-form'
//import Error from './_error';
import ErrorPage from 'next/error'

const Page = ({ page, error = '' }) => {
    if (error) {
        return <ErrorPage statusCode={error} />
    }

    if (!page) return <div />

    console.log(page.Content)

    return (
        <div className={st.container} id="top">
            <Head>
                <title key="description">
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
                <meta property="og:url" content={`https://www.mvalfieandco.com.au/${page.Page_slug}`} key="og-url" />
                <meta property="og:title" content={`${page.Page_title} | Alfie & Co`} key="og-title" />
                <meta
                    property="og:description"
                    content={
                        page.Page_description ||
                        'Alfie & Co offer private and luxurious vessels, to give our customers access to true exclusivity. Enjoy one of the most sophisticated boating experiences across the country.'
                    }
                    key="og-description"
                />
                {page.Facebook_image && <meta property="og:image" content={`${page.Facebook_image.url}`} key="og-url" />}
            </Head>

            <Nav />

            {page.Content.map((content, index) => {
                if (content.__component === 'single.hero-video') {
                    return (
                        <section className="video-hero page-video-hero" key={index}>
                            <div className="video-wrapper">
                                <video
                                    playsInline
                                    muted
                                    loop
                                    autoPlay
                                    preload="auto"
                                    poster="video-poster-min.jpg"
                                    className="video"
                                    src={content.Video ? content.Video.url : ''}
                                    id="hero-video"
                                    type="video/mp4"
                                />
                                <div className="blur" />
                                <div className="video-overlay text-center pb-3 about-us-overlay-text">
                                    {content.Content && (
                                        <h2 className="text-light mb-1 animate__animated animate__fadeInDown animate__delay-1s">{content.Content}</h2>
                                    )}
                                </div>
                            </div>
                        </section>
                    )
                }
            })}

            {/* <section className="hero-image" style={{ backgroundImage: `url(${page.HeroBanner.url})` }}></section> */}

            <div className="parralax-container">
                {page.Content &&
                    page.Content.length > 0 &&
                    page.Content.map((content, index) => {
                        switch (content.__component) {
                            case 'page.content-video':
                                return <VideoComponent data={content} key={index} />
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
                                return <HubspotPortalForm data={content} key={index} />
                            default:
                                return <div key={index} />
                        }
                    })}
            </div>
            <Footer />
        </div>
    )
}

// // This function gets called at build time
// export async function getStaticPaths() {
//     // Call an external API endpoint to get posts
//     const pages = await api.get('pages')

//     // Get the paths we want to pre-render based on posts
//     const paths = pages.data.map((page) => ({
//       params: { page: page.Page_slug },
//     }))

//     return { paths, fallback: false }
//   }

// This also gets called at build time
export async function getServerSideProps({ params }) {
    if (params.page.includes('.php')) {
        return {
            redirect: {
                destination: '/',
                permanent: true,
            },
        }
    }

    const pageContent = await api.get(`pages?Page_slug=${params.page}`)

    if (pageContent.data.length == 0) {
        return {
            props: { error: 404 },
        }
    }

    // Pass post data to the page via props
    return { props: { page: pageContent.data[0] } }
}

export default Page
