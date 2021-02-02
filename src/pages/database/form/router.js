import { Formik, Form, Field } from 'formik';
import { TextField, Button } from "@material-ui/core"
import SaveIcon from '@material-ui/icons/Save';

const RouterForm = ({formClass, fieldClass, btnClass, createCb}) => {
  return (
    <Formik
      initialValues={{ name: "", url: "" }}
      onSubmit={values => {
        createCb(values)
      }}
    >
      <Form className={formClass}>
        <Field
          type="name"
          id="name"
          className={fieldClass}
          name="name"
          label="Name"
          as={TextField}
        />
        <Field
          type="urn"
          id="url"
          className={fieldClass}
          name="url"
          label="Url"
          as={TextField}
        />
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
