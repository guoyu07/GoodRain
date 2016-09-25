import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {CityDetailsPage} from '../city-details/city-details';

@Component({
    templateUrl: 'build/pages/citys/citys.html'
})

export class CitysPage {

    private items = [];

    constructor(public navCtrl:NavController, navParams:NavParams) {
        this.loadCitysData();
    }

    /**
     * 点击城市，进入详细的城市详细
     * @param event 当前事件
     * @param item 传入参数
     */
    clickCity(event, item) {
        this.navCtrl.push(CityDetailsPage, {item: item});
    }

    //初始化数据信息
    loadCitysData() {
        this.items.push({
            cityName: '成都',
            areaCode: "028"
        });
        this.items.push({
            cityName: '遵义',
            areaCode: "0852"
        });
        this.items.push({
            cityName: "西安",
            areaCode: "029"
        });
        this.items.push({
            cityName: "北京",
            areaCode: "010"
        });
    }

}
