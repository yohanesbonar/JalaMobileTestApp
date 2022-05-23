import {View, Toast, Icon, Spinner} from 'native-base';
import React, {useEffect, useState} from 'react';
import {FlatList, Text, StyleSheet} from 'react-native';
import {getListDisease} from '../../../../utils/network/Disease';
import _ from 'lodash';
import CardItemPost from '../../../../components/molecules/CardItemPost';

const DiseaseTab = ({navigation}) => {
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
      let response = await getListDisease(limit, page);
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
      console.log('Error getListDisease', error);
    }
  };

  const _renderItem = ({item, index}) => {
    return (
      <View>
        {index == 0 && (
          <Text style={styles.textPenyakitTerbaru}>Penyakit terbaru</Text>
        )}
        <CardItemPost
          image={item.image}
          title={item.full_name}
          desc={item.meta_description}
          data={item}
          date={item.updated_at}
          id={item.id}
          onPress={() => onPressDetailKabarUdang(item)}
        />
      </View>
    );
  };

  const onPressDetailKabarUdang = data => {
    let shareUrl = 'https://app.jala.tech/diseases/' + data.id;
    let urlWebview = 'https://app.jala.tech/web_view/diseases/' + data.id;
    navigation.navigate('GeneralWebview', {
      data: data,
      urlWebview: urlWebview,
      shareUrl: shareUrl,
      title: 'Info Penyakit',
    });
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
export default DiseaseTab;

const styles = StyleSheet.create({
  textPenyakitTerbaru: {
    color: '#1971d4',
    fontSize: 18,
    textAlign: 'left',
    marginTop: 10,
    fontWeight: '600',
    marginBottom: -8,
    marginHorizontal: 16,
  },
  containerItemFooter: isFetching => [
    {
      justifyContent: isFetching ? null : 'center',
      alignItems: isFetching ? null : 'center',
    },
  ],
});