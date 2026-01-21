document.addEventListener("DOMContentLoaded",() =>{

    const send_button = document.getElementById("send_button");
    const name_input = document.getElementById("name_input");
    const email = document.getElementById("email_input");
    const message = document.getElementById("message_input");
    const contact_form = document.getElementById("contact_form");
    const modal = document.getElementById("modal");
    const galleryImages = document.querySelectorAll("#gallery_container img");
    const closeBtn = document.getElementById("closeBtn");
    const galleryContainer = document.getElementById("gallery_container");
    const blogModal = document.getElementById("blog_modal");
    const blogPost = document.getElementById("individual_blog_post");

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
    dataLayer.push({
        event:'submitContact',
        name: name_input.value,
    })
    };

    // Gallery 

    if (!closeBtn){
        console.log("close button for modal not found")
    } else{
        console.log("close button found!")
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
        blogModal.style.display = "none";
    };

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            closeModal();
        }
    });

    function showBlogModal(event){
        event.preventDefault();
        blogModal.style.display = "block";
        console.log("blog modal display changed to block!");
        const clickedPost = event.target;
        const postHref = clickedPost.href;
        fetch(postHref)
        .then(res => res.text())
        .then((html) =>{
            blogModal.innerHTML=html;
        })
        .catch((error) => {
        console.warn(error);
        }); 
    };

    blogPost.addEventListener("click", showBlogModal);

});