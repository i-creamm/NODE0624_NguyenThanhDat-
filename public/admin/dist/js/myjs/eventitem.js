
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

    const url = window.location.href
    const arrUrl = url.split('/')
    let activeName = arrUrl[4] ||  'dashboard'
    $(`#${activeName}`).parent().parent().parent().addClass('menu-open');
    $(`#${activeName}`).addClass('active');

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

    $('#service').summernote({
        height: 200,
        minHeight: null,
        maxHeight: null,
        focus: true,
    })

    $('#return').summernote({
        height: 200,
        minHeight: null,
        maxHeight: null,
        focus: true,
    })

    $('#shipping').summernote({
        height: 200,
        minHeight: null,
        maxHeight: null,
        focus: true,
    })

    //check Special
    $('input[name="isSpecial"]').on('click', function () {

        toastr.options = {
            "closeButton": true,            
            "timeOut": 2000,                
            "extendedTimeOut": 1000,       
            "positionClass": "toast-top-right",  
            "progressBar": true,            
        };
        
        const linkSpecial = $(this).data('link');
        const isChecked = $(this).prop('checked');

        $.ajax({
            url: linkSpecial + '?isSpecial=' + isChecked,
            type: 'GET',
            success: function () {
                toastr.info('productWithSpecial show to Website successfully', 'Success')
            }
        });
    });

    //check New
    $('input[name="newProduct"]').on('click', function () {

        toastr.options = {
            "closeButton": true,            
            "timeOut": 2000,                
            "extendedTimeOut": 1000,       
            "positionClass": "toast-top-right",  
            "progressBar": true,            
        };
        
        const linkNewProduct = $(this).data('link');
        const isChecked = $(this).prop('checked');

        $.ajax({
            url: linkNewProduct + '?newProduct=' + isChecked,
            type: 'GET',
            success: function () {
                toastr.info('Product show to Website successfully', 'Success')
            }
        });
    });

    imgInp.onchange = evt => {
        const [file] = imgInp.files
        if (file) {
            blah.src = URL.createObjectURL(file)
        }
    }


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
});





