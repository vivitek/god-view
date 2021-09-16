import { useFormik } from "formik"

const BoxForm = ({callback}) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      url: ""
    },
    onSubmit: (values) => callback(values)
  })
  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col bg-darkBlue p-8 rounded-2xl">
      <label>Name</label>
      <input
        type="name"
        name="name"
        className="bg-blue text-white pl-1 rounded-md h-9 focus:outline-none"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
      />
      <label className="mt-6">Url</label>
      <input
        type="text"
        name="url"
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

export default BoxForm