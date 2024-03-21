import "react-native-gesture-handler";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import ErrorBoundary from "react-native-error-boundary";
import { StyleSheet, Text, View } from "react-native";
import BaseNavigator from "./src/navigators/BaseNavigator";

const App: React.FC = () => {
  const CustomFallback = (props: { error: Error; resetError: () => void }) => (
    <View>
      <Text> Ooops! Got Error</Text>
    </View>
  );

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ErrorBoundary FallbackComponent={CustomFallback}>
          <BaseNavigator />
        </ErrorBoundary>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
