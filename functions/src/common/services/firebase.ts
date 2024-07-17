// firebase
import * as admin from "firebase-admin";

// types
import { CollectionNames } from "@/common/types";

// initialize firebase
admin.initializeApp();

// export firestore store db
export const db = admin.firestore();

// export firestore store collections
export const collections = {
  [CollectionNames.Article]: admin
    .firestore()
    .collection(CollectionNames.Article),
  [CollectionNames.DraftArticle]: admin
    .firestore()
    .collection(CollectionNames.DraftArticle),
};

// export firebase auth
export const firebaseAuth = admin.auth();
