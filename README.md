This is a [Firebase](https://firebase.google.com/) project bootstrapped with [`firebase init`](https://firebaseopensource.com/projects/firebase/firebase-tools/).

# Live Demo [CRUDiful-API](https://api-urxlgrfnhq-uc.a.run.app)
This project uses [Firebase Functions](https://firebase.google.com/docs/functions) to create a RESTful API for a CRUD blog.
It uses [Firebase Firestore](https://firebase.google.com/docs/firestore) to store blog data.
And [Firebase Storage](https://firebase.google.com/docs/storage) to store the blog images.

Function Trigger Url: https://api-urxlgrfnhq-uc.a.run.app

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/11069200-5d04c777-b7c4-4d55-a367-9881e16923b0?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D11069200-5d04c777-b7c4-4d55-a367-9881e16923b0%26entityType%3Dcollection%26workspaceId%3Da9014bb7-ba8a-4149-aa28-e31f31cadecd)

## Running Locally

First clone the repository:

```bash
git clone https://github.com/Onihani/CRUDiful-API.git
```

Navigate into the project directory:

```bash
cd CRUDiful-API
```

Create a project on firebase and update the `.firebaserc` file with your project id:

```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

Use the Firebase CLI to login and select your project:
  
```bash
firebase login
firebase use <your-project-id>
```

Navigate into the functions directory:

```bash
cd functions
```

After, install the dependencies:

```bash
npm install
```

Set up the environment variables. Create a `.env` file in the root directory and copy the contents of `.env.example` into it:

```bash
cat .env.example > .env
```

For File Uploads, you will need to create a bucket in Firebase Storage and update the `BUCKET_NAME` variable in the `.env` file with the name of the bucket.
You would also need to create a service account key and update the `GOOGLE_APPLICATION_CREDENTIALS` variable in the `.env` file with the path to the service account key.

Then, build and run the firebase emulator:

```bash
GOOGLE_APPLICATION_CREDENTIALS="service_account.json"  npm run serve
```

It will start the firebase emulator and you can access the API at the URL provided in the terminal.
Eg: [http://localhost:5001/your-project-id/us-central1/api](http://localhost:5001/your-project-id/us-central1/api) 

## Deploying to Firebase

To deploy the project to Firebase, run the following command:

```bash
firebase deploy
```
