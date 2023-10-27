import AWS from 'aws-sdk';
import fs from 'fs';


AWS.config.update({
    region: "us-east-1"
});

console.log("Writing entries to Accessibilties table");

var dynamodb = new AWS.DynamoDB.DocumentClient();
var servicesData = JSON.parse(fs.readFileSync('../components/data/services.json','utf8'));

servicesData.forEach(function(services){
    var params = {
        TableName: "Services",
        Item: {
            "description": services.description
        }
    }

    dynamodb.put(params, function(err, data){
        if(err)
            console.error("unable to load data into table for services",
            services.description, "Error:", JSON.stringify(err, null, 2))
        else
            console.log("Added", services.description, "to table.")
    });
});












// lambda functions for all tables created AWS lambda V3

// import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

// const dynamodb = new DynamoDBClient({ region: 'us-east-1' });

// export const handler = async (event, context) => {
//   const params = {
//     TableName: "Services"
//   };

//   try {
//     const data = await dynamodb.send(new ScanCommand(params));
//     return data.Items;
//   } catch (err) {
//     throw err;
//   }
// };