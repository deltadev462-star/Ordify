import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
}

export function useSEO({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  twitterCard = 'summary_large_image'
}: SEOProps) {
  useEffect(() => {
    // Set title
    document.title = title;

    // Set meta description
    const metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (metaDesc) {
      metaDesc.content = description;
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = description;
      document.head.appendChild(newMeta);
    }

    // Open Graph
    setMetaProperty('og:title', ogTitle || title);
    setMetaProperty('og:description', ogDescription || description);
    if (ogImage) setMetaProperty('og:image', ogImage);
    setMetaProperty('og:type', 'website');

    // Twitter
    setMetaProperty('twitter:card', twitterCard);
    setMetaProperty('twitter:title', ogTitle || title);
    setMetaProperty('twitter:description', ogDescription || description);
    if (ogImage) setMetaProperty('twitter:image', ogImage);

  }, [title, description, ogTitle, ogDescription, ogImage, twitterCard]);
}

function setMetaProperty(property: string, content: string) {
  let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
  if (meta) {
    meta.content = content;
  } else {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    meta.content = content;
    document.head.appendChild(meta);
  }
}