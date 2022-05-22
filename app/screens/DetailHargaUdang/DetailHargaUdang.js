import {NativeBaseProvider, ScrollView} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, View, Modal, Text, Image} from 'react-native';
import Button from '../../components/atoms/Button';
import CardItemBadgeVerif from '../../components/atoms/CardItemBadgeVerif';
import HeaderToolbar from '../../components/molecules/HeaderToolbar';
import {
  formatDate,
  phoneCallWihtNumber,
  shareLink,
  uppercaseEachText,
} from '../../utils/common';

const DetailHargaUdang = ({route, navigation}) => {
  console.log('route.params.data', route.params.data);
  let data = route.params.data;

  const onPressHubungi = number => {
    phoneCallWihtNumber(number);
  };

  const onPressButtonRight = () => {
    let url = 'https://app.jala.tech/shrimp_prices/' + data.id;
    shareLink(url);
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
            <CardItemBadgeVerif verified={data.creator.email_verified} />
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
              <Text style={styles.textSupplierName}>
                {data.creator.email_verified
                  ? data.creator.name
                  : data.creator.buyer}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={styles.textKontak}>Kontak</Text>
              <Text style={styles.textNoHP}>{data.creator.phone}</Text>
            </View>
            <View>
              <Button
                title={'Hubungi'}
                onPress={() => onPressHubungi(data.creator.phone)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default DetailHargaUdang;

const styles = StyleSheet.create({
  textProvince: {
    color: '#000',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0.14,
    fontWeight: '400',
    marginTop: 4,
    fontWeight: '500',
  },
  textRegency: {
    marginTop: 3,
    color: '#454646',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.14,
    fontWeight: '600',
  },
  dateText: {
    color: '#737373',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.14,
  },
  containerDateAndBadgeVerif: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarStyle: {width: 38, height: 38, borderRadius: 20, alignSelf: 'center'},
  containerImageAndNameSupplier: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 10,
  },
  textSupplier: {
    color: '#b5b4b4',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.14,
  },
  textSupplierName: {
    color: '#454646',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.14,
    fontWeight: '600',
  },
  textKontak: {
    color: '#b5b4b4',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.14,
    marginTop: 10,
  },
  textNoHP: {
    color: '#454646',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.14,
    fontWeight: '600',
  },
});
