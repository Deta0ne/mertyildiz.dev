import { Home, User, Briefcase, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

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
            icon: User,
            shortcut: '2',
        },
        {
            title: 'Stack',
            url: '/stack',
            icon: Briefcase,
            shortcut: '3',
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
            title: 'Twitter',
            url: '#',
            icon: Twitter,
        },
        {
            title: 'Instagram',
            url: 'https://www.instagram.com/merty.s/',
            icon: Instagram,
        },
    ],
}; 