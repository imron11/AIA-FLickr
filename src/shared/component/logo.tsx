import React from "react";
import { Image } from "react-native";

interface logoProps {
    source: any;
    width?: number;
    height?: number,
    tintColor?: any;
}

const LogoComponent = (props: logoProps) => {
    return (
        <Image
            source={props.source}
            resizeMode={'stretch'}
            style={{
                width: props.width ? props.width : 80,
                height: props.height ? props.height : 30,
                tintColor: props.tintColor ? props.tintColor : "white"
            }}
        />
    );
}

export default LogoComponent;