import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

const ButtonPositiveNegative = ({type, onPress, title}) => {
  if (type == 'positive') {
    return (
      <TouchableOpacity
        style={styles.containerButtonPositive}
        onPress={onPress}>
        <Text style={styles.textButtonPositive}>{title}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={styles.containerButtonNegative}
        onPress={onPress}>
        <Text style={styles.textButtonNegative}>{title}</Text>
      </TouchableOpacity>
    );
  }
};

export default ButtonPositiveNegative;

const styles = StyleSheet.create({
  containerButtonNegative: {
    flex: 1,
    height: 40,
    borderColor: '#1B77DF',
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
  },
  containerButtonPositive: {
    flex: 1,
    height: 40,
    backgroundColor: '#1B77DF',
    borderRadius: 4,
    justifyContent: 'center',
  },
  textButtonNegative: {
    textAlign: 'center',
    color: '#1B77DF',
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.4,
  },
  textButtonPositive: {
    textAlign: 'center',
    alignSelf: 'center',
    color: '#FFFFFF',
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.4,
  },
});
