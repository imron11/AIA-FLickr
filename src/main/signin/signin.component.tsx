import React from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar, Text, TouchableOpacity } from "react-native";
import colors from "../../shared/theme/colors";
import { Actions } from "react-native-router-flux";

class SigninComponent extends React.Component<any, any> {
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar backgroundColor={colors.primary} barStyle={'dark-content'} />

        <View
          style={styles.viewContainer}
        >
          <TouchableOpacity
            onPress={() => {
              Actions.push('HomePage');
            }}
            style={styles.buttonContainer}
          >
            <Text
              style={styles.buttonText}
            >
              {`Go to Home Page`}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.primary
  },
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  buttonContainer: {
    width: '100%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    backgroundColor: 'darkred'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  }
});

export default SigninComponent;