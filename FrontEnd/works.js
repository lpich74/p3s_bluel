    // étape 1.1 : Récupération des travaux depuis le back-end
    
function generateWorks(works) {

    const gallery = document.querySelector('.gallery');
    for (let i = 0; i < works.length; i++) {
           
        const figureElement = document.createElement('figure');
        figureElement.classList.add('category-' + works[i].category.id);
        figureElement.setAttribute("data-id", works[i].id)
        const imageElement = document.createElement('img');
        imageElement.src = works[i].imageUrl;    
        const figcaptionElement = document.createElement('figcaption');
        figcaptionElement.innerText = works[i].title;   
        
        gallery.appendChild(figureElement);            
        figureElement.appendChild(imageElement)
        figureElement.appendChild(figcaptionElement);
    }
}

function isConnected() {
    return window.localStorage.getItem("tokenResponse") !== null;
}

document.addEventListener("DOMContentLoaded", async function() {

    if (isConnected()) {
        const connectionRequiredElements = Array.from(document.querySelectorAll('.connection-required'))
        for (let i = 0; i < connectionRequiredElements.length; i++) {
            connectionRequiredElements[i].classList.remove("hidden")
        };

        const allFilterElements = document.getElementById("filtres");
            allFilterElements.classList.add("hidden");

        const login = document.getElementById("login");
            login.classList.add("hidden");

        const logout = document.getElementById("logout");
            logout.classList.remove("hidden");
    }

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
    
    // filtres objets, appartements, hôtels et restaurants
    
    const categories = await (await fetch("http://localhost:5678/api/categories")).json();

    categories.forEach((category) => {
        const categoryHtml = document.createElement('li');
        categoryHtml.textContent = category.name;
        allFilterElements.appendChild(categoryHtml); 

        categoryHtml.addEventListener('click', () => {
            const allWorkElements = Array.from(document.querySelectorAll('.gallery > figure'));
                 // on masque préventivement chaque élement work
            allWorkElements.forEach(workElement => {
                if (workElement.classList.contains('category-' + category.id)) {
                    workElement.classList.remove('hidden');
                } else {
                    workElement.classList.add('hidden');
                }
            })
        });
    });

});


