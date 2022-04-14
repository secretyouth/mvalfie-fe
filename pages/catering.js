import React, { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import st from '../styles/main.module.scss'

import Nav from '../components/nav'
import Footer from '../components/footer'

const background = './gallery/catering-1.jpg'

export default function Catering() {
    useEffect(() => {})

    return (
        <div className={st.container} id="top">
            <Head>
                <title>Catering Onboard Luxury Charter Vessel | {process.env.Title || 'MV Alfie'}</title>
                <link rel="icon" href="/favicon.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />

                <meta
                    name="description"
                    content="Enjoy your day on Sydney Harbour to the fullest. Our delicious catering options are well suited for any occasion and any dietary requirement."
                />
                <meta name="keywords" content="Catering Sydney, Boat Charter Catering, Onboard Catering" />
                <meta property="og:url" content="https://www.mvalfieandco.com.au/catering" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Catering Onboard Luxury Charter Vessel | MV Alfie" />
                <meta
                    property="og:description"
                    content="Enjoy your day on Sydney Harbour to the fullest. Our delicious catering options are well suited for any occasion and any dietary requirement."
                />
                <meta property="og:image" content="https://www.mvalfieandco.com.au/fb-catering.jpg" />
                <script type="text/javascript" id="hs-script-loader" async defer src="//js-na1.hs-scripts.com/9041877.js"></script> 
            </Head>

            <Nav />

            <section className="hero-image" style={{ backgroundImage: `url(${background})` }}></section>

            <section className="block-container fluid flex-column pt-5 pb-5 text-light">
                <div className="blocks one mb-5">
                    <div className="block p-5 mw-xl">
                        <h2 className="h2 accent animate__animated animate__fadeInDown">Catering</h2>
                        <p>
                            We have several catering options available to suit your dietary requirements. Alcohol is BYO. There will be a $20
                            surcharge per guest.{' '}
                        </p>
                        <p>
                            For the Sydney Fish Market and Chargrill Charlie's menus, there will be an additional 30% surcharge for our management
                            organizing orders and pick up.
                        </p>

                        <Link href="/documents/alfie-catering-1.1.pdf" passHref>
                            <a target="_blank" className="btn light lg mb-4 mt-2">
                                Download Catering Options
                            </a>
                        </Link>

                        <embed
                            src="https://drive.google.com/viewerng/
viewer?embedded=true&url=http://www.mvalfieandco.com.au/documents/alfie-catering-1.1.pdf"
                            width="100%"
                            height="100%"
                            className="pdf-embed"
                        ></embed>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
