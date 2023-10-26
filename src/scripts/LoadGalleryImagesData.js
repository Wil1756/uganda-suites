import AWS from 'aws-sdk';

import fs from 'fs';

AWS.config.update({
    region: "us-east-1"
});

console.log("Writing entries to Gallery Images table");

var dynamodb = new AWS.DynamoDB.DocumentClient();
var galleryImagesData = JSON.parse(fs.readFileSync('../components/data/gallery_images.json', 'utf8'));

galleryImagesData.forEach(function(galleryImage){
    var className = galleryImage.className;
    if(className.trim() == "")
        className= "noClass";

    var params = {
        TableName : "GalleryImages",
        Item: {
            "src" : galleryImage.src,
            "alt" : galleryImage.alt,
            "className" : className
        }
    }

    dynamodb.put(params, function(err, data){
        if(err)
            console.error("unable to load data into table for gallery images",
            galleryImage.src, "Error", JSON.stringify(err, null, 2))
        else
            console.log("Added", galleryImage.src, "to table.")

    })
})