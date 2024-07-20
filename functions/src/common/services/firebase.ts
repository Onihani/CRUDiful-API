// firebase
import * as admin from "firebase-admin";

// service account key
import * as serviceAccount from "../../../service_account.json";

// types
import { CollectionNames } from "@/common/types";

// initialize firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: `gs://${process.env.STORAGE_BUCKET_NAME}.appspot.com`,
});

// export firestore store db
export const db = admin.firestore();

export const storage = admin.storage();

// export firestore store collections
export const collections = {
  [CollectionNames.Blog]: admin.firestore().collection(CollectionNames.Blog),
  [CollectionNames.Article]: admin
    .firestore()
    .collection(CollectionNames.Article),
  [CollectionNames.DraftArticle]: admin
    .firestore()
    .collection(CollectionNames.DraftArticle),
};

// export firebase auth
export const firebaseAuth = admin.auth();
