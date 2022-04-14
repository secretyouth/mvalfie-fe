import api from '../helpers/api'

const LuxuryCharterHireSitemap = () => { };

// This also gets called at build time
export async function getServerSideProps({ res }) {
    const allPages = await api.get(`luxury-charter-hires`)

    const pages = allPages.data.map((page) => ({
        url: `${process.env.BASE_URL}/${page.Page_slug}`
    }))

    // return all boats as sitemap.xml
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
            .map((page) => {
                return `
            <url>
              <loc>${page.url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
            })
            .join("")}
    </urlset>
  `;

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default LuxuryCharterHireSitemap;