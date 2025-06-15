const { SitemapStream, streamToPromise } = require('sitemap');
const fs = require('fs');

const hostname = 'https://topgastro.store'; 

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/Retail', changefreq: 'weekly', priority: 0.9 },
  { url: '/Gastro', changefreq: 'weekly', priority: 0.9 },
  { url: '/cookie-policy', changefreq: 'monthly', priority: 0.5 },
  { url: '/Gastro/Objednavky', changefreq: 'weekly', priority: 0.8 },
  { url: '/Gastro/Kontakty', changefreq: 'monthly', priority: 0.7 },
  { url: '/Gastro/About', changefreq: 'monthly', priority: 0.7 },
  { url: '/Gastro/Sklad', changefreq: 'weekly', priority: 0.8 },
  { url: '/Gastro/Recepty', changefreq: 'weekly', priority: 0.8 },
  { url: '/Gastro/Zajem', changefreq: 'monthly', priority: 0.6 },
  { url: '/Gastro/Historie', changefreq: 'monthly', priority: 0.6 },
  { url: '/login', changefreq: 'yearly', priority: 0.3 },
  { url: '/admin/dashboard', changefreq: 'daily', priority: 1.0 },
  { url: '/admin', changefreq: 'daily', priority: 1.0 },
  { url: '/update', changefreq: 'weekly', priority: 0.8 },
];

const sitemap = new SitemapStream({ hostname });

streamToPromise(sitemap).then((data) => {
  fs.writeFileSync('public/sitemap.xml', data);
});

links.forEach(link => sitemap.write(link));
sitemap.end();

console.log('Sitemap generated successfully!');

