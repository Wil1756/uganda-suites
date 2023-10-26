import AWS from 'aws-sdk';


AWS.config.update({
    region: "us-east-1"
});

const dynamodb = new AWS.DynamoDB();

const params = {
    TableName: "GalleryImages",
    KeySchema: [
        // partition Key
        { AttributeName: "src", KeyType: "HASH" },
        // Sort Keys
        { AttributeName: "className", KeyType: "RANGE" }
    ],
    AttributeDefinitions: [
        // partition Key
        { AttributeName: "alt", AttributeType: "S" },
        { AttributeName: "src", AttributeType: "S" },
        { AttributeName: "className", AttributeType: "S" },

    ],
    LocalSecondaryIndexes: [
        {
            IndexName: "AltIndex",
            KeySchema: [
                { AttributeName: "src", KeyType: "HASH" },
                { AttributeName: "alt", KeyType: "RANGE" },
            ],
            Projection: {
                ProjectionType: "KEYS_ONLY"
            }
        }
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

