# basic-chat-app
Serverless chat application with multiple channels

## Functions

* Create channel: Creates a new communication channel
* Get channels: Receives all available channel
* Create Entry: Creates a new chat entry in a channel
* Update Entry: Updates a chat entry
* Delete Entry: Deletes a chat entry
* Get Entries: Receives all chat entries of a channel

All Post requests are validated with JSON schema files. They are located under
`src/models/*.json`.

### Create channel

Path: `/createChannel`

Method: POST

Input:
```
{
    name: string
}
```

Output:
```
{
    channelId: string
    name: string
}
```

### Get channels

Path: `/channels`

Method: GET

Output:
```
[
    {
        channelId: string
        name: string
    },
    ...
]
```

### Create entry

Path: `/createEntry`

Method: POST

Input:
```
{
    channelId: string
    message: string
}
```

Output:
```
{
    channelId: string,
    entryId: string,
    userId: string,
    message: string,
    createdAt: string
}
```

### Update entry

Path: `update/{channelId}/entry/{entryId}`

Method: PATCH

Input:
```
{
    message: string
}
```

### Delete entry

Path: `delete/{channelId}/entry/{entryId}`

Method: DELETE

### Get entries

Path: `chats/{channelId}`

Method: GET

Output:
```
[
    {
        channelId: string,
        entryId: string,
        userId: string,
        message: string,
        createdAt: string
    },
    ...
]
```

## CORS

Project handles CORS with middy middleware

## CI / CD environment

The project uses GitHub actions to build and deploy the application to AWS. The
npm packages are automatically installed and the application is deployed with
serverless.

## Postman

The application can be tested with Postman. A collections is appended in the
repository under `postman_collection.json`. Before it can be used
authenthifcation has to be set up with a Bearer token.

## Branch Setup

Project has dev and master branch. dev-branch is used for development, while
the master-branch is used for production use.

## Authentification

In order to post and edit messages it is needed to login. Auth0 is used as a
login mechanism.

## Source Code

The source code is located under the src/ directory.

lambda/http/ contains lambda heads for the functions

businessLogic/ contains the business login

dataLayers/ contains the AWS interface to DynamoDB

## Logging

Logging is realized using the winston logger.

## Databases

The project uses DynanoDB for storing the data. There are two tables created.

### Channel Table

```
{
    channelId: string
    message: string
}
```

### Entry Table

```
{
    channelId: string,
    entryId: string,
    userId: string,
    message: string,
    createdAt: string
}
```