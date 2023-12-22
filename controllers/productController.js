const { Product } = require('./../models/models')
const ApiError = require('../error/ApiError')
const {ProductImage} = require("../models/models");

const multer  = require('multer');
const memoryStorage = multer.memoryStorage();
const fs = require("fs");

const upload = multer({ storage: memoryStorage }); // указывается путь для сохранения файлов в буфферной зоне

class ProductController {

    async create(req, res, next) {
        try {
            upload.any()(req, res, async function (err) {
                if (err) {
                    return next(ApiError.badRequest(err.message));
                }

                const {name, price, categoryId, about} = req.body;
                const product = await Product.create({name, price, categoryId})
                const productId = product.id;

                const images = req.files;

                console.log(images, 'сами файлы')

                const dir = `media/images/${productId}`;
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir)
                }

                await Promise.all(images.map(async (file) => {
                    const originName = Date.now().toString().slice(0, 7) + '-' + file.fieldname + '-' + file.originalname;
                }));

                return res.json(product)
            });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAll(req ,res, next) {
        try {
            const products = await Product.findAll({
                include: 'images' // Используем имя связи 'images'
            });

            const responseData = products.map(product => {
                const images = product.images.map(image => {
                    return {
                        path: image.path,
                        id: image.id
                    }
                }); // Используем 'product.images'
                return {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    categoryId: product.categoryId,
                    images: images
                }
            })
            return res.json(responseData);
            // const product = await Product.findAll()
            // return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getOne(req, res) {

    }
    async delete(req, res, next) {
        try {
            const {id} = req.params;
            const product = await Product.findByPk(id)

            if (!product) {
                return res.status(401).json({ error: 'Product not found' });
            }

            await product.destroy()
            return res.json({ message: 'Product deleted successfully'})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new ProductController();