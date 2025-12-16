const mongoose = require("mongoose")

// Shutter
const ShutterSchema = new mongoose.Schema({
  type: String,
  height: Number,
  width: Number,
  units: { type: Number, default: 1 },
  hingesCount: Number,
  hinges: String,
  profile: String,
  glass: String,
  heightInch: Number,
  widthInch: Number,
  patti45mmFoot: { type: Number, default: 0 },
  handal68mmFoot: { type: Number, default: 0 },
  glassAreaFoot: { type: Number, default: 0 }
}, { _id: false });

// Extra glass
const ExtraGlassSchema = new mongoose.Schema({
  height: Number,
  width: Number,
  glassName: String,       // e.g. "Smoke Glass"
  glassEdge: String,       // e.g. "Ruff"
  glassThickness: String,  // e.g. "4mm"
  units: { type: Number, default: 1 },
  glassAreaFoot: { type: Number, default: 0 }
}, { _id: false });

// Patti sub-schema inside material.profilePatti
const PattiSchema = new mongoose.Schema({
  patti45mm: { type: Number, default: 0 },
  handal68mm: { type: Number, default: 0 }
}, { _id: false });

//    Material schema
const MaterialSchema = new mongoose.Schema({
  profileCount: { type: Map, of: Number, default: {} },
  hingesCount: { type: Map, of: Number, default: {} },
  glassArea: { type: Map, of: Number, default: {} },      // totals by glassName
  addedGlassArea: { type: Map, of: Number, default: {} }, // keyed by "<thickness> <glassName>" e.g. "4mm Smoke Glass"
  connectors: { type: Number, default: 0 },
  labour: { type: Number, default: 0 },
  profilePatti: { type: Map, of: PattiSchema, default: {} }
}, { _id: false });

//    Customer schema
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: String,
  address: String,
  orderStatus: String,
  totalAmount:Number,
  recievedAmount:Number,
  paymentMethod:String,
  shutters: { type: [ShutterSchema], default: [] },
  extraGlasses: { type: [ExtraGlassSchema], default: [] },
  material: { type: MaterialSchema, default: {} }
}, { timestamps: true });

const Customer = mongoose.model("customers", customerSchema)
module.exports = Customer