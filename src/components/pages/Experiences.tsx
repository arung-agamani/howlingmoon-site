import Accordion from "../Accordion"
import ScrollAnimation from "react-animate-on-scroll"

import experiencesData from '../../data/experiences.json'

const Experiences: React.FC = () => {
    return (
        <section id="experiences">
            <div className="container px-5 py-10 mx-auto text-center lg:px-40">
                <ScrollAnimation animateIn='animate__fadeIn' animateOnce>
                    <div className="flex flex-col w-full mb-14">
                        <h1 className="sm:text-4xl text-3xl font-medium mb-4 text-white">
                            Experiences
                        </h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                            Because life is a very good game with awesome graphics, but very poor story writing.
                        </p>
                    </div>
                </ScrollAnimation>
                <ScrollAnimation animateIn="animate__fadeIn" animateOnce>
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-1/2">
                            {experiencesData.map((exp, idx) => {
                                if (idx % 2 != 0) return;
                                return (
                                    <Accordion title={<p>{exp.title}</p>} className="px-2 py-2">
                                        <div>
                                            <p className="pb-2 text-black px-2 text-justify">{exp.description}</p>
                                            {exp.sections.map(sect => <>
                                                <hr className="pb-2" />
                                                <span className="text-bold text-black text-2xl">{sect.title}</span>
                                                <ul className="text-black text-left pl-8 pb-2 list-disc">
                                                    {sect.items.map(it => <li>{it}</li>)}
                                                </ul>    
                                            </>)}
                                        </div>
                                    </Accordion>
                                )
                            })}
                        </div>
                        <div className="w-full lg:w-1/2">
                            {experiencesData.map((exp, idx) => {
                                if (idx % 2 == 0) return;
                                return (
                                    <Accordion title={<p>{exp.title}</p>} className="px-2 py-2">
                                        <div>
                                            <p className="pb-2 text-black px-2 text-justify">{exp.description}</p>
                                            {exp.sections.map(sect => <>
                                                <hr className="pb-2" />
                                                <span className="text-bold text-black text-2xl">{sect.title}</span>
                                                <ul className="text-black text-left pl-8 pb-2 list-disc">
                                                    {sect.items.map(it => <li>{it}</li>)}
                                                </ul>    
                                            </>)}
                                        </div>
                                    </Accordion>
                                )
                            })}
                        </div>

                    </div>
                </ScrollAnimation>
            </div>
        </section>
    )
}

export default Experiences