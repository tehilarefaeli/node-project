
let productdata
let branchesData
let productdatafilter;
let inputValues = [];
let filterproductbt3parameters;
let checker;
let filterproductbt3parametersbra

function filering(kind) {

    if (kind === 'all')
        productdatafilter = productdata;
    else
        productdatafilter = productdata.filter(object => object.category === kind);
    loadProducts()
}
function loadProducts(productdata) {
    const data = productdatafilter || productdata
    checker = false
    cleardata = document.getElementById("divsOfProducts");
    cleardata.innerHTML = '';

    for (var i = 0; i < data?.length; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.display = "inline-block"
        const cardImg = document.createElement("img");
        cardImg.classList.add("card-img-top")
        cardImg.setAttribute("src", data[i].img);
        card.appendChild(cardImg);
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        const nameOfProduct = document.createElement("span");
        nameOfProduct.classList.add("name-product");
        nameOfProduct.innerHTML = data[i].name;
        const cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.innerHTML = data[i].category + '   |   ' + data[i].color
            + '   |   ' + data[i].cost + '   ILS';
        cardBody.appendChild(nameOfProduct);
        cardBody.appendChild(cardText);
        card.appendChild(cardBody);
        document.getElementById("divsOfProducts").appendChild(card);
    }

}

function loadBranches() {
    cleardata = document.getElementById("branches");
    cleardata.innerHTML = '';
    const databra = filterproductbt3parametersbra;
    for (i = 0; i < databra?.length; i++) {
        const html = document.createElement("div")
        html.classList.add("branches_div");
            const data = document.createElement("div");
            data.classList.add("branches_div_children");
            data.innerHTML = "</br>" + databra[i].city + '|' + databra[i].street + "</br>" + databra[i].phone + "|" + databra[i].opening_hours + "</br>" + databra[i].email + "</br>";
            let updateButton = document.createElement("button");
            updateButton.innerHTML = "Update";
            data.appendChild(updateButton);
            updateButton.addEventListener('click', function () {
                updateBranch(branch);
            }, false);
            html.appendChild(data)
     
        document.getElementById("branches").appendChild(html);

    }
}

function updateBranch(event) {
    window.localStorage.setItem('branch', JSON.stringify(event));
    window.location.href = './updateBranch.html';
}