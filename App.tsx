import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import useCachedResources from "./hooks/useCachedResources";
import { LoginStackNavigation, Navigation } from "./navigation";
import SettingAccountFirstScreen from "./screens/SettingAccountFirstScreen";
import SplashScreen from "./screens/SplashScreen";
import store, { useAppSelector } from "./store";
import { authSelector } from "./store/reducers/authSlice";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <AppScreen />
        </Provider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

const AppScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isLogin } = useAppSelector(authSelector);

  const handleCheckLogin = async () => {
    // try {
    //   const token = await AsyncStorage.getItem('token');
    //   if (token) {
    //     dispatch(setLogin(true));
    //     const currentUserId = await AsyncStorage.getItem('userId');
    //     dispatch(setCurrentUserId(currentUserId));
    //     const keyboardHeightStr = await AsyncStorage.getItem('keyboardHeight');
    //     dispatch(setKeyboardHeight(keyboardHeightStr));
    //   }
    // } catch (e) {
    //   // error reading value
    // }
    setIsLoading(false);
  };

  useEffect(() => {
    handleCheckLogin();

    // console.log(a);
  }, []);

  return isLoading ? (
    <NavigationContainer>
      <SplashScreen />
    </NavigationContainer>
  ) : isLogin ? (
    <Navigation />
  ) : (
    <LoginStackNavigation />
  );
};
