import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from './src/screens/LandingScreen';
import SignupScreen from './src/screens/SignupScreen';
import Home from './src/screens/Home';
import {getAccessToken} from './util/Constant';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(null); // Use `null` instead of `false` for initial state

  useEffect(() => {
    checkSignInStatus();
  }, []);

  const checkSignInStatus = async () => {
    try {
      const accessToken = await getAccessToken();
      console.log(accessToken?.token, 'accessToken');
      setIsSignedIn(accessToken?.token ? true : false);
    } catch (error) {
      console.error('Error checking sign-in status:', error);
    }
  };

  // Display a loading screen until the sign-in status is checked
  if (isSignedIn === null) {
    // You can replace this with your custom loading screen component
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* Conditional rendering directly in the Stack.Navigator */}
        {!isSignedIn ? (
          <>
            <Stack.Screen name="LandingScreen" component={LandingScreen} />
            <Stack.Screen name="HomeScreen" component={Home} />
          </>
        ) : (
          <Stack.Screen name="HomeScreen" component={Home} />
        )}
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
      </Stack.Navigator>
      <Toast ref={ref => Toast?.setRef(ref)} />
    </NavigationContainer>
  );
};

export default App;
