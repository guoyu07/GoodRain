import {Component} from '@angular/core';
import { Geolocation , Vibration} from 'ionic-native';
import {NavController, ViewController, LoadingController, Alert, Toast, Modal} from 'ionic-angular';
import {Http} from '@angular/http';
import {BasePath} from '../../base/basePath';

@Component({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

    geocodes = new CurrentWeather();

    private flagVibrate;

    constructor(private http:Http, private navController:NavController, public loadingCtrl:LoadingController) {
        this.flagVibrate = localStorage.getItem("flagVibrate");
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
            this.http.get(basePath.getWeatherUrl(resp.coords.longitude, resp.coords.latitude))
                .subscribe(data => {
                    var geo = JSON.parse(data["_body"]);
                    if (geo["resultcode"] === "200") {
                        var result = geo["result"];
                        var today = result["today"];
                        //构造函数封装数据信息
                        this.geocodes = new CurrentWeather(
                            today.city,
                            today.date_y,
                            today.week,
                            today.temperature,
                            today.weather,
                            today.wind,
                            today.dressing_index,
                            today.dressing_advice,
                            today.travel_index,
                            today.exercise_index,
                            HomePage.getWeatherImgUrl(today["weather_id"]["fa"]),
                            resp.coords.longitude,
                            resp.coords.latitude
                        );
                        //数据加载成功之后,关闭加载框
                        loading.dismiss();
                        //随后震动提醒
                        if (this.flagVibrate = "vibrate") {
                            Vibration.vibrate(1500);
                        }
                    }
                });
        });
    }

    //根据返回的wid的大对应的图标url
    static getWeatherImgUrl(wid) {
        return "./img/weather/weather_" + wid + ".png";
    }

    //进入页面进行初始化定位信息,先从缓存数据中拿数据信息，没有在进行定位拿数据信息
    ionViewWillEnter() {
        //this.doLocation();
        this.geocodes = new CurrentWeather(
            "龙泉驿",
            "2016年10月9日",
            "星期六",
            "8℃~20℃",
            "晴转多云",
            "西南风微风",
            "较冷",
            "建议着大衣、呢外套加毛衣、卫衣等服装。",
            "适宜",
            "适宜",
            HomePage.getWeatherImgUrl("11"),
            "106.234561",
            "50.2345321");

    }

}

//定位地区实体信息
class CurrentWeather {
    /*城市*/
    city:any;
    /*日期*/
    date_y:any;
    /*星期*/
    week:any;
    /*今日温度*/
    temperature:any;
    /*今日天气*/
    weather:any;
    /*风力*/
    wind:any;
    /*穿衣指数*/
    dressing_index:any;
    /*穿衣建议*/
    dressing_advice:any;
    /*旅游指数*/
    travel_index:any;
    /*晨练指数*/
    exercise_index:any;
    /*天气图标*/
    weather_icon:any = "./img/weather/weather_00.png";
    /*经度*/
    longitude:any;
    /*纬度*/
    latitude:any;

    constructor(city?, date_y?, week?, temperature?, weather?, wind?, dressing_index?, dressing_advice?, travel_index?, exercise_index?, weather_icon?, longitude?, latitude?) {
        this.city = city;
        this.date_y = date_y;
        this.week = week;
        this.temperature = temperature;
        this.weather = weather;
        this.wind = wind;
        this.dressing_advice = dressing_advice;
        this.dressing_index = dressing_index;
        this.travel_index = travel_index;
        this.exercise_index = exercise_index;
        this.weather_icon = weather_icon;
        this.longitude = longitude;
        this.latitude = latitude;
    }

}
