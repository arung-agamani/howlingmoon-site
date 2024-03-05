const Hero: React.FC = () => {
    return (
        <>
            <video
                autoPlay
                loop
                className="absolute -z-[5] w-screen hidden lg:block"
            >
                <source
                    src="https://howling-blog-uploads.s3.ap-southeast-1.amazonaws.com/test-web.mp4"
                    type="video/mp4"
                />
            </video>
            <div className="container mx-auto flex flex-col justify-center  lg:py-40 px-10 h-screen pt-40 ">
                <div className="lg:flex-grow md:pr-16 md:items-start md:text-left mb-16 md:mb-0 text-center flex flex-col h-full self-center justify-center">
                    {/* <h1 className="sm:text-6xl mb-4 font-medium text-white text-center self-center">
                        Howlingmoon Dev.
                    </h1> */}
                    <span className="hidden lg:block">
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                    </span>
                    <p className="text-2xl text-center self-center text-white lg:text-black">
                        - Howling Dev, Arung Agamani -
                    </p>
                    <p className="my-8 text-center self-center text-white lg:text-black">
                        A collection of what a teenage once dreamt, and what the
                        world able to offer, and what oneself can bring with
                        determination.
                        <br />
                        In this place, you can find collections of my projects,
                        my ambitions, and what can be used to determine your
                        view towards the author.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Hero;
