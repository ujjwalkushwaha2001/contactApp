import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);
let db; // Global variable for database connection
const openDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabase({name: 'contacts.db', location: 'default'});
    console.log('Database opened successfully');
  }
  return db;
};
const createTables = async db => {
  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        mobile TEXT,
        landline TEXT,
        photo TEXT,
        isFavorite INTEGER DEFAULT 0
      )
    `;
  try {
    await db.transaction(async tx => {
      await tx.executeSql(createTableQuery);
    });
    console.log('Table created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
  }
};
const Database = {
    getContacts: async () => {
        const db = await openDatabase();
        await createTables(db);
    try {
      const [result] = await db.executeSql(
        'SELECT * FROM contacts ORDER BY name ASC',
        [],
      );
      return result.rows.raw();
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return [];
    }
  },
  getContactById: async (id) => {
    const db = await openDatabase();
    await createTables(db);
    try {
        const [result] = await db.executeSql(
            'SELECT * FROM contacts WHERE id = ?',
            [id],
        );
        return result.rows.item(0); 
    } catch (error) {
        console.error('Error fetching contact by ID:', error);
        return null;
    }
},

  addContact: async (name, mobile, landline, photo) => {
      const db = await openDatabase();
      await createTables(db);

    console.log(name);
    console.log(mobile);
    console.log(landline);
    console.log(photo);
    const insertQuery =
      'INSERT INTO contacts (name, mobile, landline, photo) VALUES (?, ?, ?, ?)';
    try {
      await db.executeSql(insertQuery, [name, mobile, landline, photo]);
      console.log('Contact added successfully');
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  },
  updateContact: async (id, name, mobile, landline, photo) => {
    const updateQuery =
      'UPDATE contacts SET name = ?, mobile = ?, landline = ?, photo = ? WHERE id = ?';
    await db.executeSql(updateQuery, [name, mobile, landline, photo, id]);
  },

  deleteContact: async id => {
    const deleteQuery = 'DELETE FROM contacts WHERE id = ?';
    await db.executeSql(deleteQuery, [id]);
  },

  toggleFavorite: async (id, isFavorite) => {
    const updateQuery = 'UPDATE contacts SET isFavorite = ? WHERE id = ?';
    await db.executeSql(updateQuery, [isFavorite ? 1 : 0, id]);
  },

  getFavoriteContacts: async () => {
    const [result] = await db.executeSql(
      'SELECT * FROM contacts WHERE isFavorite = 1 ORDER BY name ASC',
      [],
    );
    return result.rows.raw();
  },
};

export default Database;
