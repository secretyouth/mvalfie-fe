import React, { useEffect, useState } from 'react'
import marked from 'marked'
import Link from 'next/link'
import format from 'date-fns/format'

import Head from 'next/head'
import st from '../../styles/main.module.scss'

import Nav from '../../components/nav'
import Footer from '../../components/footer'

import api from '../../helpers/api'

const Article = ({ page, url, error = '' }) => {
    //if (error != '')
    //    return <Error statusCode={error} />

    if (!page) return <div />

    return (
        <div className={st.container} id="top">
            <Head>
                <title key="title">
                    {page.SEO_Title || page.Page_title} | {process.env.Title || 'Alfie & Co'}
                </title>
                <meta
                    name="description"
                    content={
                        page.SEO_Description ||
                        page.Page_description ||
                        'Alfie & Co offer private and luxurious vessels, to give our customers access to true exclusivity. Enjoy one of the most sophisticated boating experiences across the country.'
                    }
                    key="description"
                />
                <meta property="og:url" content={`https://www.mvalfieandco.com.au/insights/${page.slug}`} key="og-url" />
                <meta property="og:title" content={`${page.SEO_Title || page.Page_title} | Alfie & Co`} key="og-title" />
                <meta
                    property="og:description"
                    content={
                        page.SEO_Description ||
                        page.Page_description ||
                        'Alfie & Co offer private and luxurious vessels, to give our customers access to true exclusivity. Enjoy one of the most sophisticated boating experiences across the country.'
                    }
                    key="og:description"
                />
                {page.Facebook_image && <meta property="og:image" content={`${page.Facebook_image.url}`} key="og-image" />}
            </Head>

            <Nav />

            {page.HeroBanner && <section className="hero-image" style={{ backgroundImage: `url(${page.HeroBanner.url})` }}></section>}

            <section className="block-container fluid flex-column pt-5 pb-5 text-light">
                <div className="blocks one mb-5">
                    <div className="block p-5 mw-xl">
                        {/*<p className="breadcrumb mb-2"><Link href={`${url}/articles`}>All Articles</Link> <i className="budicon-chevron-right light ml-1 mr-1" /> <Link href={`${url}/articles/${page.slug}`}>{page.Title}</Link></p>*/}
                        <p className="breadcrumb mb-2">
                            <Link href={`${url}/insights`}>All Articles</Link> <i className="budicon-chevron-right light ml-1 mr-1" />{' '}
                            <Link href={`${url}/insights/${page.slug}`}>{page.Title}</Link>
                        </p>
                        <h2 className="h2 accent animate__animated animate__fadeInDown">{page.Title}</h2>
                        <p className="h4 accent animate__animated animate__fadeInDown animate__delay-1s">
                            {format(new Date(page.createdAt), 'dd/MM/yyyy')} | Posted by MV ALFIE & CO
                        </p>
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
    //let errorcode = pageContent.status || false;

    //if (errorcode) {
    //    return {
    //        props: { error: errorcode }
    //    }
    //}
    // Pass post data to the page via props
    return { props: { page: pageContent.data[0], url } }
}

export default Article
