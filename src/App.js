import { useState } from 'react';
import './App.css';
import { IntlProvider, FormattedRelative, useIntl, FormattedMessage } from 'react-intl';

// const messages = {
//   title: "Localization Kurma"
// }

// messages objemizi revize ediyoruz


const messages={
  "tr-TR":{
    title:"Localization Kurulum",
    description:"3 Yeni Mesajınız var"
  },
  "en-EN":{
    title:"Assemble Localization",
    description:"You have 3 new messages"
  }
}



function App() {
  const defaultLocale=navigator.language
  const [locale, setLocale] = useState(defaultLocale)

  const changeToTr = () => {
    setLocale("tr-TR")
  }
  const changeToEn = () => {
    setLocale("en-EN")
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

    </div>
  );
}

export default App;
