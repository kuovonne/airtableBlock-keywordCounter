import {
  Button,
  ColorPaletteSynced,
  colorUtils,
  colors,
  FieldPickerSynced,
  FormField,
  TablePickerSynced,
  useBase,
  useGlobalConfig,
} from '@airtable/blocks/ui';
import React, {useState} from 'react';

function BlockSettings({setIsShowingSettings}) {
  // store the settings in globalConfig
  const globalConfig = useGlobalConfig();
  const base = useBase();
  const table = base.getTableByIdIfExists(globalConfig.get('tableId'));
  const settings = validateSettings();

  const allowedColors = [
    colors.BLUE,
    colors.CYAN,
    colors.TEAL,
    colors.PINK,
    colors.RED,
    colors.ORANGE,
    colors.YELLOW,
    colors.GREEN,
    colors.PURPLE,
    colors.GRAY,
  ];
  return (
    <div style={{padding: '15px', 'height': '100vh'}}>
      <FormField label="Table">
        <TablePickerSynced
          globalConfigKey='tableId'
        />
      </FormField>
      <FormField
        label="Keyword field"
        description="This field should contain a comma separated list of keywords."
      >
        <FieldPickerSynced table={table}
          globalConfigKey='keywordFieldId'
        />
      </FormField>
      <FormField
        label="Content field"
        description="The block will search the text in this field to see which keywords it contains."
      >
        <FieldPickerSynced table={table}
          globalConfigKey='textFieldId'
        />
      </FormField>
      <FormField
        label="Color for keywords in use"
      >
        <ColorPaletteSynced
          globalConfigKey="keywordColor"
          allowedColors={allowedColors}
        />
      </FormField>
      <FormField
        label="Color for keywords NOT in use"
      >
        <ColorPaletteSynced
          globalConfigKey="keywordMissingColor"
          allowedColors={allowedColors}
        />
      </FormField>
      <div style={{display: 'flex', 'justify-content': 'flex-end'}}>
      <Button
        variant="primary"
        onClick={()=>setIsShowingSettings(false)}
        disabled={!settings}
        alignSelf="flex-end"
      >
      Done
      </Button>
      </div>
      <p>Copyright © 2020, Kuovonne Vorderbruggen</p>
    </div>
  );
}

function validateSettings() {
  const globalConfig = useGlobalConfig();
  const base = useBase();
  // check if there is a table
  const table = base.getTableByIdIfExists(globalConfig.get('tableId'));
  if (!table) {
    return false;
  }
  // check if there are the required fields
  const textField = table.getFieldByIdIfExists(globalConfig.get('textFieldId'));
  const keywordField = table.getFieldByIdIfExists(globalConfig.get('keywordFieldId'));
  if (!textField || !keywordField) {
    return false;
  }
  if (textField.id == keywordField.id) {
    return false;
  }
  // check if colors have been picked
  const keywordColor = globalConfig.get('keywordColor');
  const keywordMissingColor = globalConfig.get('keywordMissingColor');
  if (!keywordColor || !keywordMissingColor) {
    return false;
  }
  return {
    "table": table,
    "textField": textField,
    "keywordField": keywordField,
    "keywordColorHex": keywordColor ? colorUtils.getHexForColor(keywordColor) : "#000000",
    "keywordMissingColorHex": keywordMissingColor ?  colorUtils.getHexForColor(keywordMissingColor) : "#000000",
  };
}

export {validateSettings};
export default BlockSettings;
