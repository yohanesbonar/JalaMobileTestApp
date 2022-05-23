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
        {verified ? 'Terverifikasi' : 'belum terverifikasi'}
      </Text>
    </View>
  );
};

export default CardItemBadgeVerif;

const styles = StyleSheet.create({
  textVerified: verified => [
    {textAlign: 'right', color: verified ? '#454646' : '#454646'},
  ],
  containerBadgeVerified: verified => [
    {
      backgroundColor: verified ? '#FFF8E7' : '#E5E5E5',
      paddingHorizontal: 6,
      paddingVertical: 5,
      borderRadius: 27.5,
      flexDirection: 'row',
    },
  ],
});
