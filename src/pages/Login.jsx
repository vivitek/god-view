import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { LOGIN } from "../utils/graphql";
import { LoginSchema } from "../utils/constants";
import { useHistory } from "react-router";

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
        if (!res.data.loginGodView.access_token) {
        toast.error('Something went wrong :(')
          return
        }
        localStorage.setItem("VIVI_godview_token", res.data.loginGodView.access_token)
        localStorage.setItem("VIVI_godview_user", JSON.stringify(res.data.loginGodView.user))
        history.push('/')
        toast.info(`Welcome back ${res.data.loginGodView.user.username} !`)
      } catch (err) {
        toast.error('Something went wrong :(')
      }
    }
  })

  return (
    <div className="h-full w-full bg-cover bg-center" style={{backgroundImage: "url(https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80)"}}>
      <div style={{ background: "rgba(0,0,0,0.85)" }} className="w-full h-full flex justify-around items-center">
        <div className="xl:w-1/5 hidden xl:block">
          <img src="/vivi_white.svg" alt="VIVI logo"/>
          <p align="right" className="text-white font-bold text-lg">Login</p>
        </div>
        <div className="bg-darkBlue xl:h-1/2 xl:w-1/5 w-full h-full xl:rounded-xl flex-col">
          <form onSubmit={formik.handleSubmit} className="flex-col p-12 h-full pb-0">
          <h1 className="text-white text-3xl font-itc">Se connecter</h1>
          <h2 className="text-white mb-5 text-md">Entrez vos informations</h2>
            <div className="flex flex-wrap h-1/4 xl:h-1/2">
              <div className="flex flex-col w-full">
                <label className="text-white text-base font-medium mt-2 mb-1">Email</label>
                <input
                  className="bg-gray-200 dark:bg-[#313E68] border-none rounded-xl"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="email"
                  type="email"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-white text-base font-medium mb-1">Mot de passe</label>
                <input
                  className="bg-gray-200 dark:bg-[#313E68] border-none rounded-xl"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="password"
                  type="password"
                />
              </div>
            </div>
            <div className="w-full flex justify-end xl:mt-4">
              <div className="flex flex-col justify-center">
                <button type="submit" className="bg-viviYellOrange uppercase text-white mt-1 px-6 py-2 rounded-full hover:bg-blue-600 transition duration-200 each-in-out font-sans font-bold">
                    SUBMIT
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};

export default Login;

