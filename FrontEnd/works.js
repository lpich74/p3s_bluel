    // étape 1.1 : Récupération des travaux depuis le back-end
    
function generateWorks(works) {

    const gallery = document.querySelector('.gallery');
    for (let i = 0; i < works.length; i++) {
           
        const figureElement = document.createElement('figure');
        const imageElement = document.createElement('img');
        imageElement.src = works[i].imageUrl;    
        const figcaptionElement = document.createElement('figcaption');
        figcaptionElement.innerText = works[i].title;   
        
        gallery.appendChild(figureElement);            
        figureElement.appendChild(imageElement)
        figureElement.appendChild(figcaptionElement);
    }
}

document.addEventListener("DOMContentLoaded", async function() {

    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
      
    generateWorks(works);
    
        // Étape 1.2 : Réalisation du filtre des travaux
    
    // filtre tous

    const tousFilter = document.createElement("li");
    tousFilter.textContent = "Tous";
    
    const allFilterElements = document.getElementById("filtres");

    allFilterElements.appendChild(tousFilter);

    const gallery = document.querySelector('.gallery');

    tousFilter.addEventListener("click", function() {
        const tousElements = Array.from(gallery.querySelectorAll('figure'));
        for (let i = 0; i < tousElements.length; i++) {
            tousElements[i].classList.remove("hidden")
        };
    });
    
    // filtre objets
    const categoriesIdObjets = works.filter(work => work.categoryId === 2 || work.categoryId === 3).map(work => work.id);
    
    const objetsFilter = document.createElement("li");
    objetsFilter.textContent = "Objets";

    allFilterElements.appendChild(objetsFilter);

    objetsFilter.addEventListener("click", function() {
        const objetsElements = document.createElement('ul');
        for (let i = 0 ; i < categoriesIdObjets.length ; i++) {
            const objetElement = document.createElement('li');
            objetElement.innerText = categoriesIdObjets[i];
            objetsElements.appendChild(objetElement)
        };
        document.querySelector('.gallery').appendChild(objetsElements)
     });

    // filtre appartements
    const categoriesIdAppartements = works.filter(work => work.categoryId === 1 || work.categoryId === 3).map(work => work.id);

    const appartementsFilter = document.createElement("li");
    appartementsFilter.textContent = "Appartements";

    allFilterElements.appendChild(appartementsFilter);
    
    appartementsFilter.addEventListener("click", function() {
        const appartementsElements = document.createElement('ul');
        for (let i = 0 ; i < categoriesIdAppartements.length ; i++) {
            const appartementElement = document.createElement('li');
            appartementElement.innerText = categoriesIdAppartements[i];
            appartementsElements.appendChild(appartementElement)
        };
        document.querySelector('.gallery').appendChild(appartementsElements)
     });
    

    // filtre hôtels et restaurants
    const categoriesIdHotels = works.filter(work => work.categoryId === 1 || work.categoryId === 2).map(work => work.id);

    const hotelsFilter = document.createElement("li")
    hotelsFilter.textContent = "Hôtels et restaurants";

    allFilterElements.appendChild(hotelsFilter);
    
    hotelsFilter.addEventListener("click", function() {
        const hotelsElements = document.createElement('ul');
        for (let i = 0 ; i < categoriesIdHotels.length ; i++) {
            const hotelElement = document.createElement('li');
            hotelElement.innerText = categoriesIdHotels[i];
            hotelsElements.appendChild(hotelElement)
        };
        document.querySelector('.gallery').appendChild(hotelsElements)
     });
});


