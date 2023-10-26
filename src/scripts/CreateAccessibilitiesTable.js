import AWS from 'aws-sdk';


AWS.config.update({
    region: "us-east-1"
});

const dynamodb = new AWS.DynamoDB();

const params = {
    TableName: "Accessibilities",
    KeySchema: [
        // partition Key
        { AttributeName: "description", KeyType: "HASH" },
    ],
    AttributeDefinitions: [
        // partition Key
        { AttributeName: "description", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function (err, data) {
    if (err)
        console.log("Unable to create table:", JSON.stringify(err, null, 22))
    else
        console.log("Create table with description:", JSON.stringify(data, null, 2))
});

