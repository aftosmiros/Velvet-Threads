import mongoose from "mongoose";
import dotenv from "dotenv";
import productModel from "./models/productModel.js"; // Проверь путь

dotenv.config();

// Подключение к MongoDB
await mongoose.connect(process.env.MONGODB_URL + "/velvet-threads", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("✅ Подключено к MongoDB");

// Обновляем товары
const updateIds = async () => {
  try {
    const products = await productModel.find(); // Получаем все товары

    for (const product of products) {
      if (!mongoose.Types.ObjectId.isValid(product._id)) {
        const newId = new mongoose.Types.ObjectId(); // Создаём новый ObjectId

        // Создаём новый товар с теми же данными, но новым `_id`
        const newProduct = { ...product.toObject(), _id: newId };

        await productModel.create(newProduct); // Создаём новый документ
        await productModel.deleteOne({ _id: product._id }); // Удаляем старый

        console.log(`✅ ID обновлён: ${product._id} → ${newId}`);
      }
    }

    console.log("✅ Все ID обновлены!");
    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Ошибка обновления:", error);
  }
};

updateIds();