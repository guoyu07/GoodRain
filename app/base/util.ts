/**
 * 工具方法
 */
export class UtilBase {

    constructor() {
    }

    /**
     * 本地推送时间设置
     * @param hour 小时
     * @param minutes 分钟
     * @returns {number}
     */
    static getLaterMinutes(hour?, minutes?) {
        var now_date = new Date();//当前时间
        var settingTime = new Date();//定时时间设置
        settingTime.setMinutes(now_date.getMinutes() + 1);
        settingTime.setSeconds(0);
        var later = settingTime.getTime() - now_date.getTime();
        return later;
    }

    /**
     * 设置天气提醒时间
     * @param hour 小时
     * @param minutes 分钟
     * @returns {number|any} 当前设置时间，具体当前时间的毫秒数
     */
    static getSettingHourAndMinutes(hour, minutes) {
        var now_date = new Date();//当前时间
        var settingTime = new Date();//定时时间设置
        var later;
        if (now_date.getHours() >= hour && now_date.getMinutes() > minutes) {//当前时间小时大设置时间小时(定时为明天)
            settingTime.setDate(now_date.getDate() + 1);//推迟一天提醒
            settingTime.setHours(hour);
            settingTime.setMinutes(minutes);
            settingTime.setSeconds(0);
        }
        else {//当前时间不大于设置的时间
            settingTime.setHours(hour);
            settingTime.setMinutes(minutes);
            settingTime.setSeconds(0);
        }
        later = settingTime.getTime() - now_date.getTime();
        return later;
    }

}