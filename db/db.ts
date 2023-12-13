import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("my_db.db");
  return db;
}

export const db = openDatabase();

export const database = (text: string, arr: any) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(text, [...arr], (_, results) => {
        resolve(results);
      });
    });
  });
};
