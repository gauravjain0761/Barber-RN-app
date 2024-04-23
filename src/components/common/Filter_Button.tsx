import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { hp, wp } from "../../helper/globalFunction";
import { colors } from "../../theme/color";
import { Dropdown_Down_Arrow } from "../../theme/SvgIcon";
import { commonFontStyle, fontFamily } from "../../theme/fonts";
import { icons, images } from "../../theme/icons";

type props = {
  title: string;
  type: "icon" | "simple";
  onPress?: (arg?: any) => any;
  containerStyle?: ViewStyle | any;
  btn_bg?: ViewStyle;
  isCloseIcon?: boolean;
  onPressClose?: () => void;
  isSeleted?: boolean;
};

const Filter_Button = ({
  title,
  type,
  onPress,
  containerStyle,
  btn_bg,
  isCloseIcon,
  onPressClose,
  isSeleted,
}: props) => {
  return (
    <>
      {type === "icon" ? (
        <View style={styles.container}>
          <TouchableOpacity
            style={[styles.btn_conatiner, containerStyle]}
            onPress={onPress}
          >
            <ImageBackground
              source={
                isSeleted
                  ? images?.black_border_button
                  : images.oval_grey_button
              }
              style={styles.oval_bg}
              resizeMode="stretch"
            >
              <Text style={styles.title}>{title}</Text>
              <Dropdown_Down_Arrow />
              {isCloseIcon ? (
                <TouchableOpacity
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  onPress={onPressClose}
                >
                  <Image
                    resizeMode="contain"
                    source={icons.close}
                    style={styles.closeIconStyle}
                  />
                </TouchableOpacity>
              ) : null}
            </ImageBackground>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity
            style={[styles.btn_conatiner, containerStyle]}
            onPress={onPress}
          >
            <ImageBackground
              source={
                isSeleted
                  ? images?.black_border_button
                  : images.oval_grey_button
              }
              style={[styles.oval_bg, btn_bg]}
              resizeMode="stretch"
              resizeMethod="scale"
            >
              <Text style={styles?.title}>{title}</Text>
              {isCloseIcon ? (
                <TouchableOpacity
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  onPress={onPressClose}
                >
                  <Image
                    resizeMode="contain"
                    source={icons.close}
                    style={styles.closeIconStyle}
                  />
                </TouchableOpacity>
              ) : null}
            </ImageBackground>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default Filter_Button;

const styles = StyleSheet.create({
  container: {},
  btn_conatiner: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    ...commonFontStyle(fontFamily.medium, 13, colors?.stylists_title_gray),
  },
  oval_bg: {
    width: "auto",
    alignSelf: "flex-start",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: hp(13),
    paddingHorizontal: wp(10),
    gap: wp(6),
  },
  closeIconStyle: {
    height: wp(10),
    width: wp(10),
  },
});
