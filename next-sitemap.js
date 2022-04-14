module.exports = {
    siteUrl: process.env.BASE_URL,
    changefreq: 'weekly',
    priority: 0.7,
    sitemapSize: 5000,
    generateRobotsTxt: true,
    exclude: ['/sitemap-boats.xml', '/sitemap-pages.xml', '/sitemap-articles.xml'],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
            {
                userAgent: 'black-listed-bot',
                disallow: ['/dashboard', '/login', '/reset-password'],
            },
        ],
        additionalSitemaps: [
            `${process.env.BASE_URL}/sitemap-boats.xml`,
            `${process.env.BASE_URL}/sitemap-pages.xml`,
            `${process.env.BASE_URL}/sitemap-articles.xml`,
        ],
    },
  }