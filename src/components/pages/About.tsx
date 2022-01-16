const About: React.FC = () => {
    return (
        <div className="container mx-auto flex flex-col justify-cente py-20 lg:py-40 px-10 ">
            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="sm:text-4xl text-3xl mb-4 font-medium text-white">
            Hi, My name is Arung.
            <br/>I make stuffs. Various stuffs.
          </h1>
          <p className="mb-8 leading-relaxed">
            Starting from web development both in front end and back end, I've explored various things in relation with web technologies. I can do DevOps, managing Linux servers, working with AWS, and being a part as your company's infrastructure engineering team.
          </p>
          <p className="mb-8 leading-relaxed">Not only that, I can do game development as well as desktop application developments. I made games using Unity and love to experiment with low-level programming.</p>
          
        </div>

        </div>
    )
}

export default About;