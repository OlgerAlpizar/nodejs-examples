import mongoose from 'mongoose';
import { ProductModel } from '../src/domains/products/models/product';

// Conectar a la base de datos usando la variable de entorno MONGO_URI
const mongooseConnectDB = async (): Promise<void> => {
  mongoose.set('strictQuery', true);

  const connectionString = process.env.MONGO_URI || 'mongodb://olgerLabsUser:olgerLabsPass@localhost:27017/user-admin?authSource=admin';

  await mongoose
    .connect(connectionString)
    .then(() => {
      console.info('Mongoose connected!');
    })
    .catch((err: Error) => {
      console.error('Error connecting to mongoose:', err);
    });
};

const mongooseDisconnectDB = async (): Promise<void> => {
  await mongoose
    .disconnect()
    .then(() => {
      console.info('Mongoose disconnected!');
    })
    .catch((err: Error) => {
      console.error('Error disconnecting from mongoose:', err);
    });
};

const seedProducts = async () => {
  const products = [
    { name: "Product 1", description: "Description for product 1", price: 10.99, inStock: true },
    { name: "Product 2", description: "Description for product 2", price: 15.49, inStock: false },
    { name: "Product 3", description: "Description for product 3", price: 20.00, inStock: true },
    { name: "Product 4", description: "Description for product 4", price: 5.50, inStock: true },
    { name: "Product 5", description: "Description for product 5", price: 8.99, inStock: false },
    { name: "Product 6", description: "Description for product 6", price: 12.30, inStock: true },
    { name: "Product 7", description: "Description for product 7", price: 7.49, inStock: true },
    { name: "Product 8", description: "Description for product 8", price: 22.99, inStock: false },
    { name: "Product 9", description: "Description for product 9", price: 19.99, inStock: true },
    { name: "Product 10", description: "Description for product 10", price: 14.99, inStock: true }
  ];

  await ProductModel.insertMany(products);
  console.log('Products inserted successfully!');
};

const initializeData = async () => {
  try {
    await mongooseConnectDB();
    console.log('Connected to MongoDB');
    
    await seedProducts();
  } catch (error) {
    console.error('Error initializing data:', error);
    process.exit(1);
  } finally {
    await mongooseDisconnectDB();
    console.log('Database connection closed');
  }
};

initializeData();
