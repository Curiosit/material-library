import { EPDProps } from "@/types";
import {Schema, model, models }  from "mongoose";
const epdSchema = new Schema <EPDProps> ( {
    name: { type: String, required: true },
    A1A3: { type: Number},
    unit: { type: String},
}
)


let epd: any;

try {
    epd = models.epd || model('epd');
} catch {
    epd = model('epd', epdSchema);
}

export default epd;