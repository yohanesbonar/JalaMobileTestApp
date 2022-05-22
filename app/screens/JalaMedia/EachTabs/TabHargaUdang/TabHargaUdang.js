import {View, Toast, Icon, Spinner} from 'native-base';
import React, {Fragment, useEffect, useState} from 'react';
import {FlatList, Text, StyleSheet} from 'react-native';
import CardItemHargaUdang from '../../../../components/molecules/CardItemHargaUdang';
import {getHargaUdang} from '../../../../utils/network/HargaUdang';
import _ from 'lodash';

const TabHargaUdang = ({navigation}) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isEmptyData, setIsEmptyData] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [limit, setLimit] = useState(15);
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsFetching(true);
    setIsRefresh(false);
    setIsFailed(false);
    try {
      let response = await getHargaUdang(limit, page);
      console.log('response', response);
      let result = response.data;
      if (response) {
        setIsEmptyData(_.isEmpty(result) ? true : false);
        setData(page == 1 ? result : [...data, ...result]);
        setPage(page + 1);
        setIsFailed(false);
        setIsFetching(false);
      } else {
        setIsFailed(true);
        setIsFetching(false);
        Toast.show({
          title: 'Something went wrong!!',
          duration: 1500,
        });
      }
    } catch (error) {
      setIsFailed(true);
      setIsFetching(false);
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

  const handleLoadMore = () => {
    if (isEmptyData == true || isFetching == true) {
      return;
    }
    getData();
  };

  const _renderItemFooter = () => (
    <View
      style={[
        styles.containerItemFooter(isFetching),
        {width: isFetching == true ? '100%' : null},
      ]}>
      {_renderItemFooterLoader()}
    </View>
  );

  const _renderItemFooterLoader = () => {
    if (isFailed == true && page > 1) {
      return (
        <TouchableOpacity
          onPress={() => {
            handleLoadMore();
          }}>
          <Icon name="ios-sync" style={{fontSize: 42}} />
        </TouchableOpacity>
      );
    }

    if (isFetching == true) {
      return (
        <View style={{marginVertical: 16}}>
          <Spinner color="indigo.500" size={'lg'} />
        </View>
      );
    }
  };

  const onRefreshData = () => {
    setData([]);
    setPage(1);
    setIsFetching(true);
    setIsEmptyData(false);
    setIsRefresh(true);
  }

  useEffect(() => {
    if (isRefresh == true) {
      setIsRefresh(false);
      getData();
    }
  }, [isRefresh == true]);

  return (
    <FlatList
      data={data}
      renderItem={_renderItem}
      keyExtractor={(item, index) => index.toString()}
      onEndReachedThreshold={0.5}
      onEndReached={handleLoadMore}
      ListFooterComponent={_renderItemFooter()}
      onRefresh={() => onRefreshData()}
      refreshing={false}
    />
  );
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
  containerItemFooter: isFetching => [
    {
      justifyContent: isFetching ? null : 'center',
      alignItems: isFetching ? null : 'center',
    },
  ],
});
