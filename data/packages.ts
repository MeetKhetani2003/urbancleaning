export type Package = {
  slug: string;
  title: string;
  image: string;
  description: string;
  rooms: string;
  focus: string[];
  price?: string;
};

const packages: Package[] = [
  {
    slug: "2-bhk",
    title: "2 BHK Cleaning",
    image: "/images/packages/2bhk-cleaning.jpg",
    description: "Professional cleaning for a complete 2 BHK home.",
    rooms: "A considered package for a two-bedroom home.",
    focus: ["Living spaces", "Bedrooms", "Kitchen areas", "Bathroom areas"],
  },
  {
    slug: "3-bhk",
    title: "3 BHK Cleaning",
    image: "/images/packages/3bhk-cleaning.jpg",
    description: "Professional cleaning for a complete 3 BHK home.",
    rooms: "A considered package for a three-bedroom home.",
    focus: ["Living spaces", "Bedrooms", "Kitchen areas", "Bathroom areas"],
  },
  {
    slug: "4-bhk",
    title: "4 BHK Cleaning",
    image: "/images/packages/4bhk-cleaning.jpg",
    description: "Professional cleaning for a complete 4 BHK home.",
    rooms: "A considered package for a four-bedroom home.",
    focus: ["Living spaces", "Bedrooms", "Kitchen areas", "Bathroom areas"],
  },
];

export default packages;
