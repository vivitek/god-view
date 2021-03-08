import { Formik, Form, Field } from 'formik';
import { TextField, Button } from "@material-ui/core"
import SaveIcon from '@material-ui/icons/Save';

const RouterForm = ({
    formClass,
    fieldClass,
    btnClass,
    callback,
    defaultValues
  }) => {
  return (
    <Formik
      initialValues={defaultValues || { name: "", url: "" }}
      onSubmit={callback}
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
