import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
    View,
    StyleSheet,
    StatusBar
} from "react-native";
import { Actions } from 'react-native-router-flux';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../../asset/images';
import LogoComponent from '../../shared/component/logo';
import colors from '../../shared/theme/colors';

class BootComponent extends React.Component<any, any> {
    async componentDidMount() {
        const user = await AsyncStorage.getItem('@user');

        setTimeout(() => {
            if (user) {
                Actions.reset('HomePage');
            } else {
                Actions.reset('SigninPage');
            }
        }, 3000);
    }

    render() {
        return (
            <>
                <SafeAreaView style={{ flex: 0, backgroundColor: colors.flickrBlue }} />
                <SafeAreaView style={{ flex: 1, backgroundColor: colors.flickrBlue }}>
                    <StatusBar backgroundColor={colors.flickrBlue} barStyle={'light-content'} />
                    <View
                        style={styles.container}
                    >
                        <LogoComponent
                            source={images.img_logo_flickr}
                        />
                    </View>
                </SafeAreaView>
                <SafeAreaView style={{ flex: 0, backgroundColor: colors.flickrBlue }} />
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.flickrBlue
    }
});

export default BootComponent;