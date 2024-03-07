import ScrollAnimation from "react-animate-on-scroll";

import certificateData from "../../data/certifications.json";
import "animate.css/animate.min.css";

const Certificates: React.FC = () => {
    return (
        <section id="projects" className="text-gray-400 bg-gray-900">
            <div className="container px-5 py-10 pt-20 mx-auto text-center lg:px-40">
                <ScrollAnimation animateIn="animate__fadeIn" animateOnce>
                    <div className="flex flex-col w-full mb-14">
                        <h1 className="sm:text-4xl text-3xl font-medium mb-4 text-white">
                            Certifications
                        </h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                            I worked hard on these!
                        </p>
                    </div>
                </ScrollAnimation>
                <div className="grid grid-cols-1">
                    {certificateData.map((project, index) => (
                        <ScrollAnimation
                            animateIn="animate__fadeIn"
                            offset={300}
                            animateOnce
                            key={index}
                        >
                            <div className="flex flex-col sm:flex-row h-full">
                                <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-800 bg-gray-900">
                                    <h2 className="tracking-widest text-lg font-medium text-green-400">
                                        {project.type}
                                    </h2>
                                    <h2 className="tracking-widest text-xs font-medium text-green-400 mb-2">
                                        Issued by : {project.issuer}
                                    </h2>
                                    <h1 className="text-lg font-medium text-white mb-3">
                                        {project.name}
                                    </h1>
                                    <p
                                        className="leading-relaxed"
                                        dangerouslySetInnerHTML={{
                                            __html: project.description,
                                        }}
                                    />
                                </div>
                            </div>
                        </ScrollAnimation>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certificates;
