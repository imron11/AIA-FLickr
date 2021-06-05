import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { scaledFontSize, scaledVertical } from "../../helper/scale.helper";
import colors from "../../theme/colors";

interface iconButtonProps {
    onPress?: () => void;
    source: any;
    width?: number;
    height?: number;
    tintColor?: any;
    style?: any;
    badgeLength?: number
}

const IconButtonComponent = (props: iconButtonProps) => {
    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    props.onPress();
                }}
                style={props.style}
            >
                <Image
                    source={props.source}
                    resizeMode={'stretch'}
                    style={{
                        width: props.width ? props.width : scaledVertical(48),
                        height: props.height ? props.height : scaledVertical(48),
                        tintColor: props.tintColor ? props.tintColor : "white"
                    }}
                />

                {props.badgeLength > 0 &&
                    <View
                        style={styles.badgeContainer}
                    >
                        <Text
                            style={styles.badgeText}
                        >
                            {props.badgeLength}
                        </Text>
                    </View>
                }
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    badgeContainer: {
        position: 'absolute',
        top: scaledVertical(-8),
        right: scaledVertical(-8),
        backgroundColor: 'red',
        width: scaledVertical(28),
        height: scaledVertical(28),
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center'
    },
    badgeText: {
        color: 'white',
        fontSize: scaledFontSize(16),
        fontWeight: 'bold'
    }
});

export default IconButtonComponent;