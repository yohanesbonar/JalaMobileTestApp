import {View, Toast, Icon, Spinner} from 'native-base';
import React, {useEffect, useState} from 'react';
import {FlatList, Text, StyleSheet, Image} from 'react-native';
import _ from 'lodash';
import CardItemPost from '../../../../components/molecules/CardItemPost';
import { getListNews } from '../../../../utils/network/News';

const NewsTab = ({navigation}) => {
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
      let response = await getListNews(limit, page);
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
      console.log('Error getListNews', error);
    }
  };

  const _renderItem = ({item, index}) => {
    return (
      <View>
        {index == 0 && (
          <Text style={styles.textNewestNews}>Kabar terbaru</Text>
        )}
        <CardItemPost
          image={item.image}
          title={item.title}
          desc={item.meta_description}
          data={item}
          date={item.updated_at}
          id={item.id}
          onPress={() => onPressNewsDetail(item)}
        />
      </View>
    );
  };

  const onPressNewsDetail = data => {
    let shareUrl = 'https://app.jala.tech/posts/' + data.id;
    let urlWebview = 'https://app.jala.tech/web_view/posts/' + data.id;
    navigation.navigate('GeneralWebview', {
      data: data,
      urlWebview: urlWebview,
      shareUrl: shareUrl,
      title: 'Kabar Udang',
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
export default NewsTab;

const styles = StyleSheet.create({
  textNewestNews: {
    color: '#004492',
    fontSize: 18,
    textAlign: 'left',
    marginTop: 10,
    fontFamily: 'Lato-Bold',
    lineHeight: 25,
    letterSpacing: 0.5,
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
