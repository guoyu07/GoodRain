import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, ToastController} from 'ionic-angular';
import {LocalNotifications} from 'ionic-native';
import {UtilBase} from '../../base/util';

@Component({
    templateUrl: 'build/pages/setting/setting.html'
})

/**
 * 软件基本参数设置
 */
export class SettingPage {

    public notification_date = "22:00";

    private flagVibrate;

    private vTrue;

    constructor(public toastCtrl:ToastController) {
        this.flagVibrate = localStorage.getItem("flagVibrate");
        if (this.flagVibrate === "vibrate") {
            this.vTrue = true;
        } else {
            this.vTrue = false;
        }
    }

    //设置方法
    doSetting() {
        var hour = +this.notification_date.substr(0, this.notification_date.lastIndexOf(":"));
        var minutes = +this.notification_date.substr(this.notification_date.lastIndexOf(":") + 1, this.notification_date.length);
        //添加定时器
        LocalNotifications.update({
            id: 1,
            text: '记得关注明天的天气，方便出行。',
            firstAt: new Date(new Date().getTime() + UtilBase.getSettingHourAndMinutes(hour, minutes)),
            every: "day"
        });
        let toast = this.toastCtrl.create({
            message: '提醒时间设置成功',
            duration: 3000
        });
        toast.present();
    }

    //切换是否震动
    toggle_vibrate(e) {
        if (this.vTrue) {
            this.flagVibrate = "noVibrate";
            localStorage.setItem("flagVibrate", this.flagVibrate);
        } else {
            this.flagVibrate = "vibrate";
            localStorage.setItem("flagVibrate", this.flagVibrate);
        }

    }

}