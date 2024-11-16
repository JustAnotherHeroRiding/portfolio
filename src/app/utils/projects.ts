import { SVGProps } from '@/app/utils/SVGProps'
import Github from '../components/svg/Github';


enum LOGOURLS {
    REACT_NATIVE='https://cdn.worldvectorlogo.com/logos/react-native-1.svg',
    GOLANG='https://go.dev/blog/go-brand/Go-Logo/PNG/Go-Logo_Blue.png',
    NEST='https://upload.wikimedia.org/wikipedia/commons/a/a8/NestJS.svg',
    NEXT='https://cdn.worldvectorlogo.com/logos/next-js.svg'
}

enum DOCSURLS {
    REACT_NATIVE='https://reactnative.dev/docs/getting-started',
    GOLANG='https://go.dev/doc/',
    NEST='https://docs.nestjs.com/',
    NEXT='https://nextjs.org/docs'
}


export interface AcquireInfo {
    type: 'appStore' | 'playStore' | 'website' | 'contact';
    link?: string; // Optional link for website or app stores
    logo?: React.FC<SVGProps>;

}
export interface Tech {
    name:string;
    logoUrl: string;
    docs:string
}

export interface Project {
    name: string;
    description: string;
    imageUrl: string;
    acquireInfo: AcquireInfo[];
    stack: Tech[];
}

export const projects: Project[] = [
    {
        name: 'Rate Game',
        description: 'Rate sports games and share your take',
        imageUrl: '/images/rategameLogo.webp',
        acquireInfo: [
            {
                type: 'appStore',
                link: 'https://apps.apple.com/us/app/rate-game/id6477869711',
            },
            {
                type: 'playStore',
                link: 'https://play.google.com/store/apps/details?id=com.rategamemobile&hl=en&pli=1',
            },
        ],
        stack: [{name:'React Native', logoUrl: LOGOURLS.REACT_NATIVE, docs:DOCSURLS.REACT_NATIVE}, {name:"Nest", logoUrl:LOGOURLS.NEST, docs:DOCSURLS.NEST},{name:"NextJs", logoUrl:LOGOURLS.NEXT, docs:DOCSURLS.NEXT}]
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
        stack: [{name:'React Native', logoUrl: LOGOURLS.REACT_NATIVE, docs:DOCSURLS.REACT_NATIVE}, {name:"Nest", logoUrl:LOGOURLS.NEST, docs:DOCSURLS.NEST}]

    },
    {
        name: 'CherryPick',
        description:'Download directories or files from github without cloning the repository.',
        imageUrl:'/images/cherryPickLogo.jpg',
        acquireInfo: [
        {
            type:'website',
            link:'https://github.com/JustAnotherHeroRiding/CherryPick',
            logo:Github
        }
        ],
    stack: [{name:'GoLang', logoUrl: LOGOURLS.GOLANG, docs:DOCSURLS.GOLANG}]
    }
]