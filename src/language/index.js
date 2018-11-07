// 国际化
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

const messages = {
  'zh': require('./zh'),
  'en': require('./en')
}
let localeLang = localStorage.lang ? localStorage.lang : 'zh'
const i18n = new VueI18n({
  locale: localeLang,
  messages
})
export default i18n
