import React from 'react';
import {
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
import { scaledFontSize, scaledVertical } from "../../shared/helper/scale.helper";
import realm, { getAllSavedImage, addImage, deleteImageById } from "../../database/flickr-image.database";

class SigninComponent extends React.Component<any, any> {

  componentDidMount() {
    this.getImage();  
  }

  getImage = async () => {
    const images = await getAllSavedImage();
    console.log("images", images);
  }

  render() {
    return (
      <>
        <SafeAreaView style={{ flex: 0, backgroundColor: colors.flickrBlue }} />
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
                // addImage('Foster Cat, Sandy', 'https://live.staticflickr.com/65535/51226621010_b2d71507b1_m.jpg');
                // deleteImageById(2);
                // this.getImage();
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
      </>
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
    padding: scaledVertical(40),
    backgroundColor: colors.flickrBlue,
    borderBottomRightRadius: 300
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: scaledVertical(30)
  },
  buttonContainer: {
    width: '100%',
    height: scaledVertical(100),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    backgroundColor: colors.flickrPink
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: scaledFontSize(32)
  }
});

export default SigninComponent;