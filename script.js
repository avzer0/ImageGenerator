const generateForm = document.querySelector(".create-form");
const ImageGallery = document.querySelector(".image-gallery");

const OPENAI_API_KEY = "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";

const updateImageCard = (imagDataArray) => {
    imagDataArray.forEach((imgObject, index) => {
        const imgCard = ImageGallery.querySelectorAll(".image-card")[index];
        const imgElement = imgCard.querySelector("img");
        const downloadBtn = imgCard.querySelector(".download-btn");

        //Set the Ai generated images has the source
        const aiGeneratedImg = `data:image/jpeg;base64,${imgObject.b64_json}`
        imgElement.src = aiGeneratedImg;
        
        //When the image is loaded, remove the loading class
        imgElement.onload = () => {
            imgCard.classList.remove("loading");
            //Download image has jpg
            downloadBtn.setAttribute("href", aiGeneratedImg);
            downloadBtn.setAttribute("download", `${new Date ().getTime()}.jpg`);
        };

    });
};

//Use open API AI to generate the images
const generateAIImages = async (userPrompt, userImgQuantity) => {
    try{
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                prompt: userPrompt,
                n: parseInt(userImgQuantity),
                size: "512x512", //1024x1024
                response_formate:  "b64_json"
            })
        });

        if(!response.ok) throw new Error("Failed to generate images.")

        // Collect data from response
        const { data } = await response.json();
        //Upadate the image gallery with the AI generated images
        updateImageCard([...data])

    } catch (error) {
        alert(error.message)
    }
};




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