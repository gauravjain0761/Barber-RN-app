import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { colors } from "../../theme/color";
import {
  generateTimes,
  generateWeekDates,
  hp,
  screen_width,
  wp,
} from "../../helper/globalFunction";
import { icons, images } from "../../theme/icons";
import { strings } from "../../helper/string";
import {
  Dates,
  Make_Up,
  Time,
  Women_Services,
  barbers,
  carouselItems,
  men_Services,
  stylists_filter,
} from "../../helper/constunts";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { commonFontStyle, fontFamily } from "../../theme/fonts";
import {
  Barber_Card,
  Filter_Button,
  HomeHeader,
  LocationModal,
  Modals,
  ReviewModal,
  SelectDateModal,
} from "../../components";
import babelConfig from "../../../babel.config";
import { useNavigation } from "@react-navigation/native";
import { screenName } from "../../helper/routeNames";
import CostModal from "../../components/common/CostModal";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import CityModal from "../../components/common/CityModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

type DrawerNavigationParams = {
  navigation: DrawerNavigationProp<{}>;
};

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [costmodal, setCostmodal] = useState(false);
  const [dates, setDates] = useState(generateWeekDates());
  const [times, setTimes] = useState(generateTimes());
  const [servicesModal, setServicesModal] = useState(false);
  const [modalTitle, setModalTitle] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [cityModal, setCityModal] = useState(false);
  const [locationModal, setLocationModal] = useState({});
  const [IsAllowed, setIsAllow] = useState(false);
  const { navigate } = useNavigation();
  const navigation = useNavigation();

  const LocationAllow = async (
    city = strings["Flat No. 14, Ansal Palm Grove, Mohali"]
  ) => {
    const location = {
      permission: "true",
      city:
        city == null ? strings["Flat No. 14, Ansal Palm Grove, Mohali"] : city,
    };
    try {
      await AsyncStorage.setItem("location", JSON.stringify(location));
      setIsAllow(true);
    } catch (error) {}
  };

  useEffect(() => {
    GetStatus();
  }, [IsAllowed]);

  const onSnapToItem = (index: React.SetStateAction<number>) => {
    setActiveIndex(index);
  };

  const onPressItem = () => {
    //@ts-ignore
    navigate(screenName.YourStylist);
  };

  const onPresstoNavigate = () => {
    setServicesModal(false);
    setTimeout(() => {
      // @ts-ignore
      navigate(screenName.Service);
    }, 500);
  };

  const ModalHendler = (item: any) => {
    if (item == 1) {
      setIsModal(!isModal);
    } else if (item == 2) {
    } else if (item == 3) {
      setCostmodal(!costmodal);
    }
  };

  const onPressDateItem = (item: any) => {
    let data = [...dates];

    dates.map((eItem, index) => {
      if (eItem.id === item.id) {
        eItem.isSelected = true;
      } else {
        eItem.isSelected = false;
      }
    });
    setDates(data);
  };

  const onPressTimeItem = (item: any) => {
    let data = [...times];
    times.map((eItem, index) => {
      if (eItem.id === item.id) {
        eItem.isSelected = true;
      } else {
        eItem.isSelected = false;
      }
    });
    setTimes(data);
  };

  const GetStatus = async () => {
    const Status = await AsyncStorage.getItem("location");
    setLocationModal(Status != null ? JSON.parse(Status) : null);
  };

  const onPressSearch = () => {
    // @ts-ignore
    navigate(screenName.SearchItem);
  };

  return (
    <View style={styles?.container}>
      {locationModal?.permission == "true" ? null : (
        <LocationModal
          onPressAllow={setCityModal}
          onPressDontAllow={setCityModal}
          LocationAllow={LocationAllow}
        />
      )}
      {!cityModal ? null : <CityModal LocationAllow={LocationAllow} />}
      <HomeHeader
        onPressProfile={() => navigation.openDrawer()}
        onPressCart={() => navigate(screenName.Cart)}
        location={locationModal}
      />
      <TouchableOpacity
        onPress={onPressSearch}
        style={styles?.search_container}
      >
        <View style={styles?.search_box}>
          <Image
            source={icons?.search_placehonder}
            style={styles?.search_icon}
            resizeMode="contain"
          />
          <View style={styles?.input}>
            <Text style={styles.searchTextStyle}>
              {strings?.Search_by_Stylist_Name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <ScrollView
        stickyHeaderIndices={[5]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.carousel_container}>
          <Carousel
            layout={"default"}
            data={carouselItems}
            sliderWidth={screen_width}
            itemWidth={screen_width}
            inactiveSlideScale={2}
            renderItem={({ item }: any) => {
              return (
                <View style={styles?.carousel_img_container}>
                  <Image source={item?.image} style={styles?.carousel_img} />
                </View>
              );
            }}
            onSnapToItem={onSnapToItem}
          />
        </View>
        <Pagination
          dotsLength={carouselItems.length}
          activeDotIndex={activeIndex}
          containerStyle={styles?.pagination_container}
          dotStyle={styles?.dotStyle}
          inactiveDotStyle={styles?.inactiveDotStyle}
          inactiveDotScale={1}
          dotContainerStyle={styles?.dotContainerStyle}
        />
        <View style={styles?.women_services_container}>
          <View style={styles?.title_container}>
            <Text style={styles?.services_title}>
              {strings?.Services_for_Women.slice(0, -5)}
            </Text>
            <Text style={styles?.title_bold}>
              {strings?.Services_for_Women.split(" ")[2]}
            </Text>
          </View>

          <View style={styles?.services_conatiner}>
            <FlatList
              horizontal
              data={Women_Services}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => (
                <View style={styles?.item_separator}></View>
              )}
              renderItem={({ item, index }: any) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setServicesModal(!servicesModal),
                        setModalTitle(item.services);
                    }}
                    style={styles?.service_card_container}
                  >
                    <Text style={styles?.card_title}>{item?.services}</Text>
                    <Image
                      style={styles?.images}
                      source={item?.images}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                );
              }}
            />

            <FlatList
              horizontal
              data={Women_Services}
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: hp(20) }}
              ItemSeparatorComponent={() => (
                <View style={styles?.item_separator}></View>
              )}
              renderItem={({ item, index }: any) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setServicesModal(!servicesModal),
                        setModalTitle(item.services);
                    }}
                    style={styles?.service_card_container}
                  >
                    <Text style={styles?.card_title}>{item?.services}</Text>
                    <Image
                      style={styles?.images}
                      source={item?.images}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>

        <View style={styles?.men_services_container}>
          <View style={styles?.title_container}>
            <Text style={styles?.services_title}>
              {strings?.Services_for_Men.slice(0, -3)}
            </Text>
            <Text style={styles?.title_bold}>
              {strings?.Services_for_Men.split(" ")[2]}
            </Text>
          </View>

          <View style={styles?.services_conatiner}>
            <FlatList
              horizontal
              data={men_Services}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => (
                <View style={styles?.item_separator}></View>
              )}
              renderItem={({ item, index }: any) => {
                return (
                  <TouchableOpacity style={styles?.service_card_container}>
                    <Text style={styles?.card_title}>{item?.services}</Text>
                    <Image
                      style={styles?.images}
                      source={item?.images}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                );
              }}
            />

            <FlatList
              horizontal
              data={men_Services}
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: hp(20) }}
              ItemSeparatorComponent={() => (
                <View style={styles?.item_separator}></View>
              )}
              renderItem={({ item, index }: any) => {
                return (
                  <TouchableOpacity style={styles?.service_card_container}>
                    <Text style={styles?.card_title}>{item?.services}</Text>
                    <Image
                      style={styles?.images}
                      source={item?.images}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>

        <View style={styles?.your_stylists_container}>
          <View style={styles?.stylists_title_container}>
            <View style={styles?.title_border}></View>
            <Text style={styles?.your_stylists_title}>
              {strings?.YOUR_Stylists}
            </Text>
            <View style={styles?.title_border}></View>
          </View>
        </View>

        <View style={styles?.service_filter_conatiner}>
          <FlatList
            data={stylists_filter}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }: any) => {
              return (
                <Filter_Button
                  onPress={() => {
                    ModalHendler(item.id);
                  }}
                  containerStyle={
                    stylists_filter.length - 1 == index
                      ? { marginRight: wp(10) }
                      : null
                  }
                  title={item?.title}
                  type={item?.isIcon == true ? "icon" : "simple"}
                />
              );
            }}
            ItemSeparatorComponent={() => (
              <View style={styles?.filter_item_separator}></View>
            )}
          />
        </View>

        <View style={styles?.barber_card_container}>
          <FlatList
            data={barbers}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <Barber_Card
                  name={item.name}
                  type="Without Service"
                  images={item?.image}
                  rating={item.rating}
                  jobs={item?.jobs_done}
                  location={item.address}
                  offers={item?.offers}
                  onPress={onPressItem}
                  onPressRating={setReviewModal}
                  barberdetailscontinerStyle={styles.barberdetailscontinerStyle}
                />
              );
            }}
            ItemSeparatorComponent={() => (
              <View style={styles.card_separator}></View>
            )}
          />
        </View>
        <SelectDateModal
          visible={isModal}
          close={setIsModal}
          dates={dates}
          onPressDateItem={onPressDateItem}
          onPressTimeItem={onPressTimeItem}
          setIsModal={setIsModal}
          times={times}
        />

        <Modals
          visible={costmodal}
          close={setCostmodal}
          contain={<CostModal visible={costmodal} close={setCostmodal} />}
        />

        <Modals
          visible={servicesModal}
          close={setServicesModal}
          isIcon
          contain={
            <View style={styles.makeup_modal_container}>
              <Text style={styles.modal_title}>{modalTitle}</Text>
              <View style={styles.card_conatiner}>
                {Make_Up.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => onPresstoNavigate()}
                    style={styles?.makeup_card_container}
                  >
                    <Text style={styles?.makeup_title}>{item?.service}</Text>
                    <Image style={styles?.makeup_images} source={item?.image} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          }
        />

        <Modals
          close={setReviewModal}
          visible={reviewModal}
          containStyle={{ maxHeight: "80%" }}
          contain={<ReviewModal />}
          isIcon
        />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background_grey,
  },
  search_box: {
    width: "100%",
    backgroundColor: colors?.white,
    borderWidth: 1,
    height: hp(41),
    borderColor: colors?.gray_border,
    borderRadius: wp(8),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  search_container: {
    marginHorizontal: wp(20),
    marginVertical: hp(9),
  },
  search_icon: {
    width: wp(24),
    height: wp(24),
    marginLeft: wp(16),
  },
  input: {
    marginLeft: wp(5),
  },
  carousel_img: {
    width: "100%",
    height: hp(467),
  },
  carousel_img_container: {},
  pagination_container: {
    justifyContent: "center",
    alignSelf: "center",
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: hp(24),
  },
  dotContainerStyle: {
    margin: 0,
    marginHorizontal: wp(4),
  },
  inactiveDotStyle: {
    backgroundColor: colors?.active_dot,
  },
  dotStyle: {
    width: wp(6),
    height: wp(6),
    borderRadius: 5,
    backgroundColor: colors?.inactive_dot,
  },
  women_services_container: {
    paddingLeft: wp(20),
    marginTop: hp(36),
  },
  title_container: {
    flexDirection: "row",
    alignItems: "center",
  },
  services_title: {
    ...commonFontStyle(fontFamily.regular, 20, colors?.black),
  },
  title_bold: {
    ...commonFontStyle(fontFamily.semi_bold, 20, colors?.black),
  },
  services_conatiner: {
    marginTop: hp(19),
  },
  service_card_container: {
    borderWidth: 1,
    borderColor: colors?.light_gray_border,
    backgroundColor: colors?.white,
    width: wp(150),
    height: hp(170),
    borderRadius: wp(8),
    justifyContent: "space-between",
    marginRight: wp(10),
  },
  card_title: {
    ...commonFontStyle(fontFamily.medium, 12, colors?.black),
    marginTop: hp(11),
    marginLeft: wp(14),
  },
  images: {
    width: "100%",
    height: hp(119),
    alignSelf: "center",
  },
  item_separator: {
    width: wp(2),
  },
  men_services_container: {
    paddingLeft: wp(20),
    marginTop: hp(45),
  },
  your_stylists_container: {
    marginTop: hp(45),
  },
  title_border: {
    width: "100%",
    borderBottomWidth: hp(1),
    borderColor: colors?.stylists_border_color,
    marginHorizontal: wp(10),
    alignSelf: "center",
  },
  stylists_title_container: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    justifyContent: "center",
    marginBottom: hp(20),
    marginHorizontal: wp(20),
    overflow: "hidden",
  },
  your_stylists_title: {
    ...commonFontStyle(fontFamily.medium, 17, colors?.stylists_title_gray),
    paddingHorizontal: wp(16),
  },
  service_filter_conatiner: {
    paddingLeft: wp(20),
    paddingBottom: hp(10),
    backgroundColor: colors.background_grey,
  },
  filter_item_separator: {
    width: wp(7),
  },
  barber_card_container: {
    marginHorizontal: wp(20),
    marginTop: hp(20),
  },
  card_separator: {
    height: hp(24),
  },
  carousel_container: {
    width: "100%",
    borderRadius: wp(12),
    overflow: "hidden",
  },
  select_date_title: {
    ...commonFontStyle(fontFamily.semi_bold, 18, colors.black),
    marginTop: hp(20),
    paddingHorizontal: wp(10),
  },
  time_container: {
    marginTop: hp(31),
    paddingHorizontal: wp(10),
  },
  time_title: {
    ...commonFontStyle(fontFamily.semi_bold, 18, colors.black),
  },
  info: {
    ...commonFontStyle(fontFamily.regular, 13.3, colors.info_grey),
    alignSelf: "center",
    marginTop: hp(25),
    // marginHorizontal: wp(15),
  },
  btn_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: hp(10),
    marginTop: hp(41),
    marginHorizontal: wp(10),
  },
  btn_style: {
    height: hp(60),
    width: wp(150),
    justifyContent: "center",
    alignItems: "center",
  },
  btn_tite: {
    ...commonFontStyle(fontFamily.medium, 18, colors.black),
  },
  timeselect_container: {
    alignItems: "center",
    marginTop: hp(10),
  },
  date_container: {
    width: "100%",
  },
  select_date_container: {
    width: "100%",
  },
  week_container: {
    marginHorizontal: wp(10),
    marginTop: hp(16),
  },
  item_style: {
    width: wp(62),
    height: hp(70),
  },
  timeslot_style: {
    marginBottom: hp(16),
  },
  service_modal_container: {},
  modal_title: {
    ...commonFontStyle(fontFamily.semi_bold, 18, colors.black),
  },
  makeup_card_container: {
    borderWidth: 1,
    borderColor: colors?.light_gray_border,
    backgroundColor: colors?.white,
    width: wp(100),
    height: hp(120),
    borderRadius: wp(8),
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
  },
  makeup_images: {
    width: wp(87),
    height: hp(77.26),
    marginTop: hp(3),
  },
  makeup_title: {
    ...commonFontStyle(fontFamily.medium, 12, colors?.black),
    textAlign: "center",
    marginTop: hp(7),
  },
  makeup_modal_container: {},
  card_conatiner: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: wp(17),
    justifyContent: "flex-start",
    marginTop: hp(11),
  },
  searchTextStyle: {
    ...commonFontStyle(fontFamily.medium, 12, "#949495"),
  },
  barberdetailscontinerStyle: {
    marginTop: hp(20),
  },
});
