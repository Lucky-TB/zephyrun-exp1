import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { RoutesScreen } from '../screens/RoutesScreen';
import { CommunityScreen } from '../screens/CommunityScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e5e5',
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: 'Home',
          // Add icon here
        }}
      />
      <Tab.Screen
        name="RoutesTab"
        component={RoutesScreen}
        options={{
          title: 'Routes',
          // Add icon here
        }}
      />
      <Tab.Screen
        name="CommunityTab"
        component={CommunityScreen}
        options={{
          title: 'Community',
          // Add icon here
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          // Add icon here
        }}
      />
    </Tab.Navigator>
  );
} 