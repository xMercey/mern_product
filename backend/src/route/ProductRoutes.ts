import express, { NextFunction, Request, Response } from "express"
import { Product } from "../model/ProductModel";
import { body, matchedData, validationResult } from "express-validator";


export const productRouter = express.Router();

async function validation(req: Request, res: Response, next: NextFunction):Promise<void>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }
    next();
}

productRouter.post("/", 
    body("name").exists().isString().isLength({min:1, max:100}),
    body("price").exists().isNumeric().toFloat(),
    body("image").exists().isString().isLength({ min:1, max:500}),
    validation,
    async (req, res, next) => {

        try {
            const product = matchedData(req, {locations: ["body"]});
            const newProduct = new Product(product);
            await newProduct.save();
            res.status(201).json({success: true, data: newProduct}); 
        } catch (error: any) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                next(error);
            }
        }
    });

productRouter.get("/", async (_req, res)=> {
    const products = await Product.find({}).exec();
    res.status(200).json({success: true, products});
});

productRouter.get("/:id", async (req, res)=> {
    const {id} = req.params;
    const product = await Product.findById(id).exec();
    res.status(200).json({success: true, data: product});
});

productRouter.put("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        const product = req.body;
        const updateProduct = await Product.findByIdAndUpdate(id, product, {new: true}).exec();
        res.status(200).json({success: true, data: updateProduct});
    } catch (error: any) {
        if (error instanceof Error) {
            res.status(404).json({success: false, message: error.message});
        }
        next(error);
    }
});

productRouter.delete("/:id", async (req, res, next)=> {
    try {
        const {id} = req.params;
        await Product.findByIdAndDelete(id).exec();
        res.status(200).json({success: true, message: "Deleted Product"});
    } catch (error: any) {
        if (error instanceof Error) {
            res.status(404).json({ success: false, message: "Product not found"});
        } else {
            next(error);
        }
    }
});

