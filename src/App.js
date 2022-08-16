import { useState } from 'react';
import './App.css';
import { IntlProvider, FormattedMessage } from 'react-intl';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// const messages = {
//   title: "Localization Kurma"
// }

// messages objemizi revize ediyoruz


const messages = {
  "tr-TR": {
    title: "Localization Kurulum",
    description: "3 Yeni Mesajınız var",
    formSubmit:"Gönder"
  },
  "en-US": {
    title: "Assemble Localization",
    description: "You have 3 new messages",
    formSubmit:"Submit"
  }
}


const initialFormValue = {
  name: "",
  uni: "",
  job: ""
}
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  uni: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  job: Yup.string().required('Required'),
});


function App() {
  const defaultLocale = navigator.language
  // console.table(defaultLocale)
  const [locale, setLocale] = useState(defaultLocale)

  const { values, handleChange, handleBlur, errors, handleSubmit, touched } = useFormik({
    initialValues: initialFormValue,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema,
  });



  const changeToTr = () => {
    setLocale("tr-TR")
  }
  const changeToEn = () => {
    setLocale("en-US")
  }

  return (
    <div className="App">

      <IntlProvider locale={locale} messages={messages[locale]}>
        <p>
          <FormattedMessage id='title' />
        </p>
        <p>
          <FormattedMessage id='description' />
        </p>
      </IntlProvider>

      <br />
      <br />
      {
        locale === "tr-TR" ? (<button onClick={changeToEn}>EN</button>) : (<button onClick={changeToTr}>TR</button>)
      }

      <br />
      <br />

      <form onSubmit={handleSubmit}>
        <TextField id="outlined-basic" label="Name" variant="outlined" name='name' value={values.name} onChange={handleChange} onBlur={handleBlur} />
        {errors.name && touched.name && <div>{errors.name}</div>}

        <TextField id="filled-basic" label="Uni" variant="filled" name='uni' value={values.uni} onChange={handleChange} onBlur={handleBlur} />
        {errors.uni && touched.uni && <div>{errors.uni}</div>}
        <TextField id="standard-basic" label="Job" variant="standard" name='job' value={values.job} onChange={handleChange} onBlur={handleBlur} />
        {errors.job && touched.job && <div>{errors.job}</div>}
        <button type='submit'>Submit</button>
      </form>

    </div>
  );
}

export default App;
