'use strict';
const formEl = document.getElementById("form-item");//form 
const itemEl = document.getElementById("item");
const itemContainerEl = document.getElementById("items-container");
const btnSubmit = document.getElementById("btn-submit")
//creating global variable.....
let items = [];
let isEditing = false;
let editId= null;

const displayUI = function(){
    itemContainerEl.innerHTML = null;
    if(items.length>0){
    items.forEach((item) => {  
    const listEl = document.createElement('li');
    listEl.classList.add('list-item');
    listEl.innerHTML = `${item.value}
    <button onclick = 'deleteItem(${item.id})'>delete</button>
    <button onclick = 'editItem(${item.id})'>Edit</button>`;
    itemContainerEl.appendChild(listEl);
    }); 
    }
    };
   const deleteItem = function(id){
   items = items.filter((item)=>item.id !== id);
   displayUI();
};
const editItem = function(id){    
    const itemToEdit = items.find((item) => item.id === id);
    itemEl.value = itemToEdit.value;
    //to update /classify the sate of add or edit button
    editId = id;
    isEditing = true;
    displayUI();
}; 

formEl.addEventListener('submit',(e)=>{                                                                                                   
    e.preventDefault(); 
    if(isEditing){
//    console.log(editId);
       items = items.map((item)=>{
    if (item.id === editId){
        return {...item,value:itemEl.value};
    }else{
        return item;
    }
});
displayUI();
isEditing = false;
editId = null;   
itemEl.value = null;  
    }else{
  //truthy value and falsy value concept
    if (itemEl.value){
        const item = {
            id:new Date().valueOf(),
            value: itemEl.value,
        };
    
    items.push(item);
    // console.log(item);
    //display the item on the screen
    itemEl.value = null;
    displayUI();
    }
    else{
        alert("enter valid input");
    }
}

});