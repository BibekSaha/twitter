import app from './app.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

async function main() {
  dotenv.config();
  try {
    await mongoose.connect(process.env.DB_URI);
    const { PORT = 5000 } = process.env;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Cannot connect to the database', err);
    process.exit(1);
  }
}

main()
  .catch(console.error);
