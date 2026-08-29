export type GalleryItem = {
  src: string;
  alt: string;
  category: string;
  orientation?: "portrait" | "landscape";
};

const gallery: GalleryItem[] = [
  { src: "/images/gallery/cleaning-team-01.jpg", alt: "Urban Shine Cleaning team at work in a bright home", category: "Home Cleaning", orientation: "landscape" },
  { src: "/images/gallery/bathroom-01.jpg", alt: "Professional bathroom cleaning detail", category: "Bathroom", orientation: "portrait" },
  { src: "/images/gallery/kitchen-01.jpg", alt: "Kitchen cleaning detail", category: "Kitchen", orientation: "landscape" },
  { src: "/images/gallery/sofa-01.jpg", alt: "Professional sofa cleaning detail", category: "Sofa", orientation: "portrait" },
  { src: "/images/gallery/mattress-01.jpg", alt: "Mattress cleaning service detail", category: "Mattress", orientation: "landscape" },
  { src: "/images/gallery/office-01.jpg", alt: "Professional office cleaning workspace", category: "Office", orientation: "landscape" },
  { src: "/images/gallery/window-01.jpg", alt: "Window and outdoor area cleaning", category: "Windows", orientation: "portrait" },
  { src: "/images/gallery/outdoor-01.jpg", alt: "Outdoor balcony cleaning setting", category: "Outdoor", orientation: "landscape" },
  { src: "/images/gallery/cleaning-team-02.jpg", alt: "Professional cleaning team and equipment", category: "Home Cleaning", orientation: "landscape" },
];

export const comparisons = [
  { title: "Bathroom", before: "/images/gallery/bathroom-before.jpg", after: "/images/gallery/bathroom-after.jpg", alt: "Bathroom cleaning comparison" },
  { title: "Kitchen", before: "/images/gallery/kitchen-before.jpg", after: "/images/gallery/kitchen-after.jpg", alt: "Kitchen cleaning comparison" },
  { title: "Sofa", before: "/images/gallery/sofa-before.jpg", after: "/images/gallery/sofa-after.jpg", alt: "Sofa cleaning comparison" },
  { title: "Window", before: "/images/gallery/window-before.jpg", after: "/images/gallery/window-after.jpg", alt: "Window cleaning comparison" },
];

export default gallery;
