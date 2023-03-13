        // 1°) Fonction qui va générer la galerie de photos à éditer dans la modale

function generateModalWorks(works) {

    const gallery = document.querySelector('.gallery-modal');
    for (let i = 0; i < works.length; i++) {
           
        const figureElement = document.createElement('figure');
        const imageElement = document.createElement('img');
        imageElement.src = works[i].imageUrl;    
        const figcaptionElement = document.createElement('figcaption');
        figcaptionElement.innerText = "éditer";   
        
        gallery.appendChild(figureElement);            
        figureElement.appendChild(imageElement)
        figureElement.appendChild(figcaptionElement);
    }
}

document.addEventListener("DOMContentLoaded", async function() {

        // 2°) Ouverture de la modale en appuyant sur "modifier"
    
    const btnModifier = document.querySelectorAll(".modifier")

    btnModifier.forEach(function(button) {
        button.addEventListener("click", function() {
            const showModal = document.querySelector('.modal');
            showModal.classList.remove("hidden");
        })
    });

        // 3°) Appel à l'API et à la fonction pour générer la galerie de travaux dans la modale

    try {
        const response = await fetch("http://localhost:5678/api/works");
        const works = await response.json();
        generateModalWorks(works)
    } catch (error) {
        window.alert("Impossible de récupérer les travaux");
    }

        // 4°)  a) fermer la modale en appuyant sur X

    const btnX = document.querySelector(".fa-solid.fa-x");
    const quitModal = document.querySelector('.modal');

    btnX.addEventListener("click", function() {
        quitModal.classList.add("hidden")
    });

            //  b) fermer la modale en appuyant sur l'arrière-plan

    quitModal.addEventListener('click', function(event) {
        if (event.target === quitModal) {
            quitModal.classList.add('hidden');
        }
    });

        // 5°) supprimer la galerie

    const supprGalerie = document.getElementById('btn-suppr');

    supprGalerie.addEventListener("click", function() {
        const galleryModalElements = Array.from(document.querySelector('.gallery-modal').querySelectorAll('figure'));
        for (let i = 0; i < galleryModalElements.length; i++) {
            galleryModalElements[i].classList.add("hidden")
        };
    });
});
