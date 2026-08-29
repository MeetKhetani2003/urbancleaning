import { connectDB } from './src/lib/db.ts';
import { About } from './src/models/About.ts';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function seed() {
  await connectDB();
  const about = await About.findOne({});
  if (about) {
    about.owner = {
      name: 'Ravi Kumar',
      role: 'Founder & Operations Lead',
      bio: 'Ravi started Urban Shine Cleaning with a simple vision: to bring professional, reliable, and premium cleaning services to Patna. With over 10 years of experience in facility management, he ensures every team member is trained to the highest standards.',
      image: '/images/about/professional-cleaning-team.jpg', // Using existing image as placeholder
    };
    about.staff = [
      {
        name: 'Sunita Devi',
        role: 'Senior Cleaning Specialist',
        image: '/images/about/cleaning-equipment.jpg',
      },
      {
        name: 'Amit Singh',
        role: 'Commercial Cleaning Lead',
        image: '/images/about/cleaning-equipment.jpg',
      },
      {
        name: 'Priya Sharma',
        role: 'Quality Inspector',
        image: '/images/about/professional-cleaning-team.jpg',
      }
    ];
    await about.save();
    console.log('Mock data updated successfully!');
  } else {
    await About.create({
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
      owner: {
        name: 'Ravi Kumar',
        role: 'Founder & Operations Lead',
        bio: 'Ravi started Urban Shine Cleaning with a simple vision: to bring professional, reliable, and premium cleaning services to Patna. With over 10 years of experience in facility management, he ensures every team member is trained to the highest standards.',
        image: '/images/about/professional-cleaning-team.jpg',
      },
      staff: [
        {
          name: 'Sunita Devi',
          role: 'Senior Cleaning Specialist',
          image: '/images/about/cleaning-equipment.jpg',
        },
        {
          name: 'Amit Singh',
          role: 'Commercial Cleaning Lead',
          image: '/images/about/cleaning-equipment.jpg',
        },
        {
          name: 'Priya Sharma',
          role: 'Quality Inspector',
          image: '/images/about/professional-cleaning-team.jpg',
        }
      ]
    });
    console.log('Created and seeded About document successfully!');
  }
  process.exit(0);
}

seed();
