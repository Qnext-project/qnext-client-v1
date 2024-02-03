import { toast } from "react-toastify"
export const toastHandler = (msg:string) => {
    toast(msg, {
        position: 'bottom-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
}