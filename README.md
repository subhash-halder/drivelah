# drivelah
Simple Contact Us form where user send some message with there email adderess and the admin can download them as CSV

The project is yarn workspace consist of two packages client and server,
the client consist of React app and the server is a node server with MongoDB as database.

to run the project first we need to install all the packages by running `yarn` from the root folder.

now to run the server go to packages/server with `cd packages/server`.
copy the .env-example file to .env and fill the appropriate value to connect to MongoDB.
once done run the server with command `yarn start`

now to run the client go to packages/client
and check src/uri.ts file to see the App URL is correct.
them run the command `yarn start`.

