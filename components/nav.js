import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import $ from 'jquery'

import api, { getUser, logout } from '../helpers/api'
import { useHubspotForm } from '@aaronhayes/react-use-hubspot-form'
import HubSpotFormModalNav from './hubspot-form2'

export default function Nav() {
    const [navItems, setNavItems] = useState([])
    const [charterHireItems, setCharterHireItems] = useState([])
    const [openedMenu, setMenu] = useState(false)
    const [user, setUser] = useState({})
    const [modalData, setModalData] = useState({})
    const [overlayModal, showOverlayModal] = useState(false)

    const { loaded, error, formCreated } = useHubspotForm({
        portalId: '9041877',
        formId: '59a74f48-e3cf-4448-af2e-4096b67a5941',
        target: '#my-hubspot-form-nav',
    })

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

    const router = useRouter()

    const toggleMenu = () => {
        setMenu(!openedMenu)

        if (!openedMenu) {
            $('body').addClass('nav-active')
            animateMenuIn()
        } else {
            $('body').removeClass('nav-active')
            animateMenuOut()
        }
    }

    useEffect(() => {
        // set listener to always close the nav if they click on a menu item.
        $('.nav-curtain').on('click', toggleMenu)

        $('.nav-wrapper li a').on('click', function (e) {
            //e.preventDefault();
            e.stopImmediatePropagation()
            var thisLink = $(this)
            var subMenu = thisLink.siblings('ul')
            if (subMenu.length > 0) {
                subMenu.slideToggle()
                return false
            } else {
                $('body').removeClass('nav-active')
                setMenu(false)
                if (thisLink.hasClass('openmodal')) {
                    showModal({
                        loaded: loaded,
                        error: error,
                        formCreated: formCreated,
                        FormName: 'Request Booking',
                    })
                }
            }
        })

        //let openmodal = document.querySelector('.nav-wrapper li.openmodal a');
        //openmodal.addEventListener('click', function (e) {
        //    //e.preventDefault();
        //    showModal({
        //        loaded: loaded,
        //        error: error,
        //        formCreated: formCreated,
        //        FormName: 'Request Booking'
        //    });
        //});

        $('.nav-wrapper .nested li a').on('click', toggleMenu)

        async function getBoats() {
            const { data: boats } = await api.get(`boats`)
            //console.log(boats)
            setNavItems(boats)
        }

        async function getCharterHires() {
            const { data: charters } = await api.get(`luxury-charter-hires`)
            //console.log(boats)
            setCharterHireItems(charters)
        }

        getBoats()
        getCharterHires()

        const grabUser = async () => {
            setUser(await getUser())
        }

        grabUser()

        navItems && charterHireItems
        {
            $('.nav-wrapper .nested li a').on('click', toggleMenu)
        }
    }, [])

    const animateMenuIn = () => {
        // when we open the nav, add classes to each item moving down, so they slide in from top the bottom
        // $('.nav-wrapper ul li a').each((item) => {
        //     console.log('====================================')
        //     console.log(item)
        //     console.log('====================================')
        // })
        const menuItems = document.querySelectorAll('.nav-wrapper li')

        for (let i = 0; i < menuItems.length; i++) {
            const list = ['visible', 'animate__fadeInRight']
            setTimeout(() => {
                menuItems[i].classList.add(...list)
            }, i * 100)
        }
    }

    const animateMenuOut = () => {
        const menuItems = document.querySelectorAll('.nav-wrapper li')

        for (let i = 0; i < menuItems.length; i++) {
            menuItems[i].className = 'animate__animated'
        }
    }

    const dashboardRedirect = (e) => {
        $('body').removeClass('nav-active')
        setMenu(false)

        if (!user) {
            router.push('/login')
        } else {
            router.push('/dashboard')
        }
    }

    const signout = (e) => {
        // logout
        logout()
        $('body').removeClass('nav-active')
        router.push('/login')
        setUser({})
    }

    Router.events.on('routeChangeComplete', () => {
        $('body').removeClass('nav-active')
        setMenu(false)
    })

    const toggle = (e) => {
        e.preventDefault()
        $('body').removeClass('nav-active')
        setMenu(false)
        var subMenu = e.target.valueOf().nextSibling
        if (subMenu.classList.contains('active')) {
            subMenu.classList.remove('active')
        } else {
            subMenu.classList.add('active')
        }
    }

    return (
        <>
            {modalData && <HubSpotFormModalNav overlay showForm={overlayModal} data={modalData} closeForm={showModal} />}

            <div className="nav-wrapper">
                <ul>
                    <li className="animate__animated">
                        <Link href="/" passHref>
                            <a>Home</a>
                        </Link>
                    </li>

                    <li className="animate__animated">
                        <Link href="/about_us" passHref>
                            <a>About Us</a>
                        </Link>
                    </li>
                    <li className="animate__animated">
                        <a className="nested-menu">Boats</a>

                        {navItems.length > 0 && (
                            <ul className="nested" style={{ display: 'none' }}>
                                {navItems.map((nav, index) => (
                                    <li className="animate__animated" key={index} style={{ display: nav.Visible ? 'block' : 'none' }}>
                                        <Link href={`/boats/${nav.Page_slug}`} passHref>
                                            <a>{nav.Boat_name}</a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {/* <ul className="nested" style={{ display: 'none' }}>
                            <li>
                                <a href="/boats/bruce">Bruce</a>
                            </li>
                            <li>
                                <Link href="/boats/v65princess">
                                    <a>G5</a>
                                </Link>
                            </li>
                        </ul> */}
                    </li>
                    <li className="animate__animated">
                        <a className="nested-menu">Luxury Bareboat Hire</a>

                        {charterHireItems.length > 0 && (
                            <ul className="nested" style={{ display: 'none' }}>
                                {charterHireItems.map((nav, index) => (
                                    <li className="animate__animated" key={index}>
                                        <Link href={`/luxury_charter_hires/${nav.Page_slug}`} passHref>
                                            <a>{nav.Hero_video_subtitle}</a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {/* <ul className="nested" style={{ display: 'none' }}>
                            <li>
                                <a href="/luxury-boat-charter-hire-sydney">Sydney</a>
                            </li>
                            <li>
                                <Link href="/luxury-boat-charter-hire-gold-coast">
                                    <a>Gold Coast</a>
                                </Link>
                            </li>
                            <li>
                                <a href="/luxury-boat-charter-hire-whitsundays">Whitsundays</a>
                            </li>
                        </ul> */}
                    </li>
                    <li className="animate__animated">
                        <Link href="/insights" passHref>
                            <a>Insights</a>
                        </Link>
                    </li>
                    <li className="animate__animated">
                        <Link href="/boat-syndicate-sydney-gold-coast" passHref>
                            <a>Become An Owner</a>
                        </Link>
                    </li>
                    <li className="animate__animated">
                        <Link href="/boat-membership-sydney-gold-coast" passHref>
                            <a>Become A Member</a>
                        </Link>
                    </li>
                    <li className="animate__animated">
                        <Link href="javascript:void(0)" passHref>
                            <a className="openmodal">Booking Inquiry</a>
                        </Link>
                    </li>
                    <li className="animate__animated">
                        <a className="openmodal">Contact</a>
                    </li>
                    {/*<li className="animate__animated">*/}
                    {/*    <Link href="/articles" passHref>*/}
                    {/*        <a>News &amp; Updates</a>*/}
                    {/*    </Link>*/}
                    {/*</li>*/}
                    {user && user.firstname && (
                        <>
                            <li className=" animate__animated">
                                <hr className="divider" />
                            </li>
                            <li className="animate__animated">
                                <Link href="/dashboard" passHref>
                                    <a>Owner Dashboard</a>
                                </Link>
                            </li>
                            <li className="animate__animated">
                                <a onClick={signout}>Logout</a>
                            </li>
                        </>
                    )}
                </ul>
            </div>
            <nav className="main-nav animate__animated animate__fadeIn animate__delay-1s">
                <div className="inner-container">
                    <Link href="/" passHref>
                        <a>
                            <svg className="logo" viewBox="0 0 2771 617" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g id="Alfie-co.dark" fill="#ffffff" fillRule="nonzero">
                                        <g id="logo-svg-h">
                                            <path
                                                d="M456.4,38.2449685 C471.6,46.7449685 488,57.6449685 500.3,67.3449685 C513.6,77.9449685 538.6,102.944969 548.6,115.644969 C586.6,163.844969 609.7,221.344969 615.1,281.544969 C616.7,299.344969 615.7,335.844969 613.1,352.644969 C605.5,402.844969 588,446.744969 559.7,486.544969 C530,528.444969 488.8,563.544969 443.8,585.444969 C410,601.844969 379.6,610.644969 341.5,615.144969 C332.2,616.244969 292.8,617.344969 287.5,616.544969 C285.9,616.344969 279.6,615.644969 273.5,615.044969 C207.8,608.544969 141.9,577.344969 93.1,529.744969 C42.7,480.444969 13.5,423.144969 2.4,351.644969 C0.2,337.844969 -0.6,293.944969 1,278.544969 C10,189.944969 54.4,112.344969 126.5,59.1449685 C221.3,-10.7550315 353.6,-19.1550315 456.4,38.2449685 Z M604,313.144969 L544.4,313.144969 L543.2,327.944969 C536.2,412.044969 484,486.944969 407.3,522.744969 C382.6,534.344969 353.4,542.144969 329.1,543.744969 C324.4,544.044969 319,544.444969 317.3,544.744969 L314,545.244969 L314,604.644969 L322.3,604.344969 C326.8,604.144969 335.9,603.344969 342.5,602.544969 C406.9,594.644969 465.7,566.944969 511.5,522.944969 C559,477.444969 589.5,420.144969 599.9,357.144969 C602.1,343.744969 604,325.644969 604,317.944969 L604,313.144969 Z M72,313.144969 L12,313.144969 L12,319.544969 C12,328.344969 13.7,344.344969 16.1,358.644969 C31.8,452.544969 93.7,534.244969 180.3,575.644969 C207.5,588.644969 236.9,597.544969 265.5,601.544969 C280.4,603.644969 282.1,603.844969 292.8,603.944969 L302,604.144969 L302,545.444969 L298.9,544.744969 C297.2,544.444969 293.6,544.144969 290.9,544.144969 C277.5,544.144969 248.2,538.044969 228.5,531.144969 C217,527.144969 196.1,517.044969 184.2,509.844969 C130.9,477.344969 91.1,421.844969 77.6,361.144969 C74.6,347.344969 72,328.444969 72,319.544969 L72,313.144969 Z M314,12.0449685 L314,71.9449685 L321.8,72.6449685 C337.1,73.8449685 352.7,76.4449685 366,79.7449685 C431.9,96.4449685 487.7,141.244969 518.4,202.044969 C532.5,229.944969 540.3,257.044969 543.1,287.944969 L544.3,301.144969 L604.3,301.144969 L603.6,290.944969 C600,237.144969 582.9,187.044969 552.9,142.644969 C541.5,125.644969 531.3,113.644969 514.4,97.1449685 C488.6,72.0449685 466,56.1449685 435.7,41.6449685 C399.6,24.5449685 364.4,15.4449685 323.3,12.6449685 L314,12.0449685 Z M301.5,12.6449685 L292.5,12.9449685 C265.8,13.8449685 232.7,20.6449685 205.1,30.7449685 C191.2,35.8449685 163.3,49.7449685 150.1,58.0449685 C93.1,94.1449685 49.9,148.644969 27.9,212.144969 C19.7,235.544969 13.9,265.144969 12.4,289.944969 L11.7,301.144969 L71.6,301.144969 L72.8,287.444969 C79.1,216.144969 117.5,151.844969 178,111.444969 C210.5,89.8449685 247.7,76.9449685 288.8,73.1449685 L302,71.8449685 L301.8,42.2449685 L301.5,12.6449685 Z M214.3,105.144969 C189.2,116.944969 168.7,131.344969 149.5,150.544969 C105,195.144969 82.2,253.444969 84.3,316.644969 C85.4,349.844969 92.7,378.644969 107.3,408.144969 C136.7,467.344969 191.2,510.844969 255.5,526.144969 C283.7,532.844969 305.6,534.044969 335.9,530.544969 C382.8,525.044969 427.6,503.544969 462.8,469.744969 C489.9,443.544969 508.5,413.744969 521.1,376.244969 C528.5,353.844969 531.2,336.944969 531.40715,310.644969 C531.5,284.344969 529.6,269.544969 522.8,246.144969 C506.1,188.044969 463.8,136.944969 409.4,109.144969 C348.5,77.9449685 275.7,76.4449685 214.3,105.144969 Z M313,143.144969 C314.772727,144.917696 314.993572,146.399446 314.999857,156.09177 L315,167.944969 L322.8,168.644969 C348,170.844969 378.2,182.144969 399.5,197.244969 C410.9,205.344969 427,221.244969 434.8,231.944969 L440.8,240.244969 L441.5,234.444969 C442.8,221.544969 445.6,217.544969 451.8,219.744969 C456.8,221.544969 457,223.544969 454.1,248.644969 C451.7,269.744969 451.3,271.644969 449.5,271.944969 C448.4,272.044969 438.3,268.444969 427.1,263.844969 C404.6,254.744969 401.7,252.644969 403.6,247.444969 C404.1,245.944969 405.7,244.044969 407.2,243.244969 C409.7,241.844969 410.4,241.944969 419.1,245.444969 C424.2,247.444969 428.5,248.944969 428.7,248.744969 C428.9,248.644969 426.8,245.344969 424.1,241.544969 C404.3,213.244969 369.1,190.944969 334.8,184.744969 C330.3,183.944969 323.9,182.944969 320.8,182.544969 L315,181.944969 L315,348.044969 L337,348.344969 C356.1,348.644969 359.2,348.844969 360.6,350.344969 C362.9,352.544969 362.8,357.644969 360.5,360.144969 C358.868,361.968969 357.60464,362.134089 339.192147,362.14438 L315,362.144969 L315,401.744969 L321.6,404.544969 C329.8,408.144969 337.2,415.144969 340.8,422.844969 C343.1,427.844969 343.5,429.944969 343.5,437.644969 C343.4,445.244969 343,447.544969 340.8,452.144969 C337,460.244969 331.9,465.544969 324.2,469.344969 C318.5,472.144969 316.4,472.644969 309,472.844969 C303.7,473.044969 298.8,472.544969 296,471.644969 C293.5,470.844969 289.3,468.444969 286.6,466.444969 C272.5,455.644969 268.2,437.444969 275.9,421.644969 C279.8,413.844969 285.7,408.344969 294.5,404.544969 L301,401.744969 L301,362.144969 L277.908446,362.144397 C260.16218,362.131709 257.937,361.896969 255.9,360.344969 C252.8,357.744969 252.8,352.544969 255.9,349.944969 L256.026374,349.850639 L256.150179,349.762295 C258.186212,348.344435 261.001111,348.148947 279.026083,348.14503 L301,348.144969 L301,182.044969 L294.8,182.644969 C254.7,186.544969 217.6,207.244969 193.8,238.844969 C190,244.044969 187,248.444969 187.2,248.644969 C187.4,248.944969 191.7,247.544969 196.6,245.544969 C204.1,242.544969 205.9,242.144969 208.3,243.044969 C212.1,244.544969 213.6,248.144969 212.1,251.944969 C211,254.644969 208.6,255.844969 189.5,263.644969 C177.7,268.444969 167.3,272.144969 166.3,271.944969 C164.8,271.644969 164.2,268.944969 162.3,252.644969 C159.4,227.644969 159.4,223.844969 162.2,221.144969 C166.3,217.344969 171.4,219.144969 172.9,224.944969 C173.5,226.944969 174.2,231.244969 174.5,234.444969 L175.2,240.244969 L181.2,232.044969 C192.9,216.044969 211.6,199.344969 229.2,189.044969 C246.4,178.944969 270.1,171.244969 290.8,168.944969 L301,167.744969 L301,156.644969 C301,146.844969 301.2,145.244969 303,143.344969 C305.6,140.544969 310.3,140.444969 313,143.144969 Z M307.9,415.944969 C285.2,415.944969 277.9,446.144969 298,456.944969 C301.8,458.944969 303.6,459.244969 309.2,458.944969 C314.7,458.644969 316.7,458.044969 320.2,455.544969 C328.7,449.644969 332,438.544969 328.1,429.544969 C324,420.244969 317.5,415.944969 307.9,415.944969 Z M1928,153.144969 L1928,459.144969 L1896,459.144969 L1896,153.144969 L1928,153.144969 Z M2309,153.144969 L2309,181.2829 L2126.36585,181.2829 L2126.36585,295.593245 L2284.41463,295.593245 L2284.41463,321.972555 L2126.36585,321.972555 L2126.36585,431.007038 L2303.73171,431.007038 L2303.73171,459.144969 L2093,459.144969 L2093,153.144969 L2309,153.144969 Z M1586.40833,153.144969 L1586.40833,283.2829 L1744.65833,283.2829 L1744.65833,311.420831 L1586.40833,311.420831 L1586.40833,431.007038 L1764,431.007038 L1764,459.144969 L1553,459.144969 L1553,153.144969 L1586.40833,153.144969 Z M1433,153.144969 L1433,181.2829 L1262.61739,181.2829 L1262.61739,459.144969 L1231,459.144969 L1231,153.144969 L1433,153.144969 Z M836.182828,153.144969 L852.70398,190.641197 C861.84334,211.061678 870.279673,229.721773 871.685729,232.010275 L874.146326,235.883125 L958.685411,235.531048 L1043.2245,235.002932 L1061.32746,194.514047 L1079.43043,154.025162 L1096.30309,153.497046 C1105.44245,153.321008 1113,153.497046 1113,153.849124 C1113,154.377239 1081.89102,223.208344 1043.75177,306.650655 L974.503536,458.571992 L958.685411,459.100108 C949.897565,459.276147 942.340016,458.92407 941.988503,458.219915 C940.055176,455.05122 805.073851,159.130282 804.195066,156.313664 C803.334216,153.554528 804.834555,153.160366 818.774163,153.144969 L836.182828,153.144969 Z M958.484566,260.528533 L957.279356,260.528533 C915.097692,260.528533 884.515985,261.232688 884.867499,262.112881 C891.018992,278.660512 957.63087,423.892382 958.509654,423.012189 C959.212682,422.308035 975.733834,386.044077 995.067097,342.562535 C1014.57612,299.080993 1030.39424,262.817036 1030.39424,262.112881 C1030.39424,261.24149 998.181738,260.542634 958.484566,260.528533 Z M2510.56898,154.144969 L2518,162.689323 L2499.89343,181.350614 C2505.0873,189.488718 2508.84206,199.238718 2511.14462,210.600614 L2511.14462,210.600614 L2500.62607,213.903033 C2498.80756,204.428234 2495.9686,196.250814 2492.0961,189.370775 L2492.0961,189.370775 L2457.29591,225.330452 C2467.68363,231.371782 2474.99691,236.888918 2479.22265,241.894969 C2483.4353,246.927227 2485.55471,252.601621 2485.55471,258.931259 C2485.55471,266.794162 2482.88582,272.953435 2477.54805,277.435291 C2472.23644,281.90404 2465.06708,284.144969 2456.03996,284.144969 C2446.22788,284.144969 2438.43054,281.655048 2432.64795,276.70142 C2426.85228,271.734685 2423.96099,265.19537 2423.96099,257.096581 C2423.96099,252.129847 2425.08611,247.425212 2427.36251,242.995775 C2429.66508,238.592549 2433.82541,233.245775 2439.86965,226.955452 C2428.27831,220.271986 2420.06232,213.916137 2415.22169,207.874807 C2410.40723,201.820373 2408,194.99275 2408,187.37884 C2408,181.088517 2409.80542,175.479646 2413.44244,170.552227 C2417.06636,165.651019 2422.10324,161.850614 2428.56613,159.124807 C2435.01594,156.399001 2442.35537,155.036098 2450.59753,155.036098 C2468.10228,155.036098 2482.23168,160.776015 2492.98573,172.282065 L2492.98573,172.282065 L2510.56898,154.144969 Z M2451.1084,231.144969 C2445.50881,236.968053 2441.75,241.59227 2439.83198,245.004442 C2437.9397,248.403439 2437,251.986877 2437,255.754755 C2437,260.984993 2438.75068,265.187629 2442.25203,268.349485 C2445.77913,271.53769 2450.64499,273.144969 2456.82385,273.144969 C2462.51355,273.144969 2466.96748,271.695786 2470.15989,268.823764 C2473.37805,265.978093 2475,262.10482 2475,257.230288 C2475,252.724644 2473.26219,248.587879 2469.79946,244.793651 C2466.36247,241.025773 2460.13211,236.480601 2451.1084,231.144969 Z M2722.60464,155.144969 C2731.7736,155.144969 2740.04005,157.234015 2747.40399,161.385659 C2754.79409,165.550528 2760.5623,171.354897 2764.72168,178.785551 C2768.90723,186.229427 2771,194.651714 2771,204.065638 C2771,213.479561 2768.90723,221.915069 2764.72168,229.345724 C2760.5623,236.7896 2754.79409,242.620414 2747.40399,246.851391 C2740.04005,251.055925 2731.7736,253.144969 2722.60464,253.144969 C2713.39644,253.144969 2705.10383,251.055925 2697.75297,246.851391 C2690.38902,242.620414 2684.58158,236.7896 2680.33064,229.345724 C2676.10585,221.915069 2674,213.479561 2674,204.065638 C2674,194.651714 2676.10585,186.229427 2680.33064,178.785551 C2684.58158,171.354897 2690.38902,165.550528 2697.75297,161.385659 C2705.10383,157.234015 2713.39644,155.144969 2722.60464,155.144969 Z M2618.85299,154.144969 C2627.03418,154.144969 2634.33092,155.771251 2640.7562,159.010592 C2647.16848,162.263157 2652.25408,166.98334 2656,173.184364 L2646.4271,179.795265 C2643.30551,175.035416 2639.32547,171.478752 2634.51301,169.112049 C2629.72656,166.718904 2624.49788,165.515719 2618.85299,165.515719 C2612.01149,165.515719 2605.85935,167.089114 2600.38355,170.22268 C2594.89474,173.329805 2590.62856,177.759106 2587.585,183.49737 C2584.52843,189.209189 2583.00665,195.740757 2583.00665,203.065638 C2583.00665,210.509513 2584.52843,217.067527 2587.585,222.73968 C2590.62856,228.425053 2594.89474,232.827916 2600.38355,235.961482 C2605.85935,239.068607 2612.01149,240.615557 2618.85299,240.615557 C2624.49788,240.615557 2629.72656,239.452038 2634.51301,237.125001 C2639.32547,234.797964 2643.30551,231.254521 2646.4271,226.494672 L2656,233.105573 C2652.25408,239.346264 2647.12946,244.092892 2640.65215,247.332232 C2634.16183,250.545131 2626.89111,252.144969 2618.85299,252.144969 C2609.4882,252.144969 2601.11192,250.082367 2593.72414,245.957165 C2586.33636,241.805521 2580.52238,235.961482 2576.29522,228.451498 C2572.09407,220.941515 2570,212.479561 2570,203.065638 C2570,193.651714 2572.09407,185.229427 2576.29522,177.785551 C2580.52238,170.354897 2586.33636,164.550528 2593.72414,160.385659 C2601.11192,156.234015 2609.4882,154.144969 2618.85299,154.144969 Z M2722.60487,165.144969 C2715.81425,165.144969 2709.71843,166.716272 2704.30428,169.845673 C2698.91636,172.948667 2694.68205,177.37208 2691.61448,183.102715 C2688.53379,188.80694 2687,195.329826 2687,202.644969 C2687,209.973314 2688.53379,216.509407 2691.61448,222.240039 C2694.68205,227.944264 2698.91636,232.367681 2704.30428,235.497081 C2709.71843,238.600075 2715.81425,240.144969 2722.60487,240.144969 C2729.38238,240.144969 2735.4651,238.600075 2740.85303,235.497081 C2746.22784,232.367681 2750.42282,227.944264 2753.43796,222.240039 C2756.47932,216.509407 2758,209.973314 2758,202.644969 C2758,195.329826 2756.47932,188.80694 2753.43796,183.102715 C2750.42282,177.37208 2746.22784,172.948667 2740.85303,169.845673 C2735.4651,166.716272 2729.38238,165.144969 2722.60487,165.144969 Z M2451.79224,165.144969 C2442.54406,165.144969 2435.09559,167.225946 2429.45998,171.414237 C2423.81124,175.628871 2421,181.186918 2421,188.114725 C2421,193.830821 2422.90481,198.993747 2426.72757,203.603505 C2430.53719,208.239603 2437.4996,213.415699 2447.58852,219.144969 L2447.58852,219.144969 L2486,179.527408 C2477.23787,169.939115 2465.83529,165.144969 2451.79224,165.144969 Z"
                                                id="Shape"
                                                transform="translate(1385.579232, 308.572484) scale(-1, 1) rotate(-180.000000) translate(-1385.579232, -308.572484) "
                                            ></path>
                                        </g>
                                    </g>
                                </g>
                            </svg>

                            {/* <svg className="logo" viewBox="0 0 2309 617" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g id="Alfie-Dark" fill="#fff" fillRule="nonzero">
                                        <g
                                            id="Group"
                                            transform="translate(1154.600000, 308.500000) scale(-1, 1) rotate(-180.000000) translate(-1154.600000, -308.500000) translate(0.100000, -0.000000)"
                                        >
                                            <path
                                                d="M456.3,38.1 C471.5,46.6 487.9,57.5 500.2,67.2 C513.5,77.8 538.5,102.8 548.5,115.5 C586.5,163.7 609.6,221.2 615,281.4 C616.6,299.2 615.6,335.7 613,352.5 C605.4,402.7 587.9,446.6 559.6,486.4 C529.9,528.3 488.7,563.4 443.7,585.3 C409.9,601.7 379.5,610.5 341.4,615 C332.1,616.1 292.7,617.2 287.4,616.4 C285.8,616.2 279.5,615.5 273.4,614.9 C207.7,608.4 141.8,577.2 93,529.6 C42.6,480.3 13.4,423 2.3,351.5 C0.1,337.7 -0.7,293.8 0.9,278.4 C9.9,189.8 54.3,112.2 126.4,59 C221.2,-10.9 353.5,-19.3 456.3,38.1 Z M603.9,313 L544.3,313 L543.1,327.8 C536.1,411.9 483.9,486.8 407.2,522.6 C382.5,534.2 353.3,542 329,543.6 C324.3,543.9 318.9,544.3 317.2,544.6 L313.9,545.1 L313.9,604.5 L322.2,604.2 C326.7,604 335.8,603.2 342.4,602.4 C406.8,594.5 465.6,566.8 511.4,522.8 C558.9,477.3 589.4,420 599.8,357 C602,343.6 603.9,325.5 603.9,317.8 L603.9,313 Z M71.9,313 L11.9,313 L11.9,319.4 C11.9,328.2 13.6,344.2 16,358.5 C31.7,452.4 93.6,534.1 180.2,575.5 C207.4,588.5 236.8,597.4 265.4,601.4 C280.3,603.5 282,603.7 292.7,603.8 L301.9,604 L301.9,545.3 L298.8,544.6 C297.1,544.3 293.5,544 290.8,544 C277.4,544 248.1,537.9 228.4,531 C216.9,527 196,516.9 184.1,509.7 C130.8,477.2 91,421.7 77.5,361 C74.5,347.2 71.9,328.3 71.9,319.4 L71.9,313 Z M214.2,105 C189.1,116.8 168.6,131.2 149.4,150.4 C104.9,195 82.1,253.3 84.2,316.5 C85.3,349.7 92.6,378.5 107.2,408 C136.6,467.2 191.1,510.7 255.4,526 C283.6,532.7 305.5,533.9 335.8,530.4 C382.7,524.9 427.5,503.4 462.7,469.6 C489.8,443.4 508.4,413.6 521,376.1 C528.4,353.7 531.1,336.8 531.303706,310.5 C531.4,284.2 529.5,269.4 522.7,246 C506,187.9 463.7,136.8 409.3,109 C348.4,77.8 275.6,76.3 214.2,105 Z M312.9,143 C314.672727,144.772727 314.893572,146.254477 314.899857,155.946801 L314.9,167.8 L322.7,168.5 C347.9,170.7 378.1,182 399.4,197.1 C410.8,205.2 426.9,221.1 434.7,231.8 L440.7,240.1 L441.4,234.3 C442.7,221.4 445.5,217.4 451.7,219.6 C456.7,221.4 456.9,223.4 454,248.5 C451.6,269.6 451.2,271.5 449.4,271.8 C448.3,271.9 438.2,268.3 427,263.7 C404.5,254.6 401.6,252.5 403.5,247.3 C404,245.8 405.6,243.9 407.1,243.1 C409.6,241.7 410.3,241.8 419,245.3 C424.1,247.3 428.4,248.8 428.6,248.6 C428.8,248.5 426.7,245.2 424,241.4 C404.2,213.1 369,190.8 334.7,184.6 C330.2,183.8 323.8,182.8 320.7,182.4 L314.9,181.8 L314.9,347.9 L336.9,348.2 C356,348.5 359.1,348.7 360.5,350.2 C362.8,352.4 362.7,357.5 360.4,360 C358.768,361.824 357.50464,361.98912 339.092147,361.999411 L314.9,362 L314.9,401.6 L321.5,404.4 C329.7,408 337.1,415 340.7,422.7 C343,427.7 343.4,429.8 343.4,437.5 C343.3,445.1 342.9,447.4 340.7,452 C336.9,460.1 331.8,465.4 324.1,469.2 C318.4,472 316.3,472.5 308.9,472.7 C303.6,472.9 298.7,472.4 295.9,471.5 C293.4,470.7 289.2,468.3 286.5,466.3 C272.4,455.5 268.1,437.3 275.8,421.5 C279.7,413.7 285.6,408.2 294.4,404.4 L300.9,401.6 L300.9,362 L277.808446,361.999428 C260.06218,361.98674 257.837,361.752 255.8,360.2 C252.7,357.6 252.7,352.4 255.8,349.8 L255.926374,349.70567 C257.977653,348.207525 260.533254,348.004058 278.926083,348.000061 L300.9,348 L300.9,181.9 L294.7,182.5 C254.6,186.4 217.5,207.1 193.7,238.7 C189.9,243.9 186.9,248.3 187.1,248.5 C187.3,248.8 191.6,247.4 196.5,245.4 C204,242.4 205.8,242 208.2,242.9 C212,244.4 213.5,248 212,251.8 C210.9,254.5 208.5,255.7 189.4,263.5 C177.6,268.3 167.2,272 166.2,271.8 C164.7,271.5 164.1,268.8 162.2,252.5 C159.3,227.5 159.3,223.7 162.1,221 C166.2,217.2 171.3,219 172.8,224.8 C173.4,226.8 174.1,231.1 174.4,234.3 L175.1,240.1 L181.1,231.9 C192.8,215.9 211.5,199.2 229.1,188.9 C246.3,178.8 270,171.1 290.7,168.8 L300.9,167.6 L300.9,156.5 C300.9,146.7 301.1,145.1 302.9,143.2 C305.5,140.4 310.2,140.3 312.9,143 Z M1927.9,153 L1927.9,459 L1895.9,459 L1895.9,153 L1927.9,153 Z M2308.9,153 L2308.9,181.137931 L2126.26585,181.137931 L2126.26585,295.448276 L2284.31463,295.448276 L2284.31463,321.827586 L2126.26585,321.827586 L2126.26585,430.862069 L2303.63171,430.862069 L2303.63171,459 L2092.9,459 L2092.9,153 L2308.9,153 Z M1586.30833,153 L1586.30833,283.137931 L1744.55833,283.137931 L1744.55833,311.275862 L1586.30833,311.275862 L1586.30833,430.862069 L1763.9,430.862069 L1763.9,459 L1552.9,459 L1552.9,153 L1586.30833,153 Z M1432.9,153 L1432.9,181.137931 L1262.51739,181.137931 L1262.51739,459 L1230.9,459 L1230.9,153 L1432.9,153 Z M836.082828,153 L852.60398,190.496228 C861.74334,210.916709 870.179673,229.576804 871.585729,231.865306 L874.046326,235.738156 L958.585411,235.386079 L1043.1245,234.857963 L1061.22746,194.369078 L1079.33043,153.880193 L1096.20309,153.352077 C1105.34245,153.176039 1112.9,153.352077 1112.9,153.704155 C1112.9,154.23227 1081.79102,223.063375 1043.65177,306.505686 L974.403536,458.427023 L958.585411,458.955139 C949.797565,459.131178 942.240016,458.779101 941.888503,458.074946 C939.955176,454.906251 804.973851,158.985313 804.095066,156.168695 C803.234216,153.409559 804.734555,153.015397 818.674163,153.000458 L836.082828,153 Z M307.8,415.8 C285.1,415.8 277.8,446 297.9,456.8 C301.7,458.8 303.5,459.1 309.1,458.8 C314.6,458.5 316.6,457.9 320.1,455.4 C328.6,449.5 331.9,438.4 328,429.4 C323.9,420.1 317.4,415.8 307.8,415.8 Z M958.384566,260.383775 L957.179356,260.383564 C914.997692,260.383564 884.415985,261.087719 884.767499,261.967912 C890.918992,278.515543 957.53087,423.747413 958.409654,422.86722 C959.112682,422.163066 975.633834,385.899108 994.967097,342.417566 C1014.47612,298.936024 1030.29424,262.672067 1030.29424,261.967912 C1030.29424,261.096521 998.081738,260.397665 958.384566,260.383775 Z M313.9,11.9 L313.9,71.8 L321.7,72.5 C337,73.7 352.6,76.3 365.9,79.6 C431.8,96.3 487.6,141.1 518.3,201.9 C532.4,229.8 540.2,256.9 543,287.8 L544.2,301 L604.2,301 L603.5,290.8 C599.9,237 582.8,186.9 552.8,142.5 C541.4,125.5 531.2,113.5 514.3,97 C488.5,71.9 465.9,56 435.6,41.5 C399.5,24.4 364.3,15.3 323.2,12.5 L313.9,11.9 Z M301.4,12.5 L292.4,12.8 C265.7,13.7 232.6,20.5 205,30.6 C191.1,35.7 163.2,49.6 150,57.9 C93,94 49.8,148.5 27.8,212 C19.6,235.4 13.8,265 12.3,289.8 L11.6,301 L71.5,301 L72.7,287.3 C79,216 117.4,151.7 177.9,111.3 C210.4,89.7 247.6,76.8 288.7,73 L301.9,71.7 L301.7,42.1 L301.4,12.5 Z"
                                                id="Shape"
                                            ></path>
                                        </g>
                                    </g>
                                </g>
                            </svg> */}
                        </a>
                    </Link>
                </div>
            </nav>
            <div className="menu-icons animate__animated animate__fadeIn">
                <div className="inner-container">
                    <p className="header-number">
                        <a href="tel:0476000888">
                            <i className="budicon-phone-connection sm"></i>
                            <span className="header-number-text">+61 476 000 888</span>
                        </a>
                    </p>
                    <a onClick={dashboardRedirect}>
                        <i className="budicon-lock sm" />
                    </a>
                    <button className="animated-menu" aria-label="Main Menu" onClick={toggleMenu}>
                        <svg width="50" height="50" viewBox="0 0 100 100">
                            <path
                                className="line line1"
                                d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                            />
                            <path className="line line2" d="M 20,50 H 80" />
                            <path
                                className="line line3"
                                d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            {openedMenu && <div className="nav-curtain" />}
        </>
    )
}
