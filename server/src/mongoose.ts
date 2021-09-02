import mongoose from 'mongoose';

// Get connection string
var db: string = "mongodb+srv://admin:myAdminPassword@flextixcluster.iwrmh.mongodb.net/Flextix?retryWrites=true&w=majority";

// Create connection
mongoose.connect(db);

// console.log(mongoose.connection);

export default mongoose;