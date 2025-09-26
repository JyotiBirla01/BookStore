const { where } = require("sequelize");
const db = require("../models");
const { getPagination, getPagingData } = require("../utils/paginate");

exports.createCategory=async(req,res)=>{
   try {
    const {name}=req.body;
    if(!name)
       return res.status(400).json({message:"Name is required"})
    const existingCategory=await db.Category.findOne({where:{name}})
    if(existingCategory)
      return  res.status(400).json({message:"Category already exists"})
   const category =await db.Category.create({name})
    res.status(200).json({message:"Category created ",category})
    
   } catch (error) {
    console.log(error);
    
    res.status(500).json({messag:"Internal server error ",error:error.message})
    
   }
}


exports.getAllCategories = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const { offset, limit: pageLimit } = getPagination(page, limit);

    const data = await db.Category.findAndCountAll({
      limit: pageLimit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    const response = getPagingData(data, page, pageLimit);

    return res.status(200).json({
      message: "Categories fetched successfully",
      ...response,
    });
  } catch (error) {
    console.error("Get Categories Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await db.Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({
      message: "Category fetched successfully",
      category,
    });
  } catch (error) {
    console.error("Get Category By ID Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await db.Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.name = name || category.name;
    await category.save();

    return res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error("Update Category Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteCategory=async(req,res)=>{
try {
    const {id}=req.params;
    const category = await db.Category.findByPk(id);    
    if (!category) {
        return res.status(404).json({message:"Category not found"})
    }
    await category.destroy();
    res.status(200).json({message:"Category deleted successfully"})
    
} catch (error) {
    res.status(500).json({message:"Internal server error",error:error.message})
}
}

exports.bulkUploadCategories = async (req, res) => {
  try {
    let { categories } = req.body;

    // Validate input type
    if (!Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({ message: "Categories array is required and must not be empty." });
    }

    // Step 1: Clean input (remove empty, null, non-string)
    categories = categories
      .filter(name => typeof name === 'string' && name.trim() !== '')
      .map(name => name.trim());

    // Step 2: Remove duplicates from input
    const uniqueInputCategories = [...new Set(categories)];

    // Step 3: Fetch existing categories from DB
    const existingCategories = await db.Category.findAll({
      where: {
        name: uniqueInputCategories
      },
      attributes: ['name']
    });

    const existingNames = existingCategories.map(cat => cat.name);

    const toCreate = uniqueInputCategories.filter(name => !existingNames.includes(name));

    // Step 4: Bulk create remaining categories
    const createdCategories = await db.Category.bulkCreate(
      toCreate.map(name => ({ name }))
    );

    const skippedCategories = [
      ...categories
        .filter(name => !uniqueInputCategories.includes(name))
        .map(name => ({ name, reason: "Duplicate in input" })),
      ...existingNames.map(name => ({ name, reason: "Already exists in database" }))
    ];

    return res.status(201).json({
      message: "Bulk category upload completed",
      created: createdCategories.length,
      skipped: skippedCategories.length,
      createdCategories,
      skippedCategories,
    });

  } catch (error) {
    console.error("Bulk Upload Error:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

