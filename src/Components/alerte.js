import Swal from 'sweetalert2';

    export function alerteErreur(titre,texte){
        return Swal.fire({
            icon: 'error',
            title: titre,
            text: texte,
        })
    }
    export function alertevalidation(title,texte,confirm,cancel){
       return Swal.fire({
            title: title,
            text: texte,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirm,
            cancelButtonText: cancel
          })
    }
