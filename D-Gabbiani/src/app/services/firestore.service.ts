import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public bd: AngularFirestore) {}

  createDoc(data: any, path: string, id: string) { 
    const collection = this.bd.collection(path);
    return collection.doc(id).set(data); 
  }

  getDoc<tipo>(path: string, id:string){ 
  const collection = this.bd.collection<tipo>(path); 
  return collection.doc(id).valueChanges();
  }

  deleteDoc(path: string, id:string){
    const collection = this.bd.collection(path);
    return collection.doc(id).delete();
  }
  
  updateDoc(data: any, path: string, id:string){
    const collection = this.bd.collection(path);
    return collection.doc(id).update(data);
  }

  getId(){
    return this.bd.createId(); /* Nos retornara y nos devolvera un ID Automatico */
  }
  
  getCollection<tipo>(path: string){ // Mandamos llamar el Path
    const collection = this.bd.collection<tipo>(path);    // Vamos a referenciar la colección
    return collection.valueChanges();  // Retornaremos, y visualizaremos la collección
  }


}
