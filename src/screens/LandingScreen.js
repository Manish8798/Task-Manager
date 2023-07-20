import React from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import {H, W, dimensions} from '../../util/Dimension';
import {Colors} from '../../util/Constant';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LandingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#EAF0FF', '#868BFE']} style={styles.gradient}>
        <View style={styles.topView}>
          <Image
            style={styles.image}
            source={require('../../assets/landing.png')}
          />
          <Text style={styles.headText}>Manage every Task</Text>
          <Text style={styles.subText}>
            Balance work, life and everything in between with Taskoo
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            alignSelf: 'baseline',
            alignSelf: 'center',
            padding: 12,
            marginTop: -H(2),
            borderRadius: H(5),
          }}>
          <View style={styles.roundBtn}>
            <Ionicons
              style={{alignSelf: 'center'}}
              name="arrow-forward-circle-outline"
              size={32}
              color={'white'}
              onPress={() => console.log('Manish')}
            />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
  image: {
    marginTop: H(10),
  },
  headText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.HeadText,
    marginTop: -H(8),
  },
  subText: {
    color: Colors.SubText,
    paddingHorizontal: W(20),
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: H(1),
  },
  topView: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomStartRadius: dimensions.width / 2,
    borderBottomEndRadius: dimensions.width / 2,
    width: '100%',
    paddingBottom: H(10),
  },
  gradient: {
    flex: 1,
    width: '100%',
  },
  roundBtn: {
    height: H(6),
    width: W(12),
    backgroundColor: 'red',
    alignSelf: 'center',
    borderRadius: H(6) / 2,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 5,
  },
});
export default LandingScreen;
