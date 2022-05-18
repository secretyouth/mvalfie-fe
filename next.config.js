const withVideos = require('next-videos')

module.exports = withVideos()

//module.exports = {
//}

module.exports = {
    async rewrites() {
        return [
            // {
            //     source: '/luxury-boat-charter-hire-:slug',
            //     destination: '/luxury_charter_hires/:slug', // Matched parameters can be used in the destination
            // },
            {
                source: '/luxury_charter_hires/:slug',
                destination: '/luxury-bareboat-hire-:slug', // Matched parameters can be used in the destination
            },
            // {
            //     source: '/boat-syndicate-sydney-gold-coast',
            //     destination: '/become-an-owner', // Matched parameters can be used in the destination
            // },
        ]
    },
    async redirects() {
        return [
            {
                source: '/become-an-owner',
                destination: '/boat-syndicate-sydney-gold-coast',
                permanent: true,
            },
            {
                source: '/luxury_charter_hires/:slug',
                destination: '/luxury-bareboat-hire-:slug',
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
