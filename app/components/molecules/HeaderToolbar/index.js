import {ArrowBackIcon, ShareIcon} from 'native-base';
import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

const HeaderToolbar = ({
  title,
  onPressBack,
  leftTitle,
  titleButtonRight,
  onPressButtonRight,
  typeRightButton,
}) => {
  return (
    <SafeAreaView style={{backgroundColor: '#1B77DF', zIndex: 1}}>
      <View
        style={styles.containerLeftSide(
          onPressBack,
          leftTitle,
          titleButtonRight,
        )}>
        {onPressBack && (
          <TouchableOpacity onPress={onPressBack}>
            <ArrowBackIcon style={styles.containerArrowButtonBack} />
          </TouchableOpacity>
        )}

        <Text style={styles.containerTextTitle}>{title}</Text>
        {onPressButtonRight && (
          <TouchableOpacity
            onPress={onPressButtonRight}
            style={{right: 0, alignContent: 'flex-end'}}>
            {typeRightButton == 'share' ? (
              <Image
                source={require('../../../assets/images/ic-share-white.png')}
                resizeMode="contain"
                style={styles.containerButtonRight}
              />
            ) : (
              <Text style={styles.buttonRight}>{titleButtonRight}</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HeaderToolbar;

const styles = StyleSheet.create({
  containerArrowButtonBack: {
    height: 28,
    width: 28,
    color: '#FFF',
    marginRight: 20,
    marginLeft: 16,
    paddingVertical: 5,
  },
  containerTextTitle: {
    textAlign: 'left',
    paddingBottom: 10,
    paddingTop: 6,
    textAlignVertical: 'center',
    flex: 1,
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.15,
    color: '#FFFFFF',
  },
  buttonRight: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
    textAlign: 'center',
    paddingBottom: 10,
    paddingTop: 6,
    textAlignVertical: 'center',
  },
  containerLeftSide: (onPressBack, leftTitle, titleButtonRight) => [
    {
      alignItems: 'center',
      flexDirection: onPressBack || leftTitle ? 'row' : null,
      paddingBottom: 6,
      paddingHorizontal: leftTitle ? 16 : null,
      justifyContent: titleButtonRight ? 'space-between' : null,
    },
  ],
  containerButtonRight: {
    height: 19.92,
    width: 18,
    marginRight: 16,
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
});
