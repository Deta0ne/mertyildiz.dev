import { Timeline } from '@/components/ui/timeline';
import { FloatingHeader } from '@/components/floating-header';
import { createHomeMetadata } from '@/lib/metadata-utils';
import { MinimalGradientBg } from '@/components/ui/background';

export const metadata = createHomeMetadata();
import { Briefcase, GraduationCap, School, Heart } from 'lucide-react';
import { client } from '@/lib/sanity/client';
import { TIMELINE_QUERY, PROFILE_QUERY } from '@/lib/sanity/queries';
import { PortableTextRenderer } from '@/components/portable-text';

const iconMap = {
    graduation: GraduationCap,
    work: Briefcase,
    school: School,
    heart: Heart,
};

interface TimelineItem {
    _id: string;
    date: string;
    description: string;
    icon: string;
    isActive: boolean;
    order: number;
    title: string;
}

export default async function Home() {
    const [timelineData, profileData] = await Promise.all([client.fetch(TIMELINE_QUERY), client.fetch(PROFILE_QUERY)]);

    const transformedData = timelineData.map((item: TimelineItem) => {
        const IconComponent = iconMap[item.icon as keyof typeof iconMap];
        return {
            id: item._id,
            title: item.title,
            description: item.description,
            date: item.date,
            icon: <IconComponent className="h-4 w-4" />,
            isActive: item.isActive,
        };
    });

    const profile = profileData || {
        greeting: 'Hello 👋',
        bio: [
            {
                _type: 'block',
                children: [
                    {
                        _type: 'span',
                        text: "I'm Mert — a software engineer, cinephile, and gamer from Turkey. I graduated from the Software Engineering department of Gumushane University 👨🏻‍🎓",
                    },
                ],
            },
            {
                _type: 'block',
                children: [
                    {
                        _type: 'span',
                        text: 'I am focused on front-end development and have two years of practical experience, I am working at Priva Security as a Front-End Developer. I am an expert in modern front-end technologies and am currently expanding my full-stack expertise 👨🏻‍💻',
                    },
                ],
            },
        ],
    };

    return (
        <>
            <MinimalGradientBg />
            <FloatingHeader scrollTitle="Mert Yıldız" />
            <div className="mx-auto w-full lg:mb-0 lg:max-w-3xl p-4 relative">
                <div className="mx-auto w-full lg:mb-0 lg:max-w-3xl">
                    <h1 className="text-3xl font-bold mb-4">{profile.greeting}</h1>
                    <div className="space-y-4">
                        <PortableTextRenderer value={profile.bio} />
                    </div>
                </div>

                <div className="mb-8 mt-8">
                    <h2 className="text-2xl font-bold mb-6">Experience & Education 📚</h2>
                    <Timeline items={transformedData} />
                </div>
            </div>
        </>
    );
}
