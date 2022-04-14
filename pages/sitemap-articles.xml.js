import api from '../helpers/api'

const ArticlesSitemap = () => {};

// This also gets called at build time
export async function getServerSideProps({ res }) {
    const AllPublishedArticles = await api.get(`articles?Status=published`)

    const articles = AllPublishedArticles.data.map((article) => ({
        url: `${process.env.BASE_URL}/articles/${article.slug}`
    }))

    // return all boats as sitemap.xml
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${articles
        .map((article) => {
          return `
            <url>
              <loc>${article.url}</loc>
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

export default ArticlesSitemap;