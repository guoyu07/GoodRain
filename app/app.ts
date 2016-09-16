import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LocalNotifications} from 'ionic-native';
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
    rootPage:any = HomePage;
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
    }

    //系统初始化之处理事件
    initializeApp() {
        this.platform.ready().then(() => {
                // Okay, so the platform is ready and our plugins are available.
                // Here you can do any higher level native things you might need.
                StatusBar.styleDefault();
                //添加定时器
                LocalNotifications.schedule({
                    id: 1,
                    text: '每个分钟整点提醒,记得关注明天的天气，方便出行。',
                    firstAt: new Date(new Date().getTime() + UtilBase.getSettingHourAndMinutes(22, 0)),
                    every: "minute"   //可以实现每分钟调用,但是也不是正分钟调用, 如现在时间是12:21:12 那么调用的时间为 12:22:12,并不是整点
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