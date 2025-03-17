import Cookies from "js-cookie";

const CookiePolicy = () => {
    const clearCookies = () => {
        Cookies.remove("cookieConsent");
        alert("Cookies have been cleared. Reload the page to see the consent banner again.");
    };

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
            <h1>Zásady používání souborů cookies</h1>

        <p><strong>Poslední aktualizace:</strong> 08.03.2025</p>

        <p>Tato stránka používá soubory cookies, aby zajistila správné fungování webu, vylepšila uživatelský zážitek a analyzovala návštěvnost. Tím, že naše stránky používáte, souhlasíte s využíváním cookies v souladu s těmito zásadami.</p>

        <h2>1. Co jsou cookies?</h2>
        <p>Cookies jsou malé textové soubory uložené ve vašem zařízení (počítač, tablet, mobilní telefon) při návštěvě webové stránky. Pomáhají nám rozpoznat vaše zařízení a zapamatovat si určité informace o vašich preferencích nebo předchozích akcích.</p>

        <h2>2. Jaké typy cookies používáme?</h2>
        <h3>a) Nezbytné cookies</h3>
        <p>Tyto cookies jsou nezbytné pro správné fungování webu a nelze je deaktivovat. Zajišťují například přihlášení uživatele nebo bezpečnostní funkce.</p>

        <h3>b) Analytické cookies</h3>
        <p>Tyto cookies nám pomáhají sledovat návštěvnost webu a chování uživatelů prostřednictvím anonymizovaných dat (např. Google Analytics). Díky nim můžeme vylepšovat obsah a funkcionalitu webu.</p>

        <h3>c) Funkční cookies</h3>
        <p>Umožňují zapamatování vašich preferencí, jako je jazykové nastavení nebo uložené přihlašovací údaje, což usnadňuje používání webu.</p>

        <h3>d) Marketingové cookies</h3>
        <p>Používáme je k personalizaci obsahu a zobrazování relevantních reklam. Mohou být nastaveny námi nebo třetími stranami (např. Google, Facebook), které poskytují reklamní služby.</p>

        <h2>3. Jak můžete spravovat cookies?</h2>
        <p>Při první návštěvě webu máte možnost spravovat své preference prostřednictvím cookie lišty. Můžete také změnit nastavení cookies ve svém webovém prohlížeči a odstranit již uložené cookies.</p>

        <p><strong>Instrukce pro jednotlivé prohlížeče:</strong></p>
        <ul>
            <li><strong>Google Chrome:</strong> <a href="https://support.google.com/chrome/answer/95647?hl=cs">Otevřít nastavení cookies</a></li>
            <li><strong>Mozilla Firefox:</strong> <a href="https://support.mozilla.org/cs/kb/vymazani-cookies">Otevřít nastavení cookies</a></li>
            <li><strong>Microsoft Edge:</strong> <a href="https://support.microsoft.com/cs-cz/help/4027947/microsoft-edge-delete-cookies">Otevřít nastavení cookies</a></li>
        </ul>

        <h2>4. Cookies třetích stran</h2>
        <p>Náš web může využívat služby třetích stran, které ukládají vlastní cookies. Tyto třetí strany mají své vlastní zásady ochrany osobních údajů a my nad jejich cookies nemáme kontrolu.</p>

        <h2>5. Změny v zásadách používání cookies</h2>
        <p>Můžeme čas od času aktualizovat tuto politiku, proto vám doporučujeme pravidelně kontrolovat tuto stránku.</p>

        <h2>6. Kontakt</h2>
        <p>Máte-li jakékoli dotazy ohledně používání cookies, kontaktujte nás na: <strong>info@topgastrocz.cz</strong></p>

            <button onClick={clearCookies} style={styles.button}>Smazat Cookies</button>
        </div>
    );
};
// nechtělo se mi vytvořit nový .css :) (někdy předělat)
const styles = {
    button: {
        backgroundColor: "rgba(184, 211, 171, 0.77)",
        color: "#fff",
        border: "none",
        padding: "10px 15px",
        cursor: "pointer",
        marginTop: "10px",
        borderRadius: "5px"
    }
    
};

export default CookiePolicy;
