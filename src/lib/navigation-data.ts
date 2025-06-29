import { Home, User, Briefcase, Github, Linkedin, Twitter, Instagram, Film, Layers, FileText } from 'lucide-react';

export const navigationData = {
    navMain: [
        {
            title: 'Home',
            url: '/',
            icon: Home,
            shortcut: '1',
        },
        {
            title: 'Github',
            url: '/github',
            icon: Github,
            shortcut: '2',
        },
        {
            title: 'Stack',
            url: '/stack',
            icon: Layers,
            shortcut: '3',
        },
        {
            title: 'Letterboxd',
            url: '/letterboxd',
            icon: Film,
            shortcut: '4',
        },
    ],
    navSecondary: [
        {
            title: 'GitHub',
            url: 'https://github.com/Deta0ne',
            icon: Github,
        },
        {
            title: 'LinkedIn',
            url: 'https://www.linkedin.com/in/mert-yildiz-60b519227',
            icon: Linkedin,
        },
        {
            title: 'Instagram',
            url: 'https://www.instagram.com/merty.s/',
            icon: Instagram,
        },
        {
            title: 'Letterboxd',
            url: 'https://letterboxd.com/Aithra/',
            icon: Film,
        },
        {
            title: 'Resume',
            url: 'https://conscious-slime-368.notion.site/Mert-Y-ld-z-21df9a5cd73c80bebe61e5e0c2815bb9',
            icon: FileText,
        },
        {
            title: 'Mail',
            url: 'mailto:cmertyldz@gmail.com',
            icon: FileText,
        },
    ],
}; 