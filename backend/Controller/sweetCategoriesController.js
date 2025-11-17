// Handling the buisness logic and interacting with the User model
import SweetCategories from "../Model/sweetCategoriesModel.js"

export const get_categories = async(req, res)=>{
    try{
        const sweet_categories = await SweetCategories.find();
        res.status(200);
        return res.json(sweet_categories);
    } catch(error) {
        res.status(500).json({error:"Internal Server error."})
    }
}

export const create_category = async(req, res)=>{
    try{
        // Validation
        const sweet_category = await SweetCategories.create({
            image_url: req.body.image_url,
            name: req.body.name,
            product_type: req.body.product_type,
            price_representation: req.body.price_representation
        });
        console.log(`Saved new sweet category.`);        
        res.status(201).json({
            success: true,
            message: 'Sweet category created successfully',
            category: sweet_category
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({error:"Internal Server error."})
    }
}