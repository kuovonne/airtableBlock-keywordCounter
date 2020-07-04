import {
  Box,
  Text,
  initializeBlock,
  useSettingsButton,
} from '@airtable/blocks/ui';
import React, {useState} from 'react';
import MainApp from './mainApp';
import BlockSettings, {validateSettings} from './blockSettings';


function App() {
  const settings = validateSettings();
  // if settings are invalid, show settings
  const [isShowingSettings, setIsShowingSettings] = useState(!settings);
  useSettingsButton(()=>setIsShowingSettings(!isShowingSettings));

  if (isShowingSettings) {
    // show the settings screen
    return <BlockSettings setIsShowingSettings={setIsShowingSettings} />
  } else if (!settings) {
    // the settings screen was closed, but the settings are invalid
    // so tell the user to go to the settings screen
    return (
      <Box
        border="none"
        backgroundColor="white"
        padding="15px"
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Text textAlign='center' margin='1em'>This block examines a field and displays the number of characters and keywords it contains.</Text>
        <Text textAlign='center' margin='1em'>Please configure the settings to use this block.</Text>
      </Box>
    )
  } else {
    // settings are okay, so show the app
    return <MainApp settings={settings}/>
  }
}


initializeBlock(() => <App />);
