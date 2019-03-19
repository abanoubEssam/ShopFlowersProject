import * as admin from 'firebase-admin'
import { PushNotifiModel } from '../models/user-push-token.models'
var serviceAccount = require("../demoapp-36a8a-firebase-adminsdk-lif7y-5061a110a8.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://demoapp-36a8a.firebaseio.com"
});

import { NotifiModel } from '../models/notification.models'


export async function sendNotifi(user, text) {
  // Retrieve Firebase Messaging object.

  await NotifiModel.create({
    user,
    text
  })
  sendPushNotifi(user, text)

}

export async function sendPushNotifi(user, text) {
  let documentToken = await PushNotifiModel.findOne({user});
  if(!documentToken) return
  const message = {
    notification: { title: 'اشعار جديد', body: text },
    data: { text },
    tokens: documentToken.tokens
  }

  admin.messaging().sendMulticast(message).then((response) => {
    console.log(response.successCount + ' messages were sent successfully');
  })

}