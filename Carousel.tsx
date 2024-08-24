"use client"
import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Button from './Button'
import { ArrowLeft, ArrowRight, ArrowRightCircle } from 'lucide-react'
import Autoplay from 'embla-carousel-autoplay'
import Cover from './Cover'

export default function Carousel({ children, covers }: { children: React.ReactNode, covers?: boolean }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true
    }, [
        Autoplay({ playOnInit: true, delay: 5000, stopOnMouseEnter: false, stopOnInteraction: false })
    ])

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    return (
        <div className="embla relative">
            {covers && <Cover className="fill-background-100 absolute -top-1 z-20  max-w-[100vw]" rotate="-rotate-1" translate="0px" />}
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {children}
                </div>
            </div>
            {covers && <Cover top className="fill-background-100 absolute -bottom-1 z-20" rotate="-rotate-1" translate="0px" />}
        </div>
    )
}

export function FullscreenSlide({ src, className = "", title, desc }: { title: string, desc: string, src: string, className?: string }) {
    return (
        <div className={"embla__slide relative w-screen flex-grow-0 flex-shrink-0 text-light " + className}>
            <img src={src} alt="Slide Image" className="aspect-[16/9] object-cover w-full " />
            <div className='hidden md:block'>

                <div className='absolute bottom-0 right-0 w-full h-[50%] bg-gradient-to-t from-dark/50 to-transparent'>
                </div>
                <div className="absolute bottom-[15%] margin-x-4 max-w-xl p-4  ">
                    <h3 className="">{title}</h3>
                    <p className="">{desc}</p>
                </div>
            </div>
        </div>
    )
}

export function CustomSlide({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`${className} embla__slide relative`}>
            {children}
        </div>
    )
}