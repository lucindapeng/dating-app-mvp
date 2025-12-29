import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../Routes';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen'; //
import MatchListScreen from '../screens/MatchListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProposalScreen from '../screens/ProposalScreen';
import DateDetailScreen from '../screens/DateDetailScreen';
import ConsentScreen from '../screens/ConsentScreen'; 

const Stack = createStackNavigator();

export default function NavigationLayout() {
  return (
    <Stack.Navigator initialRouteName={ROUTES.LOGIN}>
      <Stack.Screen 
        name={ROUTES.LOGIN} 
        component={LoginScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{ title: 'Create Account' }} 
      />
      <Stack.Screen 
        name="Consent" 
        component={ConsentScreen} 
        options={{ title: 'Safety Agreement', headerLeft: null }} //
      />
      <Stack.Screen name={ROUTES.MATCH_LIST} component={MatchListScreen} />
      <Stack.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
      <Stack.Screen name={ROUTES.PROPOSAL} component={ProposalScreen} />
      <Stack.Screen name={ROUTES.DATE_DETAIL} component={DateDetailScreen} />
    </Stack.Navigator>
  );
}