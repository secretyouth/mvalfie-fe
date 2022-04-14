import api from '../helpers/api'

const BoatsSitemap = () => {};

// This also gets called at build time
export async function getServerSideProps({ res }) {
    const allVisibleBoats = await api.get(`boats?Visible=true`)

    const boats = allVisibleBoats.data.map((boat) => ({
        url: `${process.env.BASE_URL}/boats/${boat.Page_slug}`
    }))

    // return all boats as sitemap.xml
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${boats
        .map((boat) => {
          return `
            <url>
              <loc>${boat.url}</loc>
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

export default BoatsSitemap;