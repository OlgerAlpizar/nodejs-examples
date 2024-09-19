const mongoose = require('mongoose');

// Step 2: Connect to MongoDB
mongoose.connect('mongodb://olgerLabsUser:olgerLabsPass@localhost:27017/user-admin?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

// Step 3: Define a Schema and Model
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    phone: String,
    avatarUrl: String
});

const User = mongoose.model('User', userSchema);


const createUsers = async () => {
  // Sample records to insert
  const records = [
    {email: 'olger@test.com', password: 'password', firstName: 'Olger', lastName: 'Alpizar', phone: '506 8888-1111', avatarUrl: 'none'},
    {email: 'ivan@test.com',  password: 'password', firstName: 'Ivan',  lastName: 'Alpizar', phone: '506 8888-2222', avatarUrl: 'none'},
    {email: 'ana@test.com',   password: 'password', firstName: 'Ana',   lastName: 'Bolanos', phone: '506 8888-3333', avatarUrl: 'none'},
    {email: 'sara@test.com',  password: 'password', firstName: 'Sara',  lastName: 'Alpizar', phone: '506 8888-4444', avatarUrl: 'none'}
  ];

  records.forEach(async x => {
    const user = new User({
      email: x.email,
      password: x.password,
      firstName: x.firstName,
      lastName: x.lastName,
      phone: x.phone,
      avatarUrl: x.avatarUrl
    });
  
    try {
        const savedUser = await user.save();
        console.log('User saved:', savedUser);
    } catch (err) {
        console.error('Error saving user:', err);
    }
  })
};

// Execute CRUD functions
(async () => {
  await createUsers();
})();