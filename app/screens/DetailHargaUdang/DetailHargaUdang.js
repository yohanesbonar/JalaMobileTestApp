import {NativeBaseProvider} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, View, Modal} from 'react-native';
import HeaderToolbar from '../../components/molecules/HeaderToolbar';

const DetailHargaUdang = ({navigation}) => {
  return (
    <NativeBaseProvider>
      <HeaderToolbar
        title={'Harga Udang'}
        onPressBack={() => navigation.goBack()}
      />
    </NativeBaseProvider>
  );
};

export default DetailHargaUdang;

const styles = StyleSheet.create({});
