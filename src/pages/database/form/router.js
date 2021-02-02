import { Formik, Form } from 'formik';
import { TextField, Button } from "@material-ui/core"
import SaveIcon from '@material-ui/icons/Save';

const RouterForm = ({formClass, fieldClass, btnClass}) => {
  return (
    <Formik
      initialValues={{ name: "", url: "" }}
      onSubmit={values => {
        alert(`annot create router with ${values}, not implemented yet.`)
      }}
    >
      <Form className={formClass}>
        <TextField name="name" className={fieldClass} label="Name"/>
        <TextField name="url" className={fieldClass} label="Url"/>
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

export default RouterForm
