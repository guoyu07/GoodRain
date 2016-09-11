import {Component} from '@angular/core';
import { Geolocation } from 'ionic-native';
import {Http} from '@angular/http';
import {BasePath} from '../../base/basePath';

@Component({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

    geocodes = new CurrentPosition();

    constructor(private http:Http) {
    }

    //获得当前定位信息
    doLocation() {
        var basePath = new BasePath(this.http);
        Geolocation.getCurrentPosition().then((resp) => {
            //远程调用接口获取地理编码
            this.http.get(basePath.getGeocodesUrl(resp.coords.longitude, resp.coords.latitude))
                .subscribe(data => {
                    var result = JSON.parse(data["_body"]);
                    if (result.infocode === "10000") {
                        //接下来获取当前地区的天气信息
                        var regeocode = result.regeocode;
                        //构造函数赋值
                        this.geocodes = new CurrentPosition(
                            regeocode.addressComponent.country,
                            regeocode.addressComponent.province,
                            regeocode.addressComponent.city,
                            regeocode.addressComponent.district,
                            regeocode.addressComponent.township,
                            regeocode.addressComponent.adcode,
                            regeocode.addressComponent.citycode,
                            regeocode.addressComponent.towncode,
                            regeocode.formatted_address
                        );
                    }
                });
        });
    }

    //进入页面进行初始化定位信息
    ionViewDidEnter() {
        this.doLocation();
    }

}

//定位地区实体信息
class CurrentPosition {

    country:any;
    province:any;
    city:any;
    district:any;
    township:any;
    adcode:any;
    citycode:any;
    towncode:any;
    formatted_address:any;

    constructor(country?, province?, city?, district?, township?, adcode?, citycode?, towncode?, formatted_address?) {
        this.country = country;
        this.province = province;
        this.city = city;
        this.district = district;
        this.township = township;
        this.adcode = adcode;
        this.citycode = citycode;
        this.towncode = towncode;
        this.formatted_address = formatted_address;
    }

}
