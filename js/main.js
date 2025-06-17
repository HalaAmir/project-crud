let productNameInput = document.getElementById("productNameInput");
let productPriceInput = document.getElementById("productPriceInput");
let productCategoryInput = document.getElementById("productCategoryInput");
let productDescInput = document.getElementById("productDescInput");
let inputClearForm = document.getElementsByClassName("form-control");
let btnProduct=document.getElementById("productbutton");
let search=document.getElementById("searchProduct");
let updateproductbutton=document.getElementById("updateproductbutton");
// console.log(inputClearForm);
// console.log(productNameInput,productPriceInput);
let productsContainer = [];
let myIndex;

if(localStorage.getItem('dataproduct')!=null){
  productsContainer=JSON.parse(localStorage.getItem('dataproduct'));
  displayProduct( productsContainer);
}

btnProduct.addEventListener("click",addProduct)
search.addEventListener("keyup",searchProduct)

// add product//

function addProduct(){
  if(btnProduct.innerHTML=='Add Product'){
    let pruduct={
      name:productNameInput.value,
      price:Number(productPriceInput.value),
      category:productCategoryInput.value,
      desc:productDescInput.value,
    };
    // console.log(pruduct)
    productsContainer.push(pruduct)
  localStorage.setItem("dataproduct",JSON.stringify(productsContainer))
    // console.log( productsContainer)
  }
 else{
  updateProduct()
  
 }
  clearForm()
  displayProduct( productsContainer)
}

// clear product //

function clearForm(){
  for(let i=0 ; i<inputClearForm.length ; i++){
    inputClearForm[i].value='';
    inputClearForm[i].classList.remove('is-valid')
  }

}

// display product //

function displayProduct(list){
  let cartonaa='';
  for(let i=0; i<list.length;i++){
    cartonaa+=` <tr>
    <td>${i}</td>
    <td>${list[i].name}</td>
    <td>${list[i].price}</td>
    <td>${list[i].category}</td>
    <td>${list[i].desc}</td>
    <td><button onclick="getProductupdate(${i})" class="btn btn-warning">uddate</button></td>
    <td><button onclick="deleteProduct(${i})" class="btn btn-danger">delete</button></td>
  </tr>`
  }
  document.getElementById("tbodyProduct").innerHTML= cartonaa;
}

// delete product //

function deleteProduct(deleteIndex){
  productsContainer.splice(deleteIndex,1)
  // console.log(  productsContainer)
  localStorage.setItem("dataproduct",JSON.stringify(productsContainer))
  displayProduct( productsContainer)
}

//search Product //

function searchProduct(){
  // console.log("........search")
 let myArrayProduct=[];

  let app=search.value;
  for(let i=0 ; i< productsContainer.length ; i++) {
    if(productsContainer[i].name.toLowerCase().includes(app.toLowerCase())){
      console.log(productsContainer[i])
      myArrayProduct.push(productsContainer[i])
    }
  }
  displayProduct( myArrayProduct)


}

//  get update //

function getProductupdate(index){
  console.log(index)
  console.log(productsContainer[index])
  myIndex=index;

  let currentProduct=productsContainer[index];

  productNameInput.value=currentProduct.name;
  productPriceInput.value=currentProduct.price;
  productCategoryInput.value=currentProduct.category;
  productDescInput.value=currentProduct.desc;

  btnProduct.innerHTML='updateProduct'

}


// update product //


function  updateProduct(){
// alert('update')
let pruduct={
  name:productNameInput.value,
  price:Number(productPriceInput.value),
  category:productCategoryInput.value,
  desc:productDescInput.value,
};

productsContainer[myIndex]=pruduct;
localStorage.setItem("dataproduct",JSON.stringify(productsContainer))
btnProduct.innerHTML='Add Product';

}

// Validation product//
// static //

let nameAlert=document.getElementById("nameAlert");
let priceAlert=document.getElementById("priceAlert");
let categoryAlert=document.getElementById("categoryAlert");
let descAlert=document.getElementById("descAlert");




// dynamic //
productNameInput.addEventListener('keyup',function(){
  validationProduct(productNameInput,/^[A-Z][a-z]{3,8}$/,nameAlert)
})
productPriceInput.addEventListener('keyup',function(){
  validationProduct(productPriceInput,/^[1-9][0-9][0-9][0-9][0-9]$/, priceAlert)
})
productCategoryInput.addEventListener('keyup',function(){
  validationProduct(productCategoryInput,/^[a-z]{3,8}$/,categoryAlert)
})
productDescInput .addEventListener('keyup',function(){
  validationProduct(productDescInput ,/^[a-z]{3,8}$/,descAlert)
})



function validationProduct(input,regex,alertmasge){

  // let regex=/^[A-Z][a-z]{3,8}$/
  var regex;
   console.log(regex.test( input.value));
 
   if(regex.test(input.value))
   {
     btnProduct.classList.remove('disabled');
     input.classList.add('is-valid');
     input.classList.remove('is-invalid');
     alertmasge.classList.add('d-none')
   }
   else{
     btnProduct.classList.add('disabled');
     input.classList.add('is-invalid');
     input.classList.remove('is-valid');
     alertmasge.classList.remove('d-none')
   }
 }