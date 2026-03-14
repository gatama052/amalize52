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
  title = 'Amalize – Aplikasi Ibadah Harian, Tracker Sholat, Doa, Kiblat & Jadwal Sholat',
  description = 'Amalize adalah aplikasi web muslim untuk membantu memantau ibadah harian seperti sholat 5 waktu, dzikir, doa harian, arah kiblat, jadwal sholat, kalender hijriyah, dan reminder kegiatan agar ibadah lebih teratur.',
  path = '/',
  type = 'website',
}: SEOHeadProps) {
  const url = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      <meta name="keywords" content="aplikasi ibadah muslim, tracker ibadah harian, aplikasi sholat, pengingat sholat, doa harian islam, arah kiblat online, jadwal sholat online, kalender hijriyah, dzikir harian, amalize" />

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
