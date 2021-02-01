import { Formik, Form } from 'formik';
import { Input, Button } from "@material-ui/core"
import SaveIcon from '@material-ui/icons/Save';

const UserForm = () => {
  return (
    <Formik>
      <Form>
        <label htmlFor="username">Username</label>
        <Input/>

        <label htmlFor="email">Email</label>
        <Input/>

        <label htmlFor="password">Password</label>
        <Input/>

        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<SaveIcon />}
        > Save </Button>

      </Form>
    </Formik>
  )
}

export default UserForm
