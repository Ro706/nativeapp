import Voice from "@react-native-voice/voice";
import React, { useEffect, useState } from "react";
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

/* ---------- Types ---------- */
type SpeechResultsEvent = {
  value?: string[];
};

type SpeechErrorEvent = {
  error?: any;
};

/* ---------- Component ---------- */
const App = () => {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [isListening, setIsListening] = useState(false);

  /* ---------- Setup Voice Listeners ---------- */
  useEffect(() => {
    const onSpeechResults = (event: SpeechResultsEvent) => {
      if (event.value?.length) {
        setText(event.value[0]);
      }
      setIsListening(false);
    };

    const onSpeechError = (event: SpeechErrorEvent) => {
      console.log("Speech Error:", event.error);
      setIsListening(false);
    };

    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  /* ---------- Handlers ---------- */
  const handleSubmit = () => {
    if (!text.trim()) return;
    setSubmitted(text);
    setText("");
  };

  const startListening = async () => {
    try {
      setIsListening(true);
      await Voice.start("en-US");
    } catch (err) {
      console.log("Start Error:", err);
      setIsListening(false);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (err) {
      console.log("Stop Error:", err);
    }
  };

  /* ---------- UI ---------- */
  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Logo */}
        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.image}
        />

        {/* Greeting */}
        <Text style={styles.output}>
          {submitted ? `Hello, ${submitted}!` : "Say or type your name"}
        </Text>

        {/* Result */}
        {submitted ? (
          <Text style={styles.result}>You entered: {submitted}</Text>
        ) : null}

        {/* Input */}
        <Text style={styles.label}>Enter your name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Type or use voice..."
          placeholderTextColor="#888"
          value={text}
          onChangeText={setText}
        />

        {/* Buttons */}
        <View style={styles.buttonGroup}>
          <Button
            title="Submit"
            onPress={handleSubmit}
            disabled={!text.trim()}
          />

          {!isListening ? (
            <Button title="🎤 Start Voice" onPress={startListening} />
          ) : (
            <Button title="🛑 Stop" onPress={stopListening} />
          )}
        </View>

        {/* Status */}
        {isListening && <Text style={styles.status}>🎙️ Listening...</Text>}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#121212",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 25,
  },
  image: {
    width: 180,
    height: 180,
    alignSelf: "center",
    marginBottom: 20,
  },
  output: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  result: {
    fontSize: 16,
    color: "#bbb",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 8,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 8,
    paddingHorizontal: 12,
    color: "white",
    marginBottom: 20,
  },
  buttonGroup: {
    gap: 10,
  },
  status: {
    marginTop: 15,
    textAlign: "center",
    color: "#00ffcc",
    fontSize: 16,
  },
});

export default App;
