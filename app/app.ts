import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LocalNotifications, Geolocation} from 'ionic-native';
import { Storage, LocalStorage } from 'ionic-angular';

import {HomePage} from './pages/home/home';
import {CitysPage} from './pages/citys/citys';
import {AuthorPage} from './pages/author/author';
import {FeedbackPage} from './pages/feedback/feedback';
import {SettingPage} from './pages/setting/setting';
import {UtilBase} from './base/util';

@Component({
    templateUrl: 'build/app.html'
})
class MyApp {

    @ViewChild(Nav) nav:Nav;

    // make HelloIonicPage the root (or first) page
    rootPage:any;
    pages:Array<{title: string, component: any}>;

    constructor(public platform:Platform, public menu:MenuController) {
        this.initializeApp();
        //添加侧边栏需要的页面
        this.pages = [
            {title: '当前地区', component: HomePage},
            {title: '城市列表', component: CitysPage},
            {title: '作者简介', component: AuthorPage},
            {title: '设置', component: SettingPage},
            {title: '反馈', component: FeedbackPage},
        ];
        var isExist = localStorage.getItem("flagVibrate");
        if (!isExist) {
            localStorage.setItem("flagVibrate", "vibrate");
        }
    }

    //系统初始化之处理事件
    initializeApp() {
        this.platform.ready().then(() => {
                // Okay, so the platform is ready and our plugins are available.
                // Here you can do any higher level native things you might need.
                StatusBar.styleDefault();
                //系统初始化加载权限
                Geolocation.getCurrentPosition().then((resp) => {
                    localStorage.setItem("longitude", resp.coords.longitude + "");
                    localStorage.setItem("latitude", resp.coords.latitude + "");
                    this.rootPage = HomePage;
                }, (error)=> {

                });
                //添加定时器
                LocalNotifications.schedule({
                    id: 1000,
                    text: '记得关注明天的天气，方便出行。',
                    firstAt: new Date(new Date().getTime() + UtilBase.getSettingHourAndMinutes(10, 10)),
                    every: "day",
                    icon: "res://local-warn"
                });
                //本地推送，点击之后的事件处理
                LocalNotifications.on("click", function (notification) {
                    console.log("亲，你已经点击了本地推送的信息。");
                });
            }
        );
    }

    //点击侧边栏切换页面
    openPage(page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component);
    }
}

ionicBootstrap(MyApp);


/*
 上传代码到云端
 ionic login
 ionic upload
 */