import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {
  formatDate,
  formatIDR,
  getMoney,
  getSize,
  uppercaseEachText,
} from '../../../utils/common';
import Button from '../../atoms/Button';
import CardItemBadgeVerif from '../../atoms/CardItemBadgeVerif';

const CardItemHargaUdang = ({
  supplierName,
  verified,
  date,
  provinceName,
  regencyName,
  size,
  idr,
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
            // ellipsizeMode="tail"
            // numberOfLines={1}
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

export default CardItemHargaUdang;

const styles = StyleSheet.create({
  mainCardContainer: {
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderColor: '#ececec',
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
    color: '#a6b8de',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.14,
  },
  textSupplierName: {
    color: '#454646',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.14,
    fontWeight: '400',
  },
  textVerified: verified => [
    {textAlign: 'right', color: verified ? '#575755' : '#575755'},
  ],
  avatarStyle: {width: 38, height: 38, borderRadius: 20, alignSelf: 'center'},
  dateText: {
    color: '#a6b8de',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.14,
  },
  containerViewTop: {flexDirection: 'row', flex: 1, marginBottom: 10},
  textProvince: {
    color: '#454646',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.14,
    fontWeight: '400',
    marginTop: 4,
  },
  textRegency: {
    marginTop: 3,
    color: '#454646',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.14,
    fontWeight: '700',
  },
  sizeText: {
    color: '#a6b8de',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.14,
    marginTop: 6,
  },
  textMoneyIDR: {
    marginTop: 2,
    color: '#454646',
    fontSize: 20,
    lineHeight: 22,
    letterSpacing: 0.14,
    fontWeight: '700',
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
