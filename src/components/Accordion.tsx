import React, { useState, useRef, Children, cloneElement } from "react"

interface AccordionProps {
    title: React.ReactNode;
    duration?: number;
    className?: string;
    contentClassName?: string;
    onChildChange?: any;
}

const Accordion: React.FC<React.PropsWithChildren<AccordionProps>> = ({ title, children, duration = 700, className = '', contentClassName = '', onChildChange }) => {
    const [active, setActive] = useState(false)
    const [height, setHeight] = useState('0px')

    const contentSpace = useRef<HTMLDivElement>(null)

    const toggleAccordion = () => {
        setActive(active === false ? true : false)
        setHeight(active ? '0px' : `${contentSpace.current?.scrollHeight}px`)
        console.log(onChildChange)
        if (onChildChange) onChildChange()
        console.log(contentSpace.current?.scrollHeight)
    }

    function recalculateHeight() {
        console.log("recalculate height called")
        setHeight(active ? '0px' : `${contentSpace.current?.scrollHeight}px`)
    }

    const childrenArray = Children.toArray(children)
    return (
        <div className={`flex flex-col ${className}`}>
            <button
                className={`py-2 px-6 text-white box-border bg-green-500 rounded-t cursor-pointer focus:outline-none flex items-center justify-between ${active ? '' : 'rounded-b'}`}
                onClick={toggleAccordion}
            >
                <p className="inline-block text-footnote font-bold">{title}</p>
            </button>
            <div
                ref={contentSpace}
                style={{ maxHeight: `${height}`, transition: `max-height ${duration}ms ease-in-out`}}
                className={`overflow-y-hidden rounded-b px-2 ${contentClassName !== '' ? contentClassName : 'bg-white'}`}
            >
                <div className="py-4">
                    {Children.map(children, child => {
                        if (React.isValidElement(child) ) {
                            return React.cloneElement<React.PropsWithChildren<AccordionProps>>(child, { onChildChange: recalculateHeight })
                        }
                        return child;
                    })}
                </div>
            </div>
        </div>
    )
}

export default Accordion