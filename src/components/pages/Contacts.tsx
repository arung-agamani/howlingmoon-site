import ScrollAnimation from "react-animate-on-scroll"
import githubLogo from '../../assets/github_logo.png'
import emailLogo from '../../assets/email_logo.png'

const Contacts: React.FC = () => {
    return (
        <section id="contacts">
            <div className="container px-5 py-10 mx-auto text-center lg:px-40">
                <ScrollAnimation animateIn='animate__fadeIn' animateOnce>
                    <div className="flex flex-col w-full mb-14">
                        <h1 className="sm:text-4xl text-3xl font-medium mb-4 text-white">
                            Contact Me
                        </h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                            "Tak kenal, maka tak sayang"
                        </p>
                    </div>
                </ScrollAnimation>
                <ScrollAnimation animateIn="animate__fadeIn" animateOnce>
                    <div className="flex flex-col lg:flex-row justify-center">
                        <a href="https://github.com/arung-agamani"
                            className="mx-auto lg:mx-4 my-4 px-8 py-10 w-full max-w-sm border-4 border-gray-800 hover:bg-gray-800 transition-all bg-gray-900 bg-opacity-50"
                        >
                            <div className="">
                                <div>
                                    <img className="block mx-auto mb-2" src={githubLogo} alt="github logo" />
                                </div>
                                <h1 className='text-lg font-medium text-white mb-3'>GitHub</h1>
                                <p className="leading-relaxed">My code repositories</p>
                            </div>
                        </a>
                        <a 
                            className="mx-auto lg:mx-4 my-4 px-8 py-10 w-full max-w-sm border-4 border-gray-800 hover:bg-gray-800 transition-all bg-gray-900 bg-opacity-50"
                            href="mailto:arung.agamani@gmail.com"
                        >
                            <div>
                                <div>
                                    <img className="block mx-auto mb-2" src={emailLogo} alt="github logo" style={{ width: 'auto', height:'120px'}}/>
                                </div>
                                <h1 className='text-lg font-medium text-white mb-3'>Email</h1>
                                <p className="leading-relaxed">If you want to get personal</p>
                            </div>
                        </a>
                    </div>
                </ScrollAnimation>
            </div>
        </section>
    )
}

export default Contacts