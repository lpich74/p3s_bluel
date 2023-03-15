        // 1°)  a) Fonction qui va générer la galerie de photos à éditer dans la modale

function generateModalWorks(works) {

    const gallery = document.querySelector('.gallery-modal');
    for (let i = 0; i < works.length; i++) {
           
        const figureElement = document.createElement('figure');
        figureElement.classList.add('id-' + works[i].id);
        figureElement.setAttribute("data-id", works[i].id)
        const imageElement = document.createElement('img');
        imageElement.src = works[i].imageUrl; 
        const iconElement = document.createElement('i');
        iconElement.innerHTML = '<i class="fa-solid fa-arrows-up-down-left-right hidden"></i><i class="fa-regular fa-trash-can"></i>'
        const figcaptionElement = document.createElement('figcaption');
        figcaptionElement.innerText = "éditer";   
        
        gallery.appendChild(figureElement);            
        figureElement.appendChild(imageElement);  
        figureElement.appendChild(figcaptionElement);
        figureElement.appendChild(iconElement)
    }
}
        //  b) Fonctions qui servent à jongler entre les modales

function hideModeAjout() {
    const elementsAjout = Array.from(document.querySelectorAll(".mode-ajout"));
    for (i = 0 ; i < elementsAjout.length ; i++) {
        elementsAjout[i].classList.add("hidden");
    };    
}

function hideModePresentation() {
    const elementsPresentation = Array.from(document.querySelectorAll(".mode-presentation"));
    for (i = 0 ; i < elementsPresentation.length ; i++) {
        elementsPresentation[i].classList.add("hidden");
    };    
}

function showModeAjout() {
    const elementsAjout = Array.from(document.querySelectorAll(".mode-ajout"));
    for (i = 0 ; i < elementsAjout.length ; i++) {
        elementsAjout[i].classList.remove("hidden");
    };    
}

function showModePresentation() {
    const elementsPresentation = Array.from(document.querySelectorAll(".mode-presentation"));
    for (i = 0 ; i < elementsPresentation.length ; i++) {
        elementsPresentation[i].classList.remove("hidden");
    };    
}

document.addEventListener("DOMContentLoaded", async function() {

        // 2°) Ouverture de la modale en appuyant sur "modifier"
    
    const btnModifier = document.querySelectorAll(".modifier")

    btnModifier.forEach(function(button) {
        button.addEventListener("click", function() {
            const showModal = document.querySelector('.modal');
            showModal.classList.remove("hidden");
            showModePresentation()
            hideModeAjout()
        })
    });

        // 3°) Appel à l'API et à la fonction pour générer la galerie de travaux dans la modale

    try {
        const response = await fetch("http://localhost:5678/api/works");
        const works = await response.json();
        generateModalWorks(works)
    } catch(error) {
        window.alert("Impossible de récupérer les travaux");
    }

        // 4°) Générer l'icône fléchée au survol de chaque figure 

    const figure = Array.from(document.querySelectorAll(".gallery-modal figure"));
    for (i = 0 ; i < figure.length ; i++) {
        figure[i].addEventListener("mouseover", function() {
            const addArrows = this.querySelector('.fa-solid');
                addArrows.classList.remove('hidden')
        });

        figure[i].addEventListener("mouseout", function() {
            const addArrows = this.querySelector('.fa-solid');
                addArrows.classList.add('hidden')
        });
    }

        // 5°)  a) fermer la modale en appuyant sur X

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

        // 6°) supprimer un élément la galerie
    
    const supprElementGalerie = Array.from(document.querySelectorAll(".gallery-modal figure .fa-regular"));
    for (i = 0 ; i < supprElementGalerie.length ; i++) {
        supprElementGalerie[i].addEventListener("click", async function() {
            const figure = this.parentElement.parentElement;
            const id = figure.getAttribute("data-id");

            const tokenResponse = JSON.parse(localStorage.getItem("tokenResponse")).token;
            const deleteOptions = {
                method: 'DELETE',
                headers: {
                    "Accept": "*/*",
                    "Authorization": `Bearer ${tokenResponse}`
                }
            };

            try {
                const response = await fetch(`http://localhost:5678/api/works/${id}`, deleteOptions);

                if (!response.ok) {
                    throw new Error("Impossible d'effacer ce projet");
                }
                figure.remove();

            } catch(error) {
                window.alert("Opération impossible")
            }
        });
    }
  
        // 7°) supprimer la galerie entière

    const supprGalerie = document.getElementById('btn-suppr');

    supprGalerie.addEventListener("click", function() {
        const galleryModalElements = Array.from(document.querySelector('.gallery-modal').querySelectorAll('figure'));
        for (let i = 0; i < galleryModalElements.length; i++) {
            galleryModalElements[i].classList.add("hidden")
        };
        const galleryElements = Array.from(document.querySelectorAll('.gallery > figure'));
        for (let i = 0; i < galleryElements.length; i++) {
            galleryElements[i].classList.add("hidden")
        };
    });

        // 8°)  a) apparition de la modale-formulaire en cliquant sur "ajouter une photo"
    
    const ajouterPhoto = document.getElementById('btn-add');

    ajouterPhoto.addEventListener("click", function() {
        hideModePresentation();
        showModeAjout()
    });

            //  b) retour en arrière
    
    const btnArrow = document.querySelector(".fa-solid.fa-arrow-left");

    btnArrow.addEventListener("click", function() {
        hideModeAjout();
        showModePresentation()
    });

});
