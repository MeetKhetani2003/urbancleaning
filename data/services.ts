export type Service = {
  slug: string;
  title: string;
  category: string;
  image: string;
  description: string;
  heroCopy: string;
  whatWeClean: string[];
  whatWeCleanImages?: string[];
  benefit: string;
};

const services: Service[] = [
  {
    slug: "full-home-cleaning",
    title: "Full Home Cleaning",
    category: "Home Cleaning",
    image: "/images/home-cleaning/home_cleaning_hero_1787974087061.jpg",
    description: "A considered clean for the rooms and everyday spaces across your home.",
    heroCopy: "Bring a fresh, well-cared-for feeling to the spaces you call home with a cleaning plan shaped around your requirements.",
    whatWeClean: ["Living areas", "Bedrooms", "Kitchens", "Bathrooms", "Frequently used surfaces", "Entry areas"],
    whatWeCleanImages: [
      "/images/home-cleaning/home_cleaning_living_1787974101100.jpg",
      "/images/home-cleaning/home_cleaning_bedroom_1787974116367.jpg",
      "/images/home-cleaning/home_cleaning_kitchen_1787974130818.jpg",
      "/images/home-cleaning/home_cleaning_bathroom_1787974152798.jpg",
      "/images/home-cleaning/home_cleaning_surfaces_1787974165821.jpg",
      "/images/home-cleaning/home_cleaning_entry_1787974179486.jpg"
    ],
    benefit: "A complete-home approach makes it simple to start with the spaces that matter most.",
  },
  {
    slug: "bathroom-cleaning",
    title: "Bathroom Cleaning",
    category: "Home Cleaning",
    image: "/images/bathroom-cleaning/bathroom_cleaning_hero_1787974707548.jpg",
    description: "Detailed bathroom cleaning for a fresher, cleaner-feeling space.",
    heroCopy: "Give one of your home's most used spaces thoughtful, professional attention with a bathroom clean tailored to your needs.",
    whatWeClean: ["Floor", "Tiles", "Washbasin", "Toilet", "Shower area", "Fixtures"],
    whatWeCleanImages: [
      "/images/bathroom-cleaning/bathroom_cleaning_floor_1787974720123.jpg",
      "/images/services/bathroom-cleaning.jpg",
      "/images/bathroom-cleaning/washbasin.jpg",
      "/images/bathroom-cleaning/toilet.jpg",
      "/images/services/bathroom-cleaning.jpg",
      "/images/bathroom-cleaning/fixtures.jpg"
    ],
    benefit: "Detail-focused cleaning helps restore the calm, clean feel you want from your bathroom.",
  },
  {
    slug: "kitchen-cleaning",
    title: "Kitchen Cleaning",
    category: "Home Cleaning",
    image: "/images/services/kitchen-cleaning.jpg",
    description: "Careful cleaning for kitchen surfaces, work areas and daily-use zones.",
    heroCopy: "From everyday worktops to the spaces that need a little more attention, bring freshness back to the heart of your home.",
    whatWeClean: ["Countertops", "Cooktop area", "Cabinet exteriors", "Sink area", "Wall tiles", "Visible surfaces"],
    whatWeCleanImages: [
      "/images/kitchen-cleaning/countertops.jpg",
      "/images/kitchen-cleaning/cooktop.jpg",
      "/images/kitchen-cleaning/cabinets.jpg",
      "/images/kitchen-cleaning/sink.jpg",
      "/images/kitchen-cleaning/wall_tiles.jpg",
      "/images/kitchen-cleaning/surfaces.jpg"
    ],
    benefit: "A cleaner kitchen makes daily routines feel more organised and welcoming.",
  },
  {
    slug: "sofa-cleaning",
    title: "Sofa Cleaning",
    category: "Furniture Care",
    image: "/images/services/sofa-cleaning.jpg",
    description: "Thoughtful upholstery cleaning for sofas and living-room seating.",
    heroCopy: "Refresh the furniture at the centre of your everyday living space with professional sofa cleaning.",
    whatWeClean: ["Seat cushions", "Back cushions", "Armrests", "Fabric surfaces", "Crevices", "Visible frame areas"],
    whatWeCleanImages: [
      "/images/sofa-cleaning/seat_cushions.jpg",
      "/images/sofa-cleaning/back_cushions.jpg",
      "/images/sofa-cleaning/armrests.jpg",
      "/images/sofa-cleaning/fabric_surfaces.jpg",
      "/images/sofa-cleaning/crevices.jpg",
      "/images/sofa-cleaning/frame.jpg"
    ],
    benefit: "Give your living room a noticeably more cared-for feel without changing the furniture you love.",
  },
  {
    slug: "mattress-cleaning",
    title: "Mattress Cleaning",
    category: "Furniture Care",
    image: "/images/services/mattress-cleaning.jpg",
    description: "Professional cleaning for the mattress surfaces in your home.",
    heroCopy: "Care for the place where your day begins and ends with a mattress-cleaning requirement tailored to your home.",
    whatWeClean: ["Top surface", "Side panels", "Stitched edges", "Bed-frame contact areas", "Visible marks", "Accessible corners"],
    whatWeCleanImages: [
      "/images/mattress-cleaning/top_surface.jpg",
      "/images/mattress-cleaning/side_panels.jpg",
      "/images/mattress-cleaning/stitched_edges.jpg",
      "/images/mattress-cleaning/contact_areas.jpg",
      "/images/mattress-cleaning/visible_marks.jpg",
      "/images/mattress-cleaning/corners.jpg"
    ],
    benefit: "A professionally cleaned mattress is a simple way to reset the feeling of your bedroom.",
  },
  {
    slug: "office-cleaning",
    title: "Office Cleaning",
    category: "Commercial Cleaning",
    image: "/images/services/office-cleaning.jpg",
    description: "Professional cleaning for workspaces, shared areas and everyday office environments.",
    heroCopy: "Create a polished environment for focused work and welcoming conversations with an office clean shaped around your space.",
    whatWeClean: ["Workstations", "Shared desks", "Common areas", "Reception areas", "Meeting spaces", "Accessible surfaces"],
    whatWeCleanImages: [
      "/images/office-cleaning/workstations.jpg",
      "/images/office-cleaning/shared_desks.jpg",
      "/images/office-cleaning/common_areas.jpg",
      "/images/office-cleaning/reception.jpg",
      "/images/office-cleaning/meeting_spaces.jpg",
      "/images/office-cleaning/accessible_surfaces.jpg"
    ],
    benefit: "A clean, organised workspace helps your team and visitors feel considered from the moment they arrive.",
  },
  {
    slug: "meeting-room-cleaning",
    title: "Meeting Room Cleaning",
    category: "Commercial Cleaning",
    image: "/images/services/meeting-room-cleaning.jpg",
    description: "A focused clean for the rooms where important conversations happen.",
    heroCopy: "Keep meeting spaces feeling clear, presentable and ready for your next conversation.",
    whatWeClean: ["Meeting tables", "Seating", "Whiteboards", "Glass surfaces", "Presentation areas", "Entry touchpoints"],
    whatWeCleanImages: [
      "/images/meeting-room-cleaning/meeting_tables.jpg",
      "/images/meeting-room-cleaning/seating.jpg",
      "/images/meeting-room-cleaning/whiteboards.jpg",
      "/images/meeting-room-cleaning/glass_surfaces.jpg",
      "/images/meeting-room-cleaning/presentation_areas.jpg",
      "/images/meeting-room-cleaning/entry_touchpoints.jpg"
    ],
    benefit: "A prepared room creates a more professional setting for every meeting.",
  },
  {
    slug: "balcony-cleaning",
    title: "Balcony Cleaning",
    category: "Outdoor Cleaning",
    image: "/images/services/balcony-cleaning-v2.jpg",
    description: "Refresh balcony floors, rails and everyday outdoor living areas.",
    heroCopy: "Bring your balcony back into the rhythm of your home with cleaning attention for its accessible surfaces and corners.",
    whatWeClean: ["Balcony floor", "Railings", "Glass panels", "Corners", "Planter exteriors", "Accessible ledges"],
    whatWeCleanImages: [
      "/images/balcony-cleaning/balcony_floor.jpg",
      "/images/balcony-cleaning/railings.jpg",
      "/images/balcony-cleaning/glass_panels.jpg",
      "/images/balcony-cleaning/corners.jpg",
      "/images/balcony-cleaning/planter_exteriors.jpg",
      "/images/balcony-cleaning/accessible_ledges.jpg"
    ],
    benefit: "A cleaner balcony makes it easier to enjoy your outdoor corner of the city.",
  },
  {
    slug: "gas-stove-cleaning",
    title: "Gas Stove Cleaning",
    category: "Specialised Cleaning",
    image: "/images/services/gas-stove-cleaning-v2.jpg",
    description: "Detail cleaning for the daily-use cooking area in your kitchen.",
    heroCopy: "Give your gas stove area a dedicated, professional clean as part of your kitchen-care requirements.",
    whatWeClean: ["Stove top", "Burner surroundings", "Knob exteriors", "Drip area", "Nearby counter", "Accessible crevices"],
    whatWeCleanImages: [
      "/images/gas-stove-cleaning/stove_top.jpg",
      "/images/gas-stove-cleaning/burner_surroundings.jpg",
      "/images/gas-stove-cleaning/knobs.jpg",
      "/images/gas-stove-cleaning/drip_area.jpg",
      "/images/gas-stove-cleaning/nearby_counter.jpg",
      "/images/gas-stove-cleaning/crevices.jpg"
    ],
    benefit: "Small, high-use areas can make a big difference to how fresh your kitchen feels.",
  },
  {
    slug: "exhaust-fan-cleaning",
    title: "Exhaust Fan Cleaning",
    category: "Specialised Cleaning",
    image: "/images/services/exhaust-fan-cleaning-v2.jpg",
    description: "Dedicated cleaning for accessible kitchen exhaust fan surfaces.",
    heroCopy: "Include the hardworking details of your kitchen in a cleaning requirement made for your space.",
    whatWeClean: ["Outer cover", "Accessible grill", "Surrounding wall", "Visible blades", "Switch plate", "Nearby surfaces"],
    whatWeCleanImages: [
      "/images/exhaust-fan-cleaning/outer_cover.jpg",
      "/images/exhaust-fan-cleaning/grill.jpg",
      "/images/exhaust-fan-cleaning/surrounding_wall.jpg",
      "/images/exhaust-fan-cleaning/blades.jpg",
      "/images/exhaust-fan-cleaning/switch_plate.jpg",
      "/images/exhaust-fan-cleaning/nearby_surfaces.jpg"
    ],
    benefit: "A focused clean brings attention to the small details often missed in everyday routines.",
  },
  {
    slug: "ceiling-fan-cleaning",
    title: "Ceiling Fan Cleaning",
    category: "Specialised Cleaning",
    image: "/images/services/ceiling-fan-cleaning-v2.jpg",
    description: "Professional attention for accessible ceiling fan surfaces.",
    heroCopy: "Add ceiling fans to your cleaning request for a more complete room refresh.",
    whatWeClean: ["Blade surfaces", "Motor housing exterior", "Canopy exterior", "Pull chain exterior", "Nearby ceiling area", "Accessible fittings"],
    whatWeCleanImages: [
      "/images/ceiling-fan-cleaning/blade_surfaces.jpg",
      "/images/ceiling-fan-cleaning/motor_housing.jpg",
      "/images/ceiling-fan-cleaning/canopy.jpg",
      "/images/ceiling-fan-cleaning/pull_chain.jpg",
      "/images/ceiling-fan-cleaning/ceiling_area.jpg",
      "/images/ceiling-fan-cleaning/fittings.jpg"
    ],
    benefit: "A few well-considered details help a room feel genuinely finished.",
  },
  {
    slug: "window-cleaning",
    title: "Window & Slider Cleaning",
    category: "Outdoor Cleaning",
    image: "/images/services/window-cleaning-v2.jpg",
    description: "Cleaning for windows, sliders and the light-giving surfaces around your home or office.",
    heroCopy: "Let more light into your space with a focused clean for accessible glass, frames and slider tracks.",
    whatWeClean: ["Glass panels", "Window frames", "Slider frames", "Accessible tracks", "Handles", "Sills"],
    whatWeCleanImages: [
      "/images/window-cleaning/glass_panels.jpg",
      "/images/window-cleaning/window_frames.jpg",
      "/images/window-cleaning/slider_frames.jpg",
      "/images/window-cleaning/tracks.jpg",
      "/images/window-cleaning/handles.jpg",
      "/images/window-cleaning/sills.jpg"
    ],
    benefit: "Clearer glass and cared-for frames make your whole space feel brighter.",
  },
  {
    slug: "garden-cleaning",
    title: "Garden Cleaning",
    category: "Outdoor Cleaning",
    image: "/images/services/garden-cleaning-v2.jpg",
    description: "A refresh for accessible garden and planted outdoor areas.",
    heroCopy: "Make your garden corner feel more inviting with a cleaning requirement suited to your outdoor space.",
    whatWeClean: ["Pathways", "Planter exteriors", "Outdoor seating", "Visible edges", "Accessible surfaces", "Entry areas"],
    whatWeCleanImages: [
      "/images/garden-cleaning/pathways.jpg",
      "/images/garden-cleaning/planter_exteriors.jpg",
      "/images/garden-cleaning/outdoor_seating.jpg",
      "/images/garden-cleaning/visible_edges.jpg",
      "/images/garden-cleaning/accessible_surfaces.jpg",
      "/images/garden-cleaning/entry_areas.jpg"
    ],
    benefit: "A tidier outdoor setting lets your plants and peaceful moments take centre stage.",
  },
  {
    slug: "appliance-cleaning",
    title: "Appliance Cleaning",
    category: "Specialised Cleaning",
    image: "/images/services/appliance-cleaning-v2.jpg",
    description: "Cleaning support for selected everyday appliance exteriors and surrounding areas.",
    heroCopy: "Choose a specialised appliance-cleaning request for the practical details of a more polished home.",
    whatWeClean: ["Appliance exteriors", "Control panels", "Handles", "Surrounding counters", "Visible vents", "Accessible spaces"],
    whatWeCleanImages: [
      "/images/appliance-cleaning/appliance_exteriors.jpg",
      "/images/appliance-cleaning/control_panels.jpg",
      "/images/appliance-cleaning/handles.jpg",
      "/images/appliance-cleaning/surrounding_counters.jpg",
      "/images/appliance-cleaning/visible_vents.jpg",
      "/images/appliance-cleaning/accessible_spaces.jpg"
    ],
    benefit: "Dedicated attention to daily-use appliances helps your kitchen feel more completely cared for.",
  },
];

export default services;
