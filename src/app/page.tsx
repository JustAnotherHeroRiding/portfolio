import Sidebar from './components/sidebar/Sidebar'
import ProjectCard from './components/projects/ProjectCard'
import FeaturedProjectCard from './components/projects/FeaturedProjectCard'
import { projects } from './utils/projects'

export default function Home() {
  const featuredProject = projects.find(p => p.featured)
  const otherProjects = projects.filter(p => !p.featured)

  return (
    <div className='bg-nord-surface mx-auto flex min-h-screen max-w-[1800px] flex-col lg:flex-row'>
      {/* Sidebar - sticky on desktop */}
      <aside className='lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:w-[420px] xl:w-[480px] flex-shrink-0'>
        <Sidebar />
      </aside>

      {/* Main content */}
      <main className='flex-1 px-4 sm:px-6 lg:px-8 py-8 pb-16 lg:pb-8'>
        {/* Featured Project Section - Single Highlighted Project */}
        {featuredProject && (
          <section className='mb-12 animate-fade-in'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='h-px flex-1 bg-gradient-to-r from-transparent via-nord-highlight-2/50 to-transparent'></div>
              <h2 className='text-xl font-bold text-nord-highlight-2 flex items-center gap-2'>
                <svg className='w-5 h-5 animate-float' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                </svg>
                Featured Project
              </h2>
              <div className='h-px flex-1 bg-gradient-to-r from-transparent via-nord-highlight-2/50 to-transparent'></div>
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
            <div className='h-px flex-1 bg-gradient-to-r from-transparent via-nord-main-border to-transparent'></div>
            <h2 className='text-xl font-bold text-nord-text-primary'>Other Projects</h2>
            <div className='h-px flex-1 bg-gradient-to-r from-transparent via-nord-main-border to-transparent'></div>
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
