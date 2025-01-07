import mongoose from "mongoose";
import { InvoiceAttrs } from "../shared/services";

// An interface that describes the properties
// that a Invoice Model has
interface InvoiceModel extends mongoose.Model<InvoiceDoc> {
  build(attrs: InvoiceAttrs): InvoiceDoc;
}

// An interface that describes the properties
// that a Profile Document has
interface InvoiceDoc extends InvoiceAttrs, mongoose.Document {}

const invoiceSchema = new mongoose.Schema({
  ownerId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
});

invoiceSchema.statics.build = (attrs: InvoiceAttrs) => {
  return new Invoice(attrs);
};

const Invoice = mongoose.model<InvoiceDoc, InvoiceModel>(
  "Invoice",
  invoiceSchema
);

export { Invoice };
