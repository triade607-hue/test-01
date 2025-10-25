import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConversationDetailComponent } from './pages/conversation-detail/conversation-detail.component';
import { ConversationsListComponent } from './pages/conversations-list/conversations-list.component';
import { UserLayoutComponent } from '../../layouts/user-layout/user-layout.component';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', component: ConversationsListComponent },
      { path: ':id', component: ConversationDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagingRoutingModule {}
