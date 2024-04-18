/**
 * Base class for all user types
 * Each User type is extends this class since every user requires a userId, firstName, and lastName
 * as well as a getFullName helper function to easily get the full name of a user
 *  */ 
class User {
	userId: number
	firstName: string
	lastName: string

	constructor(userId: number, firstName: string, lastName: string) {
		this.userId = userId
		this.firstName = firstName
    this.lastName = lastName
	}

	getFullName(): string {
		return `${this.firstName} ${this.lastName}`
	}
}

/**
 * Patient class that extends the User class with some unique information related to a patient
 * that might be useful for a doctor such as their age
 */
class Patient extends User {
	// Possible unique patient data
	age: number

	constructor(
		userId: number,
		firstName: string,
		lastName: string,
		age: number
	) {
		super(userId, firstName, lastName)
		this.age = age
	}

	setAge(age: number): void {
		this.age = age
	}

	getAge(): number {
		return this.age;
	}
}

/**
 * Doctor class that extends the User class with some unique information related to a doctor
 * that might be useful such as their specialty
 */
class Doctor extends User {
	// Possible unique doctor data
	specialty: string

	constructor(userId: number, firstName: string, lastName: string, specialty: string) {
		super(userId, firstName, lastName)
    this.specialty = specialty;
	}

	getSpecialty(): string {
		return this.specialty
	}
}

export { User, Doctor, Patient }