var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl');
var visitBtn = document.getElementById('visitBtn');
var search = document.getElementById('search');

var dataContainer = [] ;

if (localStorage.getItem("dataDetails") != null) {
    dataContainer = JSON.parse(localStorage.getItem("dataDetails"));
    displayData();
}

// Create
function addData(){
    if (validationName() == true && validationUrl() == true) {
        var data ={
            name:siteName.value ,
            url:siteUrl.value ,
        }
       //  console.log(data);
       dataContainer.push(data);
      // console.log(dataContainer);
      localStorage.setItem("dataDetails" , JSON.stringify(dataContainer));
      displayData();
      clearForm();
    }
    }
   

// Retrive || Display
function displayData(){
    cartoona = "" ;
    for(var i=0 ; i<dataContainer.length ; i++){
        cartoona += `
        <tr>
                <td>${i+1}</td>
                <td>${dataContainer[i].name}</td>
                <td>
                    <button class="btn btn-visit" id="visitBtn" onclick="visitSite(${i})"><i class="fa-regular fa-eye pe-2"></i>Visit</button>
                </td>
                <td>
                    <button class="btn btn-delete" id="deleteBtn" onclick="deleteData(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button>
                </td>
            </tr>
        `;
    }
    document.getElementById('tableContent').innerHTML = cartoona ;
}

// Delete
function deleteData(index){
    // console.log(index);
    dataContainer.splice(index , 1);
    localStorage.setItem("dataDetails" , JSON.stringify(dataContainer));
    displayData();
}

// ClearForm
function clearForm(){
    siteName.value = "" ;
    siteUrl.value = "" ;
}

// Visit
function visitSite(index){
window.open(dataContainer[index].url);
}

// Search
function searchFun(){
   // console.log(search.value);
   var term = search.value;
   cartoona = "" ;
   for(var i=0 ; i<dataContainer.length ; i++){
    if (dataContainer[i].name.includes(term)) {
        cartoona += `
        <tr>
                <td>${i+1}</td>
                <td>${dataContainer[i].name}</td>
                <td>
                    <button class="btn btn-visit" id="visitBtn" onclick="visitSite(${i})"><i class="fa-regular fa-eye pe-2"></i>Visit</button>
                </td>
                <td>
                    <button class="btn btn-delete" id="deleteBtn" onclick="deleteData(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button>
                </td>
            </tr>
        `;   
    }
   }
   document.getElementById('tableContent').innerHTML = cartoona ;

}

// Name Validation
function validationName(){
var messageName = document.getElementById('messageName');
   // console.log(siteName.value);
   var text = siteName.value;
   var regexName = /^[A-Z][a-z]{2,10}$/;
   if (regexName.test(text)) {
    siteName.classList.add('is-valid');
    siteName.classList.remove('is-invalid');
    messageName.classList.add('d-none');
    return true;
   }else
   siteName.classList.add('is-invalid');
   siteName.classList.remove('is-valid');
   messageName.classList.remove('d-none');
   return false;
}

// URL Validation
function validationUrl(){
 var messageUrl = document.getElementById('messageUrl');
    // console.log(siteUrl.value);
    var textUrl = siteUrl.value;
    var regexUrl = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g ;
  
   if (regexUrl.test(textUrl)) {
    siteUrl.classList.add('is-valid');
    siteUrl.classList.remove('is-invalid');
    messageUrl.classList.add('d-none');
    return true;
   }else
   {
    siteUrl.classList.add('is-invalid');
    siteUrl.classList.remove('is-vaild');
    messageUrl.classList.remove('d-none');
    return false ;
   }
 }

