import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BuyInfo } from '../models/BuyInfo';

@Injectable({
  providedIn: 'root'
})
export class BuyinfoService {
  collectionName = 'BuyInfo';

  constructor(private afs: AngularFirestore) { }

  createBuyInfo(buyInfo: BuyInfo) {
    return this.afs.collection(this.collectionName).doc(buyInfo.id).set(buyInfo);
  }

  getBuyInfo(carpet: string) {
    return this.afs.collection(this.collectionName).doc(carpet).get();
    
  }

  getQueryBuyInfo(carpet: string) {
    return this.afs.collection(this.collectionName, ref => ref.where('carpet', '==', carpet)).get();
  }

}
