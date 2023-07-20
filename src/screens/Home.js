import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import {H, W, dimensions} from '../../util/Dimension';
import {Colors} from '../../util/Constant';
import LinearGradient from 'react-native-linear-gradient';
import {Input, Button} from '@rneui/themed';

const Home = () => {
  const handleTouchablePress = () => {
    // Dismiss the keyboard when the user taps outside the TextInput
    Keyboard.dismiss();
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={handleTouchablePress}>
        <LinearGradient colors={['#868BFE', '#EAF0FF']} style={styles.gradient}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              padding: 20,
            }}>
            <Image source={require('../../assets/avatar.png')} />
            <Text style={styles.signupText}>Rohit Chu</Text>
          </View>
          <View style={styles.mainView}>
            <Button
              title={'CREATE'}
              buttonStyle={{
                backgroundColor: Colors.CreateButton,
                borderRadius: 20,
              }}
              titleStyle={{fontWeight: 'bold', fontSize: 24}}
              containerStyle={{
                height: 50,
                width: '75%',
                marginVertical: 25,
                alignSelf: 'center',
              }}
              onPress={() => console.log('create')}
            />
            <Image style={styles.image} source={require('../../assets/peep.png')} />
            <Text style={styles.fadeText}>Create a task to get started</Text>
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
  },
  mainView: {
    height: '85%',
    backgroundColor: 'white',
    bottom: 0,
    position: 'absolute',
    width: '100%',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  signupText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Poppins-Regular',
    paddingHorizontal: 10,
  },
  image: {
    alignSelf: 'center'
  },
  fadeText: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    alignSelf: 'center',
    textAlign: 'center',
    color: '#D9D9D9',
    fontFamily: 'Poppins-Regular',
  }
});

export default Home;
