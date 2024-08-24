import { Trash2 } from "lucide-react"
import { Popup, PopupBody, PopupCloseButton, PopupOpenButton } from "./Popup"
import { ButtonProps } from "./Button"


export interface ConfirmButtonProps extends ButtonProps {
    confirmedAction: Function,
    confirmMessage?: string
    confirm?: string
    cancle?: string
    title?: string
}

export default function ConfirmButton(props: ConfirmButtonProps) {

    return (
        <Popup>
            <PopupOpenButton {...props}>
                {props.children}
            </PopupOpenButton>
            <PopupBody>
                <h5>
                    {props.title ?? "Bist du sicher?"}
                </h5>
                <p className="text-text-100/75">
                    {props.confirmMessage ?? "Diese Aktion kann nicht rückgängig gemacht werden."}
                </p>
                <div className="flex gap-2 mt-4 w-full justify-end">
                    <PopupCloseButton >
                        {props.cancle ?? "Abbrechen"}
                    </PopupCloseButton>
                    <PopupCloseButton onClick={() => { props.confirmedAction() }} variant="danger">
                        {props.confirm ?? "Bestätigen"}
                    </PopupCloseButton>
                </div>
            </PopupBody>
        </Popup>
    )
}