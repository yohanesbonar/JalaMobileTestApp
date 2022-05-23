import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import JalaMedia from './app/screens/JalaMedia/JalaMedia';
import GeneralWebview from './app/screens/GeneralWebview/GeneralWebview';
import PriceDetail from './app/screens/PriceDetail/PriceDetail';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Jalamedia">
        <Stack.Screen
          name="JalaMedia"
          component={JalaMedia}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PriceDetail"
          component={PriceDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GeneralWebview"
          component={GeneralWebview}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
