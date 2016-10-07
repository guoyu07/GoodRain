export class CityWeather {
    /*当前日期*/
    nowDate;
    /*穿衣指数*/
    chuanyi;
    /*感冒指数*/
    ganmao;
    /*运动指数*/
    yundong;
    /*城市名称*/
    cityName;
    /*pm2.5*/
    pm25;
    /*空气质量*/
    quality;
    /*农历日期*/
    moon;
    /*湿度*/
    humidity;
    /*天气图片*/
    img;
    /*天气简介*/
    info;
    /*温度*/
    temperature;

    /**
     * 构造函数
     * @param nowDate
     * @param chuanyi
     * @param ganmao
     * @param yundong
     * @param cityName
     * @param pm25
     * @param quality
     * @param moon
     * @param img
     * @param info
     * @param temperature
     */
    constructor(nowDate?, chuanyi?, ganmao?, yundong?, cityName?, pm25?, quality?, moon?, humidity?, img?, info?, temperature?) {
        this.nowDate = nowDate;
        this.chuanyi = chuanyi;
        this.ganmao = ganmao;
        this.yundong = yundong;
        this.cityName = cityName;
        this.pm25 = pm25;
        this.quality = quality;
        this.moon = moon;
        this.humidity = humidity;
        this.img = img;
        this.info = info;
        this.temperature = temperature;
    }
}
