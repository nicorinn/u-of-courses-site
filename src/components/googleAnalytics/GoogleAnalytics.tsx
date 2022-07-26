const GoogleAnalytics = () => {
  const _gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

  if (!_gaId) {
    return null;
  }

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${_gaId}`}
      />
      <script
        id="ga-setup"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${_gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
};
export default GoogleAnalytics;
