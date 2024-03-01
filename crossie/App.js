import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';


const initialGrid = [
  [{ char: '', editable: true, partOfWord: { horizontal: true, vertical: true }}, { char: '', editable: true, partOfWord: { horizontal: true, vertical: false }}, { char: '', editable: true, partOfWord: { horizontal: true, vertical: false }}, { char: '', editable: false, partOfWord: { horizontal: false, vertical: false }}, { char: '', editable: false, partOfWord: { horizontal: false, vertical: false }}],
  [{ char: '', editable: true, partOfWord: { horizontal: true, vertical: true }}, { char: '', editable: true, partOfWord: { horizontal: true, vertical: true }}, { char: '', editable: true, partOfWord: { horizontal: true, vertical: true }}, { char: '', editable: true, partOfWord: { horizontal: true, vertical: true }}, { char: '', editable: false, partOfWord: { horizontal: false, vertical: false }}],
  [{ char: '', editable: true, partOfWord: { horizontal: true, vertical: true }}, { char: '', editable: true, partOfWord: { horizontal: true, vertical: true }}, { char: '', editable: true, partOfWord: { horizontal: true, vertical: true }}, { char: '', editable: true, partOfWord: { horizontal: true, vertical: true }}, { char: '', editable: true, partOfWord: { horizontal: true, vertical: true }}],
  [{ char: '', editable: false, partOfWord: { horizontal: false, vertical: false }}, { char: '', editable: true, partOfWord: { horizontal: true, vertical: true }}, { char: '', editable: true, partOfWord: { horizontal: true, vertical: true }}, { char: '', editable: true, partOfWord: { horizontal: true, vertical: true }}, { char: '', editable: true, partOfWord: { horizontal: true, vertical: true }}],
  [{ char: '', editable: false, partOfWord: { horizontal: false, vertical: false }}, { char: '', editable: false, partOfWord: { horizontal: false, vertical: false }}, { char: '', editable: true, partOfWord: { horizontal: true, vertical: true }}, { char: '', editable: true, partOfWord: { horizontal: true, vertical: true }}, { char: '', editable: true, partOfWord: { horizontal: true, vertical: true }}],
];


const clues = {
  across: [
    "1: Mormons, officially",
    "2: Proceed, say",
    "3: Correo _____ (Spanish mail stamp)",
    "4: Spanish 3 + 3",
    "5: Common chess rating",
  ],
  down: [
    "1: JFK alternative",
    "2: Some deer",
    "3: \"Yes _____!\"",
    "5: Astronaut Armstrong",
    "7: Bear in Spanish",
  ],
};

export default function App() {
  const [grid, setGrid] = useState(initialGrid);
  const [selectedCell, setSelectedCell] = useState(null);
  const [selectionDirection, setSelectionDirection] = useState('horizontal');

  const handleCellPress = (rowIndex, colIndex) => {
    if (selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex) {
      setSelectionDirection(prevDirection => prevDirection === 'horizontal' ? 'vertical' : 'horizontal');
    } else {
      setSelectedCell({ row: rowIndex, col: colIndex });
      setSelectionDirection('horizontal');
    }
  };

  const handleChangeText = (text, rowIndex, colIndex) => {
    const newGrid = [...grid];
    newGrid[rowIndex][colIndex].char = text.toUpperCase();
    setGrid(newGrid);
  };

  const isCellSelected = (rowIndex, colIndex) => {
    if (!selectedCell) return false;
    if (selectionDirection === 'horizontal') {
      return rowIndex === selectedCell.row && grid[rowIndex][colIndex].partOfWord.horizontal;
    }
    return colIndex === selectedCell.col && grid[rowIndex][colIndex].partOfWord.vertical;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.crosswordContainer}>
        {grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => (
            <TouchableOpacity
              key={colIndex}
              style={[
                styles.cell,
                { backgroundColor: cell.editable ? '#fff' : '#000' },
                isCellSelected(rowIndex, colIndex) ? styles.selectedCell : {},
              ]}
              onPress={() => handleCellPress(rowIndex, colIndex)}
              disabled={!cell.editable}
            >
              {cell.editable ? (
                <TextInput
                  style={styles.cellInput}
                  onChangeText={(text) => handleChangeText(text, rowIndex, colIndex)}
                  value={cell.char}
                  maxLength={1}
                  autoCapitalize="characters"
                  autoCorrect={false}
                  textAlign="center"
                />
              ) : (
                  <View style = {{backgroundColor:'black'}}>
                    <Text>M</Text>
                  </View>
              )}
            </TouchableOpacity>
          ))}
          </View>
        ))}
      </View>
      <ScrollView style={styles.clueBox}>
        <Text style={styles.clueHeader}>Across</Text>
        {clues.across.map((clue, index) => (
          <Text key={`across-${index}`} style={styles.clueText}>{clue}</Text>
        ))}
        <Text style={styles.clueHeader}>Down</Text>
        {clues.down.map((clue, index) => (
          <Text key={`down-${index}`} style={styles.clueText}>{clue}</Text>
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );


}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20,
  },
  crosswordContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clueBox: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCell: {
    backgroundColor: 'lightblue',
  },
  cellInput: {
    width: '100%',
    height: '100%',
    fontSize: 20,
    padding: 0,
  },
  clueHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  clueText: {
    fontSize: 16,
    marginVertical: 5,
  },
  cellText: {
    fontSize: 20,
  },
  noneditableCell: {
    color: 'black',
  },
});