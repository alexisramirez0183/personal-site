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
    const blogContainer = document.getElementById("blog_parent_container")

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
        if (!closeBtn){
        console.log("close button for modal not found")
        } else{
        console.log("close button found!")
        closeBtn.addEventListener("click", closeModal);
    };
    };

    function closeModal() {
        modal.style.display = "none";
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



    document.addEventListener("click", (e) => {
        if (e.target.matches("#closeBtn")){
            blogModal.style.display = "none"
        }
    });

    // function populate(){
    //     fetch("blog_posts.json?nocache="+ Date.now())
    //     .then(res => res.json())
    //     .then(obj => {
    //         const data = obj;

    //         data.forEach(insertBlogEntries);
    //         // const postDate = data[1].post_info.post_date;
    //         // consdole.log("post date:", postDate)

    //         // const parent_container = document.getElementById("blog_parent_container")
    //         // const myLink = document.createElement("a");
    //         // parent_container.appendChild(myLink)
    //     })
    // };

    async function populate(){
        const jsonURL = "blog_posts.json?nocache="+ Date.now()
        const request = new Request(jsonURL);
        const response = await fetch(request);
        const postArray = await response.json();
        console.log("Post Array:", postArray);

        populatePosts(postArray);
        // populatePostInfo(postArray);

    };

    function populatePosts(obj){
        const parent_container = document.getElementById("blog_parent_container")
        const singlePost = document.createElement("a");
        singlePost.setAttribute("id", "individual_blog_post")
        singlePost.setAttribute("href","[insert URL here]")
        const postTitle = document.createElement("h3");
        postTitle.classList.add("blog_title")
        const postDescription = document.createElement("p");
        const postDate = document.createElement("p")
        postDate.classList.add("blog_date")

        parent_container.appendChild(singlePost)
        singlePost.appendChild(postTitle, postDescription, postDate)
        singlePost.appendChild(postDescription)
        singlePost.appendChild(postDate)

    }

    // function insertBlogEntries(obj){
    //     const parent_container = document.getElementById("blog_parent_container")
    //     const myLink = document.createElement("a");
    //     console.log("object output:", obj)
    //     myLink.textContent = obj.file_path;
    //     console.log("Attempting to append <a> tag to div")
    //     parent_container.appendChild(myLink);
    // };

    if (!blogContainer){
        console.log("No blog container rendered")
    } else{
        console.log("blog container found");
        console.log("attempting to run populate function")
        blogPost.addEventListener("click", showBlogModal);
        populate();
    };
});