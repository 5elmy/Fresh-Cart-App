import React from 'react'
import Styles from "../DisConnected/Disconnected.module.css"
export default function Disconnected() {
  return (
    <div className={`text-danger bg-black p-2 ${Styles.overlay}`}>
      You are offline , just now
    </div>
  )
}
