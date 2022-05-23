import {NativeBaseProvider} from 'native-base';
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import HeaderToolbar from '../../components/molecules/HeaderToolbar';
import PriceTab from './EachTabs/PriceTab/PriceTab';
import NewsTab from './EachTabs/NewsTab/NewsTab';
import DiseaseTab from './EachTabs/DiseaseTab/DiseaseTab';

const JalaMedia = ({navigation}) => {
  return (
    <NativeBaseProvider>
      <HeaderToolbar title={'Jala Media'} onPressBack={() => console.log()} />
      <TabsCustom
        tabs={[
          {
            title: 'Harga Udang',
            component: true ? <PriceTab navigation={navigation} /> : null,
          },
          {
            title: 'Kabar Udang',
            component: true ? <NewsTab navigation={navigation} /> : null,
          },
          {
            title: 'Penyakit',
            component: true ? <DiseaseTab navigation={navigation} /> : null,
          },
        ]}
      />
    </NativeBaseProvider>
  );
};

export default JalaMedia;

const TabsCustom = ({tabs}) => {
  const [active, setActive] = useState(0);
  return (
    <View style={styles.mainViewTabsCustom}>
      <View style={styles.containerMapTabs}>
        {tabs.map((dt, i) => {
          let isActive = active == i;
          return (
            <TouchableOpacity
              onPress={() => {
                setActive(i);
              }}
              key={i}
              activeOpacity={0.99}
              style={styles.containerHeaderEachTabs(isActive)}>
              <View style={styles.containerTitleEachTabs(tabs)}>
                <Text style={styles.textTitleEachTabs(isActive)}>
                  {dt?.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.containerViewTabsComponent} />
      {tabs[active]?.component}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#f4faf8',
    flex: 1,
    paddingBottom: 20,
  },
  mainViewTabsCustom: {flex: 1, backgroundColor: '#FFF'},
  containerMapTabs: {
    flexDirection: 'row',
    height: 64,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  containerViewTabsComponent: {
    height: 1,
    width: '100%',
    borderColor: '#0000001F',
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  containerHeaderEachTabs: isActive => [
    {
      flex: 1,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 5,
      borderBottomColor: 'transparent',
    },
    isActive
      ? {
          borderBottomColor: '#1b77df',
        }
      : {borderBottomColor: '#f6f6f6'},
  ],
  containerTitleEachTabs: tabs => [
    {
      width: Dimensions.get('window').width / tabs?.length,
      alignItems: 'center',
      flexDirection: 'column',
    },
  ],
  textTitleEachTabs: isActive => [
    {
      fontSize: 14,
      color: isActive ? '#1e79df' : '#7e7e7e',
      marginTop: 6,
      fontWeight: isActive ? '800' : '600',
    },
  ],
});
