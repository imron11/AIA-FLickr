import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { observer } from "mobx-react";
import { container } from 'tsyringe';
import HomeStore from './home.store';
import colors from '../../shared/theme/colors';

@observer
class HomeComponent extends React.Component<any, any> {

  private _homeStore = container.resolve(HomeStore);

  render() {
    return(
      <SafeAreaView style={styles.mainContainer}>
        <View
          style={styles.viewContainer}
        >
          <Text
            style={styles.nameText}
          >
            {`${this._homeStore.namePage}`}
          </Text>
        </View>
      </SafeAreaView>
    )
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
  },
  nameText: {
    color: 'darkred',
    fontSize: 20,
    fontWeight: '500'
  }
});

export default HomeComponent;
