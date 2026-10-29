import { InitI18n } from "./i18n/i18n.js";
import { InitLangSwitcher } from "./i18n/switcher.js";
import { InitDownloadButton } from "./download.js";
import { InitContactForm } from "./contact.js";

InitI18n().then(() => {
    InitLangSwitcher();
});

InitDownloadButton();

document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
});