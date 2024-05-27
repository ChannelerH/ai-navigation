import Script from 'next/script';

export default function SeoScript() {
  const GOOGLE_TRACKING_ID = 'G-N3T08LN4VP';

  return (
    <>
      <Script strategy='afterInteractive' src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TRACKING_ID}`} />
      <Script
        id='gtag-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_TRACKING_ID}');
          `,
        }}
      />
    </>
  );
}
