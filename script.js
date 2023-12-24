var title=document.querySelector(".tilte")
var price=document.querySelector(".price")
var taxes=document.querySelector(".taxes")
var ads=document.querySelector(".ads")
var Disc=document.querySelector(".Disc")
var count=document.querySelector(".count")
var Catogrey=document.querySelector(".Catogrey")
var create=document.querySelector(".create")
var search=document.querySelector(".search")
var SearchbyTiltle=document.querySelector(".SearchbyTiltle")
var SearchbyCatogry=document.querySelector(".SearchbyCatogry")
var total=document.querySelector(".total");
var deletee=document.querySelector(".delete");
var table=document.querySelector(".table")
var tbody=document.querySelector(".tbody");
let temp;
let mood="create";
let arr;;
if(localStorage.products!=null)
{
    arr=JSON.parse(localStorage.products);
}
else{
    arr=[];
}
//func1 total
function totaldata(){
    if(price.value!= ``)
    { 
        total.style.background="green";
        var res;
        res=(+price.value+ +ads.value+ +taxes.value)- +Disc.value;
        total.innerHTML=res;

    }
    
}
//// function create data
function createdate(){
    var product ={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        Disc:Disc.value,
        total:total.innerHTML,
        count:count.value,
        Catogrey:Catogrey.value.toLowerCase(),
    
    }
    if(mood=="create")
    {
        if(product.count>1)
        {

            for(let i=0;i<product.count;i++)
            {
                arr.push(product);
            }
        }
        else
        {
            arr.push(product);
        }
        count.style.display="inline-block"
       }
       else{
                  arr[temp]=product;
                  mood="create"
                  count.style.display="inline-block"
                  create.innerHTML="CREATE"
       }
    
    console.log(arr)
    localStorage.setItem(`products`, JSON.stringify(arr))
    clear();
    showdata()


}
///function Clear data
function clear(){
    title.value="";
    price.value=""
    ads.value="";
    Disc.value="";
    taxes.value="";
    total.innerHTML="";
    count.value="";
    Catogrey.value="";
}
//showdata
function showdata(){
    total.style.background="red";
    totaldata();
    let tablee=``;
    for (let i=0;i<arr.length;i++)
    {    
        tablee+=`<tr>
      <td>${i+1} </td>
        <td>${arr[i].title}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].taxes}</td>
        <td>${arr[i].ads}</td>
        <td>${arr[i].Disc}</td>
        <td>${arr[i].total}</td>
        <td>${arr[i].Catogrey}</td>
        <td> <button class=" btn create" onclick="editdata(${i})">UPDATE</button></td>
        <td> <button class=" btn create" onclick="deletedata(${i})">Delete</button></td> 
       </tr> `
    }
    tbody.innerHTML=tablee
   if(arr.length>0)
   {
    deletee.style.display="inline-block";
    deletee.innerText="DeleteAll ("+arr.length+")";
   }
   else{
    deletee.style.display="none"
   }

    return console.log("hello") ;
   
 
}
////delete product
function deletedata(e){
    arr.splice(e,1);
    localStorage.products=JSON.stringify(arr);
    showdata();

}
////deleteAll function
function deletAll(){
    arr.splice(0,arr.length);
    localStorage.products=JSON.stringify(arr);
    showdata();
}
///edit data
function editdata (e){
    temp=e;
    
    arr[e];
    title.value=arr[e].title;
    price.value=arr[e].price;
    ads.value=arr[e].ads;
    Disc.value=arr[e].Disc;
    taxes.value=arr[e].taxes;
    total.innerHTML=arr[e].total;
    Catogrey.value=arr[e].Catogrey;
  
    count.style.display="none"
    create.innerHTML="UPDATE"
    mood="update";
    localStorage.products=JSON.stringify(arr);
    showdata();
    scroll({
        top:0,
    behavior:`smooth`

    })
    

}
/////searching get search mood
let Searchmood="title";
function getSearch(id){
if(id==="SearchbyTiltle")
{
    Searchmood="title"
    search.Placeholder="Search by title";
    console.log(Searchmood);
}
else
{
    Searchmood="catogery";
    search.Placeholder="Search by catogrey";
    console.log(Searchmood);
}
search.focus();
search.value="";
showdata()
}
///////////searching
function searching(e){
    let tablee=``;
    if (Searchmood=="title")
    { 
    for(let i=0;i<arr.length;i++)
    {
       if( arr[i].title.includes(e.toLowerCase()))
       {
        console.log(e);
        tablee+=`<tr>
        <td>${i+1} </td>
          <td>${arr[i].title}</td>
          <td>${arr[i].price}</td>
          <td>${arr[i].taxes}</td>
          <td>${arr[i].ads}</td>
          <td>${arr[i].Disc}</td>
          <td>${arr[i].total}</td>
          <td>${arr[i].Catogrey}</td>
          <td> <button class=" btn create" onclick="editdata(${i})">UPDATE</button></td>
          <td> <button class=" btn create" onclick="deletedata(${i})">Delete</button></td> 
         </tr> `
    }}
    } 
    else{  
        for(let i=0;i<arr.length;i++)
        {
           if( arr[i].Catogrey.includes(e.toLowerCase()))
           {
            console.log(e);
            tablee+=`<tr>
            <td>${i+1} </td>
              <td>${arr[i].title}</td>
              <td>${arr[i].price}</td>
              <td>${arr[i].taxes}</td>
              <td>${arr[i].ads}</td>
              <td>${arr[i].Disc}</td>
              <td>${arr[i].total}</td>
              <td>${arr[i].Catogrey}</td>
              <td> <button class=" btn create" onclick="editdata(${i})">UPDATE</button></td>
              <td> <button class=" btn create" onclick="deletedata(${i})">Delete</button></td> 
             </tr> `
        }}}
    tbody.innerHTML=tablee
}
create.addEventListener("click", createdate)
showdata()