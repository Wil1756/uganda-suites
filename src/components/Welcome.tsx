import {useEffect, useState} from 'react';
// import galleryImages from './data/gallery_images.json';

interface ImageData {
    className: { S: string };
    alt: { S: string };
    src: { S: string };
}

export const Welcome = () => {
    const [galleryImages, setGalleryImages] = useState<ImageData[]>([]);


    const loadGalleryImagesData = async() => {
        //Query the API Gateway
        const resp = await fetch("https://c4vxtaypec.execute-api.us-east-1.amazonaws.com/Production/galleryImages");
        let jsonData = await resp.json();

        //Assign response data to our state variable
        setGalleryImages(jsonData);
    };
    
    useEffect(()=>{
        //load the gallery images data from the API gateway
        loadGalleryImagesData();
    },[]);

    return(
        <div className="scene" id="welcome">
            <article className="content">
                <div className="gallery">
                    {galleryImages.map((img , index)=>(
                        <img key={index} className={img.className.S} src={img.src.S} alt={img.alt.S}/>
                    ))}
                </div>
                <h1>Welcome to Uganda Suites </h1>
                <p>Uganda is made up of close to 67 different tribes, with 67 different cultures and 67 different foods according to culture. However, the most interesting part is that these 67 different tribes are able to live in peace and harmony while communicating with each other and understanding each other. That’s one unique thing about my region that I am proud of, browse our website and <a href="files/landon_information_sheet_London.pdf">download our handy information sheet</a>.</p>
            </article>
      </div>
    );
};
