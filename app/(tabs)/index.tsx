import React, { useState } from "react";
import {
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const App = () => {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState("");

  const handleSubmit = () => {
    setSubmitted(name);
    setName(""); // clear input after submit
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS vs Android
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Image section */}
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Image
            source={require("../../assets/images/icon.png")}
            style={{ width: 200, height: 200 }}
          />
        </View>

        {/* Output */}
        <Text style={styles.output}>Hello, {submitted}!</Text>

        {/* Dynamic text section */}
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            {submitted ? `You entered: ${submitted}` : ""}
          </Text>
        </View>

        {/* Input section */}
        <Text style={styles.label}>Enter your name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Type here..."
          value={name}
          onChangeText={(text) => setName(text)}
        />

        {/* Submit button */}
        <Button title="Submit" onPress={handleSubmit} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    color: "white",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  output: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    color: "white",
  },
});

export default App;
