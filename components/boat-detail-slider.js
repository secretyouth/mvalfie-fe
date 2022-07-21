import React, { useEffect, useState } from 'react'
import marked from 'marked'
import BoatsCarouselComponent from './boat-carousel'
import QuickViewModal from './quick-view-modal'
import $ from 'jquery'
import BoatDetails from './boat-details'

export default function BoatDetailsSlider({ data, interestPopUp, intresetPopUpData }) {
    //console.log('boat-detail', data);
    const [overlayModal, showOverlayModal] = useState(false)
    //const [overlayInterestModal, showOverlayInterestModal] = useState(false)
    //const [modalData, setModalData] = useState({ modalFor: 'quick_view' })
    const [modalData, setModalData] = useState()

    const showModal = (data) => {
        if (data === undefined) {
            data = null
        }

        if (data != null) {
            $('body').addClass('modal-open')
        } else {
            $('body').removeClass('modal-open')
        }

        setModalData(data ? data : {})

        showOverlayModal(!overlayModal)
        //showOverlayInterestModal(!overlayInterestModal)
    }

    return (
        <>
            {modalData && <QuickViewModal overlay showForm={overlayModal} data={modalData} closeForm={showModal} />}

            <section className="block-container fluid flex-column pt-5 pb-5 text-light description-wrapper about-wrapper become-owner-section">
                <div className="blocks one">
                    <div className="block content-block">
                        <div className="mw-xl">
                            {data.Title && <h2 className="h2 accent animate__animated animate__fadeInDown">{data.Title}</h2>}
                            {data.Paragraphs &&
                                data.Paragraphs.map((paragraph, index) => {
                                    return (
                                        paragraph.Content2 && (
                                            <div
                                                className="mb-4 markdown content-p"
                                                dangerouslySetInnerHTML={{ __html: marked(paragraph.Content2) }}
                                                key={index}
                                            />
                                        )
                                    )
                                })}
                        </div>
                        {data.boats && <BoatsCarouselComponent data={data} quick_view={showModal} />}

                        <div className="flex justify-content-between align-items-center mt-4 boat-slider-btns">
                            {data.Button1_text && (
                                <a
                                    href={data.Button1_url ? data.Button1_url : 'javascript:void(0)'}
                                    className="btn secondary"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        interestPopUp({ ...intresetPopUpData, modalFor: 'IntrestPopUp' })
                                    }}
                                >
                                    {data.Button1_text}
                                </a>
                            )}
                            {data.Button2_text && (
                                <a href={data.Button2_url ? data.Button2_url : 'javascript:void(0)'} className="btn secondary">
                                    {data.Button2_text}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
