import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslatesService {

  constructor(private translateService: TranslateService, @Inject(PLATFORM_ID) private id: object) {

    if (isPlatformBrowser(this.id)) {
      // defelt lang
      this.translateService.setDefaultLang('en')

      //store in the localstorage
      const langFromlocalStorage = localStorage.getItem('lang')

      //get use from localstorage

      if (langFromlocalStorage) {
        this.translateService.use(langFromlocalStorage)
      }

      this.setTranslation()

    }
  }

  setTranslation() {

    if (localStorage.getItem('lang') === 'en') {
      document.documentElement, 'dir', 'ltr'
      document.documentElement, 'lang', 'en'
    }
    if (localStorage.getItem('lang') === 'ar') {
      document.documentElement, 'dir', 'rtl'
      document.documentElement, 'lang', 'rtl'
    }

  }

  changeTranslate(lang: string): void {
    localStorage.setItem('lang', lang)
    this.translateService.use(lang)
    this.setTranslation()
  }

}
