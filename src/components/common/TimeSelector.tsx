import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { hp, wp } from "../../helper/globalFunction";
import { colors } from "../../theme/color";
import { commonFontStyle, fontFamily } from "../../theme/fonts";

type Item = {
  id: number;
  time: string;
};

type props = {
  data: Array<Item>;
  onPressTime: (number: number) => void;
};

const TimeSelector = ({ data, onPressTime }: props) => {
  return (
    <View style={styles.container}>
      {data?.map((item: any, index: number) => {
        return (
          <TouchableOpacity
            onPress={() => onPressTime(index)}
            style={{
              ...styles.itemContainer,
              borderWidth: item?.isSelected ? 1.5 : 1,
              backgroundColor: item?.isSelected
                ? colors.green_opacity
                : colors.white,
              borderColor: item?.isSelected
                ? colors.theme_1
                : colors.date_slot_border,
            }}
          >
            <Text style={styles.timeTextStyle}>{item.time}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  itemContainer: {
    height: hp(40),
    width: wp(70),
    borderWidth: 1,
    borderRadius: 5,
    marginRight: wp(7),
    marginBottom: wp(12),
    alignItems: "center",
    justifyContent: "center",
  },
  timeTextStyle: {
    ...commonFontStyle(fontFamily.regular, 14, colors.black),
  },
});

export default TimeSelector;