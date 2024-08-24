"use client"
export const dynamic = "force-dynamic"

import React, { MouseEventHandler, createContext, useContext, useState } from "react";
import Button, { ButtonProps } from "./Button";


interface ToggleContextType {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ToggleContext = createContext<ToggleContextType>({ open: false, setOpen: () => { } });
// const ToggleContext = createContext(null);
export function Popup(props: { onOpen?: Function, children?: React.ReactNode, props?: React.HTMLAttributes<HTMLDivElement> }) {
    let [open, setOpen] = useState(false);

    function closeModal(e: any) {
        e.stopPropagation()
        setOpen(false)
    }

    let subComponentList = ["PopupCloseButton", "PopupBody", "PopupFooter", "PopupHeader", "PopupOpenButton"];

    let subComponents = subComponentList.map((key) => {
        return React.Children.map(props.children, (child: any) => { return (child.type.name === key && child.type.name != "PopupOpenButton") ? child : null }
        );
    });

    let openButtons = React.Children.map(props.children, (child: any) =>
        child.type.name == "PopupOpenButton" ? child : null
    );

    let openButton = openButtons[0];



    React.useEffect(() => {
        if (open) {
            if (props.onOpen) {
                props.onOpen()
            }
        }
    }, [open])


    


    return (
        <ToggleContext.Provider value={{ open, setOpen }}>
            {openButton ?? <PopupOpenButton>Open</PopupOpenButton>}
            {open &&
                <>
                    <div onClick={(e) => { closeModal(e) }} className=" cover fixed darken z-[999] flex items-center justify-center">
                        <div {...props} className=" animate-in fade-in zoom-in duration-200 fixed bg-background-100 z-[100]  p-4 rounded-[4px]" onClick={(e) => e.stopPropagation()}>
                            {/* {props.children ?? <div className="p-4 bg-background-200">No Content</div>} */}
                            {subComponents.map((component) => { return component })}
                            {/* 
                            <div>Test</div> */}

                        </div>

                    </div>
                </>
            }
        </ToggleContext.Provider>
    )
}


interface CloseButtonProps extends ButtonProps {
    // Add any additional props for OpenButton here
}

export function PopupCloseButton(props: CloseButtonProps) {
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



interface OpenButtonProps extends ButtonProps {
    // Add any additional props for OpenButton here
}

export function PopupOpenButton(props: OpenButtonProps) {
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

// const Header = (props: any ) => <div className='card-header'>{props.children}</div>;
// Popup.Header = Header;
export function PopupBody({ children, className }: { children: React.ReactNode, className?: string }) {
    return <div className={className} >{children}</div>
}



// const Footer = (props: any) => <div className='card-footer'>{props.children}</div>;
// Popup.Footer = Footer;