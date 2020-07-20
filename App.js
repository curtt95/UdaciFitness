import * as React from 'react'
import { Text, View, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import AddEntry from './components/AddEntry.js'
import History from './components/History.js'
import { purple, white } from './utils/colors'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

const Tab = Platform.OS === 'ios' ? createBottomTabNavigator() : createMaterialTopTabNavigator()

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
        <View style={{flex:1}}>
          <View style={{height: 20}} />
            <NavigationContainer>
              <Tab.Navigator
                barStyle={{ backgroundColor: purple }}
                tabBarOptions={{
                  showIcon: true,
                  activeTintColor: Platform.OS === 'ios' ? purple : white,
                  inactiveTintColor: 'black',
                  labelStyle: { fontSize: 14 },
                  style: {
                    height: 100,
                    backgroundColor: Platform.OS === 'ios' ? white : purple,
                    shadowColor: 'rgba(0, 0, 0, 0.24)',
                    shadowOffset: {
                      width: 0,
                      height: 3
                    },
                    shadowRadius: 6,
                    shadowOpacity: 1
                  }
                }}
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    switch(route.name) {
                      case 'History':
                        return (<Ionicons name='ios-bookmarks' size={30} color={color}/>)
                      case 'AddEntry':
                        return (<FontAwesome name='plus-square' size={30} color={color}/>)
                      default:
                        return (<Ionicons name='alert-outline' size={30} color={color}/>)
                    }
                  },
              })}
              >
                <Tab.Screen name="History" component={History} />
                <Tab.Screen name="AddEntry" component={AddEntry} />
              </Tab.Navigator>
            </NavigationContainer>
           </View>
        </Provider>
  )
}