export const siteConfig = {
  name: 'Mert Yıldız',
  title: {
    default: 'Mert Yıldız - Software Engineer',
    template: '%s | Mert Yıldız',
  },
  description: 'I\'m Mert --a software engineer, cinephile and gamer from Turkey. I graduated from the Software Engineering department of Gumushane University',
  url: 'https://mertyildiz.dev',
  locale: 'en_US',
  ogImage: 'https://mertyildiz.dev/og-image.jpg',
  creator: 'Mert Yıldız',
  keywords: [
    'mert yıldız',
    'mertyildiz.dev',
    'software engineer',
    'frontend developer',
    'web developer',
    'nextjs developer',
    'react developer',
  ],
  authors: [
    {
      name: 'Mert Yıldız',
      url: 'https://mertyildiz.dev',
    },
  ],
  social: {
    github: 'https://github.com/Deta0ne',
    linkedin: 'https://www.linkedin.com/in/mert-yildiz-60b519227',
    letterboxd: 'https://letterboxd.com/Aithra',
    email: 'cmertyldz@gmail.com',
  },
  pages: {
    github: {
      title: 'GitHub Projects | Mert Yıldız - My Open Source Contributions',
      description: 'Explore my latest open-source projects and contributions on GitHub. Full-stack development with React, Next.js, TypeScript, and modern web technologies.',
      keywords: ['github', 'open source', 'projects', 'repositories', 'contributions', 'react', 'nextjs']
    },
    letterboxd: {
      title: 'Film Reviews | Mert Yıldız - My Recent Movie Watches',
      description: 'Discover my recent film activity and reviews from Letterboxd. A personal collection of movies I\'ve watched and rated.',
      keywords: ['letterboxd', 'films', 'movies', 'reviews', 'cinema', 'personal taste']
    },
    stack: {
      title: 'Tech Stack | Mert Yıldız - Technologies & Tools I Use',
      description: 'Discover the technologies, frameworks, and tools I use for software development. My tech stack includes React, Next.js, TypeScript, and more.',
      keywords: ['tech stack', 'technologies', 'tools', 'frameworks', 'react', 'nextjs', 'typescript']
    }
  }
} as const;

export type SiteConfig = typeof siteConfig; 