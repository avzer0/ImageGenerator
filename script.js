const generateForm = document.querySelector(".create-form");
const ImageGallery = document.querySelector(".image-gallery");

//const generateAIImages = (userPrompt, userImgQuantity) => {
//};
//21.54



//Input + loading
const handleFormSubmission = (e) => {

    e.preventDefault();

    //Collect user input from form (prompt + numImages)
    const userPrompt = e.srcElement[0].value;
    const userImgQuantity = e.srcElement[1].value;

    // test input collection
    //console.log(userPrompt, userImgQuantity);

    //create HTML markup for the html
    const imgCardMarkup = Array.from({length: userImgQuantity}, () =>
        `<div class="image-card loading">
        <img src="Imgs/loading.svg" alt="image">
        <a href="#" class="download-btn">
            <img src="Imgs/arrow.svg" alt="download-icon">
        </a>
        </div>`
    ).join("");

    ImageGallery.innerHTML = imgCardMarkup;
    generateAIImages(userPrompt, userImgQuantity)
};

generateForm.addEventListener("submit", handleFormSubmission);