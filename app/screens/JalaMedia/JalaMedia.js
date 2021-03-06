import {NativeBaseProvider} from 'native-base';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Dimensions,
  TouchableOpacity,
  Text,
  BackHandler,
} from 'react-native';
import HeaderToolbar from '../../components/molecules/HeaderToolbar';
import PriceTab from './EachTabs/PriceTab/PriceTab';
import NewsTab from './EachTabs/NewsTab/NewsTab';
import DiseaseTab from './EachTabs/DiseaseTab/DiseaseTab';

const JalaMedia = ({navigation}) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  const handleBackButton = () => {
    BackHandler.exitApp();
  };

  return (
    <NativeBaseProvider>
      <HeaderToolbar
        title={'Jala Media'}
        onPressBack={() => handleBackButton()}
      />
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
    height: 52,
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
      color: isActive ? '#1B77DF' : '#737373',
      marginTop: 6,
      fontFamily: 'Lato-Bold',
      lineHeight: 20,
      letterSpacing: 0.5,
    },
  ],
});
