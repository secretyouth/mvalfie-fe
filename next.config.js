const withVideos = require('next-videos')

module.exports = withVideos()

module.exports = {
    async rewrites() {
        return [
            {
                destination: '/luxury_charter_hires/:slug', // Matched parameters can be used in the destination
                source: '/luxury-bareboat-hire-:slug',
            },
            {
                source: '/boat-syndicate-sydney-gold-coast',
                destination: '/boat-syndicatation', // Matched parameters can be used in the destination
            },
            {
                source: '/become-an-owner',
                destination: '/boat-syndicatation', // Matched parameters can be used in the destination
            },
        ]
    },
    async redirects() {
        return [
            {
                source: '/become-an-owner',
                destination: '/boat-syndicatation',
                permanent: true,
            },
            {
                source: '/boat-syndicate-sydney-gold-coast',
                destination: '/boat-syndicatation',
                permanent: true,
            },
            {
                source: '/luxury_charter_hires/:slug',
                destination: '/luxury-bareboat-hire-:slug',
                permanent: true,
            },
            // {
            //   source: '/articles',
            //   destination: '/insights',
            //   permanent: true,
            // },
            {
                source: '/boats/awol',
                destination: '/',
                permanent: true,
            },
            {
                source: '/boats/alfie',
                destination: '/',
                permanent: true,
            },
            {
                source: '/rates',
                destination: '/',
                permanent: true,
            },
            {
                source: '/dashboard-new',
                destination: '/',
                permanent: true,
            },
        ]
    },
    env: {
        Title: 'MV Alfie & Co',
        API_URL: 'https://alfie-cms.herokuapp.com/',
        // BASE_URL: 'https://alfie-fe-prod.herokuapp.com',
        BASE_URL: 'https://www.mvalfieandco.com.au',
    },
}
