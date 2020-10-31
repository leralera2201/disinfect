const {Router} = require("express")
const {Types} = require('mongoose')
let ObjectId = Types.ObjectId
const Order = require("./../models/Order")
const router = new Router()
const {isAuth} = require('../util')


router.get('/all', isAuth, async (req,res) => {
    try{
        const page = req.query.page
        const per_page = req.query.per_page
        const sortOrder = req.query.sort_order ? {surname: 1} : {_id: -1}
        const orders = await Order.find({}).populate('cartItems.product').sort(
            sortOrder
        );
        let returnedOrders = orders
        if(parseInt(per_page)  !== 0){
            returnedOrders = orders.slice(page*per_page - per_page, page*per_page)
        }

        res.json({orders: returnedOrders, count: orders.length});
    }catch (e) {
        res.status(500).json({message: 'Щось пішло не так. Будь ласка, спробуйте знову.'})
    }
})


// router.get('/:id', async (req,res) => {
//     try{
//         // const u =await Product.findById(req.params.id)
//         // u.sizes.push({
//         //     size: 200,
//         //     product: ObjectId('5f8c2a59b3e5681ba89d26ab')
//         // })
//         // await u.save()
//         // res.send(u)
//         const product = await Product.findOne({_id: req.params.id}).populate('category')
//         if(product) {
//             return res.json(product)
//         }
//         res.status(404).json({message: 'Товар не знайдений.'})
//     }catch (e) {
//         res.status(500).json({message: 'Щось пішло не так. Будь ласка, спробуйте знову.'})
//     }
//
//
// })

router.post('/', async (req,res) => {
    try{
        const order = new Order({
            name: req.body.name,
            surname: req.body.surname,
            phone: req.body.phone,
            cartItems: req.body.cartItems,
            totalPrice: req.body.totalPrice,
            comment: req.body.comment,
            description: req.body.description,
            isPaid: req.body.isPaid,
            isActive: req.body.isActive,
            createdAt: req.body.createdAt
        })
        const newOrder = await order.save()
        if(newOrder){
            return res.status(201).send({success: true})
        }
        res.status(500).json({message: 'Щось пішло не так. Будь ласка, спробуйте знову.'})
    }catch (e) {
        res.status(500).json({message: 'Щось пішло не так. Будь ласка, спробуйте знову.'})
    }
})


router.put('/:id', isAuth, async (req,res) => {
    try{
        const order = await Order.findById(req.params.id)
        if(order){
            order.name= req.body.name
            order.surname= req.body.surname
            order.phone= req.body.phone
            order.cartItems= req.body.cartItems
            order.totalPrice= req.body.totalPrice
            order.comment= req.body.comment
            order.isPaid= req.body.isPaid
            order.description= req.body.description
            order.isActive = req.body.isActive
            order.createdAt = req.body.createdAt

            const updatedOrder = await order.save()
            if(updatedOrder){
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
        const deletedOrder = await Order.findById(req.params.id);
        if (deletedOrder) {
            await deletedOrder.remove();
            return res.json({ success: true});
        }
        res.status(404).json({message: 'Замовлення не знайдено.'});
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
