"use client"

import { useState, useEffect } from "react"
// import NavBar from "../components/NavBar"
import classes from "./page.module.css"
import Link from "next/link"
import Image from "next/image"
import { Doctor, Patient, User } from "@/Models/Users"

// Dummy user lists
const doctors = [
	new Doctor(1, "Alex", "Chen", "Cardiology"),
	new Doctor(2, "David", "Zhou", "Pediatrics"),
	new Doctor(3, "Lucia", "Kim", "Orthodonist"),
]

const patients = [
	new Patient(4, "Herman", "Vuong", 21),
	new Patient(5, "Will", "Smith", 30),
	new Patient(6, "Tiare", "Mar", 25),
]

const doctorUser = new Doctor(7, "Doctor", "White", "Neurology")
const patientUser = new Patient(8, "Patient", "Brown", 23)

function MessageDirectoryPage() {
	const [userList, setUserList] = useState<User[]>([])
	const [currentUser, setCurrentUser] = useState<User>(doctorUser)

	useEffect(() => {
		if (currentUser instanceof Doctor) {
			setUserList(patients)
		} else {
			setUserList(doctors)
		}
	}, [currentUser])

	const toggleUser = () => {
		setCurrentUser(currentUser instanceof Doctor ? patientUser : doctorUser)
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
								{user instanceof Patient && <p>{user.age} year(s) old</p>}
								{user instanceof Doctor && <p>Specialty: {user.specialty}</p>}
							</div>
							<Link href={`/chat`}>
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
