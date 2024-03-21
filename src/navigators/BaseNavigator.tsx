import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Routes } from "../utils/Routes";
import HomeScreen from "../pages/HomeScreen";
import VideoPlayer from "../pages/VideoPlayer";

const BaseNavigator: React.FC = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={Routes.HOME}
        component={HomeScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name={Routes.VIDEO}
        component={VideoPlayer}
        options={{
          headerShown: false,
          gestureEnabled: false,
          headerLeft: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

export default BaseNavigator;
