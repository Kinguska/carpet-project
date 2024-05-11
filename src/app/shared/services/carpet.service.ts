import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Carpet } from '../models/Carpet';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarpetService {
  collectionName = 'Carpets';

  constructor(private afs: AngularFirestore, private firestore: Firestore) { }

  createCarpet(carpet: Carpet) {
    return this.afs.collection(this.collectionName).doc(carpet.name).set(carpet);
  }

  getCarpet(name: string) {
    return this.afs.collection(this.collectionName).doc(name).get();
  } 

  getAllCarpets(onlyPurchasable: boolean = false) {
    const carpetsCollection = collection(this.firestore, 'Carpets');
    
    if (onlyPurchasable) {
      const carpetQuery = query(carpetsCollection, where('bought', '==', false));

      return collectionData(carpetQuery) as Observable<Carpet[]>;
    }

    return collectionData(carpetsCollection) as Observable<Carpet[]>;
  }

  updateCarpet(carpet: Carpet) {
    return this.afs.collection(this.collectionName).doc(carpet.name).update(carpet);
  }

  deleteCarpet(name: string) {
    return this.afs.collection(this.collectionName).doc(name).delete();
  }

  canbuyCarpet() {
  }
}
