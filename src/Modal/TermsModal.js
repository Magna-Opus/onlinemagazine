
import React from "react";
import { Modal, View, TouchableOpacity } from "react-native";
import {
  Surface,
  Text,
  Paragraph,
  Headline,
  Title,
  Subheading
} from "react-native-paper";
import moment from "moment";

import styles from "./TermsModalStyle";
import { SafeAreaView } from "react-native-safe-area-context";

const Language = ({ visible, close, user }) => {
  return (
    <Modal
      animationType={"fade"}
      visible={visible}
      onRequestClose={close}
      transparent={true}
    >
        <SafeAreaView style={{flex:1}}>
      <Surface style={styles.container}>
        <Surface style={styles.closeContainer}>
          <Text onPress={close} style={styles.closeButton}>
            Close
          </Text>
        </Surface>
        <Title style={{ fontWeight: "bold" }}>Terms and Conditions</Title>

        <Surface style={styles.textContainer}>
          <View style={styles.subHeadingText}>
            <Subheading>Sworn Declaration</Subheading>
          </View>
          <Paragraph>
            I solemnly declare that the writing is my own creation and property.
            I did not copy or use any writeups (part or full) from anywhere to
            complete this writing. I also declare that I did not give this
            writing (part or full) to any media, publisher or elsewhere for
            their own use, production or reproduction before. I will be alone
            prosecuted if any legal issue raises and will be liable to bear all
            the legal cost including compensation. I also hereby confirm and
            give full authority and rights to the creative team of Online
            Magazine to review, amend and beautify my writings, make it readable
            and use my writings (full or part), as and when it is needed to make
            me publish writer. {"\n"}
          </Paragraph>

          <View style={styles.userInfoContainer}>
            <Paragraph style={{ width: 70 }}>Name:</Paragraph>
            <Subheading>{user.user_first_name} {user.user_last_name}</Subheading>
          </View>
          <View style={styles.userInfoContainer}>
            <Paragraph style={{ width: 70 }}>Date:</Paragraph>
            <Subheading>{moment().format("DD-MM-YYYY")}</Subheading>
          </View>
          <View style={styles.userInfoContainer}>
            <Paragraph style={{ width: 70 }}>Cell:</Paragraph>
            <Subheading>{user.user_phone}</Subheading>
          </View>
          <View style={styles.userInfoContainer}>
            <Paragraph style={{ width: 70 }}>Email:</Paragraph>
            <Subheading>{user.user_email}</Subheading>
          </View>
          <View style={{height:100}}/>
        </Surface>
      </Surface>
      </SafeAreaView>
    </Modal>
  );
};

export default Language;
