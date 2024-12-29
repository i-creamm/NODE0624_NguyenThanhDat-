//Change Category or Brand

//End Change Category or Brand


//Change Status Order
const changeStatus = document.querySelectorAll('#change-status')
if(changeStatus){
    changeStatus.forEach(option => {
        option.addEventListener('change', (e) => {
            const val = e.target.value
            const link = e.target.dataset.link + '/' + val

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Status changed",
                showConfirmButton: false,
                timer: 1000
              }).then(()=> {
                window.location.href = link
              })
        })
    })
}
//End Change Status Order


//Button Status
const buttonsStatus = document.querySelectorAll("[button-status]")
    if(buttonsStatus.length > 0) {
        let url = new URL(window.location.href) 

        buttonsStatus.forEach(button => {
            button.addEventListener('click', () => {
                const status = button.getAttribute("button-status")
                if(status){
                    url.searchParams.set('status', status)
                } else {
                    url.searchParams.delete('status')
                }
                // Reset trang về 1 khi chuyển trạng thái
                url.searchParams.delete('page');
                window.location.href = url.href
            })
        })   
    }
//End Button Status

//Pagination
const buttonPagination = document.querySelectorAll('[button-pagination]')
if(buttonPagination){
    let url = new URL(window.location.href) 
    buttonPagination.forEach(button => {
        button.addEventListener('click', () => {
            const page = button.getAttribute('button-pagination')
            if(page){
                url.searchParams.set('page', page)
            } else {
                url.searchParams.delete('page')
            }
            window.location.href = url.href
        })
    })
}
//End Pagination

//Form Search
const formSearch = document.querySelector('#form-search')
if(formSearch){
    let url = new URL(window.location.href)
    formSearch.addEventListener('submit', (e) => {
        e.preventDefault()
        const search = e.target.elements.search.value
        if(search){
            url.searchParams.set('search', search)
        } else {
            url.searchParams.delete('search')
        }
        window.location.href = url.href
    })
}
//End Form Search



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

// Preview image
const uploadImage = document.querySelector("[upload-image]")
if(uploadImage){
    const uploadImageInput = document.querySelector("[upload-image-input]")
    const uploadImagePreview = document.querySelector("[upload-image-preview]")

    uploadImageInput.addEventListener("change", (e) => {
        const file = e.target.files[0]
        if(file) {
            uploadImagePreview.src = URL.createObjectURL(file)
        }
    })
}
// End preview image

$(document).ready(function () {

    const url = window.location.href
    const arrUrl = url.split('/')
    let activeName = arrUrl[4].split('?')[0] ||  'dashboard'
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
        console.log(link)
        
        $.ajax({
            url: link,
            type: 'GET',
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

    $('#mail').summernote({
        height: 300,
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



// Show Alert
const showAlert = document.querySelector('[show-alert]')
    if(showAlert){
        const time = parseInt(showAlert.getAttribute('data-time'))
        const success = showAlert.getAttribute('data-msg')
        if (success) {
            toastr.options = {
                "closeButton": true,
                "timeOut": time || 2000, // Sử dụng time từ data-time, nếu không có thì mặc định là 2000ms
                "extendedTimeOut": 1000,
                "positionClass": "toast-top-right",
                "progressBar": true,
            };
            toastr.success(success, "success");
        }
    }
// End Show Alert
});





