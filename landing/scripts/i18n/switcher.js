import { locales } from "./locales.js";
import { LoadLang } from "./i18n.js";

export function InitLangSwitcher()
{
    const button = document.getElementById("language-switcher");
    if (!button) return;

    const dropdown = document.createElement("div");
    dropdown.className = "lang-list";
    dropdown.setAttribute("role", "menu");
    dropdown.hidden = true;

    Object.entries(locales).forEach(([code, { name, flag }]) => {
        const item = document.createElement("button");
        item.type = "button";
        item.className = "lang-option";
        item.dataset.lang = code;
        item.setAttribute("role", "menuitem");

        item.addEventListener("click", async () => {
            await LoadLang(code);
            close();
        });

        const img = document.createElement("img");
        img.src = flag;
        img.width = 16;
        img.height = 12;
        img.alt = "";
        img.setAttribute("aria-hidden", "true");

        item.appendChild(document.createTextNode(name));
        item.appendChild(img);
        dropdown.appendChild(item);
    });

    const wrapper = document.createElement("div");
    wrapper.className = "lang-switcher";
    button.parentNode.insertBefore(wrapper, button);
    wrapper.appendChild(button);
    wrapper.appendChild(dropdown);

    const open = () => {
        dropdown.hidden = false;
        button.setAttribute("aria-expanded", "true");
    };

    const close = () => {
        dropdown.hidden = true;
        button.setAttribute("aria-expanded", "false");
    };

    const toggle = () => (dropdown.hidden ? open() : close());

    button.addEventListener("click", (e) => {
        e.stopPropagation();
        toggle();
    });

    document.addEventListener("click", (e) => {
        if (!wrapper.contains(e.target)) close();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") close();
    });
}