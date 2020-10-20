const {Router} = require("express")
const {Types} = require('mongoose')
let ObjectId = Types.ObjectId
const Product = require("./../models/Product")
const router = new Router()
const {isAuth} = require('../util')

// router.get('/create', async(req, res) => {
//     try{
//         const product = new Product({
//             name: 'Dress',
//             category: ObjectId('5f1c5a8f04036b2c30e66ea5'),
//             imageUrl: '../images/dress1.jpg',
//             brand: 'Zara',
//             description:'High quality fabric',
//             price: 222.2,
//             countInStock: 20,
//             sizes : ['XS', 'S', 'M']
//         })
//         const newProduct = await product.save()
//         res.json(newProduct)
//     }catch (e) {
//         res.json({message: e.message})
//     }
// })

router.get('/', async (req,res) => {
    try{
        const category = req.query.category ? req.query.category : '';
        const searchKeyword = req.query.searchKeyword
            ? {
                title: {
                    $regex: req.query.searchKeyword,
                    $options: 'i',
                },
            }
            : {};

        const minPrice = req.query.minprice ? +req.query.minprice : ''
        const maxPrice = req.query.maxprice ? +req.query.maxprice : ''
        const sortOrder = req.query.sortOrder
            ? req.query.sortOrder === 'lowest'
                ? { newPrice: 1 }
                : { newPrice: -1 }
            : { _id: -1 };
        const products = await Product.find({ ...searchKeyword, isActive: true }).populate('category').sort(
            sortOrder
        );
        const categoryProducts = category ? products.filter(product => product.category.title.toLowerCase() === category) : products
        const priceProducts = (minPrice && maxPrice) ?  categoryProducts.filter(product => product.newPrice > minPrice && product.newPrice < maxPrice) : category
        res.json(priceProducts);
    }catch (e) {
        res.status(500).json({message: 'Щось пішло не так. Будь ласка, спробуйте знову.'})
    }

})

router.get('/all', isAuth, async (req,res) => {
    try{
        const page = req.query.page
        const per_page = req.query.per_page
        const sortOrder = req.query.sort_order ? {title: 1} : {_id: -1}
        const products = await Product.find({}).populate('category').populate('sizes.product').sort(
            sortOrder
        );
        const returnedProducts = products.slice(page*per_page - per_page, page*per_page)
        res.json({products: returnedProducts, count: products.length});
    }catch (e) {
        res.status(500).json({message: 'Щось пішло не так. Будь ласка, спробуйте знову.'})
    }
})


router.get('/:id', async (req,res) => {
    try{
        // const u =await Product.findById(req.params.id)
        // u.sizes.push({
        //     size: 200,
        //     product: ObjectId('5f8c2a59b3e5681ba89d26ab')
        // })
        // await u.save()
        // res.send(u)
        const product = await Product.findOne({_id: req.params.id}).populate('category')
        if(product) {
            return res.json(product)
        }
        res.status(404).json({message: 'Товар не знайдений.'})
    }catch (e) {
        res.status(500).json({message: 'Щось пішло не так. Будь ласка, спробуйте знову.'})
    }


})

router.post('/',  isAuth, async (req,res) => {
    try{
        const product = new Product({
            title: req.body.title,
            imageUrl: req.body.imageUrl,
            sizes: req.body.sizes,
            method: req.body.method,
            composition: req.body.composition,
            size: req.body.size,
            sale: req.body.sale,
            category: req.body.category,
            brand: req.body.brand,
            newPrice: req.body.newPrice,
            countOfAvailability: req.body.countOfAvailability,
            description: req.body.description,
            price: req.body.price,
            country: req.body.country,
            isAvailable: req.body.isAvailable,
            isActive: req.body.isActive
        })
        const newProduct = await product.save()
        if(newProduct){
            return res.status(201).json({success: true})
        }
        res.status(500).json({message: 'Щось пішло не так. Будь ласка, спробуйте знову.'})
    }catch (e) {
        res.status(500).json({message: 'Щось пішло не так. Будь ласка, спробуйте знову.'})
    }

})

router.put('/:id', isAuth, async (req,res) => {
    try{
        const product = await Product.findById(req.params.id)
        if(product){
            product.title= req.body.title
            product.imageUrl= req.body.imageUrl
            product.method= req.body.method
            product.composition= req.body.composition
            product.size= req.body.size
            product.country= req.body.country
            product.isAvailable= req.body.isAvailable
            product.sale= req.body.sale
            product.newPrice= req.body.newPrice
            product.countOfAvailability= req.body.countOfAvailability
            product.category= req.body.category
            product.brand= req.body.brand
            product.description= req.body.description
            product.price= req.body.price
            product.isActive = req.body.isActive
            product.sizes = req.body.sizes

            const updatedProduct = await product.save()
            if(updatedProduct){
                return res.status(200).json({success: true})
            }
        }
        res.status(500).json({message: 'Something went wrong. Error in updating product'})
    }catch (e) {
        res.status(500).json({message: 'Щось пішло не так. Будь ласка, спробуйте знову.'})
    }


})

router.delete('/:id', isAuth, async (req,res) => {
    try{
        const deletedProduct = await Product.findById(req.params.id);
        if (deletedProduct) {
            await deletedProduct.remove();
            return res.json({ success: true});
        }
        res.status(404).json({message: 'Товар не знайдено.'});
    }catch (e) {
        res.status(500).json({message: 'Щось пішло не так. Будь ласка, спробуйте знову.'})
    }

})

// router.get('/createproduct', async (req, res) => {
//     try{
//         let newProduct;
//         for(let i = 0; i < 15; i++){
//             const product = new Product({
//                 title: 'Продукт'+(i+1),
//                 description: 'Опис продукта',
//                 imageUrl: "https://res.cloudinary.com/lera-cloud-storage/image/upload/v1599554991/ymmxfaoxho6tfte2pirq.png",
//                 sizes: [],
//                 method: 'Метод застосування',
//                 composition: 'Склад продукта',
//                 size: 500,
//                 sale: 10,
//                 category: ObjectId("5f88843f5d0743371cb48684"),
//                 brand: 'Бренд товару',
//                 newPrice: 400,
//                 countOfAvailability: 2,
//                 price: 500,
//                 country: 'Країна',
//                 relativeProducts: [],
//                 isAvailable: true,
//                 isActive: true
//             })
//             newProduct = await product.save()
//
//         }
//         res.json(newProduct)
//
//     }catch (e) {
//         res.json({message: e.message})
//     }
//
// })

module.exports = router
