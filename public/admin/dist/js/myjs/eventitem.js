const clickToDeleteId= (url) => {
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

module.exports = {deleteById: deleteById}