import mongoose, {Schema, Document} from "mongoose";
import {Category as CategoryInterface} from "../interface/category";

interface CategoryDocument extends CategoryInterface, Document {}
const CategorySchema = new Schema<CategoryDocument>(    
    {
        name: {type: String, required: true},
        description: {type: String},
    },
    {
        timestamps: true,
    }
);

const Category = mongoose.model<CategoryDocument>("Category", CategorySchema);
export default Category;