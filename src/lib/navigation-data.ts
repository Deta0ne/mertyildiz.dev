import { Home, User, Briefcase, Github, Linkedin, Twitter, Instagram, Film, Layers } from 'lucide-react';

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
    ],
}; 