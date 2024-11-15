import {
  Client,
  Account,
  ID,
  Databases,
  Query,
  Avatars,
} from "react-native-appwrite";

const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.dazzler.todoApp",
  projectId: "6736006a00255882c2e4",
  databaseId: "67360109000908066dbe",
  userCollectionId: "67360323001f2ba4ea1d",
  todoCollectionId: "6736013c001510d793cc",
};

const {
  endpoint,
  platform,
  projectId,
  userCollectionId,
  todoCollectionId,
  databaseId,
} = appwriteConfig;

const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setPlatform(platform);

const account = new Account(client);
const database = new Databases(client);
const avatars = new Avatars(client);

export const createUser = async (username, email, password) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signInUser(email, password);

    const newUser = await database.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (err) {
    console.log(err);
  }
};

export async function signInUser(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (err) {
    throw new Error(err);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) {
      throw Error;
    }

    const currentUser = await database.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (err) {
    console.log(err);
  }
};

export async function signOut() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getTodos(userId) {
  try {
    const todos = await database.listDocuments(databaseId, todoCollectionId, [
      Query.equal("createdBy", userId),
      Query.orderDesc("$createdAt"),
    ]);
    return todos.documents;
  } catch (err) {
    throw new Error(err);
  }
}

export async function addTodo(todoString, userId) {
  try {
    await database.createDocument(databaseId, todoCollectionId, ID.unique(), {
      todo: todoString,
      completed: false,
      edit: false,
      createdBy: userId,
    });
  } catch (err) {
    throw new Error(err);
  }
}

export async function todoComplete(id, complete) {
  try {
    await database.updateDocument(databaseId, todoCollectionId, id, {
      completed: !complete,
    });
  } catch (err) {
    throw new Error(err);
  }
}

export async function changeEditValue(id) {
  try {
    await database.updateDocument(databaseId, todoCollectionId, id, {
      edit: true,
    });
  } catch (err) {
    throw new Error(err);
  }
}

export async function completeEdit(id, newTodo) {
  try {
    await database.updateDocument(databaseId, todoCollectionId, id, {
      todo: newTodo,
      edit: false,
    });
  } catch (err) {
    throw new Error(err);
  }
}

export async function deleteTodo(id) {
  try {
    await database.deleteDocument(databaseId, todoCollectionId, id);
  } catch (err) {
    throw new Error(err);
  }
}
