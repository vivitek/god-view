import { useFormik } from "formik"
import { LoginSchema } from "../constant"

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      console.log(values)
    }
  })

  return (
    <div className="h-full w-full bg-cover bg-center" style={{backgroundImage: "url(https://source.unsplash.com/random/1920x1080)"}}>
      <div style={{ background: "rgba(0,0,0,0.85)" }} className="w-full h-full flex justify-around items-center">
        <div className="md:w-1/4 hidden md:block">
          <img src="/vivi_white.svg" alt="ViVi logo"/>
          <p align="right" className="text-white">Login</p>
        </div>
        <div className="bg-darkBlue md:h-1/2 md:w-1/5 w-full h-full md:rounded-xl flex-col">
          <form onSubmit={formik.handleSubmit} className="flex-col p-10 h-full">
          <h1 className="text-white font-bold">Sign in</h1>
          <h2 className="text-white mb-5">Enter your email & password</h2>
            <div className="flex flex-wrap h-1/4 md:h-1/2 content-between">
              <div className="flex flex-col w-full">
                <label className="text-white text-sm font-medium">Email address</label>
                <input
                  className="bg-blue text-white pl-1 rounded-md h-9 focus:outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="email"
                  type="email"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-white text-sm font-medium">Password</label>
                <input
                  className="bg-blue text-white pl-1 rounded-md h-9 focus:outline-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="password"
                  type="password"
                />
              </div>
            </div>
            <button //TODO switch to custom button when the lib will be published
              type="submit"
              className="text-white mt-10 font-bold float-right bg-viviBlue py-1.5 px-8 rounded-full w-40 h-12 md:w-auto text-base"
            >SUBMIT</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login