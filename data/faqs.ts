export type FAQGroup = {
  title: string;
  intro: string;
  questions: { question: string; answer: string }[];
};

const faqs: FAQGroup[] = [
  {
    title: "Home Cleaning",
    intro: "Helpful starting points for home-cleaning requirements.",
    questions: [
      { question: "What does full home cleaning include?", answer: "A full home cleaning request can be shaped around the rooms and areas you would like cleaned. Please share your requirements while booking so the service can be planned accordingly." },
      { question: "Do you provide 2 BHK, 3 BHK and 4 BHK cleaning?", answer: "Yes. Urban Shine Cleaning offers dedicated 2 BHK, 3 BHK and 4 BHK cleaning package enquiries. The exact requirement can be discussed before service." },
      { question: "Can I request specific rooms?", answer: "Yes. Use the additional requirements field when you book to tell us which rooms or areas you would like to prioritise." },
    ],
  },
  {
    title: "Specialised Cleaning",
    intro: "For the details that deserve their own clean.",
    questions: [
      { question: "Do you clean sofas?", answer: "Yes. Sofa cleaning can be requested as a specialised furniture-cleaning service." },
      { question: "Do you clean mattresses?", answer: "Yes. Mattress cleaning is available as a separate service enquiry." },
      { question: "Do you clean windows and sliders?", answer: "Yes. You can request cleaning for accessible windows, sliders, frames and tracks." },
      { question: "Do you clean fans and exhaust fans?", answer: "Yes. Ceiling fan and exhaust fan cleaning can be requested as specialised cleaning requirements." },
      { question: "Do you clean balconies and gardens?", answer: "Yes. Balcony and accessible garden-area cleaning can be requested through the booking form." },
    ],
  },
  {
    title: "Office Cleaning",
    intro: "Flexible enquiries for professional spaces.",
    questions: [
      { question: "Do you clean offices?", answer: "Yes. Urban Shine Cleaning accepts office-cleaning enquiries for workspaces and common areas in Patna." },
      { question: "Can meeting rooms be cleaned?", answer: "Yes. Meeting room cleaning can be requested as a dedicated service." },
      { question: "Can I request a customised cleaning requirement?", answer: "Yes. Tell us about your workspace and priorities in the booking form, and we can understand the requirement before service." },
    ],
  },
];

export default faqs;
