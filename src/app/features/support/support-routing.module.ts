import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from './pages/faq/faq.component';
import { ChatAssistanceComponent } from './pages/chat-assistance/chat-assistance.component';

const routes: Routes = [
  { path: 'faq', component: FaqComponent },
  { path: 'chat', component: ChatAssistanceComponent },
  { path: '', redirectTo: 'faq', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
