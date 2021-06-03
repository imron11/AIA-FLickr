import React from "react";
import {
    Image,
    TouchableOpacity
} from "react-native";

interface iconButtonProps {
    onPress?: () => void;
    source: any;
    width?: number;
    tintColor?: any;
}

const IconButtonComponent = (props: iconButtonProps) => {
    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    props.onPress();
                }}
            >
                <Image
                    source={props.source}
                    resizeMode={'contain'}
                    style={{
                        width: props.width ? props.width : 30,
                        tintColor: props.tintColor ? props.tintColor : "white"
                    }}
                />
            </TouchableOpacity>
        </>
    )
}

export default IconButtonComponent;