export function DetectOS()
{
    const ua = navigator.userAgent;
    if (ua.includes("Win")) return "windows";
    if (ua.includes("Mac")) return "mac";
    if (ua.includes("Linux")) return "linux";
    return "windows";
}

const downloads = {
    windows: { label: "Windows", ext: ".msi", href: "#" },
    mac:     { label: "macOS",   ext: ".dmg", href: "#" },
    linux:   { label: "Linux",   ext: ".AppImage", href: "#" },
};

export function InitDownloadButton()
{
    const MainBtn = document.getElementById("fast-download-link");
    const DropBtn = document.getElementById("download-dropdown");
    if (!MainBtn || !DropBtn) return;

    const os = DetectOS();
    const current = downloads[os];
    const SpanVersion = document.getElementById("span-version");
    if (SpanVersion) SpanVersion.textContent = `${current.ext} · 0.12.3_a`;

    const dropdown = document.createElement("div");
    dropdown.className = "download-list";
    dropdown.hidden = true;

    Object.entries(downloads).forEach(([key, val]) => {
        const item = document.createElement("a");
        item.href = val.href;
        item.className = "download-option" + (key === os ? " is-active" : "");
        item.textContent = `${val.label} ${val.ext}`;
        dropdown.appendChild(item);
    });

    const more = document.createElement("a");
    more.href = "downloads.html";
    more.className = "download-more";
    more.dataset.i18n = "hero.download.more";
    dropdown.appendChild(more);

    const wrapper = DropBtn.parentElement;
    wrapper.style.position = "relative";
    wrapper.appendChild(dropdown);

    const open  = () => { dropdown.hidden = false; DropBtn.setAttribute("aria-expanded", "true"); };
    const close = () => { dropdown.hidden = true;  DropBtn.setAttribute("aria-expanded", "false"); };
    const toggle = () => dropdown.hidden ? open() : close();

    DropBtn.addEventListener("click", (e) => { e.stopPropagation(); toggle(); });
    document.addEventListener("click", (e) => { if (!wrapper.contains(e.target)) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

    document.head.insertAdjacentHTML("beforeend", `<style>.download-list[hidden] { display: none !important; }</style>
    `);
}