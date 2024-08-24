"use client"

import React from "react";
import Button, { ButtonProps } from "./Button";

interface ToggleButtonProps extends ButtonProps {
    onToggle: (value: boolean) => void,
    toggled?: boolean

}

export default function ToggleButton(props: ToggleButtonProps) {
    const [active, setActive] = React.useState(props.toggled ?? false)

    let selectedColor = "";
    switch (props.variant) {
        case "default":
            selectedColor = " !border-text-100 !bg-text-100 !text-background-100 hover:!bg-text-100/75"
            break;
        case "danger":
            selectedColor = " !border-danger !bg-danger !text-text-100 hover:!bg-danger/75"
            break;
        case "primary":
            selectedColor = " !border-primary !bg-primary !text-background-100 hover:!bg-primary/75"
            break;
        case "accent":
            selectedColor = " !border-accent !bg-accent !text-background-100 hover:!bg-accent/75"
            break;
        default:
            selectedColor = " !border-text-100 !bg-text-100 !text-background-100 hover:!bg-text-100/75"
            break;
    }

    return (
        <Button
            onClick={(e) => {
                if (props.onClick) { props.onClick(e) }

                props.onToggle(!active)
                setActive(!active)
            }}
            className={(active ? selectedColor : "")}
            {...props}
        >
            {props.children}
        </Button>
    )

}
