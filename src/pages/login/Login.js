import { TextField, Button } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'
import "./Login.css"
import "../Page.css"
import { Field, Form, Formik } from "formik"
import { useMutation } from "@apollo/client"
import { LOGIN } from "./queries/Login"
import Swal from 'sweetalert2'
import { useState } from "react"
import { Redirect } from "react-router-dom"

const useStyles = makeStyles({
  form: {
    margin: "1%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "30%",
    width: "20%",
    border: "5px, solid #303F9F",
    borderRadius: "20px"
  },
  formField: {
    width: "70%",
    margin: "15px",
  },
  formBtn: {
    marginTop: "35px",
    height: "15%",
    width: "70%"
  }
})


const Login = () => {
  const classes = useStyles()
  const [shouldRedirect, setShouldRedirect]= useState(false)

  const [login] = useMutation(LOGIN)

  return (
    <div className="page">
      {!shouldRedirect ?
        <Formik
          initialValues={{email: "", password: ""}}
          onSubmit={values => {
            login({variables: {loginData: values}})
              .then(d => {
                localStorage.setItem('gv_token', d.data.login.access_token)
                setShouldRedirect(true)
              })
              .catch(err => {
                Swal.fire( {
                  title: "Don't ever try that again !",
                  icon: "error",
                  confirmButtonText: "Ok I won't..."
                })
              })
          }}
        >
          <Form className={classes.form}>
            <Field
              className={classes.formField}
              style={{color: "white"}}
              type="email"
              id="email"
              name="email"
              label="Email"
              as={TextField}
            />
            <Field
              className={classes.formField}
              type="password"
              id="password"
              name="password"
              label="Password"
              as={TextField}
            />
            <Button
              className={classes.formBtn}
              variant="contained"
              color="primary"
              size="small"
              type="submit"
            > Login </Button>
          </Form>
        </Formik>
      :
        <Redirect to="/"/>
      }
    </div>
  )
}

export default Login