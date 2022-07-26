export const pageView = (url: string) => {
  // @ts-ignore
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  });
};

interface GoogleAnalyticsEventParams {
  action: string;
  params: any;
}

// log specific events happening.
export const event = ({ action, params }: GoogleAnalyticsEventParams) => {
  // @ts-ignore
  window.gtag('event', action, params);
};
