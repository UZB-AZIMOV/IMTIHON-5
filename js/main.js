const navbar = document.querySelector(".navbar__collection")
const API__URL = "https://fakestoreapi.com"
const skeleton = document.querySelector(".skeleton")
const wrapper = document.querySelector(".wrapper")
const semore = document.querySelector(".semore")
const collection = document.querySelector(".collection")
for (let i = 0; i < 12; i++) {
    let skeletonItem = document.createElement("div")
    skeletonItem.classList.add("skeleton__item")
    skeletonItem.innerHTML = `
                   <div class="skeletton__images skelete__inme"></div>
                    <div class="skeleton__line skelete__inme"></div>
                    <div class="skeleton__line skelete__inme"></div>
    `
    skeleton.append(skeletonItem)
}
let perPageCount = 6
let offset = 1
let category = "";
async function fetchData(api, limit, category) {
    let response = await fetch(`${api}/products${category}?limit=${limit}`)
    response
        .json()
        .then(res => createCard(res))
        .catch(err => console.log(err))
        .finally(() => {
            skeleton.style.display = "none"
        })
}
fetchData(API__URL, perPageCount, category)

function createCard(data) {
    while (wrapper.firstChild) {
        wrapper.firstChild.remove()
    }
    // console.log(data.products.id);
    data.forEach((product) => {
        let cardItem = document.createElement("div")
        cardItem.classList.add("card")
        cardItem.dataset.id = product.id
        cardItem.innerHTML = `
        <div class="card__foto"><img class= "card__image" src=${product.image} alt=""></div>
        
        <h3 class= "card__item" title ="${product.title}">${product.title}</h3>
        <p class="nom" title ="${product.description}">id ${product.id}</p>
                <p class= "rating" title =${product.description}>Rating : ${product.rating
.rate}  <i class="fa-solid fa-star star"></i></p>
        <p class="desck" title ="${product.description}">${product.price}$</p>
        <p class="gory" title ="${product.description}">${product.category}</p>

       <button class="buy">Add To Cart</button>
       <div class="card__icon">
       <div class="eey"> <i class="fa-solid fa-heart"></i></div>
       <div class="eey">  <i class="fa-solid fa-eye"></i></div>
        </div> 
        <button class="card__new">New</button>
       
        `
        wrapper.appendChild(cardItem)

    })
}
semore.addEventListener("click", () => {
    offset++
    fetchData(API__URL, perPageCount * offset, category)
})
wrapper.addEventListener("click", (e) => {
    if (e.target.className.includes("card__image")){


        let id = e.target.closest(".card").dataset.id

        console.log(id);
        window.open(`/pages/product.html?id=${id}`, "_self")

    }
})
function toggleShow() {
    navbar.classList.toggle("show")
}



const title = document.querySelector(".title")

function clock(){ 
    let date = new Date()
    let month = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let secunt = date.getSeconds()
    let result =[month,hour,minute,secunt,].map(i=>i.toString().padStart(2,"0")).join(":")
    console.log(result)
    title.textContent = result
}
clock()
setInterval(()=>{
    clock()
},1000)





