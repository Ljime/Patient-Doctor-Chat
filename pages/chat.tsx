"use client"
import React, { useEffect, useState } from "react"
import styles from "./chat.module.css"
import { ChatHistory } from "@/Models/Messages"
import { Doctor, Patient, User } from "@/Models/Users"
import Link from "next/link"
import { useRouter } from "next/router"
import { getUserById } from "@/Models/UserData"

function Chat() {
	const router = useRouter()
	const { senderId, receiverId } = router.query

	const [chatHistory, setChatHistory] = useState<ChatHistory>()
	const [newMessage, setNewMessage] = useState("")
	const [sender, setSender] = useState<User>()
	const [receiver, setReceiver] = useState<User>()

	useEffect(() => {
		if (
			senderId &&
			receiverId &&
			typeof senderId === "string" &&
			typeof receiverId === "string"
		) {
			const sender = getUserById(parseInt(senderId))
			const receiver = getUserById(parseInt(receiverId))

			if (!(sender instanceof User) || !(receiver instanceof User)) {
				return
			}

			if (sender instanceof Doctor && receiver instanceof Patient) {
				setChatHistory(new ChatHistory(receiver, sender))
			} else if (sender instanceof Patient && receiver instanceof Doctor) {
				setChatHistory(new ChatHistory(sender, receiver))
			}

			setSender(sender)
			setReceiver(receiver)
		}
	}, [senderId, receiverId])

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (newMessage.trim() !== "" && chatHistory && sender) {
			chatHistory.addMessage(sender, newMessage)
			setChatHistory(chatHistory)
			setNewMessage("")
		}
	}

	const toggleUser = () => {
		const tempReceiver = receiver
		setReceiver(sender)
		setSender(tempReceiver)
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
					{sender instanceof Doctor ? "I am a Patient" : "I am a Doctor"}
				</button>
			</div>
			<form className={styles["new-message-form"]} onSubmit={handleSubmit}>
				<p>Speaking to: {receiver?.getFullName()}</p>
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
				{chatHistory &&
					[...chatHistory.messages].reverse().map((msg, index) => (
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
