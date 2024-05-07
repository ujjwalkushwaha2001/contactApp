import React, {useCallback, useState,useEffect} from 'react';
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
const Home = ({navigation}) => {
  const [contacts, setContacts] = useState([]);
  const [flag, setFlag] = useState(false);
  const fetchcontact = async () => {
    const fetchedContacts = await Database.getContacts();
    setContacts(fetchedContacts);
  };
  const addToFvrt = async id => {
    await Database.toggleFavorite(id, 1);
    fetchContacts();
  };
  const removeToFvrt = async id => {
    await Database.toggleFavorite(id, 0);
    fetchContacts();
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
          {item.isFavorite ? (
            <View style={styles.addButton}>
              <Button
                title="Remove from fvrt"
                onPress={() => removeToFvrt(item.id)}
              />
            </View>
          ) : (
            <View style={styles.addButton}>
              <Button title="Add to fvrt" onPress={() => addToFvrt(item.id)} />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Text style={styles.Text}>Contact List</Text>
      <FlatList
        data={contacts}
        renderItem={renderContactItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text>No contacts found</Text>}
      />
      <Button
        title="Add Contact"
        onPress={() => navigation.navigate('addcontact')}
      />
      <Button
        title="Fvrt Contact"
        onPress={() => navigation.navigate('favoritecontact')}
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

export default Home;
