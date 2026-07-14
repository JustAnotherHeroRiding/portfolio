import Sidebar from './components/sidebar/Sidebar'
import ProjectCard from './components/projects/ProjectCard'
import FeaturedProjectCard from './components/projects/FeaturedProjectCard'
import RippleGrid from './components/RippleGrid'
import { projects } from './utils/projects'

export default function Home() {
  const featuredProject = projects.find(p => p.featured)
  const otherProjects = projects.filter(p => !p.featured)
  return (
    <div className='relative isolate mx-auto flex min-h-screen max-w-[1800px] select-none flex-col lg:flex-row'>
      <RippleGrid />
      {/* Sidebar - sticky on desktop */}
      <aside className='relative z-10 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:w-[420px] xl:w-[480px] flex-shrink-0'>
        <Sidebar />
      </aside>

      {/* Main content */}
      <main className='relative z-10 flex-1 px-4 sm:px-6 lg:px-8 py-8 pb-16 lg:pb-8'>
        {/* Featured Project Section - Single Highlighted Project */}
        {featuredProject && (
          <section className='mb-12 animate-fade-in'>
            <div className='flex items-center gap-3 mb-6 justify-center'>
              <h2 className='text-xl text-center w-full font-bold text-nord-highlight-2'>
                Featured Project
              </h2>
            </div>
            <FeaturedProjectCard
              name={featuredProject.name}
              description={featuredProject.description}
              imageUrl={featuredProject.imageUrl}
              acquireInfo={featuredProject.acquireInfo}
              stack={featuredProject.stack}
              featured={featuredProject.featured}
            />
          </section>
        )}

        {/* Other Projects Section */}
        <section className='animate-fade-in animation-delay-200'>
          <div className='flex items-center gap-3 mb-6'>
            <h2 className='text-xl font-bold text-nord-text-primary'>Other Projects</h2>
          </div>
          <ul className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 stagger-children'>
            {otherProjects.map(project => (
              <ProjectCard
                key={project.name}
                name={project.name}
                description={project.description}
                imageUrl={project.imageUrl}
                acquireInfo={project.acquireInfo}
                stack={project.stack}
                imageComponent={project.imageComponent}
              />
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}
