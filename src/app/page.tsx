import { Timeline } from '@/components/ui/timeline';
import { FloatingHeader } from '@/components/floating-header';
import { Briefcase, GraduationCap, School, Heart } from 'lucide-react';

const timelineData = [
    {
        id: '1',
        title: 'Graduated from Gumushane University',
        description:
            'I graduated from Gumushane University in 2025. I studied Software Engineering and got a Bachelor of Science degree.',
        date: '2025',
        icon: <GraduationCap className="h-4 w-4" />,
        isActive: true,
    },
    {
        id: '2',
        title: 'Erasmus Exchange',
        description: 'I went to Guarda, Portugal for my Erasmus Exchange. This was a great experience.',
        date: '2024',
        icon: <GraduationCap className="h-4 w-4" />,
    },
    {
        id: '3',
        title: 'Joined Privia Security',
        description: 'I joined Privia Security as a Frontend Developer Intern.',
        date: '2023',
        icon: <Briefcase className="h-4 w-4" />,
    },
    {
        id: '4',
        title: 'Started at Gumushane University',
        description: 'I started my journey at Gumushane University in 2021.',
        date: '2021',
        icon: <School className="h-4 w-4" />,
    },
    {
        id: '5',
        title: 'Born',
        description: 'Turkey. The beginning of my journey.',
        date: '2002',
        icon: <Heart className="h-4 w-4" />,
    },
];

export default function Home() {
    return (
        <>
            <FloatingHeader scrollTitle="Mert Yıldız" />
            <div className="mx-auto w-full lg:mb-0 lg:max-w-3xl p-4">
                <div className="mx-auto w-full lg:mb-0 lg:max-w-3xl">
                    <h1 className="text-3xl font-bold mb-4">Hello 👋</h1>
                    <p>
                        I’m Mert — a software engineer, cinephile, and gamer from Turkey. I graduated from the Software
                        Engineering department of Gumushane University 👨🏻‍🎓
                    </p>
                    <p>
                        I am focused on front-end development and have two years of practical experience, I am working
                        at Priva Security as a Front-End Developer. I am an expert in modern front-end technologies and
                        am currently expanding my full-stack expertise 👨🏻‍💻
                    </p>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-6">Experience & Education 📚</h2>
                    <Timeline items={timelineData} />
                </div>
            </div>
        </>
    );
}
