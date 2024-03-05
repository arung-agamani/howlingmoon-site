const QuoteHero: React.FC = () => {
    return (
        <div className="container mx-auto flex flex-col justify-center py-20 lg:py-40 px-10 h-screen">
            <div className="lg:flex-grow md:pr-16 md:items-start md:text-left mb-16 md:mb-0 text-center flex flex-col h-full self-center justify-center">
                <h1 className="sm:text-6xl mb-4 font-medium text-white text-center">
                    "There are just so much possibilities in life that I am just
                    too excited to try them all."
                </h1>
                <p className="text-2xl text-right self-end">
                    - Howling Dev, Arung Agamani
                </p>
            </div>
        </div>
    );
};

export default QuoteHero;
