import React from 'react'
import marked from 'marked'

export default function CtaButtons({ data }) {
    return (
        <section className="block-container fluid flex-column pt-2 pb-5 text-light dark">
            <div className="blocks one">
                <div className="block pr-4 pl-4 mw-xl">
                    {data.buttons.length > 0 && (
                        <div className="flex justify-content-between text_component-buttons">
                            {data.buttons.map((button, indx) => (
                                <a href={button.button_url} className="btn">
                                    {button.button_text}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
