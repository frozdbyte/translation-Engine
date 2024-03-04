# Welcome to Translation Engine.
A simple javascript translation engine for translating basic HTML pages.
Add `te-default="en"` to any element to make it translateable. Replace `"en"` with the language code of the language that is writte inside the element tag.

To add translation, you can either add attributes like `te-de`(DE -> German) or `te-fr`(FR -> French), or the single attribute `te-options="{'languageCode': 'text'}"`.

## Example 1
This will translate the text to "Hallo" when the language is set to "de" and "Bonjour" when the language is set to "fr". If the language is set to anything else, it will default to "Hello".

`<p te-default="en" te-de="Hallo" te-fr="Bonjour">Hello</p>`

## Example 2
This will translate the text to "Hallo" when the language is set to "de" and "Bonjour" when the language is set to "fr". If the language is set to anything else, it will default to "Hello".

`<p te-default="en" te-options="{'de': 'Hallo', 'fr': 'Bonjour'}">Hello</p>`

## Example 3
This will also work, although it is generally not recommended to mix the two methods.

`<p te-default="en" te-de="Hallo" te-options="{'fr': 'Bonjour'}">Hello</p>`
