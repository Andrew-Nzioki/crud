const url = "http://localhost:3000/animalData";
const animalList = document.getElementById("animal-list");

document.querySelector('#animal-form').addEventListener('submit',handleSumit)
//Event handlers
function handleSumit(e){
    e.preventDefault()
    let animalObj={
        name:e.target.name.value,
        imageUrl:e.target.image_url.value,
        description:e.target.description.value,
        donations:0
    }
    
    adoptAnimal(animalObj)
}


//DOM render functions
function renderOneAnimal(animal) {
  let card = document.createElement("li");
  card.className = "card";
  card.innerHTML = `
  <img src="${animal.imageUrl}">
  <div class="content"> 
  <h4> ${animal.name}</4>
  <p>
     $<span class="donation-count">${animal.donations}</span> Donated
  </p>
  <p>${animal.description}</p>
 </div>

 <div class="buttons">
 <button id="donate">Donate $10 </button>
 <button id="set_free> set free</button>


 
 
 `;
  //Add animal card to DOM
  animalList.appendChild(card);
}

//fetch requests
//Get fetch for all animal resources

function getAllAnimals() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => data.forEach((animal) => renderOneAnimal(animal)));
}

//adopt animal function
function adoptAnimal(animalObj){
    console.log(JSON.stringify(animalObj))
    fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(animalObj)
    })
    .then(res=>res.json())
    .then(animal=>console.log(animal))
}

//initial Render
function initialize() {
  getAllAnimals();
}
initialize();
