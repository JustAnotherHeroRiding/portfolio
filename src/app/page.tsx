import Sidebar from './components/sidebar/Sidebar'
import ProjectCard from './components/projects/ProjectCard'
import { projects } from './utils/projects'

export default function Home() {
  return (
    <div className='bg-nord-surface mx-auto flex min-h-screen max-w-[1800px] flex-col max-lg:pb-16 lg:flex-row'>
      <Sidebar />
      <div className='flex flex-col gap-8 items-center'>
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8 px-8'>
          {projects.map(project => {
            return (
              <ProjectCard
                key={project.name}
                name={project.name}
                description={project.description}
                imageUrl={project.imageUrl}
                acquireInfo={project.acquireInfo}
              />
            )
          })}
        </ul>
      </div>
    </div>
  )
}
