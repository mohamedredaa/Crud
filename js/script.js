
var productNameInput= document.getElementById("productNameInput"); //input kolo
var productPriceInput= document.getElementById("productPriceInput") //input kolo
var  productCatgeoryInput= document.getElementById("productCatgeoryInput") //input kolo
var productDescriptionInput= document.getElementById("productDescriptionInput") //input kolo

var userProductAlert = document.getElementById("userProductAlert");

    function vildateProductName(){

        var regex = /^[A-Z][a-z]{3,8}$/;
        if(regex.test(productNameInput.value) == true)
        {

            // console.log("valied")
            productNameInput.classList.add("is-valid");
            productNameInput.classList.remove("is-invalid");
            userProductAlert.classList.replace("d-block" , "d-none");        
            
            return true;
        }

        else
        {
            // console.log("un-valied")
            productNameInput.classList.add("is-invalid");
            productNameInput.classList.remove("is-valid");
            userProductAlert.classList.replace("d-none" , "d-block")           

            return false;

        }
    }
productNameInput.addEventListener("blur" , vildateProductName)


var productContainer ;
if(localStorage.getItem("myProduct")==null)
{
    productContainer= [];
}
else
{
  productContainer =JSON.parse(localStorage.getItem("myProduct")) ;
  displayProducts();
}
function addProduct()
{


if(vildateProductName() ==true )
{
    var product = {
        name:productNameInput.value,
        price :productPriceInput.value,
        category:productCatgeoryInput.value,
        desc: productDescriptionInput.value,
  
};
productContainer.push(product);
localStorage.setItem("myProduct" ,JSON.stringify(productContainer) );
displayProducts();
clearForm();
console.log(productContainer);
}
}


function clearForm()
{
    productNameInput.value="";
    productPriceInput.value="";
    productCatgeoryInput.value="";
    productDescriptionInput.value="";
}


function displayProducts()
{
        var cartoona=``;

        for(var i = 0; i< productContainer.length ; i++)
        {
            cartoona+= `<tr>
            <td>`+[i]+`</td>
            <td>`+productContainer[i].name+`</td>
            <td>`+productContainer[i].price+`</td>
            <td>`+productContainer[i].category+`</td>
            <td>`+productContainer[i].desc+`</td>
            <td><button onclick="updateProduct(`+i+`)" class="btn btn-outline-info">update</button></td>
            <td><button onclick="deleteProduct(`+i+`)" class="btn btn-outline-warning">delete</button></td>
        </tr>`;
        };
document.getElementById("tableBody").innerHTML = cartoona;
};


function deleteProduct(productIndex)
{
    productContainer.splice(productIndex,1);
    localStorage.setItem("myProduct" ,JSON.stringify(productContainer) );
     displayProducts();
}


function searchProduct(searchTerm)
{
    var cartoona=``;
    
     for( var i = 0; i<productContainer.length ; i++)
     {
        if(productContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase())==true)
        {
            cartoona+= `<tr>
            <td>`+[i]+`</td>
            <td>`+productContainer[i].name+`</td>
            <td>`+productContainer[i].price+`</td>
            <td>`+productContainer[i].category+`</td>
            <td>`+productContainer[i].desc+`</td>
            <td><button class="btn btn-outline-info">update</button></td>
            <td><button onclick="deleteProduct(`+i+`)" class="btn btn-outline-warning">delete</button></td>
        </tr>`;

        }
        else
        {
            // console.log("hello")
        }
     }
     document.getElementById("tableBody").innerHTML=cartoona;

}

function updateProduct(productIndex)
{

    productNameInput.value = productContainer[productIndex].name;
    productPriceInput.value = productContainer[productIndex].price;
    productCatgeoryInput.value = productContainer[productIndex].category;
    productDescriptionInput.value = productContainer[productIndex].desc;


}
$(document).ready(function(){
    $(".loading").fadeOut(3000)
});