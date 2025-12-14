import Github from '../../svg/Github'
import Instagram from '../../svg/Instagram'
import Linkedin from '../../svg/Linkedin'

const Socials = () => {
  const socials = [
    {
      name: 'GitHub',
      href: 'https://github.com/justAnotherHeroRiding/',
      Icon: Github,
      hoverColor: 'hover:bg-[#333]',
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/kristijan-kocev-69017a203/',
      Icon: Linkedin,
      hoverColor: 'hover:bg-[#0077B5]',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/stpmkngsns/',
      Icon: Instagram,
      hoverColor: 'hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF]',
    },
  ]

  return (
    <div className='flex flex-row gap-3 py-4 justify-center animate-fade-in animation-delay-400'>
      {socials.map(({ name, href, Icon, hoverColor }) => (
        <a
          key={name}
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          className={`group p-3 rounded-xl bg-nord-accent-1 border border-nord-main-border transition-all duration-300 hover:scale-110 hover:border-transparent ${hoverColor}`}
          title={name}
        >
          <Icon fill='#E5E9F0' size={24} />
        </a>
      ))}
    </div>
  )
}

export default Socials
