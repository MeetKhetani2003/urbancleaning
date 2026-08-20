import type { MetadataRoute } from "next";
import packages from "../../data/packages";
import services from "../../data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://urbanshinecleaning.in";
  const pages = ["", "/about", "/services", "/packages", "/gallery", "/how-it-works", "/faqs", "/contact", "/book-service"];
  return [
    ...pages.map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: path === "" ? 1 : 0.8 })),
    ...services.map((service) => ({ url: `${base}/services/${service.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.75 })),
    ...packages.map((item) => ({ url: `${base}/packages/${item.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
