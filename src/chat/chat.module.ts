import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';


@NgModule({
  declarations: [ChatBoxComponent],
  imports: [CommonModule, ChatRoutingModule],
  exports: [ChatBoxComponent], // ✅ ajoute cette ligne !
})
export class ChatModule {}
