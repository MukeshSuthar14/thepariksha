import React, { createContext, useContext, useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../components/ui/alert-dialog"

type ConfirmDialogOptions = {
    title: string,
    message: string,
    confirmText?: string
    cancelText?: string
    onOkay: () => void,
    onCancel?: () => void
}

type Props = {
    children: React.ReactNode
}

export const ConfirmContext = createContext<((options: ConfirmDialogOptions) => void) | undefined>(undefined);

export const useConfirm = () => {
    const confirmDialog = useContext(ConfirmContext);

    if (!confirmDialog) {
        throw new Error("useConfirm is only work within ConfirmDialog Provider.");
    }

    return confirmDialog
}

export const ConfirmDialogProvider = ({
    children
}: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [options, setOptions] = useState<ConfirmDialogOptions>({
        title: "",
        message: "",
        confirmText: "Confirm",
        cancelText: "Cancel",
        onOkay: () => { },
        onCancel: () => { }
    });
    const confirmDialog = (option: ConfirmDialogOptions) => {
        setOptions({
            ...options,
            ...option
        });
        setOpen(true);
    }
    const handleConfirm = () => {
        if (options.onOkay) options.onOkay();
        setOpen(false);
        return;
    }
    const handleCancel = () => {
        if (options.onCancel) options.onCancel();
        setOpen(false);
        return;
    }
    return (
        <ConfirmContext.Provider value={confirmDialog}>
            {children}
            <AlertDialog open={open}>
                <AlertDialogContent className="">
                    <AlertDialogHeader>
                        <AlertDialogTitle>{options.title}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {options.message}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-3">
                        <AlertDialogAction className="" onClick={handleConfirm}>{options.confirmText}</AlertDialogAction>
                        <AlertDialogCancel onClick={handleCancel}>{options.cancelText}</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </ConfirmContext.Provider>
    )
}