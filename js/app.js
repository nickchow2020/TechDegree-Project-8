/**********************Gobal Variable That: */
//Used in this project
/****************** */
const randomUsersAPI = "https://randomuser.me/api/?results=12";
const gridContainer = document.querySelector(".grid-container");
const body = document.querySelector("body");


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
        gridContainer.appendChild(gridItem);
        gridItem.innerHTML = `
        <img src="${data.avatarURL}" alt="${data.name}" class="avatar">
        <div>
          <h2 class="name">${data.name}</h2>
          <p class="email">${data.email}</p>
          <p class="city">${data.city}</p>
        </div>
        `
    })
    return usersHTML;
}



/**********************Function That: */
// Going to Structure the Overlay HTML Data
/****************** */

function overlayHTML(data){
  const usersData = data.map(data => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("overlay");
    body.appendChild(newDiv);
    newDiv.innerHTML = `
    <div class="modal">
      <p class="close">X</p>
      <div>
        <img src="${data.avatarURL}" alt="${data.name}" class="avatar">
        <h2 class="name">${data.name}</h2>
        <p class="email">${data.email}/p>
        <p class="city">${data.city}</p>
        <hr class="line">
        <p class="phone">${data.phone}</p>
        <p class="address">${data.address}</p>
        <p class="birthday">BirthDay:${data.birthday}</p>
      </div>
    </div>
    `   
    return newDiv;
  })
  return usersData;
}


randomUsers(randomUsersAPI)
 .then(structureData)
 .then(data => {
  structureHTML(data),
  overlayHTML(data)
 })