import {ShareIcon} from 'native-base';
import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import {formatDate, shareLink} from '../../../utils/common';

const CardItemKabarUdang = ({image, title, desc, data, date, id}) => {
  const onPressButtonShare = () => {
    let url = 'https://app.jala.tech/posts/' + id;
    shareLink(url);
  };
  return (
    <View style={styles.mainCardContainer}>
      <Image
        source={{uri: 'https://app.jala.tech/storage/' + image}}
        resizeMode="cover"
        style={styles.containerImageCard}
      />
      <View style={{padding: 16}}>
        <Text style={styles.textTitle}>{title}</Text>
        <Text style={styles.textDesc}>{desc}</Text>
        <View style={styles.containerDateAndShare}>
          <Text style={styles.textDate}>{formatDate(date)}</Text>
          <TouchableOpacity onPress={() => onPressButtonShare()}>
            <ShareIcon style={styles.shareIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CardItemKabarUdang;

const styles = StyleSheet.create({
  mainCardContainer: {
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderColor: '#ececec',
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
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#454646',
  },
  textDesc: {
    fontSize: 14,
    color: '#767676',
  },
  textDate: {
    fontSize: 14,
    color: '#767676',
  },
  shareIcon: {height: 28, width: 28, color: '#000'},
  containerDateAndShare: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
