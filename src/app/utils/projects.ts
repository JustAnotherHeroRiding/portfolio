import { SVGProps } from '@/app/utils/SVGProps'
import Github from '../components/svg/Github'
import { WiseMarginLogo } from '../../../public/icons/WiseMarginLogo'

enum LOGOURLS {
  REACT_NATIVE = 'https://cdn.worldvectorlogo.com/logos/react-native-1.svg',
  GOLANG = 'https://go.dev/blog/go-brand/Go-Logo/PNG/Go-Logo_Blue.png',
  NEST = 'https://upload.wikimedia.org/wikipedia/commons/a/a8/NestJS.svg',
  NEXT = 'https://cdn.worldvectorlogo.com/logos/next-js.svg',
  TYPESCRIPT = 'https://cdn.worldvectorlogo.com/logos/typescript.svg',
  SHOPIFY = 'https://cdn.worldvectorlogo.com/logos/shopify.svg',
  POWERSHELL = 'https://upload.wikimedia.org/wikipedia/commons/a/af/PowerShell_Core_6.0_icon.png',
}

enum DOCSURLS {
  REACT_NATIVE = 'https://reactnative.dev/docs/getting-started',
  GOLANG = 'https://go.dev/doc/',
  NEST = 'https://docs.nestjs.com/',
  NEXT = 'https://nextjs.org/docs',
  TYPESCRIPT = 'https://www.typescriptlang.org/docs/',
  SHOPIFY = 'https://shopify.dev/docs',
  POWERSHELL = 'https://learn.microsoft.com/en-us/powershell/',
}

export interface AcquireInfo {
  type: 'appStore' | 'playStore' | 'website' | 'contact'
  link?: string // Optional link for website or app stores
  logo?: React.FC<SVGProps>
}
export interface Tech {
  name: string
  logoUrl: string
  docs: string
}

export interface Project {
  name: string
  description: string
  imageUrl?: string
  imageComponent?: React.FC<SVGProps>
  acquireInfo: AcquireInfo[]
  stack: Tech[]
  featured?: boolean
}

export const logoComponentMap = {
  WiseMargin: WiseMarginLogo,
}

export const projects: Project[] = [
  {
    name: 'Rate Game',
    description:
      'Rate sports games and share your takes. Letterboxd for sports fighting to bring back the love of the game as the sports world keeps moving towards gambling.',
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
    stack: [
      { name: 'React Native', logoUrl: LOGOURLS.REACT_NATIVE, docs: DOCSURLS.REACT_NATIVE },
      { name: 'Nest', logoUrl: LOGOURLS.NEST, docs: DOCSURLS.NEST },
      { name: 'NextJs', logoUrl: LOGOURLS.NEXT, docs: DOCSURLS.NEXT },
    ],
    featured: true,
  },
  {
    name: 'OnlyScans',
    description:
      'Simple, fast document scanning app with Google Drive integration. Scan documents using your phone camera and automatically backup to your cloud storage.',
    imageUrl: '/images/onlyscans-logo.png',
    acquireInfo: [
      {
        type: 'website',
        link: '/onlyscans',
      },
    ],
    stack: [
      { name: 'React Native', logoUrl: LOGOURLS.REACT_NATIVE, docs: DOCSURLS.REACT_NATIVE },
      { name: 'TypeScript', logoUrl: LOGOURLS.TYPESCRIPT, docs: DOCSURLS.TYPESCRIPT },
    ],
  },
  {
    name: 'Pitcher',
    description:
      'AI-powered pitch detection app that identifies musical notes and chords in real-time. Perfect for musicians learning songs by ear or tuning their instruments.',
    imageUrl: '/images/default-logo.png',
    acquireInfo: [
      {
        type: 'contact',
      },
    ],
    stack: [
      { name: 'React Native', logoUrl: LOGOURLS.REACT_NATIVE, docs: DOCSURLS.REACT_NATIVE },
      { name: 'TypeScript', logoUrl: LOGOURLS.TYPESCRIPT, docs: DOCSURLS.TYPESCRIPT },
    ],
  },
  {
    name: 'WiseMargin',
    description: 'AI-powered profitability platform that gives you data-driven insights for your e-commerce shops',
    imageComponent: WiseMarginLogo,
    acquireInfo: [
      {
        type: 'website',
        link: 'https://wisemargin.com/',
      },
    ],
    stack: [
      { name: 'NextJs', logoUrl: LOGOURLS.NEXT, docs: DOCSURLS.NEXT },
      { name: 'NestJs', logoUrl: LOGOURLS.NEST, docs: DOCSURLS.NEST },
    ],
  },
  {
    name: 'MA Technix',
    description: 'Custom Shopify e-commerce store with automated inventory management using PowerShell/Batch scripts',
    imageUrl: '/images/ma-technix-logo.webp',
    acquireInfo: [
      {
        type: 'website',
        link: 'https://ma-technix.de/',
      },
    ],
    stack: [
      { name: 'Shopify', logoUrl: LOGOURLS.SHOPIFY, docs: DOCSURLS.SHOPIFY },
      { name: 'PowerShell', logoUrl: LOGOURLS.POWERSHELL, docs: DOCSURLS.POWERSHELL },
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
    stack: [
      { name: 'React Native', logoUrl: LOGOURLS.REACT_NATIVE, docs: DOCSURLS.REACT_NATIVE },
      { name: 'Nest', logoUrl: LOGOURLS.NEST, docs: DOCSURLS.NEST },
    ],
  },
  {
    name: 'CherryPick',
    description: 'Download directories or files from github without cloning the repository.',
    imageUrl: '/images/cherryPickLogo.jpg',
    acquireInfo: [
      {
        type: 'website',
        link: 'https://github.com/JustAnotherHeroRiding/CherryPick',
        logo: Github,
      },
    ],
    stack: [{ name: 'GoLang', logoUrl: LOGOURLS.GOLANG, docs: DOCSURLS.GOLANG }],
  },
]
