import mongoose, { Schema, Document } from 'mongoose';

// Export the interface directly (no named export needed)
export interface ItemDocument extends Document {
    name: string;
    brand: string;
    series?: string;
    character?: string;
    type?: string;
    condition?: string;
    tags?: string;
    photo?: string;
}

const ItemSchema: Schema<ItemDocument> = new Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    series: { type: String },
    character: { type: String },
    type: { type: String },
    condition: { type: String },
    tags: { type: String },
    photo: { type: String },
});

const Item = mongoose.model<ItemDocument>('Item', ItemSchema); // Create the model
export default Item; // Default export the model