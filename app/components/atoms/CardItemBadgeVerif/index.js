import React from 'react';
import {
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
          style={styles.iconVerify}
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
      paddingHorizontal: verified ? 8 : 4,
      paddingVertical: 3,
      borderRadius: 27.5,
      flexDirection: 'row',
    },
  ],
  iconVerify: {width: 16, height: 16, marginRight: 3, alignSelf: 'center'},
});
