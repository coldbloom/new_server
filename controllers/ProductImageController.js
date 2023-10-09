const { Product, ProductImage  } = require('./../models/models')
const ApiError = require('../error/ApiError')

const fs = require('fs');
const path = require('path');

class ProductImageController {
    async create(req, res, next) {
        try {
            const { id } = req.params; // получаем id продукта из параметров запроса
            const { image } = req.files; // получаем изображение из запроса
            console.log(image, 'id из параметров для изображения')

            const product = await Product.findByPk(id); // находим продукт по id

            if (!product) {
                return next(ApiError.badRequest(`Product with id ${id} not found.`));
            }

            const productDir = path.join(process.cwd(), 'media/images', id.toString()); // создаем путь к папке продукта
            if (!fs.existsSync(productDir)) { // проверяем, существует ли папка продукта
                fs.mkdirSync(productDir); // если не существует, создаем ее
            }

            const imageExt = path.extname(image.name); // получаем расширение файла изображения
            const imageName = `${Date.now()}${imageExt}`; // генерируем уникальное имя файла изображения
            const imagePath = path.join(productDir, imageName); // создаем путь к файлу изображения

            await image.mv(imagePath); // сохраняем изображение в файл

            const productImage = await ProductImage.create({ path: imagePath }); // создаем новую запись в таблице ProductImage
            await product.addProductImage(productImage); // связываем изображение с продуктом

            res.json(productImage); // возвращаем созданную запись изображения в ответе
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new ProductImageController();