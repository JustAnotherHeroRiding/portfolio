export interface AcquireInfo {
    type: 'appStore' | 'playStore' | 'website' | 'contact';
    link?: string; // Optional link for website or app stores
}

export interface Project {
    name: string;
    description: string;
    imageUrl: string;
    acquireInfo: AcquireInfo[];
}
export const projects: Project[] = [
    {
        name: 'Rate Game',
        description: 'Rate sports games and share your take',
        imageUrl: '/images/rategameLogo.webp',
        acquireInfo: [
            {
                type: 'appStore',
                link: 'https://apps.apple.com/us/app/rate-game/id6477869711', // Example link
            },
            {
                type: 'playStore',
                link: 'https://play.google.com/store/apps/details?id=com.rategamemobile&hl=en&pli=1', // Example link
            },
        ],
    },
    {
        name: 'What The Key',
        description: 'Find the key of a song and jam with your favorites',
        imageUrl: '/images/wtkLogo.png',
        acquireInfo: [
            {
                type: 'contact',
            },
        ],
    },
]