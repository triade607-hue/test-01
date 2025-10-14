import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from './pages/faq/faq.component';
import { ChatAssistanceComponent } from './pages/chat-assistance/chat-assistance.component';
import { TicketsComponent } from './pages/tickets/tickets.component';

const routes: Routes = [
  { path: 'faq', component: FaqComponent },
  { path: 'chat', component: ChatAssistanceComponent },
  { path: 'tickets', component: TicketsComponent },
  { path: '', redirectTo: 'faq', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
