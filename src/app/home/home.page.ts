import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensagem, ChatService } from '../services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public mensagens: Observable<Mensagem[]>;

  mensagem: Mensagem = {
    usuario: 'Gustavo',
    mensagem: '',
    dataHora: ''
  };

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.mensagens = this.chatService.getMensagens();
  }

  enviarMensagem() {
    let data = new Date;
    this.mensagem.dataHora = data.toLocaleString();
    if(this.mensagem.mensagem) {
      this.chatService.addMensagem(this.mensagem);
    }
  }
}
