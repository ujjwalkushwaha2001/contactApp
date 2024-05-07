import React, {useState} from 'react';
import {View, StyleSheet, Text, Button, TextInput} from 'react-native';
import Database from './Database';
const AddContact = ({navigation}) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [landline, setLandline] = useState('');
  const [photo, setPhoto] = useState('');
  const [notvalidInput, setnotvalidInput] = useState(false);
  const [contactSave, setcontactSave] = useState(false);
  const handlePaste =(event)=>{
        const pastedText=event.nativeEvent.text;
        setPhoto(pastedText);
  }
  const saveEntry = async () => {
    if (name.length == 0 || mobile.length == 0 || landline.length == 0) {
      setnotvalidInput(true);
      setTimeout(() => setnotvalidInput(false), 2000);
    } else {
      await Database.addContact(name, mobile, landline, photo);
      navigation.navigate('home')
      setcontactSave(true);
      setName('');
      setLandline('');
      setMobile('');
      setnotvalidInput(false);
      setTimeout(() => setcontactSave(false), 2000);
    }
  };
  return (
    <View>
      <Text style={styles.Headers}>Add new Contact</Text>
      <View style={{marginTop: 40}}>
        {notvalidInput ? (
          <Text style={{color: 'red', marginLeft: 20, marginTop: 10}}>
            All fields are mandotary:
          </Text>
        ) : null}
        {contactSave ? (
          <Text style={{color: 'green', marginLeft: 20, marginTop: 10}}>
            Your contact have saved successfully:
          </Text>
        ) : null}
        <View style={styles.text}>
          <TextInput placeholder="Name" value={name} onChangeText={setName} />
          <TextInput
            placeholder="Mobile"
            value={mobile}
            onChangeText={setMobile}
          />
          <TextInput
            placeholder="Landline"
            value={landline}
            onChangeText={setLandline}
          />
          <TextInput
            placeholder="photo"
            value={photo}
            onChangeText={setPhoto}
            onPaste={handlePaste}
          />
        </View>
        <View style={styles.Button}>
          <Button color={'seagreen'} title="Save" onPress={saveEntry} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    margin: 15,
    fontSize: 30,
    backgroundColor: 'silver',
    borderWidth: 3,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
  },
  Button: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 3,
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 10,
  },
  Headers: {
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 30,
    color: 'black',
    backgroundColor: 'grey',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    borderRadius: 5,
    height: 60,
    padding: 10,
    borderWidth: 1.5,
  },
});
export default AddContact;
