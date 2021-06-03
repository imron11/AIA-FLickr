import React from "react";
import {
    Image,
    TouchableOpacity
} from "react-native";

interface iconButtonProps {
    onPress?: () => void;
    source: any;
    width?: number;
    height?: number;
    tintColor?: any;
    style?: any;
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
                        width: props.width ? props.width : 30,
                        height: props.height ? props.height : 30,
                        tintColor: props.tintColor ? props.tintColor : "white"
                    }}
                />
            </TouchableOpacity>
        </>
    )
}

export default IconButtonComponent;