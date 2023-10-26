import AWS from 'aws-sdk';
import fs from 'fs';


AWS.config.update({
    region: "us-east-1"
});

console.log("Writing entries to Accessibilties table");

var dynamodb = new AWS.DynamoDB.DocumentClient();
var accessibilitiesData = JSON.parse(fs.readFileSync('../components/data/accessibilities.json','utf8'));

accessibilitiesData.forEach(function(accessibililty){
    var params = {
        TableName: "Accessibilities",
        Item: {
            "description": accessibililty.description
        }
    }

    dynamodb.put(params, function(err, data){
        if(err)
            console.error("unable to load data into table for accessibility",
            accessibililty.description, "Error:", JSON.stringify(err, null, 2))
        else
            console.log("Added", accessibililty.description, "to table.")
    });
});





