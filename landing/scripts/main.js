import { InitI18n } from "./i18n/i18n.js";
import { InitLangSwitcher } from "./i18n/switcher.js";
import { LoadLang } from "./i18n/i18n.js";

LoadLang("pol");

InitI18n().then(() => {
    InitLangSwitcher();
});