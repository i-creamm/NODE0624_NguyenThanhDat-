

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
});