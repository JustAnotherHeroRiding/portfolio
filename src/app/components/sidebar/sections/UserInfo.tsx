import Engineer from '../../svg/Engineer'
import Location from '../../svg/Location'

const UserInfo = () => {
  return (
    <div className='flex flex-col items-center justify-center py-12'>
      <span>Kristijan Kocev</span>
      <div className='flex flex-row gap-4'>
        <div className='flex flex-row gap-1'>
          <Location fill='#94a3b8' />
          <span>Skopje</span>
        </div>
        <div className='flex flex-row gap-1'>
          <Engineer fill='#94a3b8' />
          <span>Software Engineer</span>
        </div>
      </div>
    </div>
  )
}
export default UserInfo
