import {Http} from '@angular/http';
export class BasePath {

    //聚合数据请求API key
    public jhUserKey = "7903992648da20f938f908d5a45bd0ac";

    constructor(private http:Http) {

    }

    /**
     * 根据地区编码获取当前地方的天气情况
     * @param longitude 经度
     * @param latitude 纬度
     * @returns {string} 返回拼接好的url
     */
    getWeatherUrl(longitude:any, latitude:any) {
        return "http://v.juhe.cn/weather/geo?format=2&key=" + this.jhUserKey + "&lon=" + longitude + "&lat=" + latitude;
    }

}