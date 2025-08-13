import { Schema, model} from "mongoose"

export interface IProduct {
    name: string
    price: string
    image: string

}

const productModelSchema = new Schema<IProduct> (
    {
        name: { type: String, required: true},
        price: { type: String, required: true},
        image: { type: String, required: true},
    }, {
        timestamps: true
    }
)

export const Product = model<IProduct>("Product", productModelSchema);