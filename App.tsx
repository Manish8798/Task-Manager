import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from './src/screens/LandingScreen';
import SignupScreen from './src/screens/SignupScreen';
import Home from './src/screens/Home';
import {getAccessToken} from './util/Constant';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSignInStatus();
  }, []);

  const checkSignInStatus = async () => {
    try {
      const accessToken = await getAccessToken();
      console.log(accessToken?.token, 'accessToken');
      setIsSignedIn(accessToken?.token ? true : false);
      setIsLoading(false);
    } catch (error) {
      console.error('Error checking sign-in status:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    // Add a loading screen or activity indicator here if needed
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
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
    </NavigationContainer>
  );
};

export default App;
