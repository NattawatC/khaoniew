"use client"

import { Navbar } from "@/components/Navbar"
import { MainLayout } from "@/components/layout"
import PatientCard from "@/components/patientCard"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

interface ThaiId {
  thaiId: string
}

interface PatientData {
  status: string
  firstname: string
  lastname: string
  age: number
  gender: string
  medicalCondition: string
  thaiId: string
}

const Patient: NextPage = () => {
  const [patients, setPatients] = useState<PatientData[]>([])
  const router = useRouter()

  // useEffect(() => {
  //   fetchPatients()
  // }, [])

  // const fetchPatients = async () => {
  //   try {
  //     const response = await fetch("http://localhost:4263/patients")
  //     const data = await response.json()
  //     setPatients(data)
  //     console.log("patients fetched: ", data)
  //   } catch (error) {
  //     console.error("Error fetching patients:", error)
  //   }
  // }

  useEffect(() => {
    const fetchPatientsAndMedicalConditions = async () => {
      try {
        const response = await fetch("http://localhost:4263/patients")
        if (!response.ok) {
          throw new Error("Failed to fetch patients")
        }
        const patientsData = await response.json()

        const patientsWithMedicalConditions = await Promise.all(
          patientsData.map(async (patient: any) => {
            // Add type any here
            const medicalConditionsResponse = await fetch(
              `http://localhost:4263/patients/${patient.thaiId}/medicalconditions`
            )
            if (!medicalConditionsResponse.ok) {
              throw new Error("Failed to fetch medical conditions")
            }
            const medicalConditions = await medicalConditionsResponse.json()
            const medicalConditionString = medicalConditions.join(", ")
            return { ...patient, medicalCondition: medicalConditionString } // Change property name to match PatientData
          })
        )

        setPatients(patientsWithMedicalConditions)
        console.log(patientsWithMedicalConditions)
      } catch (error) {
        console.error("Error fetching patients and medical conditions:", error)
      }
    }

    fetchPatientsAndMedicalConditions()
  }, [])

  // const goToAddFood = () => {
  //   router.push("/addFood");
  // };

  return (
    <>
      <Navbar />
      <MainLayout className="flex flex-col gap-4 bg-primary">
        <div className="flex flex-col gap-4">
          <h1 className="flex justify-center text-3xl">รายชื่อผู้ใช้</h1>
        </div>
        <div className="flex flex-col gap-4">
          {patients.map((person) => (
            <PatientCard
              key={person.thaiId}
              status={person.status}
              firstName={person.firstname}
              lastName={person.lastname}
              age={person.age}
              gender={person.gender}
              medicalCondition={person.medicalCondition}
            />
          ))}
        </div>
      </MainLayout>
    </>
  )
}

export default Patient
