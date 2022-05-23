import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

const Button = ({size, title, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.containerButtonDetail(size)}
      onPress={onPress}>
      <Text style={styles.containerSeeDetailText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  containerButtonDetail: size => [
    {
      marginTop: 12,
      backgroundColor: '#1B77DF',
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
  ],
  containerSeeDetailText: {
    color: '#FFFFFF',
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.5,
  },
});
