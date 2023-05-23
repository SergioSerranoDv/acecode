/** @format */
'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
export default function Modal({ setOpen, id, service }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  console.log(id)
  const onsubmit = async (data, e, id) => {
    e.preventDefault()
    try {
      await fetch(`http://localhost:5000/dashboard?id=${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.error)
          } else {
            alert('User Updated Succesfully')
            window.location.reload()
          }
        })
    } catch (eror) {
      return { error: eror.message }
    }
  }
  return (
    <div>
      <div className="fixed inset-0  bg-black bg-opacity-60 blur-lg" />
      <div className=" fixed top-[20px] left-[450px] w-[600px] h-[600px] bg-ceniza rounded-xl">
        <button
          className="absolute top-4 right-4"
          onClick={() => setOpen(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="red"
            className="w-8 h-8">
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <form
          className=" flex-col w-[440px] h-[480px] ml-[150px] mt-[110px] "
          onSubmit={handleSubmit(onsubmit)}>
          <h1 className=" font-bold font-Inter text-[26px] ">Edit Now!</h1>
          <h2 className="font-normal font-Inter text-[18px] mt-[3px]">
            welcome Back
          </h2>
          <div className="flex mt-[40px]">
            <input
              readOnly
              className="w-[307px] h-[60px] mt-2 rounded-[30px] px-[65px]  bg-white  text-ceniza cursor-pointer"
              id="email"
              placeholder={service}></input>
          </div>

          <div className="flex mt-4">
            <input
              type="text"
              {...register('link', { required: true })}
              className="w-[307px] h-[60px] mt-2 rounded-[30px] px-[65px] bg-white text-ceniza cursor-pointer"
              id="password"
              placeholder="Image Link"></input>
          </div>
          <div className="flex-col mt-4">
            <button
              type="submit"
              className="w-[307px] h-[60px] rounded-[30px] bg-newRed ">
              Update
            </button>
          </div>
        </form>
        <form></form>
      </div>
    </div>
  )
}
