import React, { useEffect, useState } from 'react'
import marked from 'marked'
import Link from 'next/link'
import format from 'date-fns/format'

import Head from 'next/head'
const readingTime = require('reading-time');

import st from '../../styles/main.module.scss'

import Nav from '../../components/nav'
import Footer from '../../components/footer'

import api from '../../helpers/api'
//import Error from '../_error';

const Articles = ({ page, url, error = '' }) => {

      const sortedList = page.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    //if (error != '')
    //    return <Error statusCode={error} />

    if (!page) return <div />
    return (
        <div className={st.container} id="top">
            <Head>
                <title>Insights | {process.env.Title || 'MV Alfie'}</title>
                <link rel="icon" href="/favicon.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />

                <meta name="description" content="Explore sydney and" />
                <meta
                    name="keywords"
                    content="Sydney Charter Boat, Sydney Harbour Boat, Sydney Boat Hire, Boat Hire Rates, Booking Price, Booking Rates"
                />
                <meta property="og:url" content={`${url}/insights`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`${page.SEO_Title || page.Title} | MV Alfie`} />
                {page.SEO_Description && <meta property="og:description" content={page.SEO_Description} /> }
                {page.Facebook_image ? (
                    <meta property="og:image" content={`${page.Facebook_image.url}`} />
                ) : (
                    <meta property="og:image" content={`${url}/fb-home.jpg`} />
                )}
                <script type="text/javascript" id="hs-script-loader" async defer src="//js-na1.hs-scripts.com/9041877.js"></script> 
            </Head>

            <Nav />

            <section className="block-container fluid flex-column pt-5 pb-5 text-light">
                <div className="blocks one mb-5">
                    <div className="block p-5 mw-xl articles">
                        <h2 className="h2 accent animate__animated animate__fadeInDown">Articles</h2>
                        { sortedList.length > 0 ? sortedList.map((article, index) => (
                            <div key={index} className="article"> 
                                {/* { article.HeroBanner && <div className="preview-image" style={{ backgroundImage: `url(${article.HeroBanner.url})` }}></div> } */}
                                <div className="content">
                                    <h3 className="h2 alt mb-1">{article.Title}</h3>
                                    <p className="h4 accent animate__animated animate__fadeInDown">{format(new Date(article.createdAt), 'dd/MM/yyyy')} | Posted by MV ALFIE & CO | { readingTime(article.Content).text }</p>
                                    <p className="mb-3">{article.Excerpt}</p>
                                    {/*<Link href={`/articles/${article.slug}`} passHref>*/}
                                    {/*    <a className="btn secondary">Read Article</a>*/}
                                    {/*</Link>*/}
                                    <Link href={`/insights/${article.slug}`} passHref>
                                        <a className="btn secondary">Read Article</a>
                                    </Link>
                                </div>
                            </div>
                        )) : <p>No articles posted yet!</p>}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

// This also gets called at build time
export async function getServerSideProps({ params }) {
    const pageContent = await api.get(`articles?Status=Published`)
    const url = process.env.BASE_URL
    //let errorcode = pageContent.status || false;

    //if (errorcode) {
    //    return {
    //        props: { error: errorcode }
    //    }
    //}
    // Pass post data to the page via props
    return { props: { page: pageContent.data, url } }
}
  

export default Articles
