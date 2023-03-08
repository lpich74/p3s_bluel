document.addEventListener("DOMContentLoaded", function() {

    async function postFormDataAsJson({url, formData}) {
        const plainFormData = Object.fromEntries(formData.entries());
        const formDataJsonString = JSON.stringify(plainFormData);

        
        const fetchOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: formDataJsonString
        };

        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        return response.json();
    };
    
    async function handleFormSubmit(event) {
        event.preventDefault(); // Par défaut, submit => redirection, donc on utilise event.preventDefaut pour casser cela

        const form = event.currentTarget;
        const url = form.action;

        try {
            const formData = new FormData(form);
            const responseData = await postFormDataAsJson({ url, formData });
            
            window.localStorage.setItem("tokenResponse", JSON.stringify(responseData));
            window.location.href = "file:///Users/Lucas/Desktop/OpenClassrooms/Projet%203/Portfolio-architecte-sophie-bluel/FrontEnd/index.html";
        } catch(error) {
             window.alert("Erreur dans l’identifiant ou le mot de passe");
          }
    };

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", handleFormSubmit);
    }
    
});