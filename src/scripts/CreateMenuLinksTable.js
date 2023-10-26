import AWS from 'aws-sdk';


AWS.config.update({
    region: "us-east-1"
});

const dynamodb = new AWS.DynamoDB();

const params = {
    TableName: "MenuLinks",
    KeySchema: [
        // partition Key
        { AttributeName: "href", KeyType: "HASH" },
        // Sort Keys
        { AttributeName: "text", KeyType: "RANGE" }
    ],
    AttributeDefinitions: [
        // partition Key
        { AttributeName: "class", AttributeType: "S" },
        { AttributeName: "href", AttributeType: "S" },
        { AttributeName: "text", AttributeType: "S" },

    ],
    LocalSecondaryIndexes: [
        {
            IndexName: "ClassIndex",
            KeySchema: [
                { AttributeName: "href", KeyType: "HASH" },
                { AttributeName: "class", KeyType: "RANGE" },
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

