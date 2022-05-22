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
      backgroundColor: '#1b77df',
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: 8,
    },
  ],
  containerSeeDetailText: {color: '#FFF', fontSize: 16, fontWeight: '600'},
});
