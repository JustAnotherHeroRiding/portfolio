import ContactMe from './sections/ContactMe'
import Socials from './sections/Socials'
import UserInfo from './sections/UserInfo'
import { Writings } from './sections/Writings'

const Sidebar = () => {
  return (
    <div className='flex flex-col gap-6 text-slate-100 py-4 lg:py-8'>
      <UserInfo />
      <Writings />
      <ContactMe />
      <Socials />
    </div>
  )
}
export default Sidebar
