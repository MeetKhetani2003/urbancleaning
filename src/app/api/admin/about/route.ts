import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { About } from '@/models/About';

export async function GET() {
  try {
    await connectDB();
    let about = await About.findOne({});
    if (!about) {
      // Create a default if it doesn't exist
      about = await About.create({
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
          name: '',
          role: '',
          bio: '',
          image: '',
        },
        staff: []
      });
    }
    return NextResponse.json(about);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch about data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    let about = await About.findOne({});
    
    if (!about) {
      about = await About.create(data);
    } else {
      about.hero = data.hero || about.hero;
      about.intro = data.intro || about.intro;
      about.principles = data.principles || about.principles;
      about.local = data.local || about.local;
      about.owner = data.owner || about.owner;
      about.staff = data.staff || about.staff;
      await about.save();
    }
    
    return NextResponse.json(about, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update about data' }, { status: 500 });
  }
}
