import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
  type?: string;
}

const BASE_URL = 'https://amalize.vercel.app';
const OG_IMAGE = 'https://storage.googleapis.com/gpt-engineer-file-uploads/lBkixGQUa9TSLEJbdkFLQvnx4f63/social-images/social-1772617050045-1000170236.webp';

export default function SEOHead({
  title = 'Amalize — Aplikasi Ibadah Muslim Harian | Jadwal Sholat, Doa, Tracker',
  description = 'Amalize adalah aplikasi ibadah muslim harian lengkap: jadwal sholat akurat, arah kiblat, doa & dzikir harian, kalender Hijriah, dan tracker ibadah. Gratis & mudah digunakan.',
  path = '/',
  type = 'website',
}: SEOHeadProps) {
  const url = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Keywords */}
      <meta name="keywords" content="aplikasi ibadah muslim, tracker ibadah harian, jadwal sholat, reminder sholat, doa harian, arah kiblat, kalender hijriah, dzikir harian, amalize, islamic app" />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:locale" content="id_ID" />
      <meta property="og:site_name" content="Amalize" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>
  );
}
