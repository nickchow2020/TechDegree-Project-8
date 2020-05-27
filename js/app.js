/**********************Gobal Variable That: */
//Used in this project
/****************** */
const randomUsersAPI = "https://randomuser.me/api/?results=12";
const gridContainer = document.querySelector(".grid-container");


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
       const datas = {
           name : `${firstName} ${lastName}`,
           email,
           city,
           avatarURL,
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
    return usersHTML
}





randomUsers(randomUsersAPI)
 .then(structureData)
 .then(structureHTML)