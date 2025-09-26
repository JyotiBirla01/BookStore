const db = require("../models");

exports.addToCart=async(req,res)=>{
    try {
        const {bookId,quantity}=req.body
        const userId=req.user.id;
        const book=await db.Book.findByPk(bookId);
        if(!book){
            return res.status(404).json({message:"Book not found"})
        }
        const existing=await db.Cart.findOne({where:{userId,bookId}})
        if(existing){
            existing.quantity+=quantity;
            await existing.save();
            return res.status(200).json({
                message:"Cart updated successfully",
                cart:existing
            })
        }
        const cart=await db.Cart.create({
            userId,
            bookId,
            quantity
        })
        return res.status(201).json({
            message:"Cart created successfully",
            cart
        })
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message:"Internal sever erro",error:error.message})

    }
}


exports.getCart=async(req,res)=>{
    try {
        const userId=req.user.id;
        const cartItems=await db.Cart.findAll({
            where:{userId},
            include:[{model:db.Book,as:"Book"}]
        })
        if(cartItems.length===0){
            return res.status(404).json({message:"Cart is empty"})
        }
        const total = cartItems.reduce((sum, item) => {
      const price = item.Book?.price || 0;
      return sum + item.quantity * price;
    }, 0);
        return res.status(200).json({
            message:"Cart fetched successfully",
                total,
            cartItems,
        
        })
        
    } catch (error) {
        res.status(500).json({message:"Internal server error",error:error.message})
        
    }
}

exports.getCartById=async(req,res)=>{
    try {
        const {id}=req.params;
        const userId=req.user.id;
        const cartItem=await db.Cart.findOne({
            where:{id,userId},
            include:[{model:db.Book,as:"Book"}]
        })
        if(!cartItem){
            return res.status(404).json({message:"Cart item not found"})
        }
        return res.status(200).json({
            message:"Cart item fetched successfully",
            cartItem
        })
        
    } catch (error) {
        res.status(500).json({message:"Internal server error",error:error.message})
        
    }
}
exports. removeCart=async(req,res)=>{
    try {
        const {id}=req.params;
        const userId=req.user.id;
        const cartItem=await db.Cart.findOne({where:{id,userId}})
        if(!cartItem){
            return res.status(404).json({message:"Cart item not found"})
        }
        await cartItem.destroy();
        return res.status(200).json({message:"Cart item rermoved suucefully"});
    } catch (error) {
        res.status(500).json({message:"Internal server error",error:error.message})
        
    }
}
// Update quantity of a cart item
exports.updateCart = async (req, res) => {
  try {
    const { id } = req.params; // Cart item ID
    const { quantity } = req.body; // New quantity
    const userId = req.user.id;

    // Validate quantity
    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be a positive number" });
    }

    // Find cart item
    const cartItem = await db.Cart.findOne({
      where: { id, userId },
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Update quantity
    cartItem.quantity = quantity;
    await cartItem.save();

    return res.status(200).json({
      message: "Cart item updated successfully",
      cartItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
