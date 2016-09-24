import {Component} from '@angular/core';
import { Geolocation , Vibration} from 'ionic-native';
import {NavController, ViewController, LoadingController, Alert, Toast, Modal} from 'ionic-angular';
import {Http} from '@angular/http';
import {BasePath} from '../../base/basePath';
import {CityWeather} from '../../entity/cityWeather';

@Component({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

    geocodes;

    private flagVibrate;

    constructor(private http:Http, private navController:NavController, public loadingCtrl:LoadingController) {
        this.flagVibrate = localStorage.getItem("flagVibrate");
        let weaterObj = JSON.parse(localStorage.getItem("weatherEntity"));
        if (weaterObj) {
            this.geocodes = weaterObj;
        } else {
            this.geocodes = new CityWeather();
        }
    }

    //获得当前定位信息
    doLocation() {
        var basePath = new BasePath(this.http);
        //天气加载中
        var loading = this.loadingCtrl.create({
            content: '正在更新天气信息...',
            spinner: "bubbles"
        });
        loading.present();
        Geolocation.getCurrentPosition().then((resp) => {
            //远程调用接口获取地理编码
            this.http.get(basePath.getGeocoderUrl(resp.coords.longitude, resp.coords.latitude))
                .subscribe(data => {
                    var geo = JSON.parse(data["_body"]);
                    if (geo["status"]) {
                        var result = geo["regeocode"];
                        var cityName = result["addressComponent"]["city"];
                        //返回的城市名称，继续调用方法返回数据信息
                        this.getWeatherByCityName(cityName, loading);
                    }
                });
        });
    }


    /**
     * 根据城市名称获取当前城市天气
     * @param cityName 城市名称
     * @param loading 加载
     */
    private getWeatherByCityName(cityName:string, loading:any) {
        var basePath = new BasePath(this.http);
        //远程调用接口获取地理编码
        this.http.get(basePath.getWeatherUrl(cityName))
            .subscribe(data => {
                var geo = JSON.parse(data["_body"]);
                if (geo["resultcode"] === "200") {
                    //封装数据信息
                    this.setWeatherEntity(geo);
                    //数据加载成功之后,关闭加载框
                    loading.dismiss();
                    //随后震动提醒
                    if (this.flagVibrate === "vibrate") {
                        Vibration.vibrate(1500);
                    }
                }
            });
    }

    //根据返回的wid的大对应的图标url
    static getWeatherImgUrl(wid) {
        console.log(wid);
        return "./img/weather/weather_" + wid + ".png";
    }

    //进入页面进行初始化定位信息,先从缓存数据中拿数据信息，没有在进行定位拿数据信息
    ionViewWillEnter() {
        //在请求定位信息
        var basePath = new BasePath(this.http);
        Geolocation.getCurrentPosition().then((resp) => {
            //远程调用接口获取地理编码
            this.http.get(basePath.getGeocoderUrl(resp.coords.longitude, resp.coords.latitude))
                .subscribe(data => {
                    var geo = JSON.parse(data["_body"]);
                    if (geo["status"]) {
                        var result = geo["regeocode"];
                        var cityName = result["addressComponent"]["city"];
                        //远程调用接口获取地理编码
                        this.http.get(basePath.getWeatherUrl(cityName))
                            .subscribe(data => {
                                var geo = JSON.parse(data["_body"]);
                                if (geo["resultcode"] === "200") {
                                    //封装数据信息
                                    this.setWeatherEntity(geo);
                                }
                            });
                    }
                });
        });
    }

    /**
     * 封装数据信息
     * @param geo 天气实体信息
     */
    setWeatherEntity(geo) {
        var sk = geo["result"]["sk"];
        var today = geo["result"]["today"];
        //具体的城市天气预报信息
        this.geocodes = new CityWeather(
            today["city"],
            today["date_y"],
            today["dressing_index"],
            today["exercise_index"],
            today["temperature"],
            today["travel_index"],
            today["weather"],
            today["week"],
            today["wind"],
            HomePage.getWeatherImgUrl(today["weather_id"]["fa"]),
            sk["humidity"]
        );
        //缓存数据信息
        var weatherEntity = this.geocodes;
        localStorage.setItem("weatherEntity", JSON.stringify(weatherEntity));
    }

}