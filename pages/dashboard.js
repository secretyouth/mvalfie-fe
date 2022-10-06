import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import $ from 'jquery'

import { Calendar, dateFnsLocalizer } from 'react-big-calendar'

import PublicGcal from 'public-gcal-fetch'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import startOfDay from 'date-fns/startOfDay'

const locales = {
    'en-US': require('date-fns/locale/en-US'),
}
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

import st from '../styles/main.module.scss'

import Nav from '../components/nav'
import Footer from '../components/footer'
import Slider from '../components/slider'
import Contact from '../components/contact'
import Modal from '../components/modal'
import Loader from '../components/loader'

import api, { getUser, logout } from '../helpers/api'

import PricingComponent from '../components/pricing'
import TextComponent from '../components/text'
import DynamicFormComponent from '../components/dynamic-form'
import ContactComponent from '../components/contact-form'
import SimpleContactComponent from '../components/simple-contact-form'
import SliderComponent from '../components/slider-component'
import BoatsComponent from '../components/boats'

export default function Home() {
    const [page, setPage] = useState(false)
    const [user, setUser] = useState({})
    const [boat, setBoat] = useState({})
    const [bookings, loadBookings] = useState([])
    const [bookingForm, showBookingForm] = useState(false)
    const [overlayModal, showOverlayModal] = useState(false)
    const [modalData, setModalData] = useState({})
    const [loaded, setLoaded] = useState(false)
    const router = useRouter()

    useEffect(() => {
        async function getPageContent() {
            const pageContent = await api.get(`dashboard`)
            setPage(pageContent.data)
        }

        const gatherData = async () => {
            try {
                const user = await getUser(true)

                if (!user) {
                    router.replace('/login')
                } else {
                    setUser(user)
                    getPageContent()

                    async function setUpCal() {
                        const { data: boatObject } = await api.get(`boats/${user.boats[0]}`)
                        setBoat(boatObject)

                        const gcal = new PublicGcal({
                            API_key: 'AIzaSyCqWNCko3Zx4PYZwMVGS2YnVqJOECwq-J4',
                            calendarId: boatObject.Google_calendar_url,
                        })

                        // const cal = await gcal.getEvents({ singleEvents: true, timeMin: startOfDay(new Date()).toISOString() })
                        const cal = await gcal.getEvents({ singleEvents: true })

                        const prettyFormat = cal.map((event) => {
                            if (event.start.date) return {}
                            if (event.visibility === 'private') return {}
                            return {
                                ...event,
                                title: `${event.summary}`,
                                start: event.start.dateTime,
                                end: event.end.dateTime,
                                resource: {},
                            }
                        })

                        // setLoaded
                        loadBookings(prettyFormat)
                        setLoaded(true)
                    }
                    setUpCal()
                }
            } catch (err) {}
        }
        gatherData()
    }, [router])

    const showForm = () => {
        if (!bookingForm) {
            $('body').addClass('modal-open')
        } else {
            $('body').removeClass('modal-open')
        }
        showBookingForm(!bookingForm)
    }

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
    }

    if (!user.firstname) return <div />

    return (
        <div className={st.container} id="top">
            <Head>
                <title key="title">Owner Dashboard | {process.env.Title || 'MV Alfie'}</title>
                <meta property="og:url" content="https://www.mvalfieandco.com.au/dashboard" key="url" />
            </Head>

            <Nav />

            {page.HeroBanner && <section className="hero-image" style={{ backgroundImage: `url(${page.HeroBanner.url})` }}></section>}
            {page.Content &&
                page.Content.length > 0 &&
                page.Content.map((content, index) => {
                    switch (content.__component) {
                        case 'single.dynamic-forms': {
                            return (
                                <DynamicFormComponent
                                    key={index}
                                    overlay
                                    data={content}
                                    showForm={bookingForm}
                                    closeForm={showForm}
                                    user={user}
                                    boat={boat.Boat_name}
                                    hubspotHide
                                />
                            )
                        }
                        default:
                            return <div key={index} />
                    }
                })}

            {modalData && <Modal overlay showForm={overlayModal} data={modalData} closeForm={showModal} />}

            <section className="block-container fluid flex-column pt-5 pb-5 text-light">
                <div className="blocks one mb-5">
                    <div className="block p-5 mw-xxl">
                        <h2 className="h2 accent">Welcome back, {user.firstname}</h2>

                        <p className="mb-0">
                            You have <strong>{user.daysLeft}</strong> allocations left this year.
                        </p>
                        <button className="btn light mt-3 mb-3" onClick={showForm}>
                            Request Booking
                        </button>

                        {page.Content &&
                            page.Content.length > 0 &&
                            page.Content.map((content, index) => {
                                switch (content.__component) {
                                    case 'single.content-block':
                                        return <TextComponent data={content} key={index} />
                                    case 'single.slider':
                                        return <SliderComponent data={content} key={index} />
                                    case 'single.pricing-table':
                                        return <PricingComponent data={content} key={index} />
                                    case 'single.boats':
                                        return <BoatsComponent data={content} key={index} />
                                    case 'single.contact-form': {
                                        switch (content.Form_type) {
                                            case 'Simple': {
                                                return (
                                                    <section
                                                        className="block-container fluid flex-column contact-bg pt-10 pb-10"
                                                        style={{
                                                            backgroundImage: content.Background_image
                                                                ? `url(${content.Background_image.url})`
                                                                : undefined,
                                                        }}
                                                        id="contactForm"
                                                        key={index}
                                                    >
                                                        <div className="blocks one" id="booking">
                                                            <div className="block primary p-5 mw-lg w-100 relative">
                                                                <SimpleContactComponent data={content} general />
                                                            </div>
                                                        </div>
                                                    </section>
                                                )
                                            }
                                            default: {
                                                return (
                                                    page.Charter && (
                                                        <section
                                                            className="block-container fluid flex-column contact-bg pt-10 pb-10"
                                                            style={{
                                                                backgroundImage: content.Background_image
                                                                    ? `url(${content.Background_image.url})`
                                                                    : undefined,
                                                            }}
                                                            id="contactForm"
                                                            key={index}
                                                        >
                                                            <div className="blocks one" id="booking">
                                                                <div className="block primary p-5 mw-lg w-100 relative">
                                                                    <ContactComponent data={content} general />
                                                                </div>
                                                            </div>
                                                        </section>
                                                    )
                                                )
                                            }
                                        }
                                    }
                                    case 'single.boat-calendar': {
                                        return (
                                            <div className="calendar" key={index}>
                                                {loaded ? (
                                                    <Calendar
                                                        localizer={localizer}
                                                        events={bookings}
                                                        startAccessor="start"
                                                        endAccessor="end"
                                                        style={{ minHeight: '600px' }}
                                                        components={{
                                                            event: ({ event }) => {
                                                                const startDate = new Date(event.start)
                                                                const endDate = new Date(event.end)
                                                                return (
                                                                    <div
                                                                        onClick={() =>
                                                                            showModal({
                                                                                title: event.title,
                                                                                date: `${format(startDate, 'dd/MM')} - ${format(endDate, 'dd/MM')}`,
                                                                                startTime: `${format(startDate, 'h:mm aaa')}`,
                                                                                endTime: `${format(endDate, 'h:mm aaa')}`,
                                                                                // status: event.status,
                                                                            })
                                                                        }
                                                                    >
                                                                        {event.title}
                                                                    </div>
                                                                )
                                                            },
                                                            toolbar: ({ onNavigate, label, views }) => {
                                                                return (
                                                                    <div className="flex justify-content-between align-items-center mb-2">
                                                                        <h3 className="mb-0">
                                                                            <strong>{boat.Boat_name}</strong> - {label}
                                                                        </h3>
                                                                        <div className="arrows">
                                                                            <i
                                                                                className="budicon-calendar-tick md"
                                                                                onClick={() => onNavigate('TODAY')}
                                                                            />
                                                                            <i
                                                                                className="budicon-chevron-left md"
                                                                                onClick={() => onNavigate('PREV')}
                                                                            />
                                                                            <i
                                                                                className="budicon-chevron-right md"
                                                                                onClick={() => onNavigate('NEXT')}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )
                                                            },
                                                        }}
                                                    />
                                                ) : (
                                                    <Loader />
                                                )}
                                            </div>
                                        )
                                    }

                                    default:
                                        return <div key={index} />
                                }
                            })}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}
