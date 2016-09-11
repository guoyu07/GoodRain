import {Http} from '@angular/http';
export class BasePath {

    //地图请求API key
    public mapKey = "fbb8c7dce018aa6efc76eddce2a5cc2f";

    constructor(private http:Http) {

    }

    /**
     * 根据经纬度,获取当前定位的地区信息
     * @param longitude 经度
     * @param latitude 纬度
     * @returns {string} 返回拼接好的url
     */
    getGeocodesUrl(longitude:any, latitude:any) {
        return "http://restapi.amap.com/v3/geocode/regeo?key=" + this.mapKey + "&location=" + longitude + "," + latitude;
    }

    /**
     * 根据地区编码获取当前地方的天气情况
     * @param adcode 地理编码
     * @returns {string} 返回拼接好的url
     */
    getWeatherUrl(adcode:string) {
        //远程调用接口获取地理编码
        return "http://restapi.amap.com/v3/weather/weatherInfo?key=" + this.mapKey + "&city=" + adcode;
    }

}