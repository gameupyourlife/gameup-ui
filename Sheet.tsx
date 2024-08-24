"use client"
export const dynamic = "force-dynamic"

import React, { MouseEventHandler, createContext, useContext, useState } from "react";
import Button, { ButtonProps } from "./Button";


interface ToggleContextType {
    open: boolean;
    setOpen: Function;
}
const ToggleContext = createContext<ToggleContextType>({ open: false, setOpen: () => { } });
// const ToggleContext = createContext(null);
export function Sheet(props: { onOpen?: Function, children?: React.ReactNode, props?: React.HTMLAttributes<HTMLDivElement> }) {
    let [open, setVarOpen] = useState(false);
    let [display, setDisplay] = useState(false);

    function setOpen(show: boolean) {
        if (show) {
            setDisplay(true)
            setVarOpen(true)
        }
        else {
            setVarOpen(false)
        }
    }

    function closeModal(e: any) {
        e.stopPropagation()
        setOpen(false)
    }

    let openButton;
    let subComponents = Object.keys(Sheet).map((key) => {
        return React.Children.map(props.children, (child: any) => { 
            if(child.type.displayName == "SheetOpenButton") {
                openButton = child
                return null
            }
            return (child.type.displayName == key) ? child : null }
        );
    });



    React.useEffect(() => {
        if (open) {
            if (props.onOpen) {
                props.onOpen()
            }
        }
    }, [open])





    return (
        <ToggleContext.Provider value={{ open, setOpen }}>
            {openButton ?? <SheetOpenButton>X</SheetOpenButton>}
            {display &&
                <div onClick={(e) => { closeModal(e) }} className={` cover fixed z-[999] flex items-center justify-center`}>
                    <div
                        {...props}
                        className={`${open ? "animate-in slide-in-from-right " : "animate-out slide-out-to-right-[105%] "} duration-300 min-w-60 h-screen top-0 right-0 transition-transform  fixed bg-background-200 z-[100]  p-4 rounded-l-[4px] `}
                        onClick={(e) => e.stopPropagation()}
                        onAnimationEnd={(e) => {
                            if (!open) {
                                e.currentTarget.classList.add("-right-full")
                                e.currentTarget.classList.remove("right-0")
                                setDisplay(false)
                            }
                        }
                        }
                    // onAnimationEnd={() => { if (!open) setDisplay(false) }}
                    >
                        {/* {props.children ?? <div className="p-4 bg-background-200">No Content</div>} */}
                        {subComponents.map((component) => { return component })}
                        {/* 
                            <div>Test</div> */}

                    </div>

                </div>}
        </ToggleContext.Provider >
    )
}


interface CloseButtonProps extends ButtonProps {
    // Add any additional props for OpenButton here
}

export function SheetCloseButton(props: CloseButtonProps) {
    const { open, setOpen } = useContext(ToggleContext);

    function executeClick(e: any) {
        if (props.onClick) {
            props.onClick(e)
        }
        setOpen(false)
    }

    return (
        <Button {...props} onClick={(e) => executeClick(e)}>
            {props.children}
        </Button>
    )
}
SheetCloseButton.displayName = "SheetCloseButton";
Sheet.SheetCloseButton = SheetCloseButton;

interface OpenButtonProps extends ButtonProps {
    // Add any additional props for OpenButton here
}

export function SheetOpenButton(props: OpenButtonProps) {
    const { open, setOpen } = useContext(ToggleContext);

    function executeClick(e: any) {
        if (props.onClick) {
            props.onClick(e);
        }
        setOpen(true);
    }

    return (
        <Button {...props} onClick={(e) => executeClick(e)}>
            {props.children}
        </Button>
    );
}
SheetOpenButton.displayName = "SheetOpenButton";
Sheet.SheetOpenButton = SheetOpenButton;

// const Header = (props: any ) => <div className='card-header'>{props.children}</div>;
// Sheet.Header = Header;
export function SheetBody({ children, className }: { children: React.ReactNode, className: string }) {
    return <div className={className} >{children}</div>
}
SheetBody.displayName = "SheetBody";    
Sheet.SheetBody = SheetBody


// const Footer = (props: any) => <div className='card-footer'>{props.children}</div>;
// Sheet.Footer = Footer;