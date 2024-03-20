import Swal from 'sweetalert2/dist/sweetalert2';

export const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-right',
    iconColor: 'white',
    customClass: {
        popup: 'colored-toast',
        icon: 'wajdiii'
    },
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
});
