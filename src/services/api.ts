import { MOCKED_USER_ID, ONESIGNAL_APP_ID, ONE_SIGNAL_API_KEY } from '@/configs'
import axios from 'axios'

const options = {
  method: 'POST',
  url: 'https://onesignal.com/api/v1/notifications',
  headers: {
    accept: 'application/json',
    Authorization: `Basic ${ONE_SIGNAL_API_KEY}`,
    'content-type': 'application/json'
  },
  data: {
    app_id: ONESIGNAL_APP_ID,
    include_external_user_ids: [MOCKED_USER_ID],
    contents: { en: 'Message content' },
    headings: { en: 'Default title' },
    data: { foo: 'bar' },
    web_buttons: [
      {
        id: 'id1',
        text: 'button1',
        icon: 'http://i.imgur.com/N8SN8ZS.png',
        url: 'https://yoursite.com'
      },
      {
        id: 'id2',
        text: 'button2',
        icon: 'http://i.imgur.com/MIxJp1L.png',
        url: 'https://yoursite.com'
      }
    ]
  }
}

export const sendNotification = (title: string) => {
  if (title) {
    options.data.headings.en = title
  }
  axios
    .request(options)
    .then(function (response) {
      console.log('success: ', response.data)
    })
    .catch(function (error) {
      console.error('error: ', error)
    })
}
