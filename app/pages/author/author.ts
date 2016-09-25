import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {InAppBrowser} from 'ionic-native';

@Component({
    templateUrl: 'build/pages/author/author.html'
})

export class AuthorPage {

    constructor() {
        //使用本地浏览器打开网页
        //let browser = InAppBrowser.open('http://liumingmusic.win/about/index.html', '_self', 'location=yes,hidden=yes');
    }

}