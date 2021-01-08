import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import styles from "./MyArticlesListStyle.js";
import { Card } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import Colors from "../../Global/Color.js";
import Images from "../../Global/Images.js";

const articleList = ({ item, onEditPress, categoryName, categoryId,onSelectArticle,onDelPress }) => {
  console.log("pppp",item.featured_media)
  const feature_image =
    item && item.featured_media ?  item.featured_media: null;
  return (
    <Card onPress={()=>onSelectArticle(item)}>
      <View style={styles.listContainer}>
        <Image
          resizeMode="contain"
          style={styles.imageStyle}
          source={feature_image ? { uri: feature_image } : Images.defaultImage}
        />
        <View style={styles.innerContainer}>
          <View style={styles.textContainer}>
            <Text style={{ fontSize: 18, fontWeight: "400", color: "black" }}>
              {item.title.rendered}
            </Text>
            <View style={styles.postView}>
              <View style={[styles.postView, { alignItems: "center" }]}>
                {/* <Entypo name="calendar" size={15} color="grey" /> */}
                <Image
                  style={{ width: 12, height: 12 }}
                  resizeMode="contain"
                  source={require("../../Image/Allarticle/calendar_small.png")}
                />

                <Text style={styles.postText}>
                  {moment(item.date).format("LL")}
                </Text>
              </View>
              <View
                style={[
                  styles.postView,
                  { alignItems: "center", marginLeft: 5, marginVertical: 10 }
                ]}
              >
                <Text
                  style={[
                    styles.postText,
                    {
                      color:
                        item.status === "pending" ? Colors.Red : Colors.Green
                    }
                  ]}
                >
                  {item.status === "pending" ? "Pending" : "Approved"}
                </Text>
              </View>
            </View>
          </View>
          {item.status === "pending" && (
            <View style={styles.mikeView}>
              <MaterialIcons
                name="edit"
                size={25}
                onPress={() => onEditPress(item, categoryName, categoryId)}
              />
            </View>
          )}
          <View style={styles.mikeView}>
              <FontAwesome
                name="close"
                size={25}
                onPress={() => onDelPress(item)}
              />
            </View>
        </View>
      </View>
    </Card>
  );
};

export default articleList;
