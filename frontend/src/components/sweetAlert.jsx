import Swal from 'sweetalert2'
export function SweetAlert(message) {
    Swal.fire({
        position: "center",
        icon: "success",
        title: `${message}`,
        showConfirmButton: false,
        timer: 1500
    });
}

export function SweetAlertError(message) {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
    });
}
