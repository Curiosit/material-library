import { EPDProps } from "@/types";
import {Schema, model, models }  from "mongoose";
const epdSchema = new Schema <EPDProps> ( {
    name: { type: String, required: true },
    A1A3: { type: Number},
    C3: { type: Number},
    C4: { type: Number},
    D: { type: Number},
    unit: { type: String},
    mass: { type: Number},
    url: { type: String},
}
)


let epd: any;

try {
    epd = models.epd || model('epd');
} catch {
    epd = model('epd', epdSchema);
}

export default epd;