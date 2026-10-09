/*
 * Post-build: give every route its own link-preview / SEO tags.
 *
 * This is a client-rendered React app, and link-preview crawlers (iMessage,
 * Instagram, X, Facebook, WhatsApp, Discord) don't run JavaScript — they only
 * see build/index.html. So after `react-scripts build`, write a copy of
 * index.html to build/<route>/index.html with that route's title, description,
 * canonical URL, and preview image baked in. Release pages use their album art
 * (compressed 1200x1200 copies in public/og/).
 *
 * Add new releases to ROUTES below.
 */
const fs = require("fs");
const path = require("path");

const SITE = "https://genwav.xyz";
const BUILD = path.join(__dirname, "..", "build");

const ARTIST_BIO =
  "gen.wav is a Cuban-Nicaraguan-American singer, multi-instrumentalist, and producer from Miami making Latin R&B and hip-hop.";

const release = (title, artists, image, extra = {}) => ({
  title: `${title} — ${artists}`,
  description: `Stream ${title} by ${artists} on Spotify, Apple Music, YouTube, SoundCloud, and more.`,
  image: `/og/${image}.jpg`,
  imageSize: [1200, 1200],
  type: "music.song",
  release: { name: title, artists },
  ...extra,
});

const ROUTES = {
  "/": {
    title: "gen.wav — Miami Latin R&B Artist & Producer",
    description: `${ARTIST_BIO} Stream new music, watch videos, and shop merch.`,
    image: "/og/genwav.jpg",
    imageSize: [1200, 630],
    type: "website",
  },
  "/OS": { alias: "/" },
  "/RELEASES": {
    title: "Music by gen.wav — All Releases",
    description: "Every single, EP, and album by gen.wav — stream Latin R&B, hip-hop, and more on your favorite platform.",
    image: "/og/genwav.jpg",
    imageSize: [1200, 630],
    type: "website",
  },
  "/EPK": {
    title: "gen.wav — Electronic Press Kit (EPK)",
    description: `${ARTIST_BIO} Bio, accomplishments, live performances, music, press, and booking contact.`,
    image: "/og/genwav.jpg",
    imageSize: [1200, 630],
    type: "profile",
  },
  "/newsletter": {
    title: "gen.wav Newsletter",
    description: "Get new music, shows, and merch drops from gen.wav straight to your inbox.",
    image: "/og/genwav.jpg",
    imageSize: [1200, 630],
    type: "website",
  },
  "/GENESIS": release("GENESIS", "gen.wav", "GENESIS", {
    title: "GENESIS — gen.wav (Debut Album)",
    description: "Stream GENESIS, the debut album by gen.wav, on Spotify, Apple Music, YouTube, SoundCloud, and more.",
    type: "music.album",
  }),
  "/SINDESTINO": release("SIN DESTINO", "KHR!S Joao, gen.wav", "SINDESTINO"),
  "/AFTERALL": release("AFTER ALL", "gen.wav, GrimeGrrrl", "AFTERALL"),
  "/LOSIGNORO": release("Los Ignoro", "KHR!S Joao x gen.wav", "LOSIGNORO"),
  "/3am": release("Textin' Me", "KHR!S Joao x gen.wav", "3am"),
  "/HIKING": release("Hiking Por Mi Mente", "Kiento. O, gen.wav", "HIKING"),
  "/DALEMAMI": release("DALE MAMI", "KHR!S Joao, gen.wav, Nick Garcia, El Igor", "DALEMAMI"),
  "/PROBLEMAS": release("Problemas", "Jo Merino, KHR!S Joao, gen.wav, Dani Mako", "PROBLEMAS"),
  "/LLAMAGEMELA": release("Llama Gemela", "KHR!S Joao, gen.wav", "LLAMAGEMELA"),
  "/oneday": release("Pay Off One Day", "KHR!S Joao, gen.wav", "oneday"),
  "/GAFAS": release("GAFAS", "KHR!S Joao, gen.wav", "GAFAS"),
  "/trippin": release("Trippin' (Remix)", "SRI, gen.wav", "trippin"),
  "/CURIOSO": release("CURIOSO", "KHR!S Joao, gen.wav", "CURIOSO"),
  "/SOLYMAR": release("SolyMar", "gen.wav, KHR!S Joao", "SOLYMAR"),
  "/ORIGINAL": release("Original", "Kiento. O, gen.wav", "ORIGINAL"),
  "/27": release("27", "gen.wav", "27"),
  "/22": release("22", "gen.wav & Cuee", "22"),
  "/TURO": release("TURO", "gen.wav", "TURO"),
  "/UP": release("UP", "gen.wav", "UP"),
  "/KEEPGRINDING": release("KEEP GRINDIN (SYRE)", "gen.wav", "KEEPGRINDING"),
  "/syre": { alias: "/KEEPGRINDING" },
  "/MATRIX": release("THE MATRIX", "gen.wav", "RENACI"),
  "/WORLD": release("The World is a Stage", "gen.wav", "RENACI"),
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function headTags(route, m) {
  const url = route === "/" ? `${SITE}/` : `${SITE}${route}`;
  const image = `${SITE}${m.image}`;
  const [w, h] = m.imageSize;
  const ld = m.release
    ? {
        "@context": "https://schema.org",
        "@type": m.type === "music.album" ? "MusicAlbum" : "MusicRecording",
        name: m.release.name,
        byArtist: { "@type": "MusicGroup", name: m.release.artists },
        image,
        url,
      }
    : { "@context": "https://schema.org", "@type": "MusicGroup", name: "gen.wav", url: `${SITE}/`, image: `${SITE}/og/genwav.jpg`, genre: ["Latin R&B", "Hip Hop"] };
  return [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}">`,
    `<link rel="canonical" href="${url}">`,
    `<meta property="og:type" content="${m.type}">`,
    `<meta property="og:site_name" content="gen.wav">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:title" content="${esc(m.title)}">`,
    `<meta property="og:description" content="${esc(m.description)}">`,
    `<meta property="og:image" content="${image}">`,
    `<meta property="og:image:secure_url" content="${image}">`,
    `<meta property="og:image:type" content="image/jpeg">`,
    `<meta property="og:image:width" content="${w}">`,
    `<meta property="og:image:height" content="${h}">`,
    `<meta property="og:image:alt" content="${esc(m.title)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(m.title)}">`,
    `<meta name="twitter:description" content="${esc(m.description)}">`,
    `<meta name="twitter:image" content="${image}">`,
    `<script type="application/ld+json">${JSON.stringify(ld)}</script>`,
  ].join("");
}

// Strip whatever title/description/canonical/OG/Twitter tags index.html shipped with
function stripSeo(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/gi, "")
    .replace(/<meta\b[^>]*\b(?:property|name)=["']?(?:og:[^"'\s>]*|twitter:[^"'\s>]*|description)["']?[^>]*>/gi, "")
    .replace(/<link\b[^>]*\brel=["']?canonical["']?[^>]*>/gi, "");
}

// Copies live in subfolders (build/UP/index.html), so relative asset paths like
// "./static/js/main.js" or "favicon.gif" must become root-absolute to keep
// working if the page is ever served at /UP/ (trailing slash).
function absolutizeAssets(html) {
  return html.replace(/\b(src|href)="(?:\.\/)?(?!https?:|\/|#|data:|mailto:|\.\.\/)([^"]+)"/gi, '$1="/$2"');
}

const template = absolutizeAssets(stripSeo(fs.readFileSync(path.join(BUILD, "index.html"), "utf8")));
if (!template.includes("</head>")) throw new Error("prerender-meta: no </head> in build/index.html");

let written = 0;
for (const [route, entry] of Object.entries(ROUTES)) {
  const meta = entry.alias ? ROUTES[entry.alias] : entry;
  const html = template.replace("</head>", `${headTags(route, meta)}</head>`);
  const file = route === "/" ? path.join(BUILD, "index.html") : path.join(BUILD, route.slice(1), "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  if (route !== "/" && !fs.existsSync(path.join(BUILD, meta.image))) throw new Error(`prerender-meta: missing ${meta.image} for ${route}`);
  written++;
}
console.log(`prerender-meta: wrote link-preview tags for ${written} routes`);
