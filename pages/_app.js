import React from 'react'
import Router from 'next/router'

import * as gtag from '../components/ga'

// Notice how we track pageview when route is changed
Router.events.on('routeChangeComplete', (url) => gtag.pageview(url))
import '@brainhubeu/react-carousel/lib/style.css'
import '../styles/main.scss'
import { HubspotProvider } from '@aaronhayes/react-use-hubspot-form';

function MyApp({ Component, pageProps }) {
    return (
        <HubspotProvider>
            <Component {...pageProps} />
        </HubspotProvider>
    )
}

export default MyApp
