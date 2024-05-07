import {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, Button} from 'react-native';
import Database from './Database';
const contactDetail = ({navigation, route}) => {
  const [detail, setDeatils] = useState({});
  const {contactId} = route.params;
  const fetchDetails = async () => {
    const data = await Database.getContactById(contactId);
    setDeatils(data);
  };
  useEffect(() => {
    fetchDetails();
  }, []);
  const deleteContact = async id => {
    await Database.deleteContact(id);
    navigation.navigate('home');
  };
  return (
    <View style={styles.container}>
      <Image source={{uri: detail.photo}} style={styles.Images} />
      <View>
        <Text style={styles.Text}>Name:{detail.name}</Text>
        <Text style={styles.Text}>Mobile:{detail.mobile}</Text>
        <Text style={styles.Text}>Landline:{detail.landline}</Text>
      </View>
      <View style={styles.Button}>
        <Button
          color={'darkred'}
          title="Delete contact"
          onPress={() => deleteContact(detail.id)}></Button>
      </View>
      <View style={styles.Button}>
        <Button title="Update contact" onPress={()=>navigation.navigate('editcontact',{contactId:detail.id})}></Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 70,
    height: 300,
  },
  Images: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  Text: {
    color: 'black',
    fontSize: 22,
    margin: 4,
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    height: 55,
    width: 300,
  },
  Button: {
    width: 300,
    marginBottom: 5,
  },
});
export default contactDetail;
