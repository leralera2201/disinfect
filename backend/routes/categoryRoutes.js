const {Router} = require('express')
const Category = require('./../models/Category')
const router = Router()
const {isAuth} = require('./../util')

router.get('/all', isAuth, async (req,res) => {
    try{
        const page = req.query.page
        const per_page = req.query.per_page
        const sortOrder = req.query.sort_order ? {title: 1} : {_id: -1}
        const categories = await Category.find({}).sort(sortOrder)
        let returnedCategories = categories
        if(parseInt(per_page)  !== 0){
            returnedCategories = categories.slice(page*per_page - per_page, page*per_page)
        }
        // const categories = await Category.find({}).skip(page*per_page - per_page).limit(page*per_page)
        res.json({categories: returnedCategories, count: categories.length})
    }catch (e) {
        res.status(500).json({message: 'Щось пішло не так. Будь ласка, спробуйте знову.'})
    }
})

router.get('/', async (req,res) => {
    try{
        const categories = await Category.find({isActive: true})
        res.json(categories)
    }catch (e) {
        res.status(500).json({message: 'Щось пішло не так. Будь ласка, спробуйте знову.'})
    }
})

router.post('/',  isAuth, async (req,res) => {
    try{
        const oldCategory = await Category.find({title: req.body.title})
        if(oldCategory.length){
            res.status(409).json({message: 'Категорія вже існує'})
        }else{
            const category = new Category({
                title: req.body.title,
                description: req.body.description,
                isActive: req.body.isActive
            })
            const newCategory= await category.save()
            if(newCategory){
                return res.status(201).json({success: true})
            }
            res.status(500).json({message: 'Щось пішло не так. Будь ласка, спробуйте знову.'})
        }
    }catch (e) {
        res.status(500).json({message: 'Щось пішло не так. Будь ласка, спробуйте знову.'})
    }


})

router.put('/:id', isAuth, async (req,res) => {
    try{
        const category = await Category.findById(req.params.id)
        if(category){
            category.title= req.body.title
            category.description= req.body.description
            category.isActive = req.body.isActive
            const updatedCategory = await category.save()
            if(updatedCategory){
                return res.status(200).json({success: true})
            }
        }
        res.status(500).json({message: 'Щось пішло не так. Будь ласка, спробуйте знову.'})

    }catch (e) {
        res.status(500).json({message: 'Щось пішло не так. Будь ласка, спробуйте знову.'})
    }


})

router.delete('/:id', isAuth, async (req,res) => {
    try{
        const deletedCategory = await Category.findById(req.params.id);
        if (deletedCategory) {
            await deletedCategory.remove();
            return res.json({ success: true });
        }
        return res.status(404).json({message: 'Категорія не знайдена.'});
    }catch (e) {
        res.status(500).json({message: 'Щось пішло не так. Будь ласка, спробуйте знову.'})
    }

})

// router.get('/createcategory', async (req, res) => {
//     try{
//         let newCategory;
//         for(let i = 2; i < 15; i++){
//             const category = new Category({
//                 title: 'Категорія'+(i+10),
//                 description: 'Опис категорії'
//             })
//             newCategory = await category.save()
//
//         }
//         res.json(newCategory)
//
//     }catch (e) {
//         res.json({message: e.message})
//     }
//
// })


module.exports = router
