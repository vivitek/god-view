import { useFormik } from "formik"

const BoxForm = ({callback}) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      url: "",
      certificat: ""
    },
    onSubmit: (values) => callback(values)
  })

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col bg-darkBlue p-8 rounded-xl shadow-xl mb-4">
      <h2 class="text-white text-3xl font-itc">Create box</h2>
      <h2 className="text-white mb-5 text-md">Type informations below</h2>
      <div className="flex flex-col w-full mt-4">
        <label className="text-white text-base font-medium mb-1">Name</label>
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
        <label className="text-white text-base font-medium mb-1">URL</label>
        <input
          className="bg-gray-200 dark:bg-[#313E68] border-none rounded-xl"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="url"
          type="text"
          required
        />
      </div>
      <div className="flex flex-col w-full mt-4">
        <label className="text-white text-base font-medium mb-1">Certificat</label>
        <input
          className="bg-gray-200 dark:bg-[#313E68] border-none rounded-xl"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="certificat"
          type="text"
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

export default BoxForm