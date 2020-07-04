import {
  Box,
  Button,
  Text,
  useRecordById,
  useWatchable,
} from '@airtable/blocks/ui';
import {cursor} from '@airtable/blocks';
import React, {useState} from 'react';
import Statistics from './statistics';

function MainApp({settings}) {
  // unpack the settings
  const table = settings.table;
  const textField = settings.textField;
  const keywordField = settings.keywordField;
  // watch for the current record and field
  const [activeTableId, setActiveTableId] = useState(null);
  const [selectedRecordId, setSelectedRecordId] = useState(null);

  // use the cursor to determine the active record and field
  useWatchable(cursor, ['activeTableId', 'selectedRecordIds'], () => {
    setActiveTableId(cursor.activeTableId);
    // check if the active table is the table from the settings
    const matchingTable = (cursor.activeTableId == table.id)
    if (!matchingTable) {
      // the active table isn't the settings table, so the selected record doesn't matter
      setSelectedRecordId("");
      return;
    }
    if (matchingTable && cursor.selectedRecordIds.length > 0) {
      // at least one record is selected, so pick the first
      setSelectedRecordId(cursor.selectedRecordIds[0]);
    }
  });

  // use the hook to trigger re-renders whenever the record data changes
  const record = useRecordById(table, selectedRecordId ? selectedRecordId : "a_string_because_null_failed");

  if (cursor.activeTableId != table.id) {
    // The active table isn't the table in the settings,
    // so state what the block does, and have button to go to the table
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
        <Text textAlign='center' margin='1em'>
          This block examines
          the <strong>{textField.name }</strong> field
          in the <strong>{table.name}</strong> table for
          keywords listed in the <strong>{keywordField.name }</strong> field.
        </Text>
        <Text textAlign='center' margin='1em'>
          This block also displays the number of characters & words
          in the <strong>{textField.name }</strong> field.
        </Text>
        <Button
          variant="primary"
          onClick={()=>cursor.setActiveTable(table.id)}
        >
        Show <strong>{table.name}</strong> Table
        </Button>
      </Box>
    )
  } else if (record) {
    // one of the field for this block is selected, so show the info
    return (
      <Statistics
        settings={settings}
        record={record}
      />
    )
  } else {
    // the table from the settings is active, but no record is selected
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
      <Text textAlign='center' margin='1em'>
        Select a record to see keyword statistics for the <strong>{textField.name }</strong> field.
      </Text>
      </Box>
    )
  }
}


export default MainApp;
