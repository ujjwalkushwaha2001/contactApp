/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddContact from './screens/AddContact';
import EditContact from './screens/EditContact';
import Home from './screens/Home';
import contactDetail from './screens/ContactDetails';
import FavoriteContact from './screens/FavoriteContact';
const Stack = createStackNavigator();
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='home'>
        <Stack.Screen name='home' component={Home} />
        <Stack.Screen name='addcontact' component={AddContact} />
        <Stack.Screen name='editcontact' component={EditContact} />
        <Stack.Screen name='contactDetails' component={contactDetail}/>
        <Stack.Screen name='favoritecontact' component={FavoriteContact}/>

      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default App;
