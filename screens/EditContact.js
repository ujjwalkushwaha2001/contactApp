import {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, Button, TextInput} from 'react-native';
import Database from './Database';
const EditContact = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [landline, setLandline] = useState('');
  const [photo, setPhoto] = useState('');
  const {contactId} = route.params;
  const fetchDetails = async () => {
    const data = await Database.getContactById(contactId);
    setName(data.name);
    setLandline(data.landline);
    setPhoto(data.photo);
    setMobile(data.mobile);
  };
  const handlePaste = event => {
    const pastedText = event.nativeEvent.text;
    setPhoto(pastedText);
  };
  const updateDetails = async () => {
    await Database.updateContact(contactId, name, mobile, landline, photo);
    navigation.navigate('home');
  };
  useEffect(() => {
    fetchDetails();
  }, []);
  return (
    <View style={styles.container}>
      <Image source={{uri: photo}} style={styles.Images} />
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
        <Button title="Update contact" onPress={() => updateDetails()}></Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 40,
    height: 300,
  },
  Images: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  text: {
    marginTop: 10,
    marginLeft: 40,
    marginRight: 40,
    fontSize: 30,
    backgroundColor: 'white',
    borderWidth: 3,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
  },
  Button: {
    width: 300,
    marginBottom: 5,
  },
});
export default EditContact;
