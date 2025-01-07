export interface UserAttrs {
  userId: string;
  email: string;
  name: string;
  surname: string;
  birthDate: string;
  identifier: string;
}

export interface AuthAttrs {
  email: string;
  password: string;
}

export interface ProfileAttrs {
  ownerId: string;
  name: string;
}

export interface InvoiceAttrs {
  ownerId: string;
  invoiceNumbe: string;
  receiverId: string;
  receiverName: string;
  language: string;
  createdAt: string;
  updatedAt: string;
  issuedAt: string;
  status: "draft" | "issued";
  isPaid: boolean;
  currency: string;
  items: InvoiceItem[];
  totalNetPrice: number;
  totalVatPrice: number;
  totalPrice: number;
  note: string;
}

export interface InvoiceItem {
  name: string;
  quantity: number;
  unitOfMeasurement: string;
  price: number;
  vat: number;
  vatPrice: number;
  totalPrice: number;
}
