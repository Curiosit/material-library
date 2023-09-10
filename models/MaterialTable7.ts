import { MaterialTable7Props } from "@/types";
import {Schema, model, models }  from "mongoose";
const materialsTable7Schema = new Schema <MaterialTable7Props> ( {
    NAVN: { type: String, required: true },
    A1A3: { type: Number}
}
)


let materialsTable7: any;

try {
    materialsTable7 = models.materialsTable7 || model('materialsTable7');
} catch {
    materialsTable7 = model('materialsTable7', materialsTable7Schema);
}

export default materialsTable7;