import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

const CardItemBadgeVerif = ({verified}) => {
  return (
    <View style={styles.containerBadgeVerified(verified)}>
      {verified && (
        <Image
          source={require('../../../assets/images/ic-verify.png')}
          style={{width: 15, height: 15, marginRight: 5}}
        />
      )}

      <Text style={styles.textVerified(verified)}>
        {verified ? 'Terverifikasi' : 'Belum Terverifikasi'}
      </Text>
    </View>
  );
};

export default CardItemBadgeVerif;

const styles = StyleSheet.create({
  textVerified: verified => [
    {textAlign: 'right', color: verified ? '#575755' : '#575755'},
  ],
  containerBadgeVerified: verified => [
    {
      backgroundColor: verified ? '#fff8e7' : '#e5e5e5',
      paddingHorizontal: 8,
      paddingVertical: 5,
      borderRadius: 8,
      flexDirection: 'row',
    },
  ],
});
