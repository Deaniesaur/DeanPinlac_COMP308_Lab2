// DB Configuration
const database = 'db_student_registration';
const remoteHost = 'cluster0.ap5xt.mongodb.net';
// const LocalURI = `mongodb://localhost:27017/${database}`;
const RemoteURI = `mongodb+srv://admin:admin@${remoteHost}/${database}?retryWrites=true&w=majority`;
export const Secret = 'someSecret';
export const Host = remoteHost;
// export const MongoURI = LocalURI;
export const MongoURI = RemoteURI;

// App Configuration
export const DefaultPort = '8080';