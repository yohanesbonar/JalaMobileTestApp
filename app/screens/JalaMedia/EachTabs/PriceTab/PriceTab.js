import {View, Toast, Icon, Spinner} from 'native-base';
import React, {Fragment, useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {getListPrice} from '../../../../utils/network/Price';
import _ from 'lodash';
import CardItemPrice from '../../../../components/molecules/CardItemPrice';

const PriceTab = ({navigation}) => {
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
      let response = await getListPrice(limit, page);
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
      console.log('Error getListPrice', error);
    }
  };

  const goToDetail = item => {
    navigation.navigate('PriceDetail', {data: item});
  };
  const _renderItem = ({item, index}) => {
    return (
      <View>
        {index == 0 && (
          <Text style={styles.textHargaTerbaru}>Harga terbaru</Text>
        )}
        <CardItemPrice
          data={item}
          supplierName={item.creator.name}
          verified={item.creator.buyer ? true : false}
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
    setIsFetching(false);
    setIsEmptyData(false);
    setIsRefresh(true);
  };

  useEffect(() => {
    if (isRefresh == true) {
      setIsRefresh(false);
      getData();
    }
  }, [isRefresh == true]);

  const renderButtonFilterAddress = () => {
    return (
      <View style={styles.mainContainerButtonFilterAddress}>
        <TouchableOpacity style={styles.containerButtonFilterSize}>
          <Image
            source={require('../../../../assets/images/ic-scale-white.png')}
            style={{width: 24, height: 24, padding: 8}}
            resizeMode="cover"
          />
          <View style={{marginLeft: 12}}>
            <Text style={styles.textDescSize}>Size</Text>
            <Text style={styles.textValueSize}>100</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.containerButtonFilterAddress}>
          <Image
            source={require('../../../../assets/images/ic-location-white.png')}
            style={{width: 24, height: 24, padding: 8}}
            resizeMode="cover"
          />
          <Text style={styles.textDescCountry}>Indonesia</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
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
      {renderButtonFilterAddress()}
    </View>
  );
};
export default PriceTab;

const styles = StyleSheet.create({
  textHargaTerbaru: {
    color: '#004492',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Lato-Bold',
    lineHeight: 25,
    letterSpacing: 0.5,
    marginBottom: -8,
  },
  containerItemFooter: isFetching => [
    {
      justifyContent: isFetching ? null : 'center',
      alignItems: isFetching ? null : 'center',
    },
  ],
  mainContainerButtonFilterAddress: {
    position: 'absolute',
    bottom: 20,
    right: 32,
    left: 32,
    flexDirection: 'row',
    backgroundColor: '#FFF',
  },
  containerButtonFilterSize: {
    backgroundColor: '#004492',
    flex: 0.4,
    paddingVertical: 6,
    paddingLeft: 24,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerButtonFilterAddress: {
    backgroundColor: '#1B77DF',
    flex: 0.6,
    paddingVertical: 6,
    paddingLeft: 20,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textDescSize: {
    fontSize: 12,
    color: '#FFFFFF',
    lineHeight: 16,
    fontFamily: 'Lato-Regular',
  },
  textValueSize: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
    fontFamily: 'Lato-Bold',
    letterSpacing: 0.5,
  },
  textDescCountry: {
    color: '#FFF',
    textAlignVertical: 'center',
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
    marginLeft: 6,
  },
});
