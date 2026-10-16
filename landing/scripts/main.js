import { InitI18n } from "./i18n/i18n.js";
import { InitLangSwitcher } from "./i18n/switcher.js";
import { InitDownloadButton } from "./download.js";

InitI18n().then(() => {
    InitLangSwitcher();
});

InitDownloadButton();