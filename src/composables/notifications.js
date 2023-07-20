import Swal from "sweetalert2";

export const simpleNotification = Swal.mixin({
    position: 'center',
    timerProgressBar: true,
    confirmButtonColor: '#15803d',
    cancelButtonColor: '#dc2626',
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

export const toastNotification = Swal.mixin({
    toast: true,
    width: 400,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
