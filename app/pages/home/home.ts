import {Component} from '@angular/core';
import {Vibration} from 'ionic-native';
import {NavController, ViewController, LoadingController, Alert, Toast, Modal} from 'ionic-angular';
import {Http} from '@angular/http';
import {BasePath} from '../../base/basePath';
import {CityWeather} from '../../entity/cityWeather';

@Component({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

    geocodes;
    longitude:number;
    latitude:number;

    private flagVibrate;

    constructor(private http?:Http, private navController?:NavController, public loadingCtrl?:LoadingController) {
        //获取经纬度
        this.longitude = +localStorage.getItem("longitude");
        this.latitude = +localStorage.getItem("latitude");
        //权限判断
        this.flagVibrate = localStorage.getItem("flagVibrate");
        //缓存数据判断
        var weaterObj = JSON.parse(localStorage.getItem("weatherEntity"));
        //获取缓存数据
        if (weaterObj) {
            this.geocodes = weaterObj;
        }//设置默认值
        else {
            this.geocodes = new CityWeather(
                "2016年10月10日",
                "易感冒",
                "易着凉",
                "不易运动",
                "成都",
                "47",
                "良好",
                "九月初九",
                HomePage.getWeatherImgUrl(1),
                "多云转晴",
                "27"
            );
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
        //远程调用接口获取地理编码
        this.http.get(basePath.getGeocoderUrl(this.longitude, this.latitude))
            .subscribe(data => {
                var geo = JSON.parse(data["_body"]);
                if (geo["status"]) {
                    var result = geo["regeocode"];
                    var cityName = result["addressComponent"]["city"];
                    //返回的城市名称，继续调用方法返回数据信息
                    this.getWeatherByCityName(cityName, loading);
                }
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
                if (geo["error_code"] === 0) {
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

    /**
     * 根据返回的wid的大对应的图标url
     * @param wid
     * @returns {string}
     */
    static getWeatherImgUrl(wid) {
        return "./img/weather/weather_" + wid + ".png";
    }

    //进入页面进行初始化定位信息,先从缓存数据中拿数据信息，没有在进行定位拿数据信息
    ionViewWillEnter() {
        //在请求定位信息
        var basePath = new BasePath(this.http);
        //远程调用接口获取地理编码
        this.http.get(basePath.getGeocoderUrl(this.longitude, this.latitude))
            .subscribe(data => {
                var geo = JSON.parse(data["_body"]);
                if (geo["status"]) {
                    var result = geo["regeocode"];
                    var cityName = result["addressComponent"]["city"];
                    //远程调用接口获取地理编码
                    this.http.get(basePath.getWeatherUrl(cityName))
                        .subscribe(data => {
                            var geo = JSON.parse(data["_body"]);
                            console.log("ionViewWillEnter...");
                            console.log(geo);
                            if (geo["error_code"] === 0) {
                                //封装数据信息
                                this.setWeatherEntity(geo);
                            } else {
                                console.error("远程接口调用调用问题...");
                            }
                        });
                }
            });

    }

    /**
     * 封装数据信息
     * @param geo 天气实体信息
     */
    setWeatherEntity(geo) {
        var sk = geo["result"]["data"];
        var life = sk["life"];//天气行动指标
        var pm25 = sk["pm25"];//pm2.5
        var realtime = sk["realtime"];//当前时刻请求的天气数据
        var weather = sk["weather"];//未来几天的天气信息
        //具体的城市天气预报信息
        this.geocodes = new CityWeather(
            life["date"],
            life["info"]["chuanyi"][0],
            life["info"]["ganmao"][0],
            life["info"]["yundong"][0],
            pm25["cityName"],
            pm25["pm25"]["pm25"],
            pm25["pm25"]["quality"],
            realtime["moon"],
            realtime["weather"]["humidity"],
            HomePage.getWeatherImgUrl(realtime["weather"]["img"]),
            realtime["weather"]["info"],
            realtime["weather"]["temperature"]
        );
        //缓存数据信息
        var weatherEntity = this.geocodes;
        localStorage.setItem("weatherEntity", JSON.stringify(weatherEntity));
    }

}
















