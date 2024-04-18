import { Doctor, Patient, User } from "./Users"

/**
 * A simple class defining a message, each message includes the sender that sent it 
 * as well as the message content and messageId
 */
class Message {
	sender: User
	message: string
	messageId: number

	constructor(messageId: number, sender: User, message: string) {
		this.messageId = messageId
		this.sender = sender
		this.message = message
	}
}

/**
 * A class defining a chat history between a patient and a doctor as well as their messages array
 * Includes an add message helper which would add a message to the chat history
 */
class ChatHistory {
	patient: Patient
	doctor: Doctor
	messages: Message[]

	constructor(patient: Patient, doctor: Doctor) {
		this.patient = patient
		this.doctor = doctor
		this.messages = []
	}

	// Add a message to the chat history
	addMessage(sender: User, message: string): void {
		if (this.messages.length === 0) {
			this.messages.push(new Message(1, sender, message))
			return
		}

		this.messages.push(
			new Message(
				this.messages[this.messages.length - 1].messageId + 1,
				sender,
				message
			)
		)
	}
}

export { Message, ChatHistory }
