import {
  Box,
  Heading,
  Text,
} from '@airtable/blocks/ui';
import React from 'react';


function Statistics({settings, record}) {
  // unpack the settings
  const table = settings.table;
  const textField = settings.textField;
  const keywordField = settings.keywordField;
  const keywordColorHex = settings.keywordColorHex;
  const keywordMissingColorHex = settings.keywordMissingColorHex;
  // get cell values, trimming and removing html entities from text string
  const textValueAsStringRaw = record.getCellValueAsString(textField.name)
  const textValueStringWithEntities = htmlEntities(textValueAsStringRaw.trim())
  const keywordValueAsString = record.getCellValueAsString(keywordField.name).trim();
  // calculate number of characters
  const charCount = textValueAsStringRaw.length
  // calculate number of words
  let wordCount;
  if (textValueAsStringRaw) {
    // number of words is the number of word boundaries plus one
    const regExResult = textValueAsStringRaw.match(/\s+/ig);
    wordCount = regExResult ? regExResult.length + 1 : 1;
  } else {
    // an empty string has no words
    wordCount = 0;
  }
  // convert keywords used to JSX components with usage counts
  const keywordList = keywordValueAsString ? keywordValueAsString.split(",").map(keyword => keyword.trim()).filter(keyword => keyword.length) : [];
  let keywordListDistinct = [...new Set(keywordList)];
  // remove special characters, trim white space, filter empty keywords
  // allow word characters, spaces, and -
  keywordListDistinct = keywordListDistinct.map(keyword => {
    return keyword.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
  })
  keywordListDistinct = keywordListDistinct.filter(keyword => keyword);
  let keywordListComponents = [];
  let keywordsUsed = [];
  let keywordsNotUsed = [];
  let textValueWithColors = textValueStringWithEntities;
  for (const keyword of keywordListDistinct) {
    // find the keyword based on regular expressions
    const regExPattern = new RegExp("\\b" + keyword.trim(), "ig");
    let regExResult = textValueStringWithEntities.match(regExPattern);
    if (!regExResult) {
      regExResult = [];
    }
    const keywordCount = regExResult.length;
    // create the component for the keyword list
    keywordListComponents.push(
      <React.Fragment>
        <span
          style={{color: keywordCount ? keywordColorHex : keywordMissingColorHex}}
        >
          {keyword}
        </span>
        ({keywordCount})&ensp;
      </React.Fragment>
    )
    if (keywordCount) {
      keywordsUsed.push(keyword);
    } else {
      keywordsNotUsed.push(keyword);
    }
    // update the text string with colors for the keywords
    for (let pattern of regExResult) {
      // Wresting the Cthulhu Way of parsing HTML to match only keywords not in html
      // https://blog.codinghorror.com/parsing-html-the-cthulhu-way/
      // Html in the original text should be converted to entities, so the only html should be the <span> I'm putting in for color
      const regExPattern = new RegExp("\\b" + pattern.trim() + "(?!([^<]+)?>)", "g");
      const replaceText = "<span style='color: " + keywordColorHex+ "'>" + pattern + "</span>";
      textValueWithColors = textValueWithColors.replace(regExPattern, replaceText);
    }
  }
  // convert new lines to html line breaks
  textValueWithColors = textValueWithColors.replace(/(?:\r\n|\r|\n)/g, '<br /> ');

  return (
    <Box
      border="none"
      backgroundColor="white"
      padding="15px"
      width="95vw"
      height="100vh"
      display="flex"
      flexDirection="column"
    >
      <Heading>
      <i>{textField.name}</i> of {record.name ? record.name : 'Unnamed Record'}
      </Heading>
      <Text margin='1em 0'>
        Number of characters: {charCount}<br />
        Number of words: {wordCount}
      </Text>
      <Heading size="small">
      Usage of keywords listed in <i>{keywordField.name}</i>
      </Heading>
      Number of keywords used: {keywordsUsed.length} of {keywordListDistinct.length}<br />
      <details>
        <summary>Keywords used: {keywordsUsed.length}</summary>
        <p>{keywordsUsed.join(", ")}</p>
      </details>
      <details>
        <summary>Keywords not used: {keywordsNotUsed.length}</summary>
        <p>{keywordsNotUsed.join(", ")}</p>
      </details>
      <br />
      <div>
        {keywordListComponents}
      </div>
      <br />
      <iframe
        srcDoc={textValueWithColors}
        style={{width: '90%', minHeight: '0', height: '100%'}}
      >
      </iframe>
    </Box>
  )
}


function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}


export default Statistics;
