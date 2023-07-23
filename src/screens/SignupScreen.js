import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {H, W, dimensions} from '../../util/Dimension';
import {Colors, getAccessToken, storeAccessToken} from '../../util/Constant';
import LinearGradient from 'react-native-linear-gradient';
import {Input, Button} from '@rneui/themed';
import axios from 'axios';

const SignupScreen = props => {
  const [text, setText] = React.useState({
    phone: '',
    otp: '',
    name: '',
  });
  const [isPressOTP, setIsPressOTP] = React.useState(1);

  const handleTouchablePress = () => {
    // Dismiss the keyboard when the user taps outside the TextInput
    Keyboard.dismiss();
  };

  const handleTextChange = (inputText, type) => {
    setText({
      phone: type == 'phone' ? inputText : text.phone,
      otp: type == 'otp' ? inputText : text.otp,
      name: type == 'name' ? inputText : text.name,
    });
  };

  const highlightedText = () => (
    <Text style={[styles.descText, {color: Colors.HeadText}]}>
      Terms and Conditions
    </Text>
  );

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'http://13.126.244.224/api/verification',
        {
          params: {
            phone: `+91${text.phone}`,
            signature: 'xyz',
          },
        },
      );

      // Process the response data here
      console.log('Response data:', response.data);
      if (response.data.code == '200') {
        setIsPressOTP(state => state + 1);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error:', error);
    }
  };

  const postData = async () => {
    try {
      const response = await axios.post(
        'http://13.126.244.224/api/verification',
        {
          phone: `+91${text.phone}`,
          code: 1567,
        },
      );

      // Process the response data here
      console.log('Response data:', response?.data);
      if (response?.data?.code == '200') {
        setIsPressOTP(state => state + 1);
        const data = {
          phone: text.phone,
          token: response?.data?.data?.token,
        };
        const jsonString = JSON.stringify(data);
        storeAccessToken(jsonString);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error:', error);
    }
  };

  const makePostRequest = async () => {
    try {
      const accessToken = await getAccessToken();

      const url = 'http://13.126.244.224/api/user';
      const data = {
        phone: `+91${text.phone}`,
        name: text?.name,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken?.token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post(url, data, config);
      props.navigation.navigate('HomeScreen');
      console.log('Response data:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onPressOTP = () => {
    console.log('onPressOTP', isPressOTP);
    switch (isPressOTP) {
      case 1:
        fetchData();
        break;
      case 2:
        postData();
        break;
      case 3:
        makePostRequest();
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={handleTouchablePress}>
        <LinearGradient colors={['#868BFE', '#EAF0FF']} style={styles.gradient}>
          <Text style={styles.signupText}>Sign UP</Text>
          <View style={styles.bottomView}>
            <View style={styles.triangle}></View>
            <View style={styles.squareView}>
              <Input
                containerStyle={styles.inputContainer}
                style={styles.input}
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
                value={
                  isPressOTP == 1
                    ? text.phone
                    : isPressOTP == 2
                    ? text.otp
                    : text.name
                }
                onChangeText={text =>
                  handleTextChange(
                    text,
                    isPressOTP == 1
                      ? 'phone'
                      : isPressOTP == 2
                      ? 'otp'
                      : 'name',
                  )
                }
                label={
                  isPressOTP == 1
                    ? 'Phone'
                    : isPressOTP == 2
                    ? 'OTP'
                    : 'What is your name?'
                }
                labelStyle={styles.headText}
              />
              <Button
                title={
                  isPressOTP == 1
                    ? 'Get OTP'
                    : isPressOTP == 2
                    ? 'Verify'
                    : "Let's Go"
                }
                buttonStyle={{
                  backgroundColor: Colors.ButtonColor,
                  borderRadius: 20,
                }}
                titleStyle={{fontWeight: 'bold', fontSize: 24}}
                containerStyle={{
                  height: 50,
                  width: '90%',
                  marginVertical: 1,
                }}
                onPress={() => onPressOTP()}
              />
              <Text style={styles.descText}>
                By signing up you agree to the {highlightedText()} of Taskoo
              </Text>
            </View>
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
  bottomView: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: '100%',
    height: '85%',
    bottom: 0,
  },
  triangle: {
    width: '100%',
    // height: '20%',
    backgroundColor: 'transparent',
    // borderStyle: 'solid',
    borderTopWidth: dimensions.height / 4,
    borderRightWidth: dimensions.width,
    borderTopColor: 'transparent',
    borderRightColor: 'white',
  },
  squareView: {
    backgroundColor: 'white',
    height: '100%',
    padding: 40,
    alignItems: 'center',
  },
  headText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.HeadText,
    paddingBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    paddingVertical: 10,
    alignSelf: 'center',
    backgroundColor: '#EAF0FF',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  inputContainer: {},
  inputStyle: {},
  inputContainerStyle: {
    borderColor: 'transparent',
  },
  descText: {
    color: Colors.DescTextColor,
    padding: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  signupText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    top: '10%',
    paddingHorizontal: 25,
    fontFamily: 'Poppins-Regular',
  },
});

export default SignupScreen;
