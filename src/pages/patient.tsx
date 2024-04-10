"use client"

import { Navbar } from "@/components/Navbar"
import { MainLayout } from "@/components/layout"
import PatientCard from "@/components/patientCard"
import { NextPage } from "next"
import { useEffect, useState } from "react"

interface PatientData {
  status: string
  firstname: string
  lastname: string
  age: number
  gender: string
  medicalCondition: string
  thaiId: string
}

interface PatientStatus {
  patientId: string
  reviewStatus: boolean
}

const Patient: NextPage = () => {
  const [patients, setPatients] = useState<PatientData[]>([])
  const [status, setStatus] = useState<PatientStatus[]>([])
  const staffName = localStorage.getItem("staffName")

  useEffect(() => {
    const fetchPatientsAndMedicalConditions = async () => {
      try {
        const response = await fetch("http://localhost:4263/patients")
        if (!response.ok) {
          throw new Error("Failed to fetch patients")
        }
        const patientsData: PatientData[] = await response.json()

        const patientsWithMedicalConditions = await Promise.all(
          patientsData.map(async (patient: PatientData) => {
            const medicalConditionsResponse = await fetch(
              `http://localhost:4263/patients/${patient.thaiId}/medicalconditions`
            )
            if (!medicalConditionsResponse.ok) {
              throw new Error("Failed to fetch medical conditions")
            }
            const medicalConditions = await medicalConditionsResponse.json()
            const medicalConditionString = medicalConditions.join(", ")
            return { ...patient, medicalCondition: medicalConditionString }
          })
        )

        setPatients(patientsWithMedicalConditions)
      } catch (error) {
        console.error("Error fetching patients and medical conditions:", error)
      }
    }

    fetchPatientsAndMedicalConditions()
  }, [])

  useEffect(() => {
    const fetchPatientsWithReviewStatus = async () => {
      try {
        const response = await fetch("http://localhost:4263/patients")
        if (!response.ok) {
          throw new Error("Failed to fetch patients")
        }
        const patientsData: PatientData[] = await response.json()

        const mealsData = await Promise.all(
          patientsData.map(async (patient: PatientData) => {
            const mealsResponse = await fetch(
              `http://localhost:4263/patients/${patient.thaiId}/meals`
            )
            if (!mealsResponse.ok) {
              throw new Error("Failed to fetch meals")
            }
            const mealsData: PatientStatus[] = await mealsResponse.json()

            const reviewStatuses = mealsData.map((meal) => meal.reviewStatus)

            const status =
              reviewStatuses.length > 0 &&
              reviewStatuses.every(
                (status) => status === true || status === undefined
              )

            const patientStatus: PatientStatus = {
              patientId: patient.thaiId,
              reviewStatus: status,
            }

            return patientStatus
          })
        )
        setStatus(mealsData)
      } catch (error) {
        console.error("Error fetching patients and medical conditions:", error)
      }
    }

    fetchPatientsWithReviewStatus()
  }, [])

  return (
    <>
      <Navbar username={staffName}/>
      <MainLayout className="flex flex-col gap-4 bg-primary">
        <div className="flex flex-col gap-4">
          <h1 className="flex justify-center text-3xl">รายชื่อผู้ใช้</h1>
        </div>
        <div className="flex flex-col gap-4">
          {patients.map((person, item) => {
            const patientStatus = status.find(
              (s) => s.patientId === person.thaiId
            )
            console.log(patientStatus)

            return (
              <PatientCard
                key={item}
                patientId={person.thaiId}
                status={patientStatus?.reviewStatus || false}
                firstName={person.firstname}
                lastName={person.lastname}
                age={person.age}
                gender={person.gender}
                medicalCondition={person.medicalCondition}
              />
            )
          })}
        </div>
      </MainLayout>
    </>
  )
}

export default Patient
