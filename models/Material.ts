import { MaterialProps } from "@/types";
import {Schema, model, models }  from "mongoose";
const materialsSchema = new Schema <MaterialProps> ( {
    name: { type: String, required: true },
    type: { type: String },
    density: { type: Number},
    imgpath: { type: String}
}
)


let materials;

try {
    materials = models.materials || model('materials');
} catch {
    materials = model('materials', materialsSchema);
}

export default materials;