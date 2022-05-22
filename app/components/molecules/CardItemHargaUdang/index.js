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
          <View
            style={{backgroundColor: '#fff8e7', padding: 2, borderRadius: 8}}>
            <Text style={styles.textVerified(verified)}>
              {verified ? 'Terverifikasi' : 'Belum Terverifikasi'}
            </Text>
          </View>
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
      {size != null && <Text style={styles.sizeText}>size {size}</Text>}
      {getMoney(data, size, 'IDR') != null && (
        <Text style={styles.textMoneyIDR}>{getMoney(data, size, 'IDR')}</Text>
      )}
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
});
