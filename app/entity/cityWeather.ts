export class CityWeather {
    /*城市名称*/
    city = "龙泉驿";
    /*当前日期*/
    date_y = new Date().getFullYear + "年" + (new Date().getMonth() + 1) + "月" + new Date().getDate() + "日";
    /*穿着度*/
    dressing_index = "合适";
    /*运动建议*/
    exercise_index = "合适";
    /*当前温度*/
    temperature = "18℃~30℃";
    /*旅游指数*/
    travel_index = "适合";
    /*天气简语*/
    weather = "多云";
    /*当前星期*/
    week = "星期" + new Date().getDay() + 1;
    /*风向*/
    wind = "东北风";
    /*天气图片*/
    weather_id = "00";
    /*湿度*/
    humidity = "34%";

    constructor(city?, date_y?, dressing_index?, exercise_index?, temperature?, travel_index?, weather?, week?, wind?, weather_id?, humidity?) {
        this.city = city;
        this.date_y = date_y;
        this.dressing_index = dressing_index;
        this.exercise_index = exercise_index;
        this.temperature = temperature;
        this.travel_index = travel_index;
        this.weather = weather;
        this.week = week;
        this.wind = wind;
        this.weather_id = weather_id;
        this.humidity = humidity;
    }
}
