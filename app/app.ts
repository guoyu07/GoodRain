import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LocalNotifications} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {CitysPage} from './pages/citys/citys';

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
            {title: '城市列表', component: CitysPage}
        ];
    }

    //系统初始化之处理事件
    initializeApp() {
        this.platform.ready().then(() => {
                // Okay, so the platform is ready and our plugins are available.
                // Here you can do any higher level native things you might need.
                StatusBar.styleDefault();
                //添加定时器
                console.log("定时器...");
                var now = new Date().getTime();
                var day_11_pm = new Date(now + 5 * 1000);
                LocalNotifications.schedule({
                    id: new Date().getMilliseconds(),
                    title: "提醒",
                    text: '亲！记得关注明天的天气，方便出行。',
                    every: 'day',
                    icon: './img/local-warn.png'
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
