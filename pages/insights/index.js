import React, { useEffect, useState } from 'react'
import marked from 'marked'
import Link from 'next/link'
import format from 'date-fns/format'

import Head from 'next/head'
const readingTime = require('reading-time')

import st from '../../styles/main.module.scss'

import Nav from '../../components/nav'
import Footer from '../../components/footer'

import api from '../../helpers/api'
//import Error from '../_error';

const Articles = ({ page, error = '' }) => {
    const sortedList = page.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    //if (error != '')
    //    return <Error statusCode={error} />

    if (!page) return <div />
    return (
        <div className={st.container} id="top">
            <Head>
                <title key="title">Insights | {process.env.Title || 'MV Alfie'}</title>
                <meta
                    name="description"
                    content={
                        page.SEO_Description ||
                        page.Page_description ||
                        'Alfie & Co offer private and luxurious vessels, to give our customers access to true exclusivity. Enjoy one of the most sophisticated boating experiences across the country.'
                    }
                    key="description"
                />
                <meta property="og:url" content={`https://www.mvalfieandco.com.au/insights`} key="og-url" />
                <meta property="og:title" content={`${page.SEO_Title || page.Page_title} | Alfie & Co`} key="og-title" />
                <meta
                    property="og:description"
                    content={
                        page.SEO_Description ||
                        page.Page_description ||
                        'Alfie & Co offer private and luxurious vessels, to give our customers access to true exclusivity. Enjoy one of the most sophisticated boating experiences across the country.'
                    }
                    key="og-description"
                />
                {page.Facebook_image && <meta property="og:image" content={`${page.Facebook_image.url}`} key="og-image" />}
            </Head>

            <Nav />

            <section className="block-container fluid flex-column pt-5 pb-5 text-light">
                <div className="blocks one mb-5">
                    <div className="block p-5 mw-xl articles">
                        <h2 className="h2 accent animate__animated animate__fadeInDown">Articles</h2>
                        {sortedList.length > 0 ? (
                            sortedList.map((article, index) => (
                                <div key={index} className="article">
                                    {/* { article.HeroBanner && <div className="preview-image" style={{ backgroundImage: `url(${article.HeroBanner.url})` }}></div> } */}
                                    <div className="content">
                                        <h3 className="h2 alt mb-1">{article.Title}</h3>
                                        <p className="h4 accent animate__animated animate__fadeInDown">
                                            {format(new Date(article.createdAt), 'dd/MM/yyyy')} | Posted by MV ALFIE & CO |{' '}
                                            {readingTime(article.Content).text}
                                        </p>
                                        <p className="mb-3">{article.Excerpt}</p>
                                        {/*<Link href={`/articles/${article.slug}`} passHref>*/}
                                        {/*    <a className="btn secondary">Read Article</a>*/}
                                        {/*</Link>*/}
                                        <Link href={`/insights/${article.slug}`} passHref>
                                            <a className="btn secondary">Read Article</a>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No articles posted yet!</p>
                        )}
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
