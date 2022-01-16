import React, { useState, useRef } from "react"

interface AccordionProps {
    title: React.ReactNode;
    duration?: number;
    className?: string;
    contentClassName?: string;
}

const Accordion: React.FC<React.PropsWithChildren<AccordionProps>> = ({ title, children, duration = 700, className = '', contentClassName = '' }) => {
    const [active, setActive] = useState(false)
    const [height, setHeight] = useState('0px')

    const contentSpace = useRef<HTMLDivElement>(null)

    const toggleAccordion = () => {
        setActive(active === false ? true : false)
        setHeight(active ? '0px' : `${contentSpace.current?.scrollHeight}px`)
    }

    return (
        <div className={`flex flex-col ${className}`}>
            <button
                className={`py-2 px-6 text-white box-border bg-green-500 rounded-t cursor-pointer focus:outline-none flex items-center ${active ? '' : 'rounded-b'}`}
                onClick={toggleAccordion}
            >
                {title}
            </button>
            <div
                ref={contentSpace}
                style={{ maxHeight: `${height}`, transition: `max-height ${duration}ms ease-in-out`}}
                className={`overflow-y-hidden rounded-b px-2 ${contentClassName !== '' ? contentClassName : 'bg-white'}`}
            >
                <div className="py-4">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Accordion