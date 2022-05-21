import Document, { Head, Html, Main, NextScript } from 'next/document'

import { GA_TRACKING_ID } from '../components/ga'

export default class CustomDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)

        return {
            ...initialProps,
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    <>
                        <title key="title">Sydney Harbour Luxury Private Charter Vessel | {process.env.Title || 'Alfie & Co'}</title>
                        <link rel="icon" href="/favicon.png" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />

                        <meta
                            name="description"
                            content="Alfie & Co offer private and luxurious vessels, to give our customers access to true exclusivity. Enjoy one of the most sophisticated boating experiences across the country."
                            key="description"
                        />
                        <meta
                            name="keywords"
                            content="Sydney Boat Hire, Sydney Charter Boat, Boat Hire Sydney Harbour, Self Drive Boat Hire Sydney, Sydney Private Boat Hire"
                            key="keywords"
                        />
                        <meta property="og:url" content="https://www.mvalfieandco.com.au/" key="og-url" />
                        <meta property="og:type" content="website" key="og-type" />
                        <meta property="og:title" content="Sydney Harbour Luxury Private Charter Vessel | Alfie & Co" key="og-title" />
                        <meta
                            property="og:description"
                            content="Alfie & Co offer private and luxurious vessels, to give our customers access to true exclusivity. Enjoy one of the most sophisticated boating experiences across the country."
                            key="og-description"
                        />
                        <meta property="og:image" content="https://www.mvalfieandco.com.au/fb-home.jpg" key="og-image" />

                        {/* Global Site Tag (gtag.js) - Google Analytics */}
                        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                    });
                  `,
                            }}
                        />
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                                <!-- Facebook Pixel Code -->
                                !function(f,b,e,v,n,t,s)
                                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                                n.queue=[];t=b.createElement(e);t.async=!0;
                                t.src=v;s=b.getElementsByTagName(e)[0];
                                s.parentNode.insertBefore(t,s)}(window, document,'script',
                                'https://connect.facebook.net/en_US/fbevents.js');
                                fbq('init', '2788041778108695');
                                fbq('track', 'PageView');
                                                `,
                            }}
                        />
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                                })(window,document,'script','dataLayer','GTM-MQZT2MT');
                                                `,
                            }}
                        />

                        <script type="text/javascript" id="hs-script-loader" async defer src="//js-na1.hs-scripts.com/9041877.js" />
                        <script charSet="utf-8" type="text/javascript" src="//js.hsforms.net/forms/shell.js" />

                        <meta name="facebook-domain-verification" content="0aiswji8ex440vg2qi24q36xnsllkh" />
                        <meta name="google-site-verification" content="y6iqp1nXdyhSw_cFwTegmDyeHKJgtftBPLrT6hitsj4" />
                    </>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
