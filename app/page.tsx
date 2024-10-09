"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  occupation: string;
}

export default function Home() {
  const [persons, setPersons] = useState<Person[]>([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [occupation, setOccupation] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [currentPersonId, setCurrentPersonId] = useState<number | null>(null);

  useEffect(() => {
    const fetchPersons = async () => {
      const response = await fetch("/api/person");
      const data = await response.json();
      setPersons(data);
    };
    fetchPersons();
  }, []);

  const handleSubmit = async () => {
    const response = await fetch("/api/person", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth,
        gender,
        occupation,
      }),
    });
    const data = await response.json();
    setPersons([...persons, data]);
    handleReset();
  };
  const handleUpdate = async (person: Person) => {
    const response = await fetch(`/api/person/${person.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    const data = await response.json();
    setPersons(persons.map((p) => (p.id === person.id ? data : p)));
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setDateOfBirth("");
    setGender("");
    setOccupation("");
    console.log(data);
    handleReset();
  };
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/person/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      setPersons(persons.filter((person) => person.id !== id));
    } catch (error) {
      console.error(error);
    }
    handleReset();
  };

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setDateOfBirth("");
    setGender("");
    setOccupation("");
  };
  const handleEdit = (person: Person) => {
    setFirstName(person.firstName);
    setLastName(person.lastName);
    setEmail(person.email);
    setPhone(person.phone);
    setDateOfBirth(person.dateOfBirth);
    setGender(person.gender);
    setOccupation(person.occupation);
    setIsEditing(true);
    setCurrentPersonId(person.id);
  };
  const handleButtonClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isEditing && currentPersonId !== null) {
      handleUpdate({
        id: currentPersonId,
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth,
        gender,
        occupation,
      });
    } else {
      await handleSubmit();
    }
    setIsEditing(false);
    handleReset();
  };

  return (
    <div className="flex flex-col min-h-screen place-items-center bg-slate-600">
      <text className="text-3xl font-bold text-white">Data Entry Form</text>
      <section className=" w-full p-4 items-center justify-center mt-10">
        <form className=" w-full grid grid-cols-2 bg-emerald-900 gap-y-4 gap-x-4  py-2 px-8 rounded-md text-white">
          <div className="flex flex-col">
            <label htmlFor="">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="py-2 px-3 rounded-md text-black"
              placeholder="First Name"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="py-2 px-3 rounded-md text-black"
              placeholder="Last Name"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="py-2 px-3 rounded-md text-black"
              placeholder="Email"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="">Occupation</label>
            <input
              type="text"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className="py-2 px-3 rounded-md text-black"
              placeholder="Occupation"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="">Phone</label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="py-2 px-3 rounded-md text-black"
              placeholder="Phone"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="">Date of Birth</label>
            <input
              type="date"
              className="py-2 px-3 rounded-md text-black"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Gender</label>
            <select
              name=""
              id=""
              className="py-2 px-3 rounded-md text-black"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex items-start justify-center">
            <button
              className="bg-emerald-400 p-2 rounded-md hover:bg-emerald-700 text-black hover:text-white"
              onClick={handleButtonClick}
            >
              {isEditing ? "Update" : "Submit"}
            </button>
            <button
              className="bg-yellow-400 p-2 rounded-md hover:bg-yellow-700 text-black hover:text-white ml-2"
              onClick={handleReset}
            >
              Cancel
            </button>
          </div>
        </form>

        <h1 className="text-xl font-bold text-white text-center mt-1">
          Person Data
        </h1>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-2">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                First Name
              </th>
              <th scope="col" className="px-6 py-3">
                Last Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Occupation
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Date of Birth
              </th>
              <th scope="col" className="px-6 py-3">
                Gender
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {persons.map((person) => (
              <tr
                className="bg-slate-800 hover:bg-slate-900 text-gray-300 border-b dark:bg-gray-800 dark:border-gray-700"
                key={person.id}
              >
                <td className="px-6 py-4">{person.firstName}</td>
                <td className="px-6 py-4">{person.lastName}</td>
                <td className="px-6 py-4">{person.email}</td>
                <td className="px-6 py-4">{person.occupation}</td>
                <td className="px-6 py-4">{person.phone}</td>
                <td className="px-6 py-4">{person.dateOfBirth}</td>
                <td className="px-6 py-4">{person.gender}</td>

                <td className="px-6 py-4 flex-col items-center justify-center">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => handleEdit(person)}
                  >
                    Edit
                  </button>
                  <button
                    className="font-medium mx-2 text-red-600 dark:text-red-500 hover:underline"
                    onClick={() => handleDelete(person.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
