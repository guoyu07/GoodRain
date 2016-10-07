import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar, BackgroundMode} from 'ionic-native';
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
        this.rootPage = HomePage;
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
                //根据不同设备设置不同的状态栏颜色
                if (this.platform.is('android')) {
                    StatusBar.backgroundColorByHexString('#fff');
                } else {
                    StatusBar.overlaysWebView(false);
                    StatusBar.backgroundColorByHexString('#fff');
                }
                //系统初始化加载权限
                Geolocation.getCurrentPosition().then((resp) => {
                    localStorage.setItem("longitude", resp.coords.longitude + "");
                    localStorage.setItem("latitude", resp.coords.latitude + "");
                    this.rootPage = HomePage;
                }, (error)=> {
                    //定位失败
                    console.log("定位失败...");
                });
                //添加定时器
                LocalNotifications.schedule({
                    id: 1000,
                    text: '记得关注明天的天气，方便出行。',
                    firstAt: new Date(new Date().getTime() + UtilBase.getSettingHourAndMinutes(22, 0)),
                    every: "day",
                    icon: "res://local-warn"
                });
                //设置后台运行状态
                BackgroundMode.enable();
                BackgroundMode.setDefaults({
                    silent: true
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

ionicBootstrap(MyApp, null, {
    activator: "highlight",//按钮点击效果
    backButtonText: "返回",//返回按钮文案
    tabsPlacement: "bottom",//tabs的位置
    tabsHideOnSubPages: true,//进入子页是否隐藏底部栏
});


/*
 上传代码到云端
 ionic login
 ionic upload
 */