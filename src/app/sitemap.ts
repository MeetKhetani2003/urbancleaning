import type { MetadataRoute } from "next";
import { connectDB } from "@/lib/db";
import { Service } from "@/models/Service";
import { Package } from "@/models/Package";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://urbanshinecleaningservice.in";
  
  await connectDB();
  const services = await Service.find({}, 'slug updatedAt').lean();
  const packages = await Package.find({}, 'slug updatedAt').lean();

  const pages = ["", "/about", "/services", "/packages", "/gallery", "/how-it-works", "/faqs", "/contact", "/book-service"];
  
  return [
    ...pages.map((path) => ({ 
      url: `${base}${path}`, 
      lastModified: new Date(), 
      changeFrequency: "weekly" as const, 
      priority: path === "" ? 1 : 0.8 
    })),
    ...services.map((service) => ({ 
      url: `${base}/services/${service.slug}`, 
      lastModified: service.updatedAt || new Date(), 
      changeFrequency: "monthly" as const, 
      priority: 0.75 
    })),
    ...packages.map((item) => ({ 
      url: `${base}/packages/${item.slug}`, 
      lastModified: item.updatedAt || new Date(), 
      changeFrequency: "monthly" as const, 
      priority: 0.7 
    })),
  ];
}
