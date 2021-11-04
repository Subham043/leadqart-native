import React from "react";
import { View } from "react-native";
import SvgAnimatedLinearGradient from "react-native-svg-animated-linear-gradient";
import { Circle, Rect } from "react-native-svg";

const MessageCardPlaceholder = () => {
  return (
    <View>
      <SvgAnimatedLinearGradient
        primaryColor="#eee"
        secondaryColor="#BEBEBE"
        height={100}
      >
        <Rect x="10" y="17" rx="4" ry="4" width="350" height="13" />
        <Rect x="10" y="40" rx="3" ry="3" width="350" height="30" />
      </SvgAnimatedLinearGradient>
      <SvgAnimatedLinearGradient
        primaryColor="#eee"
        secondaryColor="#BEBEBE"
        height={100}
      >
        <Rect x="10" y="17" rx="4" ry="4" width="350" height="13" />
        <Rect x="10" y="40" rx="3" ry="3" width="350" height="30" />
      </SvgAnimatedLinearGradient>
      <SvgAnimatedLinearGradient
        primaryColor="#eee"
        secondaryColor="#BEBEBE"
        height={100}
      >
        <Rect x="10" y="17" rx="4" ry="4" width="350" height="13" />
        <Rect x="10" y="40" rx="3" ry="3" width="350" height="30" />
      </SvgAnimatedLinearGradient>
    </View>
  );
};

export default MessageCardPlaceholder;