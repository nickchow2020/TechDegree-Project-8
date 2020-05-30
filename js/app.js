/**********************Gobal Variable That: */
//Used in this project
/****************** */
const randomUsersAPI = "https://randomuser.me/api/?results=12";
const gridsContainer = document.querySelector(".grid-container");
const overlaysContainer = document.querySelector(".overlayWrap");
const body = document.querySelector("body");
const filterInput = document.querySelector(".filter")

/**********************Async Function That: */
// Getting Data From API With 12 random Users and Structure Them
/****************** */
function structureData (data){
   const dataNeeds = data.map((info => {
       const firstName = info.name.first;
       const lastName = info.name.last;
       const email = info.email;
       const city = info.location.city;
       const avatarURL = info.picture.large;
       const phone = info.phone;
       const addressUnit = info.location.street.number;
       const addressStreet = info.location.street.name;
       const addressZip = info.location.postcode;
       const addressCountry = info.location.country;
       const addressState = info.location.state;
       const birthday = info.dob.date;
       const datas = {
           name : `${firstName} ${lastName}`,
           email,
           city,
           avatarURL,
           phone,
           birthday:`${birthday.substring(5,7)}/${birthday.substring(8,10)}/${birthday.substring(2,4)}`,
           address: `${addressUnit} ${addressStreet} ${addressState} ${addressZip} ${addressCountry}`,
       }
       return datas;
   }))
   return dataNeeds;
}

/**********************Async Function That: */
// Getting Data From API With 12 random Users
/****************** */
async function randomUsers(url){
    const randomUsers = await fetch(url);
    const usersToJson = await randomUsers.json();
    const userData = usersToJson.results.map(data =>{
        const user = data
        return user;
    });
    return userData;
}

/**********************Function That: */
// Going to Structure the HTML Data
/****************** */
function structureHTML(data){
    const usersHTML = data.map(data => {
        const gridItem = document.createElement("DIV");
        gridItem.classList.add("grid-item");
        gridsContainer.appendChild(gridItem);
        gridItem.innerHTML = `
        <img src="${data.avatarURL}" alt="${data.name}" class="avatar">
        <div>
          <h2 class="name">${data.name}</h2>
          <p class="email">${data.email}</p>
          <p class="city">${data.city}</p>
        </div>
        `
        return gridItem;
    })
    return usersHTML;
}


function structureFilterHTML(data){
  gridsContainer.innerHTML = "";
  const usersHTML = data.map(data => {
      const gridItem = document.createElement("DIV");
      gridItem.classList.add("grid-item");
      gridsContainer.appendChild(gridItem);
      gridItem.innerHTML = `
      <img src="${data.avatarURL}" alt="${data.name}" class="avatar">
      <div>
        <h2 class="name">${data.name}</h2>
        <p class="email">${data.email}</p>
        <p class="city">${data.city}</p>
      </div>
      `
      return gridItem;
  })
  return usersHTML;
}



/**********************Function That: */
// Going to Structure the Overlay HTML Data
/****************** */

function overlayHTML(data){
  overlaysContainer.innerHTML = `
    <div class="overlay" style="visibility:visible">
      <div class="modal">
        <p class="close">X</p>
        <div>
          <img src="${data.avatarURL}" alt="${data.name}" class="avatar">
          <h2 class="nameoverlay">${data.name}</h2>
          <p class="email">${data.email}</p>
          <p class="city">${data.city}</p>
          <hr class="line">
          <p class="phone">${data.phone}</p>
          <p class="address">${data.address}</p>
          <p class="birthday">BirthDay:${data.birthday}</p>
        </div>
      </div>
    </div>
    `   
}

/**********************Function Call: */
// Structure the Overlay HTML Data,
// Structure the HTML Data,
/****************** */
randomUsers(randomUsersAPI)
 .then(structureData)
 .then(data => {
  structureHTML(data)

  
 /***************Event Handler keyup That: */
 //making the filter by employee name 
  filterInput.addEventListener("keyup",(e)=>{
    const filterValue = filterInput.value.toLowerCase();
    if(filterValue !== ""){
      let filterData = [];
      for(let i = 0; i < data.length; i ++){
        if(data[i].name.toLowerCase().indexOf(filterValue) > -1){
          filterData.push(data[i])
        }
     }
     structureFilterHTML(filterData);
    }else{
      structureFilterHTML(data)
    }
  })




/***************Event Handler That: */
  //making modal window pop up
  body.addEventListener("click",(e)=>{
    if(e.target.classList.contains("name")){
      var employeeName = e.target.textContent;
      for(let i = 0; i < data.length; i ++){
        if(employeeName === data[i].name){
          const employeeInfo = data[i];
          overlayHTML(employeeInfo);
        }
      }
    }
   //making modal window close
   if(e.target.classList.contains("close")){
     const overlay = e.target.parentNode.parentNode;
     overlay.style.visibility = "hidden";
   }
  })
 })
  .catch(err => console.log("There Was a Error occur,Please check your code",err))



/****************** */