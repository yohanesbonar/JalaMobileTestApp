import {ArrowBackIcon, ShareIcon} from 'native-base';
import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
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
    <SafeAreaView style={{backgroundColor: '#1b77df', zIndex: 1}}>
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
              <ShareIcon style={styles.containerButtonRight} />
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
    fontSize: 20,
    color: '#FFF',
    fontWeight: '600',
    textAlign: 'left',
    paddingBottom: 10,
    paddingTop: 6,
    textAlignVertical: 'center',
    flex: 1,
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
    height: 28,
    width: 28,
    color: '#FFF',
    marginRight: 16,
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
});
