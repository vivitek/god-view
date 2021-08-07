import { useMutation } from "@apollo/client"
import { useFormik } from "formik"
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import { LoginSchema } from "../constant"
import { LOGIN } from "../utils/graphql"

const Login = () => {
  const history = useHistory()
  const [login] = useMutation(LOGIN)
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const res = await login({
          variables: {
            loginData: values
          }
        })
        if (!res.data.login.access_token) {
        toast.error('Something went wrong :(')
          return
        }
        localStorage.setItem("VIVI_godview_token", res.data.login.access_token)
        localStorage.setItem("VIVI_godview_user", res.data.login.user)
        history.push('/')
        toast.info(`Welcome back ${res.data.login.user.username} !`)
      } catch (err) {
        toast.error('Something went wrong :(')
      }
    }
  })

  return (
    <div className="h-full w-full bg-cover bg-center" style={{backgroundImage: "url(https://source.unsplash.com/random/1920x1080)"}}>
      <div style={{ background: "rgba(0,0,0,0.85)" }} className="w-full h-full flex justify-around items-center">
        <div className="md:w-1/5 hidden md:block">
          <img src="/vivi_white.svg" alt="VIVI logo"/>
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