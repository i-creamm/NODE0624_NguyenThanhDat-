
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

imgInp.onchange = evt => {
    const [file] = imgInp.files
    if (file) {
        blah.src = URL.createObjectURL(file)
    }
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
    
        e.preventDefault();
        const val = $(this).val();
        const link = $(this).data('link') + '/' + val;
        console.log(link)
    
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
        focus: true
    })

    const inputElement = $('#filepond')
    FilePond.registerPlugin(
        FilePondPluginImagePreview,
        FilePondPluginImageExifOrientation
      );
    const pond = FilePond.create(inputElement[0])
    pond.setOptions({
        imagePreviewMinHeight : 100,
        imagePreviewMaxWidth : 100,
    });

    // Dropzone.options.myDropzone = {
    //     url: '/upload',
    //     paramName: "file", // Tên của trường sẽ được sử dụng cho các file tải lên
    //     maxFiles: 10, // Số lượng file tối đa có thể tải lên
    //     acceptedFiles: "image/*", // Loại file được chấp nhận
    //     uploadMultiple: true, // Cho phép tải lên nhiều file
    //     parallelUploads: 10, // Số file tải lên đồng thời
    //     init: function() {
    //       this.on("successmultiple", function(files, response) {
    //         console.log("Files uploaded successfully");
    //       });
    //       this.on("errormultiple", function(files, response) {
    //         console.log("Error uploading files");
    //       });
    //     }
    //   };

});





