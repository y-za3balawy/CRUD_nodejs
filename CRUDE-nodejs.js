
let productname = document.getElementById('name')
let productprice = document.getElementById('price')
let productdescription = document.getElementById('description')

let product = document.querySelector('.tbody')


let result =[]


async function api (){
  const res  = await  fetch("http://localhost:3000/allproduct")
result = await res.json()
console.log(result)
addproduct()
}


api()




function addproduct() {    
    let cartona=''
result.data.map((ele, index )  =>{
    cartona +=`<tr>
    <th scope="row">${ele.name}</th>
    <td>${ele.price}</td>
    <td>${ele.description}</td>
    <td>Action</td>
    <td><button class=" btn btn-warning" onclick="update(${index})">update </button></td>
    <td> <button class=" btn btn-danger" onclick="deletee(${result.data[index].id})">delete</button></td>
   
                
  </tr>`



})

product.innerHTML= cartona
}



function creatobj(){
  
    
let obj={
    name:productname.value,
    price:productprice.value,
    description:productdescription.value
}

fetch("http://localhost:3000/addproduct", {
     

    method: "POST",

   
    body: JSON.stringify(obj),
     

    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
.then(response => response.json())
 
.then(data =>api());
console.log(obj)


}



function deletee(id){


    fetch("http://localhost:3000/deleteproduct", {
     

    method: "DELETE",

   
    body: JSON.stringify({id}),
     

    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
.then(response => response.json())
 
.then(data =>api());


    
}

var idp= 0;

function update(index){


// console.log(result.data[index].name)
productname.value=result.data[index].name
productprice.value=result.data[index].price
productdescription.value=result.data[index].description
idp =result.data[index].id
 document.querySelector('.add').style.display = "none";
 document.querySelector('.updatebutton').style.display = "block";


}



function updatedata(){

console.log( idp)
    let updateelement={
        name:productname.value,
        price:productprice.value,
        description:productdescription.value,
        id:idp
    }

    fetch("http://localhost:3000/updateproduct", {
     

    method: "PUT",

   
    body: JSON.stringify(updateelement),
     

    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
.then(response => response.json())
 
.then(data =>api());

document.querySelector('.add').style.display = "block";
document.querySelector('.updatebutton').style.display = "none";


}




function search(){
    searchvalue= document.querySelector('.search').value
console.log(searchvalue)
    fetch("http://localhost:3000/search", {
     

    method: "GET",

   
    body: JSON.stringify({searchvalue}),
     

    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    
})
.then(response => response.json())
 
.then(data =>api());

}