import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useOneSignal } from './services/useOneSignal'
import { sendNotification } from './services/api'
import { useState } from 'react'

function App() {
  const { notifications } = useOneSignal()
  const [title, setTitle] = useState('')

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://onesignal.com" target="_blank">
          <img src="oneSignal.png" className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 style={{ fontWeight: 500 }}>Vite + React + OneSignal</h1>
      <div className="card">
        <div className="d-flex g-2">
          <input
            type="text"
            placeholder="Notification title"
            value={title}
            onInput={e => setTitle(e.currentTarget.value)}
            autoFocus
          />
          <button
            onClick={() => {
              sendNotification(title)
            }}
          >
            send notification
          </button>
        </div>
        <main>
          {notifications &&
            notifications.map(
              ({
                notification: { notificationId, title, body, additionalData }
              }) => (
                <pre key={notificationId}>
                  {JSON.stringify({ title, body, additionalData }, null, 2)}
                </pre>
              )
            )}
        </main>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite, React and OneSignal logos to learn more
      </p>
    </>
  )
}

export default App
