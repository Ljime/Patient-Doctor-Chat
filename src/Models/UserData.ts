import { Doctor, Patient } from "@/Models/Users"

const doctors = [
	new Doctor(1, "Alex", "Chen", "Cardiology"),
	new Doctor(2, "David", "Zhou", "Pediatrics"),
	new Doctor(3, "Lucia", "Kim", "Orthodontist"),
]

const patients = [
	new Patient(4, "Herman", "Vuong", 21),
	new Patient(5, "Will", "Smith", 30),
	new Patient(6, "Tiare", "Mar", 25),
]

const userDoctor = new Doctor(7, "Doctor", "", "Neurology")
const userPatient = new Patient(8, "Patient", "", 23)

const getUserById = (id: number) => {
	const allUsers = [...doctors, ...patients, userDoctor, userPatient]
	return allUsers.find((user) => user.userId === id)
}

export { doctors, patients, getUserById, userDoctor, userPatient }
