import React from "react";
import { Modal, View, TouchableOpacity } from "react-native";
import { Surface, Text,Button } from "react-native-paper";
import Colors from "../Global/Color.js";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "./LanguageStyle";

const Language = ({
  languages,
  handleSubmit,
  loading,
  visible,
  close,
  onSelectLanguage
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
          <Text style={styles.titleText}>Language Converter</Text>
          <View>
            {languages.map((item, index) => (
              <TouchableOpacity
                onPress={() => onSelectLanguage(item)}
                activeOpacity={0.9}
                key={index}
                style={styles.itemStyle}
              >
                <FontAwesome
                  name="circle"
                  size={22}
                  color={item.isSelected ? Colors.Red : Colors.LightBorder}
                />
                <Text style={styles.languageText}>{item.language}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Button
            dark
            loading={loading}
            color={Colors.Red}
            mode="contained"
            style={{marginBottom:10}}
            onPress={()=>handleSubmit()}
          >
            <Text style={styles.convertButton}>Convert</Text>
          </Button>
        </Surface>
      </View>
    </Modal>
  );
};

export default Language;