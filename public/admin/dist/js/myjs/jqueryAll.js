// const $ = require('jquery');

// $(document).ready(function () {

//     //update ordering
//     $('.ordering').change(function (e) {

//         toastr.options = {
//             "closeButton": true,            
//             "timeOut": 2000,                
//             "extendedTimeOut": 1000,       
//             "positionClass": "toast-top-right",  
//             "progressBar": true,            
//         };
    
//         e.preventDefault();
//         const val = $(this).val();
//         const link = $(this).data('link') + '/' + val;
//         console.log(link)
    
//         $.ajax({
//             url: link,
//             type: 'GET',
//             data: { ordering: val },
//             success: function(response) {
//                 toastr.success('Ordering updated successfully!', 'Success');
//             }})
//         });

//     $('#edit').summernote({
//         height: 200,
//         minHeight: null,
//         maxHeight: null,
//         focus: true
//     })

//     const inputElement = $('#filepond')
//     FilePond.registerPlugin(
//         FilePondPluginImagePreview,
//       );
//     const pond = FilePond.create(inputElement[0])
//     pond.setOptions({
//         imagePreviewMinHeight : 100,
//         imagePreviewMaxWidth : 100,
//     });

// });