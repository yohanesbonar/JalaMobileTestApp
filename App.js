import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import JalaMedia from './app/screens/JalaMedia/JalaMedia';
import DetailHargaUdang from './app/screens/DetailHargaUdang/DetailHargaUdang';
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
          name="DetailHargaUdang"
          component={DetailHargaUdang}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
