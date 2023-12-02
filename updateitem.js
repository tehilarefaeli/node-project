function setValues() {
    let itemFromStorage = window.localStorage.getItem('item');
    let itemData = JSON.parse(itemFromStorage);
    document.getElementById('item_name').value = itemData.name;
    document.getElementById('item_cost').value = itemData.cost;
    document.getElementById('item_img').value = itemData.img;
    document.getElementById('item_category').value = itemData.category;
    document.getElementById('item_color').value = itemData.color;
    document.getElementById('item_branch').value = itemData.branch;
    document.getElementById('id').value = itemData._id;
}