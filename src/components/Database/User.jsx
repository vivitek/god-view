import { useFormik } from "formik"

const UserForm = ({callback}) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: ""
    },
    onSubmit: (values) => callback(values)
  })
  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col bg-darkBlue p-8 rounded-2xl">
      <label className="mt-6">Username</label>
      <input
        type="username"
        name="username"
        className="bg-blue text-white pl-1 rounded-md h-9 focus:outline-none"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
      />
      <label className="mt-6">Email</label>
      <input
        type="email"
        name="email"
        className="bg-blue text-white pl-1 rounded-md h-9 focus:outline-none"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
      />
      <label className="mt-6">Password</label>
      <input
        type="password"
        name="password"
        className="bg-blue text-white pl-1 rounded-md h-9 focus:outline-none"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
      />
      <button
        type="submit"
        className="text-white mt-10 font-bold float-right bg-viviBlue py-1.5 px-8 rounded-full w-40 h-12 xl:w-auto text-base"
      >SAVE</button>

    </form>
  )
}

export default UserForm