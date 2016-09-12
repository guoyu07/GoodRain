import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/city-details/city-details.html'
})
export class CityDetailsPage {

    selectedItem:any;

    constructor(public navCtrl:NavController, navParams:NavParams, public viewCtrl:ViewController) {
        this.selectedItem = navParams.get('item');
    }

    ionViewWillEnter() {
        this.viewCtrl.setBackButtonText('返回');
    }
}
