let translations = {};

export async function loadLanguage(language)
{
	const response = await fetch(`./scripts/i18n/locales/${language}.json`);
	if (!response.ok) throw new Error(`Failed to load language: ${language}`);

	translations = await response.json();

	document.querySelectorAll("[data-i18n]").forEach(element => {
		const key = element.dataset.i18n;
		element.textContent = translations[key] ?? key;
	});

	document.documentElement.lang = language;
}