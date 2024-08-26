var productName= document.getElementById("productName")
var productPrice= document.getElementById("productPrice")
var productDesc= document.getElementById("productDesc")
var productCat= document.getElementById("productCat")
var tableBody =document.getElementById("tableBody")
var addAndUpdate=document.getElementById("addAndUpdate")
var productContainer=[];
var currentIndex;
var code=1;

if(localStorage.getItem("allProducts")!=null){
  productContainer=JSON.parse(localStorage.getItem("allProducts"))
  displayProduct(productContainer)
}
else
{
  productContainer=[];
}

function actionToProduct(){
  if(addAndUpdate.innerHTML=="Add Product"){
    addProduct();
  }
  else{
    updateProduct()
  }

}

function addProduct(){
  var product={
    name:productName.value,
    price:productPrice.value,
    desc:productDesc.value,
    cat:productCat.value
  }
  clearForm();
  productContainer.push(product);
  localStorage.setItem("allProducts", JSON.stringify(productContainer))
  displayProduct(productContainer);

}

function clearForm(){
  productName.value=""
  productPrice.value=""
  productDesc.value=""
  productCat.value=""

}

function displayProduct(arrayContainer){
  var box =''
  for (let i = 0; i < arrayContainer.length; i++) {
      box+=`
    <tr>
      <td>${i+1}</td>
      <td>${arrayContainer[i].name}</td>
      <td>${arrayContainer[i].price}</td>
      <td>${arrayContainer[i].desc}</td>
      <td>${arrayContainer[i].cat}</td>
      <td>
        <button class="btn bg-danger" onclick="deleteProduct(${i})" >Delete</button>
        <button class="btn bg-warning" onclick="getObj(${i})" >Update</button>
      </td>
    </tr>`
  }
  tableBody.innerHTML=box;
}  

function deleteProduct(index){
  productContainer.splice(index,1);
  localStorage.setItem("allProducts", JSON.stringify(productContainer));
  displayProduct(productContainer);
}

function getObj(index){
  currentIndex=index
  productName.value=productContainer[index].name
  productPrice.value=productContainer[index].price
  productDesc.value=productContainer[index].desc
  productCat.value=productContainer[index].cat
  addAndUpdate.innerHTML="Update Product"

}

function updateProduct(){
  var product={
    name:productName.value,
    price:productPrice.value,
    desc:productDesc.value,
    cat:productCat.value
  }
  productContainer[currentIndex]=product;
  clearForm();
  localStorage.setItem("allProducts", JSON.stringify(productContainer))
  displayProduct(productContainer);
  addAndUpdate.innerHTML="Add Product"
}

function searchProduct(term){

  var filterProduct=[];
  for (var i = 0; i < productContainer.length; i++) {
    if(productContainer[i].name.toUpperCase().includes(term.toUpperCase())===true)
    {
      filterProduct.push(productContainer[i]);
    }
    displayProduct(filterProduct);
  }

}

function deleteAll(){
  localStorage.removeItem("allProducts");
  productContainer=[];
  displayProduct(productContainer)


}