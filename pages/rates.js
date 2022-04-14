import React, { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import st from '../styles/main.module.scss'

import Nav from '../components/nav'
import Footer from '../components/footer'

const background = './gallery/2.jpg'

export default function Rates() {
    useEffect(() => {})

    return (
        <div className={st.container} id="top">
            <Head>
                <title>Luxury Charter Vessel Booking Rates | {process.env.Title || 'MV Alfie'}</title>
                <link rel="icon" href="/favicon.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />

                <meta
                    name="description"
                    content="Explore Sydney Harbour in style on this luxurious Sunseeker Predator 68. We are committed to providing the highest level of service so you can make the most of your day."
                />
                <meta
                    name="keywords"
                    content="Sydney Charter Boat, Sydney Harbour Boat, Sydney Boat Hire, Boat Hire Rates, Booking Price, Booking Rates"
                />
                <meta property="og:url" content="https://www.mvalfieandco.com.au/rates" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Luxury Charter Vessel Booking Rates | MV Alfie" />
                <meta
                    property="og:description"
                    content="Explore Sydney Harbour in style on this luxurious Sunseeker Predator 68. We are committed to providing the highest level of service so you can make the most of your day."
                />
                <meta property="og:image" content="https://www.mvalfieandco.com.au/fb-rates.jpg" />
                <script type="text/javascript" id="hs-script-loader" async defer src="//js-na1.hs-scripts.com/9041877.js"></script> 
            </Head>

            <Nav />

            <section className="hero-image" style={{ backgroundImage: `url(${background})` }}></section>

            <section className="block-container fluid flex-column pt-5 pb-5 text-light">
                <div className="blocks one mb-5">
                    <div className="block p-5 mw-xl">
                        <h2 className="h2 accent animate__animated animate__fadeInDown">Charter</h2>
                        <p>
                            This is a hire and drive vessel accompanied with an operations manager to assist the driver for every day use of the boat.
                            The hire driver will be required to have 1 hour training and induction prior to vessel departure.
                        </p>
                        <p>All prices are GST inclusive.</p>

                        <ul className="split-list mb-3">
                            <li>
                                <h4>4 hour hire</h4> <span>$4,400</span>
                            </li>
                            <li>
                                <h4>8 hour hire</h4> <span>$6,590</span>
                            </li>
                            <li>
                                <h4>Overnight</h4> <span>$7,990</span>
                            </li>
                            <li>
                                <h4>Holidays &amp; Special Events</h4> <span>POA</span>
                            </li>
                            <li>
                                <h4>Catering &amp; Extras</h4> <span>POA</span>
                            </li>
                        </ul>

                        <Link href="/documents/alfie-information-pack.pdf" passHref>
                            <a className="btn light lg">Download Information Pack</a>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
