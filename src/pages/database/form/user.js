import { Formik, Form, Field } from 'formik';
import { Button, TextField } from "@material-ui/core"
import SaveIcon from '@material-ui/icons/Save';

const UserForm = ({
    formClass,
    fieldClass,
    btnClass,
    callback,
    defaultValues
  }) => {
  return (
    <Formik
      initialValues={defaultValues || { username: "", email: "", password: "" }}
      onSubmit={callback}
    >
      <Form className={formClass}>
        <Field
          type="username"
          id="username"
          className={fieldClass}
          name="username"
          label="Username"
          as={TextField}
        />
        <Field
          type="email"
          id="email"
          className={fieldClass}
          name="email"
          label="Email"
          as={TextField}
        />
        <Field
          type="password"
          id="password"
          className={fieldClass}
          name="password"
          label="Password"
          as={TextField}
        />
        <Button
          className={btnClass}
          variant="contained"
          color="primary"
          size="small"
          startIcon={<SaveIcon />}
          type="submit"
          as={TextField}
        > Save </Button>
      </Form>
    </Formik>
  )
}

export default UserForm
