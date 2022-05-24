import {View, Toast, Icon, Spinner} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  TextInput,
} from 'react-native';
import {getListPrice, getListRegion} from '../../../../utils/network/Price';
import _ from 'lodash';
import CardItemPrice from '../../../../components/molecules/CardItemPrice';
import {Modalize} from 'react-native-modalize';
import {useDebouncedEffect} from '../../../../utils/common';
import ButtonPositiveNegative from '../../../../components/atoms/ButtonPositiveNegative';

const PriceTab = ({navigation}) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isEmptyData, setIsEmptyData] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [limit, setLimit] = useState(15);
  const [isFailed, setIsFailed] = useState(false);

  const [size, setSize] = useState(100);
  const [typeBS, setTypeBS] = useState('');

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [searchValueRegion, setSearchValueRegion] = useState('');
  const [listRegion, setListRegion] = useState([]);
  const [pageRegion, setPageRegion] = useState(1);
  const [isEmptyDataRegion, setIsEmptyDataRegion] = useState(false);
  const [isRefreshRegion, setIsRefreshRegion] = useState(false);
  const [isFetchingRegion, setIsFetchingRegion] = useState(false);
  const [limitRegion, setLimitRegion] = useState(15);
  const [isFailedRegion, setIsFailedRegion] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsFetching(true);
    setIsRefresh(false);
    setIsFailed(false);
    try {
      let response = await getListPrice(
        limit,
        page,
        selectedRegion != null ? selectedRegion.id : '',
      );
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
          <Text style={styles.textNewestPrice}>Harga terbaru</Text>
        )}
        <CardItemPrice
          data={item}
          supplierName={item.creator.name}
          verified={item.creator.buyer ? true : false}
          date={item.updated_at}
          avatarId={item.creator.avatar}
          regencyName={item.region.regency_name}
          provinceName={item.region.province_name}
          size={size}
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

  const onRefreshListPrice = () => {
    setData([]);
    setPage(1);
    setIsFetching(false);
    setIsEmptyData(false);
    setIsRefresh(true);
  };

  useDebouncedEffect(
    () => {
      console.log(' useDebouncedEffect valueSearch', searchValueRegion); // debounced 1sec
      onRefreshListPrice();
    },
    1000,
    [selectedRegion],
  );

  const renderButtonFilterAddress = () => {
    return (
      <View style={styles.mainContainerButtonFilterAddress}>
        <TouchableOpacity
          style={styles.containerButtonFilterSize}
          onPress={() => onPressFilterSize()}>
          <Image
            source={require('../../../../assets/images/ic-scale-white.png')}
            style={styles.iconScaleWhite}
            resizeMode="cover"
          />
          <View style={{marginLeft: 12}}>
            <Text style={styles.textDescSize}>Size</Text>
            <Text style={styles.textValueSize}>{size}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.containerButtonFilterAddress}
          onPress={() => onPressFilterRegion()}>
          <Image
            source={require('../../../../assets/images/ic-location-white.png')}
            style={styles.iconLocationWhite}
            resizeMode="contain"
          />
          <Text
            style={styles.textDescCountry}
            numberOfLines={1}
            ellipsizeMode="tail">
            {selectedRegion != null
              ? selectedRegion.full_name
              : 'Find Location'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  /////////////////////////     BOTTOMSHEET

  const modalizeRef = React.createRef(null);

  const openModalize = () => {
    modalizeRef.current?.open();
  };

  const closeModalize = () => {
    modalizeRef.current?.close();
  };

  const setValueSize = value => {
    closeModalize();
    setSize(value);
  };

  const renderBottomSheet = () => {
    return (
      <Modalize
        ref={modalizeRef}
        withOverlay={true}
        withHandle={true}
        handleStyle={{
          backgroundColor: 'transparent',
        }}
        overlayStyle={{
          backgroundColor: '#000000CC',
        }}
        adjustToContentHeight={true}
        HeaderComponent={
          <View>
            <View style={styles.containerHeaderBS}>
              <Text style={styles.textLeftHeaderBS}>
                {typeBS == 'BSFilterSize'
                  ? 'Size'
                  : typeBS == 'BSFilterRegion'
                  ? 'Kota/kabupaten'
                  : 'Filter'}
              </Text>
              <TouchableOpacity onPress={() => closeModalize()}>
                <Text style={styles.textRightHeaderBS}>
                  {typeBS == 'BSFilterSize' || typeBS == 'BSFilterRegion'
                    ? 'Tutup'
                    : 'Batal'}
                </Text>
              </TouchableOpacity>
            </View>
            {typeBS == 'BSFilterRegion' && (
              <View style={styles.containerOuterTextInput}>
                <View style={styles.containerInnerTextInput}>
                  <Image
                    source={require('../../../../assets/images/ic-search.png')}
                    style={styles.iconSearch}
                    resizeMode="cover"
                  />
                  <TextInput
                    style={styles.textinputStyle}
                    placeholder="Cari"
                    onChangeText={text => onChangeTextInput(text)}
                    value={searchValueRegion}
                  />
                </View>
                <TouchableOpacity
                  style={styles.containerTouchableButtonClose}
                  onPress={() => setSearchValueRegion('')}>
                  <Image
                    source={require('../../../../assets/images/ic-close.png')}
                    style={styles.iconClose}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </View>
            )}

            <View style={{backgroundColor: '#f1f5f9', height: 4}} />
          </View>
        }>
        <View>
          {typeBS == 'BSFilterSize'
            ? renderCompBSFilterSize()
            : typeBS == 'BSFilterRegion'
            ? renderCompBSFilterRegion()
            : renderCompBSFilterDate()}
        </View>
      </Modalize>
    );
  };

  /////////////////////////     FILTER-SIZE

  const onPressFilterSize = () => {
    openModalize();
    setTypeBS('BSFilterSize');
    // setTypeBS('BSFilterDate'); // -> open the comments and comments `setTypeBS('BSFilterSize');` if you want to show UI of the bottomsheet date filter
  };

  const renderCompBSFilterSize = () => {
    let array = [
      20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170,
      180, 190, 200,
    ];
    return (
      <ScrollView style={styles.containerScrollViewBSFilterSize}>
        {array.map((value, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{paddingVertical: 12}}
              onPress={() => setValueSize(value)}>
              <Text style={styles.textEachSize}>{value}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  /////////////////////////     FILTER-REGION

  const onPressFilterRegion = () => {
    openModalize();
    setTypeBS('BSFilterRegion');
    getDataListRegion();
  };

  const onSearch = () => {
    setListRegion([]);
    setPageRegion(1);
    setIsFetchingRegion(false);
    setIsEmptyDataRegion(false);
    setIsRefreshRegion(true);
  };

  const onChangeTextInput = text => {
    console.log('onchange', text);
    setSearchValueRegion(text);
  };

  useEffect(() => {
    if (isRefreshRegion == true) {
      setIsRefreshRegion(false);
      getDataListRegion();
    }
  }, [isRefreshRegion == true]);

  useDebouncedEffect(
    () => {
      console.log(' useDebouncedEffect searchValueRegion', searchValueRegion); // debounced 1sec
      onSearch(searchValueRegion);
    },
    1000,
    [searchValueRegion],
  );

  const getDataListRegion = async () => {
    setIsFetchingRegion(true);
    setIsRefreshRegion(false);
    setIsFailedRegion(false);
    try {
      let responseRegion = await getListRegion(
        limitRegion,
        pageRegion,
        searchValueRegion,
      );
      if (responseRegion.data) {
        let result = responseRegion.data;
        setIsEmptyDataRegion(_.isEmpty(result) ? true : false);
        setListRegion(result);
        setListRegion(pageRegion == 1 ? result : [...listRegion, ...result]);
        setPageRegion(pageRegion + 1);
        setIsFailedRegion(false);
        setIsFetchingRegion(false);
      } else {
        setIsFailedRegion(true);
        setIsFetchingRegion(false);
        Toast.show({
          title: 'Something went wrong!!',
          duration: 1500,
        });
      }
      console.log('responseRegion', responseRegion);
    } catch (error) {
      setIsFailedRegion(false);
      setIsFetchingRegion(false);
      Toast.show({
        title: 'Something went wrong!!' + error,
        duration: 1500,
      });
      console.log('error', error);
    }
  };

  const renderItemRegion = ({item, index}) => {
    let nameAddress = item.full_name + ', ' + item.country_name;
    return (
      <TouchableOpacity
        key={index}
        style={{paddingVertical: 12}}
        onPress={() => setDataRegion(item)}>
        <Text
          style={styles.textEachSizeRegion(
            item.id,
            selectedRegion != null ? selectedRegion.id : null,
          )}>
          {nameAddress}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleLoadMoreRegion = () => {
    if (isEmptyDataRegion == true || isFetchingRegion == true) {
      return;
    }
    getDataListRegion();
  };

  const _renderItemFooterRegion = () => (
    <View
      style={[
        styles.containerItemFooter(isFetchingRegion),
        {width: isFetchingRegion == true ? '100%' : null},
      ]}>
      {_renderItemFooterLoaderRegion()}
    </View>
  );

  const _renderItemFooterLoaderRegion = () => {
    if (isFailedRegion == true && pageRegion > 1) {
      return (
        <TouchableOpacity
          onPress={() => {
            handleLoadMoreRegion();
          }}>
          <Icon name="ios-sync" style={{fontSize: 42}} />
        </TouchableOpacity>
      );
    }

    if (isFetchingRegion == true) {
      return (
        <View style={{marginVertical: 16}}>
          <Spinner color="indigo.500" size={'lg'} />
        </View>
      );
    }
  };

  const renderCompBSFilterRegion = () => {
    return (
      <FlatList
        style={styles.containerFLBSFilterRegion}
        data={listRegion}
        renderItem={renderItemRegion}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.5}
        onEndReached={handleLoadMoreRegion}
        ListFooterComponent={_renderItemFooterRegion()}
      />
    );
  };

  const setDataRegion = item => {
    console.log('data region', item);
    if (selectedRegion == null || selectedRegion.id != item.id) {
      setSelectedRegion(item);
    } else {
      setSelectedRegion(null);
    }
    closeModalize();
  };

  /////////////////////////     FILTER-DATE - not used anywhere, just display

  const renderCompBSFilterDate = () => {
    return (
      <View style={{paddingHorizontal: 16, paddingTop: 10}}>
        <Text style={styles.textDateUntil}>Sampai Tanggal</Text>
        <TouchableOpacity style={styles.buttonDate}>
          <Text style={styles.textDateLeft}>14 Januari 2020</Text>
          <Image
            source={require('../../../../assets/images/ic-calendar.png')}
            style={styles.iconCalendar}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <View style={styles.containerButtons}>
          <ButtonPositiveNegative
            title={'Reset'}
            onPress={() => console.log('onPress Button Reset')}
            type={'negative'}
          />
          <View style={styles.emptyView} />
          <ButtonPositiveNegative
            title={'Terapkan'}
            onPress={() => console.log('onPress Button Terapkan')}
            type={'positive'}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {renderBottomSheet()}
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
  textNewestPrice: {
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
    width: 120,
  },
  bottomSheetHeader: {
    height: 4,
    borderRadius: 2,
    width: 40,
    marginTop: 8,
    backgroundColor: '#454F6329',
    alignSelf: 'center',
  },
  textLeftHeaderBS: {
    color: '#454646',
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  textRightHeaderBS: {
    color: '#1B77DF',
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  containerHeaderBS: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  containerScrollViewBSFilterSize: {
    paddingHorizontal: 16,
    flex: 1,
    maxHeight: Dimensions.get('screen').height - 210,
  },
  containerFLBSFilterRegion: {
    paddingHorizontal: 16,
    flex: 1,
    maxHeight: Dimensions.get('screen').height - 250,
  },
  textEachSizeRegion: (itemId, selectedId) => [
    {
      fontFamily:
        selectedId != null && selectedId == itemId
          ? 'Lato-Black'
          : 'Lato-Regular',
      color: '#454646',
      fontSize: 14,
      lineHeight: 20,
    },
  ],
  textEachSize: {
    fontFamily: 'Lato-Regular',
    color: '#454646',
    fontSize: 14,
    lineHeight: 20,
  },
  iconScaleWhite: {width: 16.49, height: 18, padding: 8},
  iconLocationWhite: {width: 12.52, height: 18, padding: 8},
  iconSearch: {
    width: 17.5,
    height: 17.5,
    marginLeft: 11,
    marginRight: 7.38,
    alignSelf: 'center',
  },
  iconClose: {
    width: 15,
    height: 15,
    marginLeft: 14.5,
  },
  textinputStyle: {
    paddingLeft: 4,
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: '#A09E9E',
    paddingVertical: 6,
    flex: 1,
  },
  containerOuterTextInput: {
    paddingHorizontal: 16,
    paddingBottom: 6,
    flexDirection: 'row',
  },
  containerInnerTextInput: {
    backgroundColor: '#F5F6F7',
    flexDirection: 'row',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 4,
    flex: 1,
  },
  containerTouchableButtonClose: {
    alignSelf: 'center',
  },
  textDateUntil: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'left',
    color: '#454646',
  },
  buttonDate: {
    marginTop: 4,
    flexDirection: 'row',
    paddingLeft: 8,
    paddingRight: 10,
    paddingVertical: 10,
    backgroundColor: '#F5F6F7',
    borderRadius: 5,
    justifyContent: 'space-between',
    borderColor: '#E5E5E5',
    borderWidth: 1,
  },
  textDateLeft: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'left',
    color: '#454646',
  },
  iconCalendar: {width: 18, height: 20, marginLeft: 7, alignSelf: 'center'},
  containerButtons: {marginTop: 24, marginBottom: 24, flexDirection: 'row'},

  emptyView: {paddingHorizontal: 8},
});
