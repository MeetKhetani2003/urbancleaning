import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import { About } from "@/models/About";

export const metadata: Metadata = {
  title: "About Urban Shine Cleaning | Our Story in Patna",
  description: "Learn about Urban Shine Cleaning, a Patna-based professional cleaning service for homes, offices and specialised spaces. We make your space feel fresh again.",
  keywords: ["About Urban Shine Cleaning", "Cleaning Company Patna", "Local Cleaners Bihar", "Professional Cleaners in Patna"],
  alternates: { canonical: "/about" }
};

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  await connectDB();
  let aboutData = await About.findOne({});
  
  if (!aboutData) {
    aboutData = {
      hero: {
        title: 'Making Spaces Feel\nFresh Again.',
        description: 'Urban Shine Cleaning is a Patna-based cleaning service for homes, apartments, offices and the everyday spaces that deserve thoughtful care.',
        image: '/images/about/professional-cleaning-team.jpg',
      },
      intro: {
        eyebrow: 'Our point of view',
        title: 'A Fresh Start For\nEveryday Spaces.',
        description: 'Cleaning can be a practical task, but the way a clean space feels can change the whole day. Urban Shine Cleaning exists to make that feeling more accessible for people across Patna.\n\nFrom a familiar living room to a busy office, the focus is simple: a clean, organised and service-focused experience around the spaces you use most.',
        image: '/images/about/cleaning-equipment.jpg',
      },
      principles: {
        eyebrow: 'What guides us',
        title: 'Thoughtful Service,\nClear Choices.',
        items: [
          { icon: '✦', title: 'Complete solutions', description: 'One place to explore home, office, furniture, appliance and outdoor cleaning requirements.' },
          { icon: '⌁', title: 'Space-led planning', description: 'Start with a room, a home size or a focused requirement and tell us what matters to you.' },
          { icon: '→', title: 'Easy to begin', description: 'A clear online booking form helps you share the key details before service.' }
        ]
      },
      local: {
        eyebrow: 'Proudly local',
        title: 'Cleaning Service\nFor Patna, Bihar.',
        description: 'Urban Shine Cleaning is focused on serving the spaces where Patna lives and works—homes, apartments, offices and the small spaces in between.',
      },
      owner: null,
      staff: []
    };
  }

  return <>
    <section className="page-hero page-hero--about">
      <Image src={aboutData.hero.image || "/images/about/professional-cleaning-team.jpg"} alt="Professional Urban Shine Cleaning team" fill priority sizes="100vw" />
      <div className="page-hero-wash" />
      <div className="shell page-hero-content">
        <p className="eyebrow eyebrow--light">About Urban Shine</p>
        <h1 dangerouslySetInnerHTML={{ __html: aboutData.hero.title.replace(/\n/g, '<br />').replace(/(Fresh Again\.)/g, '<em>$1</em>') }} />
        <p>{aboutData.hero.description}</p>
      </div>
    </section>
    
    {/* Owner Section */}
    {aboutData.owner && aboutData.owner.name && (
      <section className="section shell bg-[var(--wash)] rounded-[var(--radius)] px-8 py-16 mt-12 mb-20 flex flex-col md:flex-row gap-12 items-center">
        {aboutData.owner.image && (
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg shrink-0">
            <Image src={aboutData.owner.image} alt={aboutData.owner.name} fill className="object-cover" />
          </div>
        )}
        <div>
          <p className="eyebrow">Meet the Owner</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">{aboutData.owner.name}</h2>
          <p className="text-[var(--green)] font-medium text-lg mb-4">{aboutData.owner.role}</p>
          <p className="text-[var(--muted)] leading-relaxed">{aboutData.owner.bio}</p>
        </div>
      </section>
    )}

    <section className="section shell about-intro">
      <div className="about-intro-image image-frame">
        <Image src={aboutData.intro.image || "/images/about/cleaning-equipment.jpg"} alt="Professional cleaning equipment ready for service" fill sizes="(max-width: 800px) 92vw, 46vw" />
      </div>
      <div>
        <p className="eyebrow">{aboutData.intro.eyebrow}</p>
        <h2 dangerouslySetInnerHTML={{ __html: aboutData.intro.title.replace(/\n/g, '<br />').replace(/(Everyday Spaces\.)/g, '<em>$1</em>') }} />
        {aboutData.intro.description.split('\n\n').map((paragraph: string, idx: number) => (
          <p key={idx}>{paragraph}</p>
        ))}
        <Link href="/services" className="text-link">Explore cleaning services <span>→</span></Link>
      </div>
    </section>


    
    <section className="section section-tint">
      <div className="shell">
        <div className="section-heading center-heading">
          <p className="eyebrow">{aboutData.principles.eyebrow}</p>
          <h2 dangerouslySetInnerHTML={{ __html: aboutData.principles.title.replace(/\n/g, '<br />').replace(/(Clear Choices\.)/g, '<em>$1</em>') }} />
        </div>
        <div className="about-principles">
          {aboutData.principles.items.map((item: any, idx: number) => (
            <article key={idx}>
              <span>{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* Staff Section */}
    {aboutData.staff && aboutData.staff.length > 0 && (
      <section className="section shell my-20">
        <div className="section-heading center-heading mb-12">
          <p className="eyebrow">Our Team</p>
          <h2>The Faces Behind<br /><em>The Shine.</em></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {aboutData.staff.map((member: any, idx: number) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4 shadow-md bg-[var(--wash)]">
                {member.image ? (
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[var(--muted)] bg-gray-100">
                    No Image
                  </div>
                )}
              </div>
              <h3 className="font-bold text-lg text-[var(--ink)]">{member.name}</h3>
              <p className="text-[var(--green)] text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    )}

    <section className="section shell about-location">
      <div>
        <p className="eyebrow">{aboutData.local.eyebrow}</p>
        <h2 dangerouslySetInnerHTML={{ __html: aboutData.local.title.replace(/\n/g, '<br />').replace(/(Patna, Bihar\.)/g, '<em>$1</em>') }} />
      </div>
      <div>
        <p>{aboutData.local.description}</p>
        <Link href="/contact" className="button">Contact Urban Shine <span>↗</span></Link>
      </div>
    </section>
  </>;
}
