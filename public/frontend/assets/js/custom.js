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


// Show Alert Success
const showError = document.querySelector('[show-alert-error]')
if (showError) {
    const time = parseInt(showError.getAttribute('data-time'))
    const error = showError.getAttribute('data-msg-error')
    if (error) {
        toastr.options = {
            "closeButton": true,
            "timeOut": time || 2000, // Sử dụng time từ data-time, nếu không có thì mặc định là 2000ms
            "extendedTimeOut": 1000,
            "positionClass": "toast-top-right",
            "progressBar": true,
        };
        toastr.error(error, "error");
    }
}
// End Show Alert




//Show cart
const showCart = () => {
    let htmlSummary = ''
    let xhtmlCart = '';
    carts.forEach(item => {
        const formattedPrice = item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        const totalPrice = item.price* parseInt(item.quantity)
        const formattedTotalPrice = totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
        xhtmlCart += `<tr class="product-row-${item.productID}">
                                    <td class="product-col">
                                        <figure class="product-image-container">
                                            <a href="/" class="product-image">
                                                <img src="/uploads/products/${item.image}" alt="product">
                                            </a>
                                        </figure>
                                        <h2 class="product-title">
                                            <a href="/<%= item.productInfo.slug %>">${item.name}</a>
                                        </h2>
                                    </td>
                                    <td>${formattedPrice}</td>
                                    <td>
                                        <input onchange="updateQuantity('${item.productID}', this.value)" class="text-center" type="number" name="quantity" value="${item.quantity}" item-id="${item.productID}" style="width: 60px;">
                                    </td>
                                    <td>${formattedTotalPrice}</td>
                                </tr>
                                <tr class="product-action-row">
                                    <td colspan="4" class="clearfix">
                                        <div class="float-left">
                                            <a href="#" class="btn-move">Move to Wishlist</a>
                                        </div><!-- End .float-left -->
        
                                        <div class="float-right">
                                            <a href="#" title="Edit product" class="btn-edit"><span
                                                    class="sr-only">Edit</span><i class="icon-pencil"></i></a>
                                            <a href="javascript:deleteProduct('${item.productID}')" title="Remove product" class="btn-remove"><span
                                                    class="sr-only">Remove</span></a>
                                        </div><!-- End .float-right -->
                                    </td>
                                </tr>`

        htmlSummary += `<tr>
                                <td class="product-col">
                                    <figure class="product-image-container">
                                            <a href="product.html" class="product-image-checkout">
                                                <img src="/uploads/products/${item.image}" alt="product">
                                            </a>
                                            </figure>
                                                <div>
                                                    <h2 class="product-title">
                                                        ${item.name}
                                                    </h2>
                                                    <span class="product-qty">Qty: ${item.quantity}</span>
                                                </div>
                                </td>
                                <td class="price-col">${formattedPrice}</td>
                            </tr>`
    })
    $('#body-cart').html(xhtmlCart);
    $('#body-cart-summary').html(htmlSummary);
}
//End Show cart

//Delete product
const deleteProduct = (idProduct) => {
    carts = carts.filter(item => item.productID !== idProduct);
    localStorage.setItem("carts", JSON.stringify(carts));
    updateCartTop();
    showCart(); 
    toastr.success("Đã xóa sản phẩm khỏi giỏ hàng", "success");
};
//End Delete product

//Handle cart 
let carts = []
const handleAddCart = (idProduct, priceAtTime, name, image) => {

    let productCart = {
        "productID": idProduct,
        "name": name,
        "price": parseInt(priceAtTime),
        "image": image,
        "quantity": 1,
    };
    
    let indexProduct = carts.findIndex(item => item.productID === idProduct);

    if (indexProduct >= 0) {
        carts[indexProduct].quantity += 1;
    } else {
        carts.push(productCart);
    }

    toastr.success("Added product", "success");

    localStorage.setItem("carts", JSON.stringify(carts));

    updateCartTop()

};
//End Handle cart 

//Update cart
const updateCartTop = () => {
    let xhtml = ''
    let yhtml = ''
    let totalPrice = 0;
    carts.forEach(item => {
        const formattedPrice = item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
        xhtml += `<div class="product">
                    <div class="product-details">
                        <h4 class="product-title">
                            <a href="/">
                                ${item.name}
                            </a>
                        </h4>

                        <span class="cart-product-info">
                            <span class="cart-product-qty">
                                ${item.quantity}
                            </span>
                            x ${formattedPrice}
                        </span>
                    </div><!-- End .product-details -->

                    <figure class="product-image-container">
                        <a href="/" class="product-image-cart">
                            <img src="/uploads/products/${item.image}" alt="">
                        </a>
                        <a href="javascript:deleteProduct('${item.productID}')" class="btn-remove" title="Remove Product"><i class="icon-cancel"></i></a>
                    </figure>
                </div>`
        totalPrice += (item.quantity * item.price);

    });

        let formHtml = `<form action="/checkout/order" method="post">
            <div class="form-group required-field">
                <label for="fullname">Fullname </label>
                <input type="text" name="fullname" class="form-control" required="">
            </div>

            <div class="form-group required-field">
                <label for="phone">Phone </label>
                <input type="text" name="phone" class="form-control" required="">
            </div>

            <div class="form-group required-field">
                <label for="address">Address </label>
                <input type="text" name="address" class="form-control" required="">
            </div>

            <div class="card-footer">
                <button id="card-footer-btn" class="btn btn-success btn-block" data-url="/checkout/order" ">Place Order</button>
            </div>
        </form>`
        

    const formattedTotalPrice = totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    $('.cart-count').html(carts.length);
    $('.dropdown-cart-products').html(xhtml);
    $('.cart-total-price').html(formattedTotalPrice);
    $('#total-price').html(formattedTotalPrice);
    if(carts.length > 0){
        $('.form-get-info').html(formHtml);
    } else {
        $('.form-get-info').html('');
    }
};
//End Update cart

// Update quantity
const updateQuantity = (idProduct, newQuantity) => {
    const indexProductQuantity = carts.findIndex(item => item.productID === idProduct);
    if (indexProductQuantity >= 0) {
        carts[indexProductQuantity].quantity = newQuantity > 0 ? newQuantity : 1; 
        localStorage.setItem("carts", JSON.stringify(carts));
        updateCartTop();
        showCart();
        toastr.success("Cập nhật số lượng sản phẩm thành công", "success");
    }
};
// End Update quantity

$('#card-footer-btn').click(function (e) {
    e.preventDefault();
    let fullname = $('input[name="fullname"]').val();
    let phone = $('input[name="phone"]').val();
    let address = $('input[name="address"]').val();
    let url = $('#card-footer-btn').data('url');

    let hasError = false;

    if (!fullname) {
        toastr.error("Vui lòng nhập tên đầy đủ", "Error");
        hasError = true;
    }
    if (!phone) {
        toastr.error("Vui lòng nhập số điện thoại", "Error");
        hasError = true;
    }
    if (!address) {
        toastr.error("Vui lòng nhập địa chỉ", "Error");
        hasError = true;
    }

    if (hasError) return;

    let data = {
        item: carts,
        info: {
            fullname,
            phone,
            address
        }
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {
        if (response.redirectUrl) {
            carts = [];
            localStorage.clear();
            window.location.href = response.redirectUrl;
        } else {
            toastr.error("mua that bai", "Error");
        }
    })
});
//End Send local to backend

$(document).ready(function () {

    carts = localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts")) : []
    updateCartTop()
    showCart()


});




