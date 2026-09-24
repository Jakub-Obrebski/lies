import { locales } from "./locales.js";
import { GetCurrentLang, LoadLang } from "./i18n.js";

export function InitLanguageSwitcher()
{
    const button = document.getElementById("language-switcher");
    if (!button) return;

    const dropdown = document.createElement("div");
    dropdown.className = "lang-list";
    dropdown.setAttribute("role", "menu");
    dropdown.hidden = true;

    Object.entries(locales).forEach(([code, label]) => {
        const item = document.createElement("button");
        item.type = "button";
        item.className = "lang-option";
        item.dataset.lang = code;
        item.setAttribute("role", "menuitem");
        item.textContent = label;
        item.addEventListener("click", async () => {
            await LoadLang(code);
            close();
        });
        dropdown.appendChild(item);
    });

    const wrapper = document.createElement("div");
    wrapper.className = "lang-switcher";
    button.parentNode.insertBefore(wrapper, button);
    wrapper.appendChild(button);
    wrapper.appendChild(dropdown);

    const SyncActive = () => {
        const current = GetCurrentLang();
        dropdown.querySelectorAll(".lang-option").forEach(el => {
            el.classList.toggle("is-active", el.dataset.lang === current);
            el.setAttribute("aria-current", el.dataset.lang === current ? "true" : "false");
        });
    };

    const open = () => {
        dropdown.hidden = false;
        button.setAttribute("aria-expanded", "false");
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