import './App.css';
import React, { useState, useEffect } from 'react';
import { Table } from "./Components/Table";

function App() {

  
  // Teemat ikä, toiminta ja asema
  const [activeButtonIka, setActiveButtonIka] = useState(0);
  const [activeButtonToiminta, setActiveButtonToiminta] = useState(0);
  const [activeButtonAsema, setActiveButtonAsema] = useState(0);

  const [arvoIka, setArvoIka] = useState(null);
  const [arvoToiminta, setArvoToiminta] = useState(null);
  const [arvoAsema, setArvoAsema] = useState(null);

  // Jäsenen hyöhyt ylätekstit
  const [showMoreTextKaikki1, setShowMoreTextKaikki1] = useState(false);
  const [showMoreTextKaikki2, setShowMoreTextKaikki2] = useState(false);
  const [showMoreTextKaikki3, setShowMoreTextKaikki3] = useState(false);
  const [showMoreTextKaikki4, setShowMoreTextKaikki4] = useState(false);
  const [showMoreTextKaikki5, setShowMoreTextKaikki5] = useState(false);

  // Yhteisö ja verkosto alatekstit
  const [showMoreTextKaikkiAla1, setShowMoreTextKaikkiAla1] = useState(false);
  const [showMoreTextKaikkiAla2, setShowMoreTextKaikkiAla2] = useState(false);
  const [showMoreTextKaikkiAla3, setShowMoreTextKaikkiAla3] = useState(false);
  const [showMoreTextKaikkiAla4, setShowMoreTextKaikkiAla4] = useState(false);

  const handleShowMoreClickKaikki1 = () => {
    setShowMoreTextKaikki1(!showMoreTextKaikki1);
    setShowMoreTextKaikkiAla1(false);
    setShowMoreTextKaikkiAla2(false);
    setShowMoreTextKaikkiAla3(false);
    setShowMoreTextKaikkiAla4(false);
  };

  const handleShowMoreClickKaikkiAla1 = () => {
    setShowMoreTextKaikkiAla1(!showMoreTextKaikkiAla1);
  };
  const handleShowMoreClickKaikkiAla2 = () => {
    setShowMoreTextKaikkiAla2(!showMoreTextKaikkiAla2);
  };
  const handleShowMoreClickKaikkiAla3 = () => {
    setShowMoreTextKaikkiAla3(!showMoreTextKaikkiAla3);
  };
  const handleShowMoreClickKaikkiAla4 = () => {
    setShowMoreTextKaikkiAla4(!showMoreTextKaikkiAla4);
  };

  // Vaikuttamistyö ja edunvalvonta
  const [showMoreTextKaikki2Ala1, setShowMoreTextKaikki2Ala1] = useState(false);
  const [showMoreTextKaikki2Ala2, setShowMoreTextKaikki2Ala2] = useState(false);
  const [showMoreTextKaikki2Ala3, setShowMoreTextKaikki2Ala3] = useState(false);
  const [showMoreTextKaikki2Ala4, setShowMoreTextKaikki2Ala4] = useState(false);
  const [showMoreTextKaikki2Ala5, setShowMoreTextKaikki2Ala5] = useState(false);

  const handleShowMoreClickKaikki2 = () => {
    setShowMoreTextKaikki2(!showMoreTextKaikki2);
    setShowMoreTextKaikki2Ala1(false);
    setShowMoreTextKaikki2Ala2(false);
    setShowMoreTextKaikki2Ala3(false);
    setShowMoreTextKaikki2Ala4(false);
    setShowMoreTextKaikki2Ala5(false);
  };

  const handleShowMoreClickKaikki2Ala1 = () => {
    setShowMoreTextKaikki2Ala1(!showMoreTextKaikki2Ala1);
  };

  const handleShowMoreClickKaikki2Ala2 = () => {
    setShowMoreTextKaikki2Ala2(!showMoreTextKaikki2Ala2);
  };

  const handleShowMoreClickKaikki2Ala3 = () => {
    setShowMoreTextKaikki2Ala3(!showMoreTextKaikki2Ala3);
  };

  const handleShowMoreClickKaikki2Ala4 = () => {
    setShowMoreTextKaikki2Ala4(!showMoreTextKaikki2Ala4);
  };

  const handleShowMoreClickKaikki2Ala5 = () => {
    setShowMoreTextKaikki2Ala5(!showMoreTextKaikki2Ala5);
  };

  // Uranveuvonta

  const handleShowMoreClickKaikki3 = () => {
    setShowMoreTextKaikki3(!showMoreTextKaikki3);
  };

  // Lakipalvelut

  const handleShowMoreClickKaikki4 = () => {
    setShowMoreTextKaikki4(!showMoreTextKaikki4);
  };

  // Jäsenedut

  const handleShowMoreClickKaikki5 = () => {
    setShowMoreTextKaikki5(!showMoreTextKaikki5);
  };

  // Rahasummat
  // Alustetaan checkboxien arvot
const initialCheckboxValues = [
  { value: 100, checked: true },
  { value: 0, checked: true },
  { value: 0, checked: true },
  { value: 0, checked: true },
  { value: 0, checked: true },
  { value: 0, checked: true },
  { value: 0, checked: true },
  { value: 0, checked: true },
];

  const [checkboxValues, setCheckboxValues] = useState(initialCheckboxValues);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    // Laskee alustavan summan valituista checkboxeista
    const initialSum = checkboxValues.reduce((total, checkbox) => {
      if (checkbox.checked) {
        return total + checkbox.value;
      }
      return total;
    }, 0);

    setSum(initialSum);
  }, []);

  const handleCheckboxChange = (e, index) => {
    const updatedCheckboxValues = [...checkboxValues];
    if (updatedCheckboxValues[index]) {
      updatedCheckboxValues[index].checked = e.target.checked;
    }
  
    const updatedSum = updatedCheckboxValues.reduce((total, checkbox) => {
      if (checkbox && checkbox.checked) {
        return total + checkbox.value;
      }
      return total;
    }, 0);
  
    setCheckboxValues(updatedCheckboxValues);
    setSum(updatedSum);
  };
  

  const handleIkaButtonClick = (index) => {
    setActiveButtonIka(index);
    let arvoIka;

  // Määritä arvo valitun buttonin mukaan
  if (index === 0) {
    arvoIka = 100;
  } else if (index === 1) {
    arvoIka = 100;
  } else if (index === 2) {
    arvoIka = 100;
  } else if (index === 3) {
    arvoIka = 100;
  } else if (index === 4) {
    arvoIka = 100;
  }

  // Ei järjestetty
  setArvoIka(arvoIka);
  };

  const handleToimintaButtonClick = (index) => {
    setActiveButtonToiminta(index);
    let arvoToiminta;
    // Määritä arvo valitun buttonin mukaan
if (index === 0) {
  arvoToiminta = 200;
} else if (index === 1) {
  arvoToiminta = 405;
} else if (index === 2) {
  arvoToiminta = 400;
} else if (index === 3) {
  arvoToiminta = 400;
} else if (index === 4) {
  arvoToiminta = 100;
}

setArvoToiminta(arvoToiminta);
  };

  const handleAsemaButtonClick = (index) => {
    setActiveButtonAsema(index);
    let arvoAsema;
    // Määritä arvo valitun buttonin mukaan
if (index === 0) {
  arvoAsema = 200;
} else if (index === 1) {
  arvoAsema = 405;
} else if (index === 2) {
  arvoAsema = 400;
} else if (index === 3) {
  arvoAsema = 400;
} else if (index === 4) {
  arvoAsema = 100;
}

setArvoAsema(arvoAsema);
  };

  const yhteenvetoArvo = (activeButtonIka !== null && activeButtonToiminta !== null)
    ? arvoToiminta + arvoIka + arvoAsema
    : null;

   // Funktio palauttaa oikeat Ikä tekstit valinnan perusteella
   const getIkaTeksti1 = (index) => {
    if (index === 0) {
      return   <ul>
      <h5>Uraneuvonta</h5>
      <li>Palkkaneuvontamme auttaa sinua saamaan arvoistasi palkkaa. 200 € / tunti</li>
      <li>Palkkatutkan avulla voi haarukoida eri toimialojen palkkoja työnhakua miettiessäsi. 20 € / vuosi</li>
      <h5>Lakipalvelut</h5>
      <li>Jäsenyyden ollessa voimassa olet aina turvattuna mahdollisiin oikeudellisiin haasteisiin. </li>
      <li>Kerrytät jäsenenä ollessasi oikeusturvaasi vuosi vuodelta aina 20 000 € asti. </li>
      <li>Työsopimuksesi kommentointi juristien toimesta.  300 € / tunti</li>
      <h5>Jäsenedut</h5>
      <li>Suomen Ekonomien jäsenenä sinulla on käytettävissäsi Suomen edullisin henkivakuutus, jonka saat 61 % alennuksella.</li>
      <li>Vastavalmistuneen paketti,  keskimäärin 700 € vuodessa.</li>
      <li>Asuntolainaetu, arvo keskimäärin 1600 € jäsentä kohti</li>
      <li>MasterCard Platinum -luottokortti (sisältää vakuutuksen), pääsy yli 1000 lentokenttäloungeen ja kattava matkavakuutus 220 € / vuosi</li>
    </ul>
    } else if (index === 1) {
      return <ul>
      <h5>Uraneuvonta</h5>
    <li>Palkkaneuvontamme auttaa sinua saamaan arvoistasi palkkaa. 200 € / tunti</li>
    <li>Palkkatutkan avulla voi haarukoida eri toimialojen palkkoja työnhakua miettiessäsi. 20 € / vuosi</li>
    <h5>Lakipalvelut</h5>
    <li>Jäsenyyden ollessa voimassa olet aina turvattuna mahdollisiin oikeudellisiin haasteisiin. </li>
    <li>Kerrytät jäsenenä ollessasi oikeusturvaasi vuosi vuodelta aina 20 000 € asti. </li>
    <li>Työsopimuksesi kommentointi juristien toimesta.  300 € / tunti</li>
    <h5>Jäsenedut</h5>
    <li>Suomen Ekonomien jäsenenä sinulla on käytettävissäsi Suomen edullisin henkivakuutus, jonka saat 61 % alennuksella.</li>
    <li>Asuntolainaetu, arvo keskimäärin 1600 € jäsentä kohti</li>
    <li>MasterCard Platinum -luottokortti (sisältää vakuutuksen), pääsy yli 1000 lentokenttäloungeen ja kattava matkavakuutus 220 € / vuosi</li>
  </ul>
    } else if (index === 2) {
      return <ul>
      <h5>Uraneuvonta</h5>
    <li>Palkkaneuvontamme auttaa sinua saamaan arvoistasi palkkaa. 200 € / tunti</li>
    <li>Palkkatutkan avulla voi haarukoida eri toimialojen palkkoja työnhakua miettiessäsi. 20 € / vuosi</li>
    <h5>Lakipalvelut</h5>
    <li>Jäsenyyden ollessa voimassa olet aina turvattuna mahdollisiin oikeudellisiin haasteisiin. </li>
    <li>Kerrytät jäsenenä ollessasi oikeusturvaasi vuosi vuodelta aina 20 000 € asti. </li>
    <li>Työsopimuksesi kommentointi juristien toimesta.  300 € / tunti</li>
    <h5>Jäsenedut</h5>
    <li>Suomen Ekonomien jäsenenä sinulla on käytettävissäsi Suomen edullisin henkivakuutus, jonka saat 61 % alennuksella.</li>
    <li>Tarjoamme 6 eri lehteä, joista saat alennusta 60–87 % riippuen lehdestä. Näiden ammattilehtien maksut ovat myös verovähennyskelpoisia, samoin kuin koko jäsenyysmaksu</li>
  </ul>
    } else if (index === 3) {
      return 'Teksti 1 ikäryhmälle 50-65';
    } else if (index === 4) {
      return 'Teksti 1 ikäryhmälle +65';
    }
  };

  const getIkaTeksti2 = (index) => {
    if (index === 0) {
      return 'Teksti 2 ikäryhmälle 118-30';
    } else if (index === 1) {
      return 'Teksti 2 ikäryhmälle 30-40';
    } else if (index === 2) {
      return 'Teksti 2 ikäryhmälle 40-50';
    } else if (index === 3) {
      return 'Teksti 2 ikäryhmälle 50-65';
    } else if (index === 4) {
      return 'Teksti 2 ikäryhmälle +65';
    }
  };


     // Funktio palauttaa oikeat Toiminta tekstit valinnan perusteella
     const getToimintaTeksti1 = (index) => {
      if (index === 0) {
        return 'Teksti 1 ikäryhmälle 118-30';
      } else if (index === 1) {
        return 'Teksti 1 ikäryhmälle 30-40';
      } else if (index === 2) {
        return 'Teksti 1 ikäryhmälle 40-50';
      } else if (index === 3) {
        return 'Teksti 1 ikäryhmälle 50-65';
      } else if (index === 4) {
        return 'Teksti 1 ikäryhmälle +65';
      }
    };
  
    const getToimintaTeksti2 = (index) => {
      if (index === 0) {
        return 'Teksti 2 ikäryhmälle 118-30';
      } else if (index === 1) {
        return 'Teksti 2 ikäryhmälle 30-40';
      } else if (index === 2) {
        return 'Teksti 2 ikäryhmälle 40-50';
      } else if (index === 3) {
        return 'Teksti 2 ikäryhmälle 50-65';
      } else if (index === 4) {
        return 'Teksti 2 ikäryhmälle +65';
      }
    };

    // Funktio palauttaa oikeat Asema tekstit valinnan perusteella
    const getAsemaTeksti1 = (index) => {
      if (index === 0) {
        return 'Teksti 1 ikäryhmälle 118-30';
      } else if (index === 1) {
        return 'Teksti 1 ikäryhmälle 30-40';
      } else if (index === 2) {
        return 'Teksti 1 ikäryhmälle 40-50';
      } 
    };
  
    const getAsemaTeksti2 = (index) => {
      if (index === 0) {
        return 'Teksti 2 ikäryhmälle 118-30';
      } else if (index === 1) {
        return 'Teksti 2 ikäryhmälle 30-40';
      } else if (index === 2) {
        return 'Teksti 2 ikäryhmälle 40-50';
      } 
    };

  return (
    <div className="App">

      <div className="box-yhteenveto-alku-otsikko">
         <h2>Jäsenen hyödyt</h2>
      </div>
      
      <div className="container">
        <Table />
      </div>

      <div className="box-yhteenveto-alku">
      <h5 onClick={handleShowMoreClickKaikki1}>Yhteisö ja verkosto</h5>
      {!showMoreTextKaikki1 && (
        <div>
          <div className="service-info">
            <span onClick={handleShowMoreClickKaikkiAla1}>Toimikunnat</span>
            <input
              type="checkbox"
              value="300"
              onChange={(e) => handleCheckboxChange(e, 0)}
            />
            {showMoreTextKaikkiAla1 && (
              <ul>
                <li>
                  Ekonomijäsenet kuuluvat alueellisiin ekonomiyhdistyksiin, jotka tuovat ekonomitoiminnan paikalliselle tasolle ja tarjoavat koulutuksia ja tapahtumia. Eri puolella Suomea toimivia ekonomiyhdistyksiä on 25. Jäsenyytemme rakentuu yhdistysjäsenyyden periaatteelle eli jäsenet kuuluvat liittoon jäsenyhdistysten kautta.
                </li>
                <li>
                  Huolehdimme koulutuksen arvostuksen ylläpidosta niin julkisuudessa kuin työehtosopimuksissa
                </li>
                <li>
                  Uudistamme proaktiivisesti lainsäädäntöä ekonomien ja Suomen paremman työelämän mahdollistamiseksi
                </li>
              </ul>
            )}
          </div>
          <div className="service-info">
            <span onClick={handleShowMoreClickKaikkiAla2}>Opiskelijajärjestöt ja kerhot</span>
            <input
              type="checkbox"
              value="300"
              onChange={(e) => handleCheckboxChange(e, 1)}
            />
            {showMoreTextKaikkiAla2 && (
              <ul>
                <li>
                  Opiskelijajärjestö A
                </li>
                <li>
                  Opiskelijajärjestö B
                </li>
                <li>
                  Opiskelijajärjestö C
                </li>
              </ul>
            )}
             </div>
          <div className="service-info">
            <span onClick={handleShowMoreClickKaikkiAla3}>Opiskelijajärjestöt ja kerhot</span>
            <input
              type="checkbox"
              value="0"
              onChange={(e) => handleCheckboxChange(e, 2)}
            />
            {showMoreTextKaikkiAla3 && (
              <ul>
                <li>
                  Opiskelijajärjestö A
                </li>
                <li>
                  Opiskelijajärjestö B
                </li>
                <li>
                  Opiskelijajärjestö C
                </li>
              </ul>
            )}
          </div>
          <div className="service-info">
            <span onClick={handleShowMoreClickKaikkiAla4}>Koulutusasiat</span>
            <input
              type="checkbox"
              value="0"
              onChange={(e) => handleCheckboxChange(e, 3)}
            />
            {showMoreTextKaikkiAla4 && (
              <ul>
                <li>
                  Koulutus A
                </li>
                <li>
                  Koulutus B
                </li>
                <li>
                  Koulutus C
                </li>
              </ul>
            )}
          </div>
          </div>
      )}
     
     <h5 onClick={handleShowMoreClickKaikki1}>Yhteisö ja verkosto</h5>
      {!showMoreTextKaikki1 && (
        <div>
          <div className="service-info">
            <span onClick={handleShowMoreClickKaikki2Ala1}>Toimikunnat</span>
            <input
              type="checkbox"
              value="300"
              onChange={(e) => handleCheckboxChange(e, 0)}
            />
            {showMoreTextKaikki2Ala1 && (
              <ul>
                <li>
                  Ekonomijäsenet kuuluvat alueellisiin ekonomiyhdistyksiin, jotka tuovat ekonomitoiminnan paikalliselle tasolle ja tarjoavat koulutuksia ja tapahtumia. Eri puolella Suomea toimivia ekonomiyhdistyksiä on 25. Jäsenyytemme rakentuu yhdistysjäsenyyden periaatteelle eli jäsenet kuuluvat liittoon jäsenyhdistysten kautta.
                </li>
                <li>
                  Huolehdimme koulutuksen arvostuksen ylläpidosta niin julkisuudessa kuin työehtosopimuksissa
                </li>
                <li>
                  Uudistamme proaktiivisesti lainsäädäntöä ekonomien ja Suomen paremman työelämän mahdollistamiseksi
                </li>
              </ul>
            )}
          </div>
          <div className="service-info">
            <span onClick={handleShowMoreClickKaikki2Ala2}>Opiskelijajärjestöt ja kerhot</span>
            <input
              type="checkbox"
              value="300"
              onChange={(e) => handleCheckboxChange(e, 1)}
            />
            {showMoreTextKaikki2Ala2 && (
              <ul>
                <li>
                  Opiskelijajärjestö A
                </li>
                <li>
                  Opiskelijajärjestö B
                </li>
                <li>
                  Opiskelijajärjestö C
                </li>
              </ul>
            )}
             </div>
          <div className="service-info">
            <span onClick={handleShowMoreClickKaikki2Ala3}>Opiskelijajärjestöt ja kerhot</span>
            <input
              type="checkbox"
              value="300"
              onChange={(e) => handleCheckboxChange(e, 2)}
            />
            {showMoreTextKaikki2Ala3 && (
              <ul>
                <li>
                  Opiskelijajärjestö A
                </li>
                <li>
                  Opiskelijajärjestö B
                </li>
                <li>
                  Opiskelijajärjestö C
                </li>
              </ul>
            )}
          </div>
          <div className="service-info">
            <span onClick={handleShowMoreClickKaikki2Ala4}>Koulutusasiat</span>
            <input
              type="checkbox"
              value="300"
              onChange={(e) => handleCheckboxChange(e, 3)}
            />
            {showMoreTextKaikki2Ala4 && (
              <ul>
                <li>
                  Koulutus A
                </li>
                <li>
                  Koulutus B
                </li>
                <li>
                  Koulutus C
                </li>
              </ul>
            )}
          </div>
          </div>
      )}
      <h5 onClick={handleShowMoreClickKaikki3}>Uraneuvonta</h5>
        {showMoreTextKaikki3 && <ul>
          <li>Työehtosopimukset</li>
          <li>Koulutukset arvostuksen ylläpito</li>
          <li>Lainsäädäntöön vaikuttaminen</li>
          <li>Koulutuksen laatuun vaikuttaminen</li>
          <li>Talousvaikuttaminen</li>
          </ul>}
      <h5 onClick={handleShowMoreClickKaikki4}>Lakipalvelut</h5>
        {showMoreTextKaikki4 && <ul>
          <li>Työehtosopimukset</li>
          <li>Koulutukset arvostuksen ylläpito</li>
          <li>Lainsäädäntöön vaikuttaminen</li>
          <li>Koulutuksen laatuun vaikuttaminen</li>
          <li>Talousvaikuttaminen</li>
          </ul>}
      <h5 onClick={handleShowMoreClickKaikki5}>Jäsenedut</h5>
        {showMoreTextKaikki5 && <ul>
          <li>Työehtosopimukset</li>
          <li>Koulutukset arvostuksen ylläpito</li>
          <li>Lainsäädäntöön vaikuttaminen</li>
          <li>Koulutuksen laatuun vaikuttaminen</li>
          <li>Talousvaikuttaminen</li>
          </ul>}
          <div>
          <span className='yleinen-rahallinen-etu'><h2>Yhteensä:</h2> <p2>{sum}€</p2></span>
          </div>
          </div>

            <h3>Minkä ikäinen olet?</h3>
            <div id="button-container-ika">
        <button
          className={activeButtonIka === 0 ? 'active' : 'inactive'}
          onClick={() => handleIkaButtonClick(0)}
        >
          18-30
        </button>
        <button
          className={activeButtonIka === 1 ? 'active' : 'inactive'}
          onClick={() => handleIkaButtonClick(1)}
        >
          30-40
        </button>
        <button
          className={activeButtonIka === 2 ? 'active' : 'inactive'}
          onClick={() => handleIkaButtonClick(2)}
        >
          40-50
        </button>
        <button
          className={activeButtonIka === 3 ? 'active' : 'inactive'}
          onClick={() => handleIkaButtonClick(3)}
        >
          50-65
        </button>
        <button
          className={activeButtonIka === 4 ? 'active' : 'inactive'}
          onClick={() => handleIkaButtonClick(4)}
        >
          +65
        </button>
      </div>
      {/* Laatikot ja tekstit ikäryhmänapin valinnan alle */}
      {activeButtonIka !== null && (
          <div className="selection-info">
            <div className="box-ika-hyva">
              <h4>Jasenen hyödyt</h4>
              <p>{getIkaTeksti1(activeButtonIka)}<br/><h3>Yhteensä:</h3> {arvoIka}€</p>
            </div>
            <div className="box-ika-huono">
              <h4>Ei jasenen hyödyt</h4>
              <p>{getIkaTeksti2(activeButtonIka)}<br/>{arvoIka}€</p>
            </div>
          </div>
        )}


      <h3>Pääasiallinen toiminta</h3>
      <div id="button-container-toiminta">
        <button
          className={activeButtonToiminta === 0 ? 'active' : 'inactive'}
          onClick={() => handleToimintaButtonClick(0)}
        >
          Opiskelija
        </button>
        <button
          className={activeButtonToiminta === 1 ? 'active' : 'inactive'}
          onClick={() => handleToimintaButtonClick(1)}
        >
          Työelämässä
        </button>
        <button
          className={activeButtonToiminta === 2 ? 'active' : 'inactive'}
          onClick={() => handleToimintaButtonClick(2)}
        >
          Työtön
        </button>
        <button
          className={activeButtonToiminta === 3 ? 'active' : 'inactive'}
          onClick={() => handleToimintaButtonClick(3)}
        >
          Yrittäjä
        </button>
        <button
          className={activeButtonToiminta === 4 ? 'active' : 'inactive'}
          onClick={() => handleToimintaButtonClick(4)}
        >
          Eläkeläinen
        </button>
      </div>

       {/* Laatikot ja tekstit ikäryhmänapin valinnan alle */}
       {activeButtonToiminta !== null && (
          <div className="selection-info-toiminta">
            <div className="box-toiminta-hyva">
            <h4>Jasenen hyödyt</h4>
            <p>{getToimintaTeksti1(activeButtonToiminta)}<br/>{arvoToiminta}€</p>
            </div>
            <div className="box-toiminta-huono">
            <h4>Ei jasenen hyödyt</h4>
            <p>{getToimintaTeksti2(activeButtonToiminta)}<br/>{arvoToiminta}€</p>
            </div>
          </div>
        )}

      <h3>Asemataso</h3>
      <div id="button-container-asemataso">
        <button
          className={activeButtonAsema === 0 ? 'active' : 'inactive'}
          onClick={() => handleAsemaButtonClick(0)}
        >
          Asiantuntija
        </button>
        <button
          className={activeButtonAsema === 1 ? 'active' : 'inactive'}
          onClick={() => handleAsemaButtonClick(1)}
        >
          Päällikkö
        </button>
        <button
          className={activeButtonAsema === 2 ? 'active' : 'inactive'}
          onClick={() => handleAsemaButtonClick(2)}
        >
          Johtaja
        </button>
      </div>

         {/* Laatikot ja tekstit ikäryhmänapin valinnan alle */}
       {activeButtonToiminta !== null && (
          <div className="selection-info-asema">
            <div className="box-asema-hyva">
            <h4>Ei jasenen hyödyt</h4>
            <p>{getAsemaTeksti1(activeButtonAsema)}<br/>{arvoAsema}€</p>
            </div>
            <div className="box-asema-huono">
            <h4>Ei jasenen hyödyt</h4>
            <p>{getAsemaTeksti2(activeButtonAsema)}<br/> {arvoAsema}€</p>
            </div>
          </div>
        )}

        <h3>Yhteenveto</h3>
        <div id="button-container-yhteenveto">
          {/* Yhteenveto-valinnan napit ja niiden käsittely */}
        </div>

        {/* Laatikot ja tekstit yhteenveto-valinnan alle */}
        <div className="selection-info-yhteenveto">
          <div className="box-yhteenveto-vasen">
            <h4>Jasenen hyödyt</h4>
            <p>{getIkaTeksti1(activeButtonIka)}</p>
            <p>{getToimintaTeksti1(activeButtonToiminta)}</p>
            <p>{getAsemaTeksti1(activeButtonAsema)}</p>
          </div>
          <div className="box-yhteenveto-oikea">
            <h4>Ei jasenen hyödyt</h4>
            <p>{getIkaTeksti2(activeButtonIka)}</p>
            <p>{getToimintaTeksti2(activeButtonToiminta)}</p>
            <p>{getAsemaTeksti1(activeButtonAsema)}</p>
          </div>
        </div>

       {/* Box-yhteenveto-arvo */}
       {yhteenvetoArvo !== null && (
        <div className="box-yhteenveto-arvo">
          <h4>Rahallinen arvo yhteensä</h4>
          <h5>{yhteenvetoArvo}€</h5>
        </div>
      )}
    </div>

  

  );
}

export default App;
