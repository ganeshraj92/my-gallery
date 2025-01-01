const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// MongoDB connection string
const mongoURI = 'mongodb+srv://mrmax0098:LHQh2vbJDvvAqVUx@cluster0.dgsjy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB connection string

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    // Define the User Schema
    const userSchema = new mongoose.Schema({
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
    });

    const User = mongoose.model('User', userSchema);

    // User details
    const username = 'ronny'; // Username: ronny
    const password = 'ronny123'; // Password: ronny123

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const user = new User({
      username: username,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();
    console.log('User "ronny" created successfully!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error:', err);
    mongoose.connection.close();
  });
