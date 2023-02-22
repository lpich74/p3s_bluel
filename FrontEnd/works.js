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
            tousElements[i].classList.remove("hidden");
        }
    })
    
    // autres filtres
    
    const objetsFilter = document.querySelector(".objets-filter")
    
    objetsFilter.addEventListener("click", function() {
        const objetsFiltered = works.filter(function (works) {
            return works.categoryId === 1;
        });
        document.querySelector(".gallery").innerHTML = "";
        generateWorks(objetsFiltered);
    })
    
    const appartementsFilter = document.querySelector(".appartements-filter")
    
    appartementsFilter.addEventListener("click", function() {
        const appartementsFiltered = works.filter(function (works) {
            return works.categoryId === 2;
        });
        document.querySelector(".gallery").innerHTML = "";
        generateWorks(appartementsFiltered);
    })
    
    const hotelsFilter = document.querySelector(".hotels-filter")
    
    hotelsFilter.addEventListener("click", function() {
        const hotelsFiltered = works.filter(function (works) {
            return works.categoryId === 3;
        });
        document.querySelector(".gallery").innerHTML = "";
        generateWorks(hotelsFiltered);
    })
});


