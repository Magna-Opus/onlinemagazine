
import React from "react";
import { Modal, View, ScrollView } from "react-native";
import { Surface, Text,Button } from "react-native-paper";

import Colors from "../Global/Color.js"

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import styles from "./CategoriesModalStyle";

const Categories = ({
  categories,
  handleSubmit,
  visible,
  close,
  changeCategory
}) => {
  return (
    <Modal
      animationType={"fade"}
      visible={visible}
      onRequestClose={close}
      transparent={true}
    >
      <View style={styles.container}>
        <Surface style={styles.innerContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.titleText}>Select Category</Text>
            <Entypo
              name="circle-with-cross"
              size={24}
              style={{ marginRight: -14 }}
              color={Colors.Red}
              onPress={close}
            />
          </View>

          <ScrollView>
            {categories &&
              categories.length > 0 &&
              categories.map((item, index) => (
                <Surface key={index} style={styles.itemStyle}>
                  <FontAwesome
                    name="circle"
                    size={22}
                    color={item.isSelected ? Colors.Red : Colors.LightBorder}
                    onPress={() => changeCategory(item, index)}
                  />
                  <Text style={styles.languageText}>{item.name}</Text>
                </Surface>
              ))}
          </ScrollView>

          <Button
            dark
            loading={false}
            color={Colors.Red}
            mode="contained"
            onPress={()=>handleSubmit()}
          >
            <Text style={styles.convertButton}>Done</Text>
          </Button>
        </Surface>
      </View>
    </Modal>
  );
};

export default Categories;
