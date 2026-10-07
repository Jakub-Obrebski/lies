export const SupportedLangs = [
	"bel",
	"eng",
	"lit",
	"pdl",
	"pol",
	"rus",
	"ukr"
];
const DefaultLang = "pdl";
const StorageKey = "lies.lang";

let translations = {};
let CurrentLang = DefaultLang;
const listeners = new Set();

function DetectLang()
{
	const stored = localStorage.getItem(StorageKey);
	if (stored && SupportedLangs.includes(stored)) return stored;

	const BrowserLangs = navigator.languages ?? [navigator.language ?? ""];
	for (const raw of BrowserLangs)
	{
		const code = raw.toLowerCase().split("-")[0];
		if (SupportedLangs.includes((code))) return code;
	}

	return DefaultLang;
}

export async function LoadLang(lang)
{
	if (!SupportedLangs.includes(lang)) lang = DefaultLang;
	const response = await fetch(`./scripts/i18n/locales/${lang}.json`);
	if (!response.ok) throw new Error(`Failed to load language: ${lang}`);

	translations = await response.json();
	CurrentLang = lang;

	document.querySelectorAll("[data-i18n]").forEach(element => {
		const key = element.dataset.i18n;
		element.textContent = translations[key] ?? key;
	});

	document.querySelectorAll("[data-i18n-attr]").forEach(element => {
		element.dataset.i18nAttr.split(",").forEach(pair => {
			const [attr, key] = pair.split(":").map(s => s.trim());
			if (attr && key) element.setAttribute(attr, translations[key] ?? key);
		});
	});

	document.documentElement.lang = lang;
	localStorage.setItem(StorageKey, lang);
}

export function GetCurrentLang() { return CurrentLang; }
export function GetTranslations() { return translations; }
export function t(key, fallback) { return translations[key] ?? fallback ?? key; }

export function OnLangChange(fn)
{
	listeners.add(fn);
	return () => listeners.delete(fn);
}

export async function InitI18n()
{
	await LoadLang(DetectLang());
}