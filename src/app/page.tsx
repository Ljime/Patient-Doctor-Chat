"use client"

import { useState, useEffect } from "react"
import classes from "./page.module.css"
import Link from "next/link"
import Image from "next/image"
import { Doctor, Patient, User } from "@/Models/Users"
import { doctors, patients, userDoctor, userPatient } from "@/Models/UserData"

function MessageDirectoryPage() {
	const [userList, setUserList] = useState<User[]>([])
	const [currentUser, setCurrentUser] = useState<User>(userDoctor)

	useEffect(() => {
		if (currentUser instanceof Doctor) {
			setUserList(patients)
		} else {
			setUserList(doctors)
		}
	}, [currentUser])

	const toggleUser = () => {
		setCurrentUser(currentUser instanceof Doctor ? userPatient : userDoctor)
	}

	return (
		<div className={classes["page-container"]}>
			<div className={classes["body"]}>
				<h1 className={classes["header"]}>Messages List</h1>
				<button onClick={toggleUser} className={classes["toggle-button"]}>
					{currentUser instanceof Doctor ? "I am a Patient" : "I am a Doctor"}
				</button>
				<div className={classes["search-results"]}>
					{userList.map((user) => (
						<div className={classes["search-item"]} key={user.userId}>
							<div className={classes["search-img-container"]}>
								<Image
									src="/user.jpg"
									alt="User Profile"
									layout="fill"
									className={classes["search-img"]}
								/>
							</div>
							<div className={classes["search-text-container"]}>
								<p>{user.getFullName()}</p>
								{user instanceof Patient && <p>{user.getAge()} year(s) old</p>}
								{user instanceof Doctor && <p>Specialty: {user.getSpecialty()}</p>}
							</div>
							<Link
								href={`/chat?senderId=${currentUser.userId}&receiverId=${user.userId}`}
							>
								<p className={classes["message-button"]}>Message</p>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default MessageDirectoryPage
