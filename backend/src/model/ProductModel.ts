import { Schema, model} from "mongoose"

export interface IProduct {
    name: string
    price: number
    image: string

}

const productModelSchema = new Schema<IProduct> (
    {
        name: { type: String, required: true},
        price: { type: Number, required: true},
        image: { type: String, required: true},
    }, {
        timestamps: true
    }
)

export const Product = model<IProduct>("Product", productModelSchema);