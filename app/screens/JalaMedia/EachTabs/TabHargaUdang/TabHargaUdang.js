import {View, Toast} from 'native-base';
import React, {Fragment, useEffect, useState} from 'react';
import {FlatList, Text, StyleSheet} from 'react-native';
import CardItemHargaUdang from '../../../../components/molecules/CardItemHargaUdang';
import {getHargaUdang} from '../../../../utils/network/HargaUdang';

const TabHargaUdang = ({navigation}) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let limit = 15;

    try {
      let response = await getHargaUdang(limit, page);
      console.log('response', response);
      if (response.data) {
        setData(response.data);
      }
    } catch (error) {
      Toast.show({
        title: 'Something went wrong!!' + error,
        duration: 1500,
      });
      console.log('Error getHargaUdang', error);
    }
  };

  const goToDetail = item => {
    navigation.navigate('DetailHargaUdang', {data: item});
  };
  const _renderItem = ({item, index}) => {
    return (
      <View>
        {index == 0 && (
          <Text style={styles.textHargaTerbaru}>Harga terbaru</Text>
        )}
        <CardItemHargaUdang
          data={item}
          supplierName={
            item.creator.email_verified ? item.creator.name : item.creator.buyer
          }
          verified={item.creator.email_verified ? true : false}
          date={item.updated_at}
          avatarId={item.creator.avatar}
          regencyName={item.region.regency_name}
          provinceName={item.region.province_name}
          size={50}
          onPressDetail={() => goToDetail(item)}
        />
      </View>
    );
  };

  return <FlatList data={data} renderItem={_renderItem} />;
};
export default TabHargaUdang;

const styles = StyleSheet.create({
  textHargaTerbaru: {
    color: '#1971d4',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '600',
    marginBottom: -8,
  },
});
