function setValues() {
    let productFromStorage = window.localStorage.getItem('product');
    let productData = JSON.parse(productFromStorage);
    document.getElementById('product_name').value = productData.name;
    document.getElementById('product_cost').value = productData.cost;
    document.getElementById('product_img').value = productData.img;
    document.getElementById('product_category').value = productData.category;
    document.getElementById('product_color').value = productData.color;
    document.getElementById('product_branch').value = productData.branch;
    document.getElementById('id').value = productData._id;
}