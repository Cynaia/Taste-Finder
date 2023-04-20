import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Button,
  Alert,
} from 'react-native';

import { useState } from 'react';

import Constants from 'expo-constants';

export function ContactPage() {
  // Define state variables for name, email, subject, message, showModal, and errorMessage
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSend = () => {
    if (
      name.trim() === '' ||
      email.trim() === '' ||
      subject.trim() === '' ||
      message.trim() === ''
    ) {
      // If any of the required fields are empty, show an error message
      setErrorMessage('Please fill in all the required fields.');
    } else {
      // Otherwise, show an Alert before sending the message
      Alert.alert(
        'Confirm Send',
        'Are you sure you want to send this message?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Send',
            onPress: () => {
              // Send the message
              const body = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`;
              setShowModal(true);
              setName('');
              setEmail('');
              setSubject('');
              setMessage('');
              setErrorMessage('');
            },
            style: 'destructive',
          },
        ]
      );
    }
  };

  return (
    // Define the main container view
    <View style={styles.container}>
      {/* Define the modal that will show when the message is sent */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => setShowModal(!showModal)}>
        <View style={styles.container}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Message sent successfully!</Text>
            <Button
              title="OK"
              onPress={() => setShowModal(false)}
              color="#ff7c60"
            />
          </View>
        </View>
      </Modal>

      {/* Define the header text */}
      <Text style={styles.headerText}>Contact Us</Text>

      {/* Define the contact text */}
      <Text style={styles.contactText}>
        You can contact us at support@tastefinder.com for any feedback or
        concerns.
      </Text>

      {/* Define the scroll view for the form */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          {/* Show the error message if there is one */}
          {errorMessage !== '' && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}

          {/* Define the input fields */}
          <TextInput
            placeholder="Name"
            placeholderTextColor="black"
            style={[styles.input, { backgroundColor: '#c8e6c9' }]}
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="black"
            style={[styles.input, { backgroundColor: '#c8e6c9' }]}
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Subject"
            placeholderTextColor="black"
            style={[styles.input, { backgroundColor: '#c8e6c9' }]}
            value={subject}
            onChangeText={(text) => setSubject(text)}
          />
          <TextInput
            placeholder="Message"
            placeholderTextColor="black"
            style={[
            styles.input,
            styles.messageInput,
            { backgroundColor: '#c8e6c9' },
            ]}
            value={message}
            onChangeText={(text) => setMessage(text)}
            multiline={true}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Send Message</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'justify',
    marginVertical: 20,
    color: '#ff7c60',
  },
  contactText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  messageInput: {
    height: 120,
  },
  sendButton: {
    backgroundColor: '#ff7c60',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
});
