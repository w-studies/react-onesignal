import OneSignal from 'react-onesignal'

import { dotEnv, MOCKED_USER_ID, ONESIGNAL_APP_ID } from '@/configs'
import { useEffect, useState } from 'react'

const settings: TInitOneSignal = {
  appId: ONESIGNAL_APP_ID,
  serviceWorkerParam: { scope: './' },
  serviceWorkerPath: './OneSignalSDKWorker.js',
  serviceWorkerUpdaterPath: './OneSignalSDKWorker.js',
  notifyButton: {
    enable: true
  }
}
if (dotEnv === 'dev.local') {
  settings.allowLocalhostAsSecureOrigin = true
}

export const useOneSignal = () => {
  const [notifications, setNotification] = useState<TNotification[]>([])

  useEffect(() => {
    if (window.OneSignal) return
    OneSignal.init(settings).then(() => {
      OneSignal.Slidedown.promptPush()
      OneSignal.login(MOCKED_USER_ID)
    })
  })

  OneSignal.Notifications.addEventListener(
    'foregroundWillDisplay',
    (e: unknown) => {
      setNotification([...notifications, e as TNotification])
    }
  )

  return { OneSignal, notifications }
}

type TInitOneSignal = {
  appId: string
  serviceWorkerParam?: {
    scope: string
  }
  serviceWorkerPath?: string
  serviceWorkerUpdaterPath?: string
  notifyButton?: object
  allowLocalhostAsSecureOrigin?: boolean
}
export type TNotification = {
  notification: Notification
}
type Notification = {
  notificationId: string
  title: string
  body: string
  additionalData: AdditionalData
  confirmDelivery: boolean
  icon: string
}
type AdditionalData = {
  [key: string]: unknown
}
