

$(document).ready(function () {
    toastr.options = {
        "closeButton": true,            
        "timeOut": 3000,                
        "extendedTimeOut": 1000,       
        "positionClass": "toast-top-right",  
        "progressBar": true,            
    };

    //Update Cart
    const inputsQuantity = document.querySelectorAll("input[name='quantity']")
    if(inputsQuantity.length > 0){
        inputsQuantity.forEach(input => {
            input.addEventListener("change", () => {
                const productId = input.getAttribute("item-id")
                const quantity = input.value
    
                window.location.href = `/cart/update/${productId}/${quantity}`
                link = window.location.href      
                $.ajax({
                    url: link,
                    type: 'GET',
                    success: function() {
                        toastr.success('Quantity updated successfully!', 'Success');
                    }})
            })
        })
    }
    //End update Cart


    // Show Alert Success
    const showAlert = document.querySelector('[show-alert]')
    if (showAlert) {
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
            toastr.success(success, "Success");
        }
    }
    // End Show Alert
});