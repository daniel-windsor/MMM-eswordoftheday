# MMM-eswordoftheday

This an extension for the [MagicMirror](https://github.com/MichMich/MagicMirror).

It presents a spanish word with an english definition, as well as two spanish/english example sentences.  Data is scraped from [SpanishDict!](https://www.spanishdict.com/wordoftheday)  No account is required

## Screenshot
![wotd](https://user-images.githubusercontent.com/57517624/119223669-c876bc80-bb4e-11eb-94d3-d0f9dab0e30f.png)


## Installation
Open a terminal session, navigate to your MagicMirror's `modules` folder and execute:
````
git clone https://github.com/daniel-windsor/MMM-eswordoftheday.git
cd MMM-eswordoftheday
npm install
````

Activate the module by adding it to the config.js file as shown below.

## Using the module
````javascript
modules: [
{
  module: 'MMM-eswordoftheday',
  position: 'bottom_left',
}
````

## Config
The entry in `config.js` can include the following options:

|Option|Description|Default Value|Accepted Values|
|---|---|---|---|
|`showExamples`|Toggle examples of the word being used in a sentence|true|`true / false`|
|`showExampleTranslations`|If examples are shown, also show their english translations|true|`true / false`|

