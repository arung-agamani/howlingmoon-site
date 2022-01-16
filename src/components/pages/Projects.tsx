import ScrollAnimation from 'react-animate-on-scroll'

import projectsData from '../../data/projects.json'
import "animate.css/animate.min.css"

const Projects: React.FC = () => {
    return (
        <section id="projects" className="text-gray-400 bg-gray-900">
            <div className="container px-5 py-10 mx-auto text-center lg:px-40">
                <ScrollAnimation animateIn='animate__fadeIn' animateOnce>
                    <div className="flex flex-col w-full mb-14">
                        <h1 className="sm:text-4xl text-3xl font-medium mb-4 text-white">
                            Stuffs I made
                        </h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                            Where my life can go pretty wild...
                        </p>
                        <a
                            href="https://github.com/arung-agamani"
                            className="mt-4 inline-flex text-white bg-green-500 border-0 py-2 px-6 mx-auto focus:outline-none hover:bg-green-600 rounded text-lg">
                            Le GitHub
                        </a>
                    </div>
                </ScrollAnimation>
                <div className="flex flex-wrap -m-4">
                    {projectsData.map((project) => (
                        <ScrollAnimation animateIn='animate__fadeIn' offset={300} animateOnce>
                            <a href={project.link} key={project.image} className='p-4'>
                                <div className='flex flex-col sm:flex-row'>
                                    <img src={project.image} alt="project image gallery" className='relative inset-0 w-100 sm:w-1/2 object-cover object-center aspect-square xs:aspect-video'/>
                                    <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-800 bg-gray-900">
                                        <h2 className="tracking-widest text-sm font-medium text-green-400 mb-1">
                                            {project.subtitle}
                                        </h2>
                                        <h1 className='text-lg font-medium text-white mb-3'>{project.title}</h1>
                                        <p className="leading-relaxed">{project.description}</p>
                                    </div>
                                </div>
                            </a>
                        </ScrollAnimation>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Projects