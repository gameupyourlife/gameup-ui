"use client"

import React, { act } from "react";
import Button from "./Button";
interface NumberContextType {
    active: number;
    setActive: Function;
    max: number
}

const NumberContext = React.createContext<NumberContextType>({ active: 0, setActive: () => { }, max: 0 });

function ImageSlider({ children }: { children: React.ReactNode }) {
    const [active, setActive] = React.useState(0)

    // let subComponents = ["Slide"].map((key) => {
    //     return React.Children.map(children, (child: any) => {
    //         return (child.type.displayName == (key || undefined)) ? child : null
    //     }
    //     );
    // });

    const subComponents = React.Children.map(children, (child) => { return child }) ?? []
    let max = subComponents.length - 1


    // const interval = setInterval(() => {
    //     next()
    // }, 6000);

    function next() {
        let next = active + 1
        if (next > subComponents.length - 1) {
            setActive(0)
        } else {
            setActive(next)
        }
    }

    function prev() {
        if (active == 0) {
            setActive(subComponents.length - 1)
        } else {
            setActive(active - 1)
        }
    }



    // Image Slider with delay of 2 seconds and loading bar at the bottom indicating when next image will be shown
    return (
        <NumberContext.Provider value={{ active, setActive, max }}>
            <div className="overflow-hidden">

                <div className="flex">
                    <Button onClick={() => { prev() }} >
                        Prev
                    </Button>
                    <Button onClick={() => { next() }} >
                        Next
                    </Button>
                </div>
                <div id="slide-holder" className="flex w-[300vw] " >
                    {subComponents.map((component) => { return component })}
                </div>

            </div>
        </NumberContext.Provider>
    )
}

function Slide({ src, index }: { src: string, index: number }) {
    const { active, setActive, max } = React.useContext(NumberContext);

    let indexMinusOne = index - 1
    let indexPlusOne = index + 1
    // if (indexMinusOne < 0) {
    //     indexMinusOne = max
    // }
    // if (indexPlusOne > max) {
    //     indexPlusOne = 0
    // }


    return (
        <>
            {(active >= indexMinusOne && active <= indexPlusOne ) &&
                <div className={`${active > indexMinusOne ? (active > index ? " -translate-x-full" : " ") : " translate-x-full"} duration-1000 transition-all `}>
                    <img src={src} alt="Slide Image"
                        className="object-cover w-screen " />
                </div>
            }
        </>
    );
}
Slide.displayName = "Slide";
ImageSlider.Slide = Slide;

export { ImageSlider, Slide }
// module.exports = { ImageSlider, Slide }