"use client"

import { useTheme } from "next-themes";
import { MouseEventHandler } from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: "xs" | "md" | "lg" | "xl",
    onClick?: MouseEventHandler,
    children: React.ReactNode,
    className?: string,
    props?: React.ButtonHTMLAttributes<HTMLButtonElement>,
    variant?: "default" | "primary" | "danger" | "accent" | "secondary" | "cta",
    icon?: boolean,
    arrow?: boolean,
    link?: boolean
}


export default function Button({ link, arrow, icon, size, variant = "default", children, onClick, className, props }: ButtonProps) {
    const theme = useTheme();

    if (icon) className += " aspect-square"
    switch (size) {
        case "xs":
            className += " h-4 text-xs"
            break;
        case "md":
            className += " h-6 text-sm"
            break;
        case "lg":
            className += " h-8 p-2"
            break;
        case "xl":
            className += " h-10 p-2"
            break;
        default:
            className += " h-10 p-2"
            break;
    }

    if (link) { className += " border-transparent bg-transparent !p-0" }
    else {
        className += " border-2 rounded-[4px] justify-center items-center"
    }

    switch (variant) {
        case "default":
            if (link) {
                className += " text-text-100 hover:text-text-100/75"
            } else {
                className += " bg-text-100/20 text-text-100 border-text-100/50 hover:border-text-100 hover:bg-text-100 hover:text-background-100"
            }
            break;
        case "danger":
            if (link) {
                className += " text-danger hover:text-danger/75"
            } else {
                className += " bg-danger/20 text-danger  border-danger/50  hover:border-danger hover:bg-danger hover:text-text-100 "
            }
            break;
        case "primary":
            if (link) {
                className += " text-primary hover:text-primary/75"
            } else {
                className += " bg-primary/20 text-primary  border-primary/50  hover:border-primary hover:bg-primary hover:text-background-100 "
            }
            break;
        case "cta":
            if (link) {
                className += " text-primary hover:text-primary/75"
            } else {
                className += "  text-background-100 bg-primary border-primary hover:scale-105 hover:text-text-100 hover:text-background-100 "
            }
            break;
        case "accent":
            if (link) {
                className += " text-accent hover:text-accent/75"
            } else {
                className += " bg-accent/20 text-accent  border-accent/50  hover:border-accent hover:bg-accent hover:text-background-100 "
            }
            break;
        case "secondary":
            if (link) {
                className += " text-secondary hover:text-secondary/75"
            } else {
                className += " bg-secondary/20 text-secondary  border-secondary/50  hover:border-secondary hover:bg-secondary hover:text-background-100 "
            }
            break;
    }


    // else if(theme == "light") {
    //     colors = "bg-background-100/20 text-background-100 border-background-100/50 hover:bg-background-100 hover:text-text-100   transition-colors duration-200"
    // }
    return (
        <button onClick={onClick ?? (() => { })} className={`   flex group transition-all duration-200  ${className}`} {...props}>
            {children} {arrow ? <span className="group-hover:ml-4 ml-2 transition-all mr-2 group-hover:mr-0">&rarr;</span> : null}
        </button>
    );
}

// button {
//     border-radius: 4px;
//     display: flex;
//     justify-content: center;
//     align-items: center;

//     min-width: 40px;
//     height: 40px;
//     padding: 8px;
//     border: 2px solid var(--text-transparant);
//     background-color: var(--text-transparant);

//     font-size: 16px;
//     font-weight: normal;
// }