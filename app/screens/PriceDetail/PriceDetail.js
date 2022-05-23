import {NativeBaseProvider, ScrollView} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, View, Modal, Text, Image} from 'react-native';
import Button from '../../components/atoms/Button';
import CardItemBadgeVerif from '../../components/atoms/CardItemBadgeVerif';
import HeaderToolbar from '../../components/molecules/HeaderToolbar';
import {
  formatDate,
  getMoney,
  phoneCallWihtNumber,
  shareLink,
  uppercaseEachText,
} from '../../utils/common';

const PriceDetail = ({route, navigation}) => {
  console.log('route.params.data', route.params.data);
  let data = route.params.data;

  const onPressHubungi = number => {
    phoneCallWihtNumber(number);
  };

  const onPressButtonRight = () => {
    let url = 'https://app.jala.tech/shrimp_prices/' + data.id;
    shareLink(url);
  };

  const renderDaftarHarga = () => {
    return (
      <View>
        <Text style={styles.textDaftarHarga}>Daftar Harga</Text>
        <View style={styles.eachPrice}>
          <Text style={styles.textSize}>Size 20</Text>
          <Text style={styles.textMoney}>
            {data.size_20 ? getMoney(data, 20, 'Rp') : '-'}
          </Text>
        </View>
        <View style={styles.eachPrice}>
          <Text style={styles.textSize}>Size 30</Text>
          <Text style={styles.textMoney}>
            {data.size_30 ? getMoney(data, 30, 'Rp') : '-'}
          </Text>
        </View>
        <View style={styles.eachPrice}>
          <Text style={styles.textSize}>Size 40</Text>
          <Text style={styles.textMoney}>
            {data.size_40 ? getMoney(data, 40, 'Rp') : '-'}
          </Text>
        </View>
        <View style={styles.eachPrice}>
          <Text style={styles.textSize}>Size 50</Text>
          <Text style={styles.textMoney}>
            {data.size_50 ? getMoney(data, 50, 'Rp') : '-'}
          </Text>
        </View>
        <View style={styles.eachPrice}>
          <Text style={styles.textSize}>Size 60</Text>
          <Text style={styles.textMoney}>
            {data.size_60 ? getMoney(data, 60, 'Rp') : '-'}
          </Text>
        </View>
        <View style={styles.eachPrice}>
          <Text style={styles.textSize}>Size 70</Text>
          <Text style={styles.textMoney}>
            {data.size_70 ? getMoney(data, 70, 'Rp') : '-'}
          </Text>
        </View>
        <View style={styles.eachPrice}>
          <Text style={styles.textSize}>Size 80</Text>
          <Text style={styles.textMoney}>
            {data.size_80 ? getMoney(data, 80, 'Rp') : '-'}
          </Text>
        </View>
        <View style={styles.eachPrice}>
          <Text style={styles.textSize}>Size 90</Text>
          <Text style={styles.textMoney}>
            {data.size_90 ? getMoney(data, 90, 'Rp') : '-'}
          </Text>
        </View>
        <View style={styles.eachPrice}>
          <Text style={styles.textSize}>Size 100</Text>
          <Text style={styles.textMoney}>
            {data.size_100 ? getMoney(data, 100, 'Rp') : '-'}
          </Text>
        </View>
        <View style={styles.eachPrice}>
          <Text style={styles.textSize}>Size 120</Text>
          <Text style={styles.textMoney}>
            {data.size_120 ? getMoney(data, 120, 'Rp') : '-'}
          </Text>
        </View>
        <View style={styles.eachPrice}>
          <Text style={styles.textSize}>Size 130</Text>
          <Text style={styles.textMoney}>
            {data.size_130 ? getMoney(data, 130, 'Rp') : '-'}
          </Text>
        </View>
        <View style={styles.eachPrice}>
          <Text style={styles.textSize}>Size 140</Text>
          <Text style={styles.textMoney}>
            {data.size_140 ? getMoney(data, 140, 'Rp') : '-'}
          </Text>
        </View>
        <View style={styles.eachPrice}>
          <Text style={styles.textSize}>Size 150</Text>
          <Text style={styles.textMoney}>
            {data.size_150 ? getMoney(data, 150, 'Rp') : '-'}
          </Text>
        </View>
        <View style={styles.eachPrice}>
          <Text style={styles.textSize}>Size 160</Text>
          <Text style={styles.textMoney}>
            {data.size_160 ? getMoney(data, 160, 'Rp') : '-'}
          </Text>
        </View>
        <View style={styles.eachPrice}>
          <Text style={styles.textSize}>Size 170</Text>
          <Text style={styles.textMoney}>
            {data.size_170 ? getMoney(data, 170, 'Rp') : '-'}
          </Text>
        </View>
        <View style={styles.eachPrice}>
          <Text style={styles.textSize}>Size 180</Text>
          <Text style={styles.textMoney}>
            {data.size_180 ? getMoney(data, 180, 'Rp') : '-'}
          </Text>
        </View>
        <View style={styles.eachPrice}>
          <Text style={styles.textSize}>Size 190</Text>
          <Text style={styles.textMoney}>
            {data.size_190 ? getMoney(data, 190, 'Rp') : '-'}
          </Text>
        </View>
        <View style={styles.eachPrice}>
          <Text style={styles.textSize}>Size 200</Text>
          <Text style={styles.textMoney}>
            {data.size_200 ? getMoney(data, 200, 'Rp') : '-'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <NativeBaseProvider>
      <HeaderToolbar
        title={'Harga Udang'}
        onPressBack={() => navigation.goBack()}
        typeRightButton={'share'}
        onPressButtonRight={() => onPressButtonRight()}
      />
      <ScrollView style={{backgroundColor: '#FFF'}}>
        <View style={{padding: 16, backgroundColor: '#FFF'}}>
          {data.region.province_name != null && (
            <Text style={styles.textProvince}>
              {uppercaseEachText(data.region.province_name)}
            </Text>
          )}

          {data.region.regency_name != null && (
            <Text style={styles.textRegency}>
              {uppercaseEachText(data.region.regency_name)}
            </Text>
          )}
        </View>
        <View style={{backgroundColor: '#f1f5f9', height: 4}} />
        <View style={{padding: 16}}>
          <View style={styles.containerDateAndBadgeVerif}>
            <Text style={styles.dateText}>{formatDate(data.updated_at)}</Text>
            <CardItemBadgeVerif verified={data.creator.buyer} />
          </View>
          <View style={styles.containerImageAndNameSupplier}>
            <Image
              source={{
                uri: 'https://app.jala.tech/storage/' + data.creator.avatar,
              }}
              style={styles.avatarStyle}
              resizeMode="cover"
            />
            <View style={{marginHorizontal: 16, flex: 1}}>
              <Text style={styles.textSupplier}>Supplier</Text>
              <Text style={styles.textSupplierName}>{data.creator.name}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={styles.textKontak}>Kontak</Text>
              <Text style={styles.textNoHP}>{data.creator.phone}</Text>
            </View>
            <View style={styles.containerButtonHubungi}>
              <Button
                title={'Hubungi'}
                onPress={() => onPressHubungi(data.creator.phone)}
              />
            </View>
          </View>
          {renderDaftarHarga()}
          <View style={styles.containerNotes}>
            <Text style={styles.textTitleNotes}>Catatan</Text>
            <Text style={styles.textNotes}>{data.remark ? data.remark : '-'}</Text>
          </View>
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default PriceDetail;

const styles = StyleSheet.create({
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
  dateText: {
    color: '#737373',
    fontSize: 14,
    fontFamily: 'Lato-Regular',
    lineHeight: 20,
  },
  containerDateAndBadgeVerif: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarStyle: {width: 32, height: 32, borderRadius: 20, alignSelf: 'center'},
  containerImageAndNameSupplier: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 10,
  },
  textSupplier: {
    color: '#A09E9E',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.3,
    fontFamily: 'Lato-Regular',
  },
  textSupplierName: {
    color: '#454646',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.5,
    fontFamily: 'Lato-Bold',
  },
  textKontak: {
    color: '#A09E9E',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Lato-Regular',
    marginTop: 10,
  },
  textNoHP: {
    color: '#454646',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
    fontFamily: 'Lato-Bold',
    marginTop: 4,
  },
  textDaftarHarga: {
    color: '#363637',
    marginTop: 10,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
    fontFamily: 'Lato-Bold',
  },
  textSize: {
    color: '#363637',
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Lato-Regular",
    marginRight: 6,
    width: 80,
  },
  textMoney: {
    color: '#363637',
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Lato-Regular",
  },
  eachPrice: {flexDirection: 'row', marginTop: 10},
  containerNotes: {marginTop: 10, marginBottom: 60},
  textTitleNotes: {
    color: '#454646',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
    marginTop: 18,
    fontFamily: "Lato-Bold",
    marginBottom: 4,
  },
  containerButtonHubungi: {justifyContent: 'center', marginTop: 4},
  textNotes: {
    color: '#454646',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Lato-Regular",
  },
});
