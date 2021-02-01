import { Formik, Form } from 'formik';
import { Input, Button } from "@material-ui/core"
import SaveIcon from '@material-ui/icons/Save';

const RouterForm = () => {
  return (
    <Formik>
      <Form>
        <label htmlFor="name">Name</label>
        <Input/>

        <label htmlFor="url">Url</label>
        <Input/>

        <Button
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

export default RouterForm
