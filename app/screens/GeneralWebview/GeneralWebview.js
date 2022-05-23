import {NativeBaseProvider} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import HeaderToolbar from '../../components/molecules/HeaderToolbar';
import {shareLink} from '../../utils/common';
import {WebView} from 'react-native-webview';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const GeneralWebview = ({route, navigation}) => {
  let params = route.params;
  const [isShowLoader, setIsShowLoader] = useState(false);

  const onPressButtonRight = () => {
    let url = params.shareUrl;
    shareLink(url);
  };

  return (
    <NativeBaseProvider>
      <HeaderToolbar
        title={params.title}
        onPressBack={() => navigation.goBack()}
        typeRightButton={'share'}
        onPressButtonRight={() => onPressButtonRight()}
      />
      <WebView
        showsVerticalScrollIndicator={false}
        javaScriptEnabled={true}
        onMessage={event => console.log('Received: ', event.nativeEvent.data)}
        source={{uri: params.urlWebview}}
        style={{
          flex: 1,
          flexDirection: 'column',
          width: wp('100%'),
          backgroundColor: '#F3F3F3',
        }}
      />
    </NativeBaseProvider>
  );
};

export default GeneralWebview;

const styles = StyleSheet.create({});
