import Socials from './sections/Socials'
import UserInfo from './sections/UserInfo'

const Sidebar = () => {
  return (
    <div className='flex flex-col gap-4 text-slate-100 lg:px-4'>
      <UserInfo />
      <Socials />
    </div>
  )
}
export default Sidebar
