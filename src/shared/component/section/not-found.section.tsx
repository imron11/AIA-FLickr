import React from "react";
import {
    Image,
    View,
    Text,
    StyleSheet
} from "react-native";
import images from "../../../asset/images";
import { scaledFontSize, scaledHorizontal, scaledVertical } from "../../helper/scale.helper";
import colors from "../../theme/colors";

interface NotFoundProps {
    title?: string;
    description?: string;
}

const NotFoundSection = (props: NotFoundProps) => {
    return (
        <>
            <View
                style={styles.container}
            >
                <Image
                    source={images.img_not_found}
                    resizeMode={'stretch'}
                    style={
                        styles.image
                    }
                />

                <Text
                    style={
                        styles.title
                    }
                >
                    {props.title}
                </Text>

                <Text
                    style={
                        styles.description
                    }
                >
                    {props.description}
                </Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.primary,
        alignItems: 'center',
        paddingTop: scaledVertical(75)
    },
    image: {
        width: scaledHorizontal(300),
        height: scaledVertical(360),
        tintColor: colors.border,
        marginBottom: scaledVertical(16)
    },
    title: {
        fontSize: scaledFontSize(32),
        fontWeight: '700',
        color: colors.flickrBlue,
        textAlign: 'center',
        marginBottom: scaledVertical(8),
    },
    description: {
        fontSize: scaledFontSize(24),
        color: colors.border,
        fontStyle: 'italic',
        textAlign: 'center'
    }
})

export default NotFoundSection;