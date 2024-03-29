import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { AppLoading } from "expo";
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as Icon from '@expo/vector-icons';


import RootStackNavigator from './app/navigation/StackNavigation';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (

        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <RootStackNavigator />
        </View>


      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([

        require("./assets/background/jorge-vasconez.jpg"),
        require("./assets/background/lerone-pieters.jpg"),
        require("./assets/background/ligths-tree.jpg")
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        //"space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
        "josefin_sans": require("./assets/fonts/Josefin_Sans/JosefinSans-Regular.ttf"),
        "josefin_sans_bold": require("./assets/fonts/Josefin_Sans/JosefinSans-Bold.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
