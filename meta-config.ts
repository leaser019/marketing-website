import { SeoProps } from "@/types/seo";

export const siteConfig = {
  name: "Star Wars Universe",
  url: "https://start-war-graghql.vercel.app/",
  ogImage: "/images/star-wars.webp",
  description: "Discover the Star Wars universe",
  links: {
    github: "https://github.com/leaser019",
  },
};

export function generateSeoMetadata({
  title,
  description,
  image,
  url,
  keywords,
}: SeoProps = {}) {
  return {
    title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
    description: description || siteConfig.description,
    keywords: keywords || ["Star Wars", "Films", "Character"],
    openGraph: {
      type: "website",
      locale: "vi_VN",
      url: url || siteConfig.url,
      title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
      description: description || siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: image ? `${siteConfig.url}${image}` : `${siteConfig.url}${siteConfig.ogImage}`,
          alt: title || siteConfig.name,
        },
      ],
    },
    authors: [
      {
        name: "Vo Minh Khang",
        url: siteConfig.url,
      },
    ],
  };
}