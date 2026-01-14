document.addEventListener("DOMContentLoaded",() =>{

    const send_button = document.getElementById("send_button");
    const name_input = document.getElementById("name_input");
    const email = document.getElementById("email_input");
    const message = document.getElementById("message_input");
    const contact_form = document.getElementById("contact_form");
    const modal = document.getElementById("modal");
    const galleryImages = document.querySelectorAll("#gallery_container img");
    const closeBtn = document.getElementById("closeBtn");
    const galleryContainer = document.getElementById("gallery_container")

    // Contact Form
    if (!contact_form){
        console.log("contact form not on page")
    } else{
        console.log("contact form found!")
        send_button.addEventListener("click", submitForm);
    };

    function submitForm(event){
    event.preventDefault();
    console.log("name input:", name_input.value);
    console.log("email input:", email.value);
    console.log("message input:",message.value);
    contact_form.submit();
    };

    // Gallery 

    if (!closeBtn){
        console.log("close button for modal not found")
    } else{
        closeBtn.addEventListener("click", closeModal);
    };

    if (!galleryContainer){
        console.log("No gallery container rendered")
    } else{
        console.log("gallery container found");
        fetchPortfolioImages();
    };

    function fetchPortfolioImages(){
        fetch("portfolio_images.json?nocache=" + Date.now())
        .then(res => res.json())
        .then(images => {
        const gallery = document.getElementById("gallery_container");

            images.forEach(file => {
                const img = document.createElement("img");
                img.src = "./Images/" + file;
                img.className = "portfolio_image";
                img.alt = file;
                gallery.appendChild(img);
                img.addEventListener("click",showModal);
            });
        })
        .catch(err => console.error(err));
    };

    function showModal(img){
        console.log("galleryImage Clicked!")
        const clickedImg = event.target;
        const src = clickedImg.src;
        const alt = clickedImg.alt;
        modalImg.src = src;
        modalImg.alt = alt;
        modal.style.display = "block";
    };

    function closeModal() {
        modal.style.display = "none";
    };

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            closeModal();
        }
    });

});

function loadGTMHead() {
    gtmHeadScript = document.createElement('script')

    gtmHeadScript.innerHTML= "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WXK7RCWF');";
    document.head.appendChild(gtmHeadScript);
};

function loadGTMBody() {
    gtmBodyScript = document.createElement('noscript')

    gtmBodyScript.innerHTML= "<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WXK7RCWF"height="0" width="0" style="display:none;visibility:hidden"></iframe>" ;
    document.body.insertBefore(gtmBodyScript, document.body.firstChild);
};

loadGTMBody();
loadGTMHead();

