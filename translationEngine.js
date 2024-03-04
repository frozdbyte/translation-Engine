
/**
 * Welcome to Translation Engine.
 * 
 * Add te-default="en" to any element to make it translateable. Replace "en" with the language code of the language that is writte inside the element tag.
 * To add extra languages, add te-options="{'languageCode': 'text'}" to the element. Replace "languageCode" with the language code and "text" with the translation.
 * 
 * Alternatively, you can just use te-default="en" and te-de="Hallo" and te-fr="Bonjour" to add translations.
 * 
 * Example 1:
 * <p te-default="en" te-options="{'de': 'Hallo', 'fr': 'Bonjour'}">Hello</p>
 * 
 * This will translate the text to "Hallo" when the language is set to "de" and "Bonjour" when the language is set to "fr". If the language is set to anything else, it will default to "Hello".
 * 
 * Example 2:
 * <p te-default="en" te-de="Hallo" te-fr="Bonjour">Hello</p>
 * 
 * This will translate the text to "Hallo" when the language is set to "de" and "Bonjour" when the language is set to "fr". If the language is set to anything else, it will default to "Hello".
 * 
 * Example 3:
 * <p te-default="en" te-de="Hallo" te-options="{'fr': 'Bonjour'}">Hello</p>
 * 
 * This will also work, although it is not recommended to mix the two methods.
 */


/**
 * Fetches all translation elements from the DOM and returns them in an array.
 * Translations elements are selected based on if they have the "te-default" attribute.
 * 
 * @returns {Array} An array of objects containing the translation elements, their default language, and their options.
 */
function fetchTranslationElements(){
    let el = document.querySelectorAll('[te-default]');
    return Array.from(el).map((element) => {
        let defaultLang = element.getAttribute('te-default');
        let options = element.getAttribute('te-options');
        let langOptions = {};
        let attributes = Array.from(element.attributes);
        attributes.forEach((attr) => {
            if(attr.name.startsWith('te-') && attr.name.length === 5 && attr.name !== 'te-default' && attr.name !== 'te-options'){
                langOptions[attr.name.replace('te-', '')] = attr.value;
            }
        });
        if(options){
            try{
                options = options.replace(/'/g, '"');
                options = JSON.parse(options);
            }catch(e){
                console.log('Error parsing options for element: ', element);
                options = null;
            }
        }
        if(langOptions){
            options = Object.assign(options || {}, langOptions);
        }
        return {element: element, default: element.innerHTML, defaultLang: defaultLang, options: options};
    });
}

/**
 * Gets the language code of the browser language.
 * 
 * @returns {string} The language code of the browser language.
 */
function getBrowserLang(){
    return navigator.language.split('-')[0];
}

/**
 * Iterates over the translationElements array and translates the elements to the given language.
 * 
 * @param {string} lang The language code to translate to.
 * @param {Array} elements The array of translation elements.
 */
function translateElements(lang, elements){
    elements.forEach((element) => {
        if(element.options && element.options[lang]){
            element.element.innerHTML = element.options[lang];
        } else {
            element.element.innerHTML = element.default;
        }
    });
}

/**
 * Initializes the translation engine.
 */
function initTranslationEngine(){
    translateElements(getBrowserLang(), fetchTranslationElements());
}

/**
 * Event listener to initialize the translation engine when the DOM is loaded.
 */
document.addEventListener('DOMContentLoaded', function(){
    initTranslationEngine();
});