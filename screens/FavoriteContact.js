import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Database from './Database';
const FavoriteContact = ({navigation}) => {
  const [contacts, setContacts] = useState([]);
  const fetchcontact = async () => {
    const fetchedContacts = await Database.getFavoriteContacts();
    setContacts(fetchedContacts);
  };
  useFocusEffect(
    useCallback(() => {
      fetchcontact();
    }, []),
  );
  const renderContactItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('contactDetails', {contactId: item.id})
        }>
        <View style={styles.contactItem}>
          <View style={styles.contactInfo}>
            <Text>{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Text style={styles.Text}>Fvrt Contact List</Text>
      <FlatList
        data={contacts}
        renderItem={renderContactItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text>No contacts found</Text>}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    margin: 10,
  },
  contactInfo: {
    flex: 1,
  },
  addButton: {
    marginLeft: 10,
  },
  Text: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
});

export default FavoriteContact;
