import Github from '../../svg/Github'
import Instagram from '../../svg/Instagram'
import Linkedin from '../../svg/Linkedin'

const Socials = () => {
  return (
    <div className='flex flex-row gap-4 mb-4 align-center justify-center'>
      <a className='hover:opacity-70' href='https://github.com/justAnotherHeroRiding/'>
        <Github fill='#fafafa' />
      </a>
      <a className='hover:opacity-70' href='https://www.linkedin.com/in/kristijan-kocev-69017a203/'>
        <Linkedin fill='#fafafa' />
      </a>
      <a className='hover:opacity-70' href='https://www.instagram.com/stpmkngsns/'>
        <Instagram fill='#fafafa' />
      </a>
    </div>
  )
}

export default Socials
