
const clickToDeleteId = (url) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: "success"
            }).then(() => {
                window.location.href = url;
            });
        }
    });
};

const clickToChangeStatus = (url) => {
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Status changed",
        showConfirmButton: false,
        timer: 1000
      }).then(()=> {
        window.location.href = url
      })
}


$(document).ready(function () {

    $('.ordering').change(function (e) { 

        e.preventDefault(); 
        toastr.options = {
            "closeButton": true,            
            "timeOut": 2000,                
            "extendedTimeOut": 1000,       
            "positionClass": "toast-top-right",  
            "progressBar": true,            
        };

        const val = $(this).val();
        const link = $(this).data('link') + '/' + val;
        
        $.ajax({
            url: link,
            type: 'GET',
            data: { ordering: val },
            success: function() {
                toastr.success('Ordering updated successfully!', 'Success');
            }})
        });

    $('#edit').summernote({
        height: 200,
        minHeight: null,
        maxHeight: null,
        focus: true,
    })

    // imgInp.onchange = evt => {
    //     const [file] = imgInp.files
    //     if (file) {
    //         blah.src = URL.createObjectURL(file)
    //     }
    // }

    // const inputElement = $('#filepond')
    // FilePond.registerPlugin(
    //     FilePondPluginImagePreview,
    //     FilePondPluginImageExifOrientation
    //   );
    // const pond = FilePond.create(inputElement[0])
    // pond.setOptions({
    //     imagePreviewMinHeight : 50,
    //     imagePreviewMaxWidth : 50,
    //     maxFiles: 5,
    //     maxFileSize: '5MB',
    //     acceptedFileTypes: ['image/*'],
    // });


    // Register FilePond plugins
    FilePond.registerPlugin(FilePondPluginImagePreview);

    // Create FilePond instances
    const pondImages = FilePond.create(document.querySelector('#filepond-images'));
    const pondImage = FilePond.create(document.querySelector('#filepond-image'));

    // Configure FilePond for images
    pondImages.setOptions({
        server: {
            url: '/admin/product/form', // Endpoint to handle file uploads
            process: {
                url: '/admin/product/form', // Processing endpoint
                method: 'POST',
                // headers: {
                //     'X-CSRF-TOKEN': '{{ csrf_token() }}' // Adjust CSRF token if needed
                // },
                onload: (response) => {
                    // Handle the response
                    return response.key; // Return the key from the response to FilePond
                },
                onerror: (response) => {
                    // Handle the error
                    return response.message; // Return error message
                }
            },
            revert: '/admin/product/form', // Endpoint to revert file
            remove: '/admin/product/form', // Endpoint to remove file
        },
        instantUpload: false, // Prevent instant upload
        imagePreviewHeight: 170,
        allowRevert: true,
        allowRemove: true
    });

    pondImage.setOptions({
        server: {
            url: '/admin/product/form', // Endpoint to handle file uploads
            process: {
                url: '/admin/product/form', // Processing endpoint
                method: 'POST',
                // headers: {
                //     'X-CSRF-TOKEN': '{{ csrf_token() }}' // Adjust CSRF token if needed
                // },
                onload: (response) => {
                    // Handle the response
                    return response.key; // Return the key from the response to FilePond
                },
                onerror: (response) => {
                    // Handle the error
                    return response.message; // Return error message
                }
            },
            revert: '/admin/product/form', // Endpoint to revert file
            remove: '/admin/product/form', // Endpoint to remove file
        },
        instantUpload: false, // Prevent instant upload
        imagePreviewHeight: 170,
        allowRevert: true,
        allowRemove: true
    });
});





