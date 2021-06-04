import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View
} from "react-native";
import { observer } from "mobx-react";
import { container } from 'tsyringe';
import HomeStore from './home.store';
import colors from '../../shared/theme/colors';
import LogoComponent from '../../shared/component/logo';
import images from '../../asset/images';
import icons from '../../asset/icons';
import IconButtonComponent from '../../shared/component/button/icon.button';
import TextInputComponent from "../../shared/component/input/text.input";
import { scaledVertical } from "../../shared/helper/scale.helper";

@observer
class HomeComponent extends React.Component<any, any> {

  private _homeStore = container.resolve(HomeStore);

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View
          style={styles.headerContainer}
        >
          <LogoComponent
            source={images.img_logo_flickr}
          />

          <IconButtonComponent
            source={icons.ic_setting}
            onPress={() => {

            }}
          />
        </View>

        <View
          style={styles.contentContainer}
        >
          <View
            style={styles.inputContainer}
          >
            <TextInputComponent
              color={colors.flickrBlue}
              autoCapitalize={'none'}
              placeholder={'search image by tag ...'}
              onChangeText={() => {

              }}
              clearButton
              onClearText={() => {

              }}
              style={{ flex: 1 }}
            />

            <IconButtonComponent
              source={icons.ic_refresh}
              onPress={() => {

              }}
              tintColor={colors.flickrBlue}
              width={scaledVertical(40)}
              height={scaledVertical(40)}
              style={{ marginLeft: 16 }}
            />
          </View>

          <View style={{ flex: 1 }}></View>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.flickrBlue
  },
  headerContainer: {
    height: Dimensions.get("screen").height * 0.13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scaledVertical(30)
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: scaledVertical(30)
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});

export default HomeComponent;
