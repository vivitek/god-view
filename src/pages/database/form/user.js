import { Formik, Form } from 'formik';
import { TextField, Button } from "@material-ui/core"
import SaveIcon from '@material-ui/icons/Save';

const UserForm = ({formClass, fieldClass, btnClass }) => {
  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      onSubmit={values => {
        alert(`annot create user with ${values}, not implemented yet.`)
      }}
    >
      <Form className={formClass}>
        <TextField name="username" className={fieldClass} label="Username"/>
        <TextField name="email" className={fieldClass} label="Email"/>
        <TextField type="password" name="password" className={fieldClass} label="Password"/>
        <Button
          className={btnClass}
          variant="contained"
          color="primary"
          size="small"
          startIcon={<SaveIcon />}
          type="submit"
        > Save </Button>
      </Form>
    </Formik>
  )
}

export default UserForm
