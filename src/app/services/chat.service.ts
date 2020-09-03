import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Mensagem {
  id?: string;
  usuario: string;
  mensagem: string;
  dataHora: any;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private mensagens: Observable<Mensagem[]>;
  private chatCollection: AngularFirestoreCollection<Mensagem>;

  constructor(private afs: AngularFirestore) {
    this.chatCollection = this.afs.collection<Mensagem>('mensagens', ref => ref.orderBy('dataHora'));
    this.mensagens = this.chatCollection.snapshotChanges().pipe( // sem o pipe iriamos obter somente os dados mas não o id,
      map(actions => {                                       // essa parte foi tirada da documentação do angularfire
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
   }

   // Pega todas as mensagens
   getMensagens(): Observable<Mensagem[]> {
     return this.mensagens;
   }

   // Pega somente uma mensagem 
  //  getChat(id: string): Observable<Chat> {
  //    return this.chatCollection.doc<Chat>(id).valueChanges().pipe(
  //      take(1),
  //      map(chat => {
  //        chat.id = id;
  //        return chat
  //      })
  //    )
  //  }

  addMensagem(mensagem: Mensagem): Promise<DocumentReference> {
    return this.chatCollection.add(mensagem);
  }
  
  // https://www.youtube.com/watch?v=SHRjQA3lvNk MINUTO 8:43 UPDATE E DELETE

}
