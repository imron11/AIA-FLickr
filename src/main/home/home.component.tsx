import React from 'react';
import { 
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

@observer
class HomeComponent extends React.Component<any, any> {

  private _homeStore = container.resolve(HomeStore);

  render() {
    return(
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
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  }
});

export default HomeComponent;
