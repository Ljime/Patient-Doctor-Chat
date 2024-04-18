"use client"
import React, { useState } from "react"
import styles from "./chat.module.css"
import { ChatHistory, Message } from "@/Models/Messages"
import { Doctor, Patient, User } from "@/Models/Users"
import Link from "next/link"

function Chat() {
	const doctor = new Doctor(7, "Doctor", "", "Neurology")
	const patient = new Patient(8, "Patient", "", 23)

	const [chatHistory, setChatHistory] = useState(
		new ChatHistory(patient, doctor)
	)
	const [newMessage, setNewMessage] = useState("")
	const [currentUser, setCurrentUser] = useState<User>(doctor) // initially set to doctor

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (newMessage.trim() !== "") {
			chatHistory.addMessage(currentUser, newMessage)
			setChatHistory(chatHistory)
			setNewMessage("")
		}
	}

	const toggleUser = () => {
		setCurrentUser(currentUser instanceof Doctor ? patient : doctor)
	}

	return (
		<div className={styles["message-container"]}>
			<Link href={"/"}>
				<button className={`${styles["send-button"]} ${styles["back-button"]}`}>
					Back
				</button>
			</Link>
			<div className={styles["header"]}>
				<h2 className={styles["title"]}>Chat History</h2>
				<button onClick={toggleUser} className={styles["send-button"]}>
					{currentUser instanceof Doctor ? "I am a Patient" : "I am a Doctor"}
				</button>
			</div>
			<form className={styles["new-message-form"]} onSubmit={handleSubmit}>
				<p>
					Speaking to:{" "}
					{currentUser instanceof Doctor
						? patient.getFullName()
						: doctor.getFullName()}
				</p>
				<div>
					<input
						type="text"
						name="message"
						placeholder="Type your message here..."
						required
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
						className={styles["message-input"]}
					/>
				</div>
				<button className={styles["send-button"]} type="submit">
					Send
				</button>
			</form>

			<div className={styles["chat-history"]}>
				{[...chatHistory.messages].reverse().map((msg, index) => (
					<div
						key={index}
						className={
							msg.sender instanceof Patient
								? styles["patient-comment"]
								: styles["doctor-comment"]
						}
					>
						<p>{msg.sender.getFullName()} says:</p>
						<p>{msg.message}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default Chat
