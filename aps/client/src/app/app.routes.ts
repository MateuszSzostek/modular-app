import { Routes } from '@angular/router';
import { InvoicesComponent } from './invoices/invoices.component';
import { ReceiversComponent } from './receivers/receivers.component';

export const routes: Routes = [
  { path: 'invoices', component: InvoicesComponent },
  { path: 'receivers', component: ReceiversComponent },
];
