import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {
  formatDate,
  getMoney,
  uppercaseEachText,
} from '../../../utils/common';
import Button from '../../atoms/Button';
import CardItemBadgeVerif from '../../atoms/CardItemBadgeVerif';

const CardItemPrice = ({
  supplierName,
  verified,
  date,
  provinceName,
  regencyName,
  size,
  avatarId,
  data,
  onPressDetail,
}) => {
  return (
    <View style={styles.mainCardContainer}>
      <View style={styles.containerViewTop}>
        <Image
          source={{uri: 'https://app.jala.tech/storage/' + avatarId}}
          style={styles.avatarStyle}
          resizeMode="cover"
        />
        <View style={{marginHorizontal: 16, flex: 1}}>
          <Text style={styles.textSupplier}>Supplier</Text>
          <Text
            style={styles.textSupplierName}>
            {supplierName}
          </Text>
        </View>
        <View>
          <CardItemBadgeVerif verified={verified} />
        </View>
      </View>
      <Text style={styles.dateText}>{formatDate(date)}</Text>
      {provinceName != null && (
        <Text style={styles.textProvince}>
          {uppercaseEachText(provinceName)}
        </Text>
      )}

      {regencyName != null && (
        <Text style={styles.textRegency}>{uppercaseEachText(regencyName)}</Text>
      )}
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          {size != null && <Text style={styles.sizeText}>size {size}</Text>}
          {getMoney(data, size, 'IDR') != null ? (
            <Text style={styles.textMoneyIDR}>
              {getMoney(data, size, 'IDR')}
            </Text>
          ) : (
            <Text style={styles.textMoneyIDR}>-</Text>
          )}
        </View>
        <View style={{justifyContent: 'center'}}>
          <Button title={'LIHAT DETAIL'} onPress={onPressDetail} />
        </View>
      </View>
    </View>
  );
};

export default CardItemPrice;

const styles = StyleSheet.create({
  mainCardContainer: {
    marginTop: 16,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    flex: 1,
    marginHorizontal: 16,
  },
  textSupplier: {
    color: '#859ED1',
    fontSize: 12,
    fontFamily: 'Lato-Regular',
    lineHeight: 16,
    letterSpacing: 0.3,
  },
  textSupplierName: {
    color: '#454646',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Lato-Regular',
  },
  textVerified: verified => [
    {textAlign: 'right', color: verified ? '#575755' : '#575755'},
  ],
  avatarStyle: {width: 32, height: 32, borderRadius: 20, alignSelf: 'center'},
  dateText: {
    color: '#859ED1',
    fontSize: 12,
    fontFamily: 'Lato-Regular',
    lineHeight: 16,
    letterSpacing: 0.3,
  },
  containerViewTop: {flexDirection: 'row', flex: 1, marginBottom: 10},
  textProvince: {
    color: '#454646',
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.14,
    marginTop: 4,
  },
  textRegency: {
    color: '#454646',
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  sizeText: {
    color: '#859ED1',
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.3,
    marginTop: 4,
  },
  textMoneyIDR: {
    color: '#454646',
    fontSize: 22,
    fontFamily: 'Lato-Black',
    lineHeight: 28,
    letterSpacing: 1,
  },
  containerButtonDetail: {
    marginTop: 12,
    backgroundColor: '#1b77df',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  containerSeeDetailText: {color: '#FFF', fontSize: 16, fontWeight: '600'},
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
