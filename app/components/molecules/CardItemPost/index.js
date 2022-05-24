import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import {formatDate, shareLink} from '../../../utils/common';

const CardItemPost = ({image, title, desc, data, date, id, onPress}) => {
  const onPressButtonShare = () => {
    let url = 'https://app.jala.tech/posts/' + id;
    shareLink(url);
  };
  return (
    <TouchableOpacity style={styles.mainCardContainer} onPress={onPress}>
      <Image
        source={{uri: 'https://app.jala.tech/storage/' + image}}
        resizeMode="cover"
        style={styles.containerImageCard}
      />
      <View style={styles.containerBottomImage}>
        <Text style={styles.textTitle}>{title}</Text>
        <Text style={styles.textDesc}>{desc}</Text>
        <View style={styles.containerDateAndShare}>
          <Text style={styles.textDate}>{formatDate(date)}</Text>
          <TouchableOpacity onPress={() => onPressButtonShare()}>
            <Image
              source={require('../../../assets/images/ic-share.png')}
              resizeMode="contain"
              style={styles.shareIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardItemPost;

const styles = StyleSheet.create({
  mainCardContainer: {
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    flex: 1,
    marginHorizontal: 16,
  },
  containerImageCard: {
    width: Dimensions.get('window').width - 32,
    height: 160,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  textTitle: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.7,
    fontFamily: 'Lato-Black',
    marginBottom: 6,
    color: '#454646',
  },
  textDesc: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Lato-Regular',
    color: '#737373',
  },
  textDate: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Lato-Regular',
    color: '#737373',
  },
  shareIcon: {height: 19.92, width: 18},
  containerDateAndShare: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerBottomImage: {padding: 16},
});
