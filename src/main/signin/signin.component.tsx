import React from 'react';
import { 
  Image,
  SafeAreaView, 
  View, 
  StyleSheet, 
  StatusBar, 
  Text, 
  TouchableOpacity 
} from "react-native";
import colors from "../../shared/theme/colors";
import { Actions } from "react-native-router-flux";
import images from "../../asset/images";
import LogoComponent from '../../shared/component/logo';

class SigninComponent extends React.Component<any, any> {
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar backgroundColor={colors.flickrBlue} barStyle={'light-content'} />

        <View
          style={styles.topContainer}
        >
          <LogoComponent 
            source={images.img_logo_flickr}
          />
        </View>

        <View
          style={styles.bottomContainer}
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
              {`Get Started`}
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
  topContainer: {
    flex: 1,
    padding: 30,
    backgroundColor: colors.flickrBlue,
    borderBottomRightRadius: 300
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 20
  },
  buttonContainer: {
    width: '100%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    backgroundColor: colors.flickrPink
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  }
});

export default SigninComponent;