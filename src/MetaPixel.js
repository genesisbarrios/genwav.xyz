import { useEffect } from 'react';

const MetaPixel = ({ pixelId }) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && pixelId) {
      // Standard Meta Pixel base code
      // Replace 'YOUR_PIXEL_ID' with the actual pixelId prop
      (function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)})(window,document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');

      window.fbq('init', pixelId);
      window.fbq('track', 'PageView');
    }
  }, [pixelId]);

  return null;
};

// Helper function to track release page visits
export const trackReleasePageView = (releaseName) => {
  if (typeof window !== 'undefined' && window.fbq) {
    // Use standard ViewContent event for Facebook's algorithm
    window.fbq('track', 'ViewContent', {
      content_name: releaseName,
      content_category: 'Music Release',
      content_type: 'product'
    });
    
    // Optional: Add custom event for detailed analytics
    window.fbq('trackCustom', 'ReleasePageView', {
      release_name: releaseName
    });
  }
};

// Helper function to track streaming service clicks
export const trackStreamingClick = (releaseName, platform) => {
  if (typeof window !== 'undefined' && window.fbq) {
    // Use Lead event - better for streaming conversions
    window.fbq('track', 'Lead', {
      content_name: `${releaseName} - ${platform}`,
      content_category: 'Music Stream'
    });
    
    // Custom event for platform-specific analytics
    window.fbq('trackCustom', 'StreamingClick', {
      release_name: releaseName,
      platform: platform
    });
  }
};

// Helper function to track merch clicks
export const trackMerchClick = (releaseName, merchType) => {
  if (typeof window !== 'undefined' && window.fbq) {
    // Just use custom event since it's an outbound link
    window.fbq('trackCustom', 'MerchWebsiteClick', {
      release_name: releaseName,
      merch_type: merchType,
      destination: 'printify_store'
    });
  }
};

export default MetaPixel;