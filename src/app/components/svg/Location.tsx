import { SVGProps } from '@/app/utils/SVGProps'

const Location = ({ size = 24, fill = '#5f6368' }: SVGProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height={`${size}px`}
      viewBox='0 -960 960 960'
      width={`${size}px`}
      fill={fill}
    >
      <path d='M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z' />
    </svg>
  )
}
export default Location
