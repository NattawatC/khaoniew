"use client"

import { Navbar } from "@/components/Navbar"
import { MainLayout } from "@/components/layout"
import PatientCard from "@/components/patientCard"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

const props = [
  {
    status: "Not approved",
    firstName: "สมชาย",
    lastName: "ใจดี",
    age: 30,
    gender: "ชาย",
    address: "123 หมู่ 1 ต.ท่าตูม อ.เมือง จ.เชียงใหม่ 50000",
    tel: "0812345678",
    description:
      "โปรดพิจารณานิสัยการกินของคุณ หากรับประทานอาหารไม่ถูกต้องจะต้องรีบไปพบแพทย์",
    medicalCondition: ["โรคเบาหวาน", "โรคความดันโลหิตสูง"],
  },
  {
    status: "Approved",
    firstName: "สมหญิง",
    lastName: "ใจดี",
    age: 30,
    gender: "หญิง",
    address: "123 หมู่ 1 ต.ท่าตูม อ.เมือง จ.เชียงใหม่ 50000",
    tel: "0812345678",
    description:
      "โปรดพิจารณานิสัยการกินของคุณ หากรับประทานอาหารไม่ถูกต้องจะต้องรีบไปพบแพทย์",
    medicalCondition: ["โรคเบาหวาน", "โรคความดันโลหิตสูง"],
  },
]  

interface PatientData {
  status: string;
  name: string;
  surname: string;
  age: number;
  gender: string;
  medicalCondition: string;
}

const Patient: NextPage = () => {

  const [patients, setPatients] = useState<PatientData[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch("http://localhost:3000/patients");
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

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
          {patients.map((person, index) => (
            <PatientCard
              key={index}
              status={person.status}
              firstName={person.name}
              lastName={person.surname}
              age={person.age}
              gender={person.gender}
              medicalCondition={person.medicalCondition}
            />
          ))}
        </div>
      </MainLayout>
    </>
  );
};

export default Patient;