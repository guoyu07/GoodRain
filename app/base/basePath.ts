import {Http} from '@angular/http';
export class BasePath {

    //聚合数据请求API key
    private jhUserKey = "60b95d6de3a9fb74f0f66a19d49c951e";

    //高德javascript For API 接口key
    private gdUserKey = "fbb8c7dce018aa6efc76eddce2a5cc2f";

    constructor(private http:Http) {

    }

    /**
     * 根据城市名称，获取城市的天气预报
     * @param cityName 城市名称
     * @returns {string} 返回拼接好的请求路径
     */
    getWeatherUrl(cityName:string) {
        return "http://op.juhe.cn/onebox/weather/query?cityname=" + cityName + "&key=" + this.jhUserKey;
    }

    /**
     * 根据当前定位信息，获取当前定位的城市信息
     * @param longitude 经度
     * @param latitude 纬度
     * @returns {string} 返回拼接好的url地址
     */
    getGeocoderUrl(longitude:any, latitude:any) {
        return "http://restapi.amap.com/v3/geocode/regeo?key=" + this.gdUserKey + "&location=" + longitude + "," + latitude
    }

}