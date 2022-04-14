import React, { useEffect } from 'react'
import $ from 'jquery'
import marked from 'marked'

export default function FAQ({ data }) {
    useEffect(() => {
        $('.faq li h3').on('click', (e) => {
            $(e.target).parent().toggleClass('expanded')
        })
    }, [])

    if (data.Single_faq.length < 1) return <div />

    return (
        <section className="block-container fluid flex-column pt-5 pb-5 text-light">
            <div className="blocks one mb-5">
                <div className="block p-5 mw-xl">
                    <h2 className="h2 accent animate__animated animate__fadeInDown">FAQ</h2>
                    <ul className="faq">
                        { data.Single_faq.map((faq, index) => (
                            <li key={index}>
                                <h3>{faq.Title}</h3>
                                <div className="markdown" dangerouslySetInnerHTML={{ __html: marked(faq.Content) }} />
                            </li>
                        ))}           
                    </ul>
                </div>
            </div>
        </section>
    )
}
