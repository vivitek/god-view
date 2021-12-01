import { useFormik } from "formik"

const UserForm = ({ callback }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: ""
    },
    onSubmit: (values) => callback(values)
  })
  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col bg-darkBlue p-8 rounded-xl shadow-xl m-4">
      <h2 class="text-white text-3xl font-itc">Create user</h2>
      <h2 className="text-white mb-5 text-md">Type informations below</h2>
      <div className="flex flex-col w-full">
        <label className="text-white text-base font-medium mb-1">Email</label>
        <input
          className="bg-gray-200 dark:bg-[#313E68] border-none rounded-xl"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="email"
          type="email"
          required
        />
      </div>
      <div className="flex flex-col w-full mt-4">
        <label className="text-white text-base font-medium mb-1">Username</label>
        <input
          className="bg-gray-200 dark:bg-[#313E68] border-none rounded-xl"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="username"
          type="text"
          required
        />
      </div>
      <div className="flex flex-col w-full mt-4">
        <label className="text-white text-base font-medium mb-1">Password</label>
        <input
          className="bg-gray-200 dark:bg-[#313E68] border-none rounded-xl"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="password"
          type="password"
          required
        />
      </div>
      <div className="w-full flex justify-end mt-4">
        <button type="submit" className="bg-viviYellOrange uppercase text-white mt-1 px-6 py-2 rounded-full hover:bg-blue-600 transition duration-200 each-in-out font-sans font-bold">
          SUBMIT
        </button>
      </div>
    </form>
  )
}

export default UserForm