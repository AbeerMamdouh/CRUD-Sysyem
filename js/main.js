var pNameInp = document.getElementById("pname");
var pCatInp = document.getElementById("pcaregory");
var pPriceInp = document.getElementById("pprice");
var pDescInp = document.getElementById("pdescription");
var tbody = document.getElementById("tbody");
var searchInp = document.getElementById("searchInp")
var addbtn = document.getElementById("addbtn");



if(localStorage.getItem("allProdacts")== null){
    var productsList = [];
}else{ 
    var productsList = JSON.parse(localStorage.getItem("allProdacts"));
}

displayProducts();




//create...
function addProduct(){
    var product = {
        productName: pNameInp.value,
        productCat: pCatInp.value,
        productPrice: pPriceInp.value,
        productDesc: pDescInp.value,
    };

    productsList.push(product);

    localStorage.setItem("allProdacts", JSON.stringify(productsList));
    
    displayProducts();

    cleanForm();

}




//retrive (display)...
function displayProducts(){
    var trs ="";

    for(var i=0; i<productsList.length; i++){

      trs += 
        ` <tr>
            <td>${[i]}</td>
            <td>${productsList[i].productName}</td>
            <td>${productsList[i].productCat}</td>
            <td>${productsList[i].productPrice}</td>
            <td>${productsList[i].productDesc}</td>
            <td><button onclick="editProducts(${i});" class="btn btn-warning">Edit</button></td>
            <td><button onclick="deleteProduct(${i});" class="btn btn-danger">Delete</button></td>
          </tr> `
    }

    tbody.innerHTML = trs;
}




//empty form after add
function cleanForm(){
    pNameInp.value = "";
    pCatInp.value = "";
    pPriceInp.value = "";
    pDescInp.value = ""; 
}



//search...
function search(){
    var trs ="";

    for(var i=0; i<productsList.length; i++){

     if(productsList[i].productName.toLowerCase().includes(searchInp.value.toLowerCase())){

      trs += 
        ` <tr>
            <td>${[i]}</td>
            <td>${productsList[i].productName.replace(searchInp.value, `<span style="background-color:yellow">${searchInp.value}</span>`)}</td>
            <td>${productsList[i].productCat}</td>
            <td>${productsList[i].productPrice}</td>
            <td>${productsList[i].productDesc}</td>
            <td><button onclick="editProducts(${i});" class="btn btn-warning">Edit</button></td>
            <td><button onclick="deleteProduct(${i});" class="btn btn-danger">Delete</button></td>
          </tr> `;
    }
}

    tbody.innerHTML = trs;
}




//delete product
function deleteProduct(ind){

    productsList.splice(ind,1);

    localStorage.setItem("allProdacts", JSON.stringify(productsList));
    
    displayProducts();
}




//Edit product
function editProducts(x){
    pNameInp.value = productsList[x].productName;
    pCatInp.value = productsList[x].productCat;
    pPriceInp.value = productsList[x].productPrice;
    pDescInp.value = productsList[x].productDesc;

    addbtn.innerHTML = "Update Product";

    addbtn.onclick = function (){

        productsList[x].productName = pNameInp.value;
        productsList[x].productCat = pCatInp.value;
        productsList[x].productPrice = pPriceInp.value;
        productsList[x].productDesc = pDescInp.value;

        displayProducts();

        localStorage.setItem("allProdacts", JSON.stringify(productsList));

        addbtn.innerHTML = "add product";

        cleanForm();

        addbtn.onclick = addProduct;
    }
}