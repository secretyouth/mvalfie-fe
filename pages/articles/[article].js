import React, { useEffect, useState } from 'react'
import marked from 'marked'
import Link from 'next/link'
import format from 'date-fns/format'

import Head from 'next/head'
import st from '../../styles/main.module.scss'

import Nav from '../../components/nav'
import Footer from '../../components/footer'

import api from '../../helpers/api'
import Error from '../_error';

const Article = ({ page, url, error = '' }) => {

    if (error != '')
        return <Error statusCode={error} />

    if (!page) return <div />

    return (
        <div className={st.container} id="top">
            <Head>
                <title>{page.SEO_Title || page.Title} | {process.env.Title || 'MV Alfie'}</title>
                <link rel="icon" href="/favicon.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />

                {page.SEO_Description && <meta name="description" content={page.SEO_Description} /> }
                <meta
                    name="keywords"
                    content="Sydney Charter Boat, Sydney Harbour Boat, Sydney Boat Hire, Boat Hire Rates, Booking Price, Booking Rates"
                />
                <meta property="og:url" content={`https://www.mvalfieandco.com.au/${page.slug}`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`${page.SEO_Title || page.Title} | MV Alfie`} />
                {page.SEO_Description && <meta property="og:description" content={page.SEO_Description} /> }
                {page.Facebook_image ? (
                    <meta property="og:image" content={`${page.Facebook_image.url}`} />
                ) : (
                    <meta property="og:image" content="https://www.mvalfieandco.com.au/fb-home.jpg" />
                )}
                <script type="text/javascript" id="hs-script-loader" async defer src="//js-na1.hs-scripts.com/9041877.js"></script> 
            </Head>

            <Nav />

            { page.HeroBanner && <section className="hero-image" style={{ backgroundImage: `url(${page.HeroBanner.url})` }}></section> }


            <section className="block-container fluid flex-column pt-5 pb-5 text-light">
                <div className="blocks one mb-5">
                    <div className="block p-5 mw-xl">
                        <p className="breadcrumb mb-2"><Link href={`${url}/articles`}>All Articles</Link> <i className="budicon-chevron-right light ml-1 mr-1" /> <Link href={`${url}/articles/${page.slug}`}>{page.Title}</Link></p>
                        <h2 className="h2 accent animate__animated animate__fadeInDown">{page.Title}</h2>
                        <p className="h4 accent animate__animated animate__fadeInDown animate__delay-1s">{format(new Date(page.createdAt), 'MM/dd/yyyy')} | Posted by MV ALFIE & CO</p>
                        <div className="mb-4 markdown" dangerouslySetInnerHTML={{ __html: marked(page.Content) }} />

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

// This also gets called at build time
export async function getServerSideProps({ params }) {
    const pageContent = await api.get(`articles?slug=${params.article}`)
    const url = process.env.BASE_URL

    let errorcode = pageContent.status || false;

    if (errorcode) {
        return {
            props: { error: errorcode }
        }
    }

    // Pass post data to the page via props
    return { props: { page: pageContent.data[0], url } }
}
  

export default Article
