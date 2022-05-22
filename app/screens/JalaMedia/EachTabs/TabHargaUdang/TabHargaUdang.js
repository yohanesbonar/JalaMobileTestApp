import {View} from 'native-base';
import React, {Fragment, useEffect, useState} from 'react';
import {FlatList, Text} from 'react-native';
import CardItemHargaUdang from '../../../../components/molecules/CardItemHargaUdang';
import {getHargaUdang} from '../../../../utils/network/HargaUdang';

const TabHargaUdang = () => {
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
      console.log('Error getHargaUdang', error);
    }
  };

  const _renderItem = ({item, index}) => {
    return (
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
      />
    );
  };

  return <FlatList data={data} renderItem={_renderItem} />;
};
export default TabHargaUdang;
