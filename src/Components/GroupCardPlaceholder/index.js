import React from "react";
import { View } from "react-native";
import SvgAnimatedLinearGradient from "react-native-svg-animated-linear-gradient";
import { Circle, Rect } from "react-native-svg";

const GroupCardPlaceholder = () => {
  return (
    <View>
      <SvgAnimatedLinearGradient
        primaryColor="#eee"
        secondaryColor="#BEBEBE"
        height={100}
      >
        <Circle cx="40" cy="40" r="40" />
        <Rect x="100" y="35" rx="4" ry="4" width="350" height="13" />
      </SvgAnimatedLinearGradient>
      <SvgAnimatedLinearGradient
        primaryColor="#eee"
        secondaryColor="#BEBEBE"
        height={100}
      >
        <Circle cx="40" cy="40" r="40" />
        <Rect x="100" y="35" rx="4" ry="4" width="350" height="13" />
      </SvgAnimatedLinearGradient>
      <SvgAnimatedLinearGradient
        primaryColor="#eee"
        secondaryColor="#BEBEBE"
        height={100}
      >
        <Circle cx="40" cy="40" r="40" />
        <Rect x="100" y="35" rx="4" ry="4" width="350" height="13" />
      </SvgAnimatedLinearGradient>
    </View>
  );
};

export default GroupCardPlaceholder;