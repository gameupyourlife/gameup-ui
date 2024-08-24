"use client"
import React from "react";

export default function Cover({ rotate, className, translate, top = false }: { top?: boolean, rotate: string, className?: string, translate: string }) {
    


    
    return (
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className={className + ( top? " rotate-180 ": "" )}>
            <path d="M 1500 120 L 0 120 0 0 1500 0 1500 120z"  className={`${rotate} translate-x-[-2px] translate-y-[${translate}]  shape-fill ${false && "outline outline-[15px] outline-accent "}`} ></path>
        </svg>
    )
}