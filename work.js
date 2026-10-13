let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let count = document.getElementById('count')
let total = document.getElementById('total')
let category = document.getElementById('category')
let submit = document.getElementById('submit')

let tmp;
let mood = 'create'
function gettotal(){


if(price.value != ''){

    let result = (+price.value + +ads.value + +taxes.value ) - +discount.value ;
     total.innerHTML = result;

     total.style.background = '#040'
}else{

    total.innerHTML = ''
    total.style.background = "#520808";


}

    
}







let datapro = [];
if(localStorage.product != null){


    datapro= JSON.parse(localStorage.product)

}else{

    datapro = [];
}



submit.onclick = function(){


    let newpro={
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category:category.value.toLowerCase()



    }

    if(title.value && price.value != '' && newpro.count <100 ){


    if(mood === 'create'){

    if(newpro.count > 1 ){
        for( let i = 0; i<newpro.count; i++){
        datapro.push(newpro)


        }

    }else{
          datapro.push(newpro)
    }



    }else{

        datapro[tmp] = newpro

        mood= 'create'
        submit.innerText = 'create';
        count.style.display = 'block'
   

    }
       cleardata()
 }
   
    
  
    localStorage.setItem('product'  ,    JSON.stringify(datapro) )

  
      
     showdata()
       let tbody = document.getElementById('tbody');
       let lastRow = tbody.lastElementChild;
if (lastRow) {
    lastRow.classList.remove('fade-in');
    void lastRow.offsetWidth;
    lastRow.classList.add('fade-in');
}


}

 function cleardata(){
        title.value = ''
        ads.value = ''
        discount.value = ''
        taxes.value = ''
        total.innerHTML= ''
        price.value = '' 
        count.value = ''
        category.value = ''

    }

    function showdata(){

gettotal()


        let table = ''
        for(let i = 0; i < datapro.length; i++){

            table += `
               <tr>
      <td>${i + 1}</td>
      <td>${datapro[i].title}</td>
      <td>${datapro[i].price}</td>
      <td>${datapro[i].taxes}</td>
      <td>${datapro[i].ads}</td>
      <td>${datapro[i].discount}</td>
      <td>${datapro[i].total}</td>
      <td>${datapro[i].category}</td>
      <td><button  onclick="updatedata(${i})"id="update">update</button></td>
            <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
    </tr>
            `
        }

        document.getElementById('tbody').innerHTML = table ;
        let btndelete = document.getElementById("deleteall")
        if(datapro.length > 0){

            btndelete.innerHTML =`
            
            <button onclick="deleteall()">Delete All (${datapro.length})</button>
            
            
            `
        }else{ btndelete.innerHTML =``;


        }
    }
    showdata()

    function deletedata(i){

datapro.splice(i,1);
localStorage.product = JSON.stringify(datapro);
showdata()

    }
    function deleteall(){


        localStorage.clear()
        datapro.splice(0)
        showdata()

    }
    function updatedata(i){

        title.value = datapro[i].title
        price.value = datapro[i].price
        taxes.value = datapro[i].taxes
        ads.value = datapro[i].ads
        discount.value = datapro[i].discount
        category.value = datapro[i].category;
        gettotal()
        count.style.display ='none';
        submit.innerHTML = 'update'
        mood = 'update'
        tmp= i;
       window.scrollTo({
    top: 0,
    behavior: 'smooth'
});


    }



let searchmood = 'title';
function getsearchmood(id){

    let search = document.getElementById('search')
if(id =='searchtitle'){

    searchmood ='title'
  
}else{

    searchmood = 'category'
    
}
search.placeholder ='Search By '+searchmood;
search.focus()
search.value = '';
showdata()
    
}

function searchdata(value){
let table ='';

for(let i = 0; i < datapro.length; i++){

    if (searchmood == 'title'){

    if(datapro[i].title.includes(value.toLowerCase())){
        
    table += `
                <tr>
        <td>${i + 1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button  onclick="updatedata(${i})"id="update">update</button></td>
                <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
        </tr>
                `
    }

    }else{ 
    if(datapro[i].category.includes(value.toLowerCase())){
        
    table += `
                <tr>
        <td>${i + 1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button  onclick="updatedata(${i})"id="update">update</button></td>
                <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
        </tr>
                `
    }
    }
}


 document.getElementById('tbody').innerHTML = table ;
}

