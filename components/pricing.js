import React, { useEffect } from 'react'
import marked from 'marked'
import Link from 'next/link'

export default function PricingComponent({ data }) {
    return (
        <section className="block-container fluid flex-column pt-5 pb-5 text-light">
            <div className="blocks one mb-5">
                <div className="block p-5 mw-xl">
                    <h2 className="h2 accent animate__animated animate__fadeInDown">{data.Title}</h2>
                    {data.Text && <div className="markdown" dangerouslySetInnerHTML={{ __html: marked(data.Text) }} />}
                    {data.Price_item.length > 0 && (
                        <ul className="split-list mb-3">
                            {data.Price_item.map((item, index) => (
                                <li key={index}>
                                    <h4>{item.Price_label}</h4> <span>{item.Price_amount}</span>
                                </li>
                            ))}
                        </ul>
                    )}

                    {data.Secondary_text && <div className="markdown mb-2" dangerouslySetInnerHTML={{ __html: marked(data.Secondary_text) }} />}

                    {data.Download_item.length > 0 &&
                        data.Download_item.map((item, index) => (
                            <Link href={`${item.File.url}`} passHref key={index}>
                                <a className="btn light lg mr-2">{item.Button_name}</a>
                            </Link>
                        ))}

                    {data.Button_visible && data.Button_url && (
                        <a href={data.Button_url} className="btn light mt-3 mr-2">
                            {data.Button_text}
                        </a>
                    )}
                </div>
            </div>
        </section>
    )
}
