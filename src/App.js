import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { ExpendableButton } from "./Components/ExpendableButton";
import { gsap } from 'gsap';
import WordCarousel from './Components/WordCarousel';

import rahaImage from "./Images/raha.svg"
import aarrearkkuImage from "./Images/aarrearkku.svg"
import ryhmaImage from "./Images/ryhma.svg"

import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

/* Korjattavaa: 
- korttien kääntyminen
- hover ominaisuudet valintoihin
 */

function App() {


  // Tuotteet ja niiden hinnoittelu sekä laskentalogiikka 

  const [selectedProducts, setSelectedProducts] = useState([
    { id: 1, price: 0, selected: true },
    { id: 2, price: 0, selected: true },
    { id: 3, price: 0, selected: true },
    { id: 5, price: 0, selected: true },
    { id: 6, price: 50, selected: true },
    { id: 7, price: 0, selected: true },
    { id: 8, price: 50, selected: true },
    { id: 9, price: 50, selected: true },
    { id: 10, price: 50, selected: true },
    { id: 11, price: 50, selected: true },
    { id: 12, price: 50, selected: true },
    { id: 13, price: 30, selected: true },
    { id: 14, price: 30, selected: true },
    { id: 15, price: 50, selected: true },
    { id: 16, price: 2000, selected: true },
    { id: 17, price: 100, selected: true },
    { id: 18, price: 100, selected: true },
    { id: 19, price: 100, selected: true },
    { id: 20, price: 30, selected: true },
    { id: 21, price: 1250, selected: true },
    { id: 22, price: 25, selected: true },
    { id: 23, price: 500, selected: true },
    { id: 24, price: 300, selected: true },
    { id: 25, price: 20, selected: true },
    { id: 26, price: 2900, selected: true },
    { id: 27, price: 0, selected: true },
    { id: 28, price: 0, selected: true },
    { id: 29, price: 0, selected: true },
    { id: 30, price: 0, selected: true },
    { id: 31, price: 1600, selected: true },
    { id: 32, price: 0, selected: true },
    { id: 33, price: 0, selected: true },
    { id: 34, price: 540, selected: true },
    { id: 35, price: 1000, selected: true },
    { id: 36, price: 519, selected: true },
    { id: 37, price: 214, selected: true },
    { id: 38, price: 246, selected: false },
    { id: 39, price: 0, selected: true }
  ]);

  const handleProductToggle = (productId) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, selected: !product.selected } : product
      )
    );
  };

  const calculateTotalPrice = () => {
    return selectedProducts.reduce((total, product) => {
      if (product.selected) {
        return total + product.price;
      }
      return total;
    }, 0);
  };

  const priceYhteisoJaVerkosto = selectedProducts
  .filter(product => product.id >= 1 && product.id <= 5 && product.selected)
  .reduce((sum, product) => sum + product.price, 0);

  const priceTapahtumat = selectedProducts
  .filter(product => product.id >= 6 && product.id <= 11 && product.selected)
  .reduce((sum, product) => sum + product.price, 0);

  const priceUrapalvelut = selectedProducts
  .filter(product => product.id >= 12 && product.id <= 16 && product.selected)
  .reduce((sum, product) => sum + product.price, 0);

  const priceLakipalvelut = selectedProducts
  .filter(product => product.id >= 17 && product.id <= 25 && product.selected)
  .reduce((sum, product) => sum + product.price, 0);
  
  const priceVaikuttamistyoJaEdunvalvonta = selectedProducts
  .filter(product => product.id >= 26 && product.id <= 30 && product.selected)
  .reduce((sum, product) => sum + product.price, 0);

  const priceJasenedut = selectedProducts
  .filter(product => product.id >= 31 && product.id <= 38 && product.selected)
  .reduce((sum, product) => sum + product.price, 0);

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
  const [showMoreTextKaikki6, setShowMoreTextKaikki6] = useState(false);

  // Jäsenen hyöhyt: Yhteisö ja verkosto
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


  // Jäsenen hyöhyt: Tapahtumat
  const [showMoreTextKaikki2Ala1, setShowMoreTextKaikki2Ala1] = useState(false);
  const [showMoreTextKaikki2Ala2, setShowMoreTextKaikki2Ala2] = useState(false);
  const [showMoreTextKaikki2Ala3, setShowMoreTextKaikki2Ala3] = useState(false);
  const [showMoreTextKaikki2Ala4, setShowMoreTextKaikki2Ala4] = useState(false);
  const [showMoreTextKaikki2Ala5, setShowMoreTextKaikki2Ala5] = useState(false);
  const [showMoreTextKaikki2Ala6, setShowMoreTextKaikki2Ala6] = useState(false);

  const handleShowMoreClickKaikki2 = () => {
    setShowMoreTextKaikki2(!showMoreTextKaikki2);
    setShowMoreTextKaikki2Ala1(false);
    setShowMoreTextKaikki2Ala2(false);
    setShowMoreTextKaikki2Ala3(false);
    setShowMoreTextKaikki2Ala4(false);
    setShowMoreTextKaikki2Ala5(false);
    setShowMoreTextKaikki2Ala6(false);
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

  const handleShowMoreClickKaikki2Ala6 = () => {
    setShowMoreTextKaikki2Ala6(!showMoreTextKaikki2Ala6);
  };

  // Jäsenen hyöhyt: Uranveuvonta

  const [showMoreTextKaikki3Ala1, setShowMoreTextKaikki3Ala1] = useState(false);
  const [showMoreTextKaikki3Ala2, setShowMoreTextKaikki3Ala2] = useState(false);
  const [showMoreTextKaikki3Ala3, setShowMoreTextKaikki3Ala3] = useState(false);
  const [showMoreTextKaikki3Ala4, setShowMoreTextKaikki3Ala4] = useState(false);
  const [showMoreTextKaikki3Ala5, setShowMoreTextKaikki3Ala5] = useState(false);
  
  const handleShowMoreClickKaikki3 = () => {
    setShowMoreTextKaikki3(!showMoreTextKaikki3);
    setShowMoreTextKaikki3Ala1(false);
    setShowMoreTextKaikki3Ala2(false);
    setShowMoreTextKaikki3Ala3(false);
    setShowMoreTextKaikki3Ala4(false);
    setShowMoreTextKaikki3Ala5(false);
  };
  
  const handleShowMoreClickKaikki3Ala1 = () => {
    setShowMoreTextKaikki3Ala1(!showMoreTextKaikki3Ala1);
  };
  
  const handleShowMoreClickKaikki3Ala2 = () => {
    setShowMoreTextKaikki3Ala2(!showMoreTextKaikki3Ala2);
  };
  
  const handleShowMoreClickKaikki3Ala3 = () => {
    setShowMoreTextKaikki3Ala3(!showMoreTextKaikki3Ala3);
  };
  
  const handleShowMoreClickKaikki3Ala4 = () => {
    setShowMoreTextKaikki3Ala4(!showMoreTextKaikki3Ala4);
  };
  
  const handleShowMoreClickKaikki3Ala5 = () => {
    setShowMoreTextKaikki3Ala5(!showMoreTextKaikki3Ala5);
  };
  
  // Jäsenen hyöhyt: Lakipalvelut

  const [showMoreTextKaikki4Ala1, setShowMoreTextKaikki4Ala1] = useState(false);
  const [showMoreTextKaikki4Ala2, setShowMoreTextKaikki4Ala2] = useState(false);
  const [showMoreTextKaikki4Ala3, setShowMoreTextKaikki4Ala3] = useState(false);
  const [showMoreTextKaikki4Ala4, setShowMoreTextKaikki4Ala4] = useState(false);
  const [showMoreTextKaikki4Ala5, setShowMoreTextKaikki4Ala5] = useState(false);
  const [showMoreTextKaikki4Ala6, setShowMoreTextKaikki4Ala6] = useState(false);
  const [showMoreTextKaikki4Ala7, setShowMoreTextKaikki4Ala7] = useState(false);
  const [showMoreTextKaikki4Ala8, setShowMoreTextKaikki4Ala8] = useState(false);
  const [showMoreTextKaikki4Ala9, setShowMoreTextKaikki4Ala9] = useState(false);
  
  const handleShowMoreClickKaikki4 = () => {
    setShowMoreTextKaikki4(!showMoreTextKaikki4);
    setShowMoreTextKaikki4Ala1(false);
    setShowMoreTextKaikki4Ala2(false);
    setShowMoreTextKaikki4Ala3(false);
    setShowMoreTextKaikki4Ala4(false);
    setShowMoreTextKaikki4Ala5(false);
    setShowMoreTextKaikki4Ala6(false);
    setShowMoreTextKaikki4Ala7(false);
    setShowMoreTextKaikki4Ala8(false);
    setShowMoreTextKaikki4Ala9(false);
  };
  
  const handleShowMoreClickKaikki4Ala1 = () => {
    setShowMoreTextKaikki4Ala1(!showMoreTextKaikki4Ala1);
  };
  
  const handleShowMoreClickKaikki4Ala2 = () => {
    setShowMoreTextKaikki4Ala2(!showMoreTextKaikki4Ala2);
  };
  
  const handleShowMoreClickKaikki4Ala3 = () => {
    setShowMoreTextKaikki4Ala3(!showMoreTextKaikki4Ala3);
  };
  
  const handleShowMoreClickKaikki4Ala4 = () => {
    setShowMoreTextKaikki4Ala4(!showMoreTextKaikki4Ala4);
  };
  
  const handleShowMoreClickKaikki4Ala5 = () => {
    setShowMoreTextKaikki4Ala5(!showMoreTextKaikki4Ala5);
  };
  
  const handleShowMoreClickKaikki4Ala6 = () => {
    setShowMoreTextKaikki4Ala6(!showMoreTextKaikki4Ala6);
  };
  
  const handleShowMoreClickKaikki4Ala7 = () => {
    setShowMoreTextKaikki4Ala7(!showMoreTextKaikki4Ala7);
  };
  
  const handleShowMoreClickKaikki4Ala8 = () => {
    setShowMoreTextKaikki4Ala8(!showMoreTextKaikki4Ala8);
  };
  
  const handleShowMoreClickKaikki4Ala9 = () => {
    setShowMoreTextKaikki4Ala9(!showMoreTextKaikki4Ala9);
  };
  

  // Jäsenen hyöhyt: Vaikuttamistyö ja edunvalvonta

  const [showMoreTextKaikki5Ala1, setShowMoreTextKaikki5Ala1] = useState(false);
  const [showMoreTextKaikki5Ala2, setShowMoreTextKaikki5Ala2] = useState(false);
  const [showMoreTextKaikki5Ala3, setShowMoreTextKaikki5Ala3] = useState(false);
  const [showMoreTextKaikki5Ala4, setShowMoreTextKaikki5Ala4] = useState(false);
  const [showMoreTextKaikki5Ala5, setShowMoreTextKaikki5Ala5] = useState(false);
  
  const handleShowMoreClickKaikki5 = () => {
    setShowMoreTextKaikki5(!showMoreTextKaikki5);
    setShowMoreTextKaikki5Ala1(false);
    setShowMoreTextKaikki5Ala2(false);
    setShowMoreTextKaikki5Ala3(false);
    setShowMoreTextKaikki5Ala4(false);
    setShowMoreTextKaikki5Ala5(false);
  };
  
  const handleShowMoreClickKaikki5Ala1 = () => {
    setShowMoreTextKaikki5Ala1(!showMoreTextKaikki5Ala1);
  };
  
  const handleShowMoreClickKaikki5Ala2 = () => {
    setShowMoreTextKaikki5Ala2(!showMoreTextKaikki5Ala2);
  };
  
  const handleShowMoreClickKaikki5Ala3 = () => {
    setShowMoreTextKaikki5Ala3(!showMoreTextKaikki5Ala3);
  };
  
  const handleShowMoreClickKaikki5Ala4 = () => {
    setShowMoreTextKaikki5Ala4(!showMoreTextKaikki5Ala4);
  };
  
  const handleShowMoreClickKaikki5Ala5 = () => {
    setShowMoreTextKaikki5Ala5(!showMoreTextKaikki5Ala5);
  };

   // Jäsenen hyöhyt: Jäsenedut

   const [showMoreTextKaikki6Ala1, setShowMoreTextKaikki6Ala1] = useState(false);
   const [showMoreTextKaikki6Ala2, setShowMoreTextKaikki6Ala2] = useState(false);
   const [showMoreTextKaikki6Ala3, setShowMoreTextKaikki6Ala3] = useState(false);
   const [showMoreTextKaikki6Ala4, setShowMoreTextKaikki6Ala4] = useState(false);
   const [showMoreTextKaikki6Ala5, setShowMoreTextKaikki6Ala5] = useState(false);
   const [showMoreTextKaikki6Ala6, setShowMoreTextKaikki6Ala6] = useState(false);
   const [showMoreTextKaikki6Ala7, setShowMoreTextKaikki6Ala7] = useState(false);
   const [showMoreTextKaikki6Ala8, setShowMoreTextKaikki6Ala8] = useState(false);
   const [showMoreTextKaikki6Ala9, setShowMoreTextKaikki6Ala9] = useState(false);
   
   const handleShowMoreClickKaikki6 = () => {
   setShowMoreTextKaikki6(!showMoreTextKaikki6);
   setShowMoreTextKaikki6Ala1(false);
   setShowMoreTextKaikki6Ala2(false);
   setShowMoreTextKaikki6Ala3(false);
   setShowMoreTextKaikki6Ala4(false);
   setShowMoreTextKaikki6Ala5(false);
   setShowMoreTextKaikki6Ala6(false);
   setShowMoreTextKaikki6Ala7(false);
   setShowMoreTextKaikki6Ala8(false);
   setShowMoreTextKaikki6Ala9(false);
   };
   
   const handleShowMoreClickKaikki6Ala1 = () => {
   setShowMoreTextKaikki6Ala1(!showMoreTextKaikki6Ala1);
   };
   
   const handleShowMoreClickKaikki6Ala2 = () => {
   setShowMoreTextKaikki6Ala2(!showMoreTextKaikki6Ala2);
   };
   
   const handleShowMoreClickKaikki6Ala3 = () => {
   setShowMoreTextKaikki6Ala3(!showMoreTextKaikki6Ala3);
   };
   
   const handleShowMoreClickKaikki6Ala4 = () => {
   setShowMoreTextKaikki6Ala4(!showMoreTextKaikki6Ala4);
   };
   
   const handleShowMoreClickKaikki6Ala5 = () => {
   setShowMoreTextKaikki6Ala5(!showMoreTextKaikki6Ala5);
   };
   
   const handleShowMoreClickKaikki6Ala6 = () => {
   setShowMoreTextKaikki6Ala6(!showMoreTextKaikki6Ala6);
   };
   
   const handleShowMoreClickKaikki6Ala7 = () => {
   setShowMoreTextKaikki6Ala7(!showMoreTextKaikki6Ala7);
   };
   
   const handleShowMoreClickKaikki6Ala8 = () => {
   setShowMoreTextKaikki6Ala8(!showMoreTextKaikki6Ala8);
   };
   
   const handleShowMoreClickKaikki6Ala9 = () => {
   setShowMoreTextKaikki6Ala9(!showMoreTextKaikki6Ala9);
   };

  // Rahasummat


  const handleIkaButtonClick = (index) => {
    setActiveButtonIka(index);
    gsap.fromTo(
      '.selection-info-ika',
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.5, transformOrigin: 'center' }
    );
  
    // Animaatioefekti tekstien vaihtamiselle
    gsap.fromTo(
      '.selection-info-ika h4',
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.5, transformOrigin: 'center', delay: 0.2 }
    );
  
    gsap.fromTo(
      '.selection-info-ika p',
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.5, transformOrigin: 'center', delay: 0.4 }
    );
    let arvoIka;

  // Määritä arvo valitun buttonin mukaan
  if (index === 0) {
    arvoIka = "18-30";
  } else if (index === 1) {
    arvoIka = "30-40";
  } else if (index === 2) {
    arvoIka = "40-50";
  } else if (index === 3) {
    arvoIka = "50-65";
  } else if (index === 4) {
    arvoIka = "+65";
  }

  // Ei järjestetty
  setArvoIka(arvoIka);
  };

  const handleToimintaButtonClick = (index) => {
    setActiveButtonToiminta(index);
    gsap.fromTo(
      '.selection-info-toiminta',
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.5, transformOrigin: 'center' }
    );
  
    // Animaatioefekti tekstien vaihtamiselle
    gsap.fromTo(
      '.selection-info-toiminta h4',
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.5, transformOrigin: 'center', delay: 0.2 }
    );
  
    gsap.fromTo(
      '.selection-info-toiminta p',
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.5, transformOrigin: 'center', delay: 0.4 }
    );

    let arvoToiminta;
    // Määritä arvo valitun buttonin mukaan
if (index === 0) {
  arvoToiminta = "Opiskelija";
} else if (index === 1) {
  arvoToiminta = "Työelämässsä";
} else if (index === 2) {
  arvoToiminta = "Työtön";
} else if (index === 3) {
  arvoToiminta = "Yrittäjä";
} else if (index === 4) {
  arvoToiminta = "Eläkeläinen";
}

setArvoToiminta(arvoToiminta);
  };

  const handleAsemaButtonClick = (index) => {
    setActiveButtonAsema(index);
    gsap.fromTo(
      '.selection-info-asema',
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.5, transformOrigin: 'center' }
    );
  
    // Animaatioefekti tekstien vaihtamiselle
    gsap.fromTo(
      '.selection-info-asem h4',
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.5, transformOrigin: 'center', delay: 0.2 }
    );
  
    gsap.fromTo(
      '.selection-info-asema p',
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.5, transformOrigin: 'center', delay: 0.4 }
    );

    let arvoAsema;
    // Määritä arvo valitun buttonin mukaan
if (index === 0) {
  arvoAsema = "Asiantuntija";
} else if (index === 1) {
  arvoAsema = "Päälikkö";
} else if (index === 2) {
  arvoAsema = "Johtaja";
}else if (index === 3) {
  arvoAsema = "Ei mikään näistä";
}

setArvoAsema(arvoAsema);
  };


   // Funktio palauttaa oikeat Ikä tekstit valinnan perusteella
   const getIkaTeksti1 = (index) => {
    if (index === 0) {
      return   <ul>
      <li><p2>Henkilökohtaista juridinen nuvontaa</p2> työelämän lakiasioissa. Mahdollisuus hakea Oikeusapua jäsenen työ-, virka- tai toimissudetta koskevassa rikosasiassa sekä näissä tapauksissa mahdollisten vastapuolen oikeaudenkäyntikulujen korvaaminen 20 000 euroon asti.</li>
      <li><p2>Ammatillinen kehittyminen:</p2> Suomen Ekonomit tarjoaa jäsenilleen monipuolisia koulutus- ja kehittymismahdollisuuksia. Liitto järjestää esimerkiksi ammatillisia koulutuksia, työpajoja ja webinaareja, jotka auttavat sinua kehittämään osaamistasi ja pysymään ajan tasalla alan muutoksista. Jäsenenä saat myös pääsyn liiton tarjoamiin urapalveluihin, kuten työnhakuneuvontaan ja uravalmennukseen, jotka voivat auttaa sinua edistymään urallasi.</li>
      <li><p2>Tonnin jäsenedut - Ammattilehti</p2> jopa 70 % alennuksella, Danske Bankin asuntolainaedut (jopa 1600€), Henkivakuutus 61 % alennuksella ja koko Suomen laajuiset Member+ edut. </li>
    </ul>
    } else if (index === 1) {
      return <ul>
      <li><p2>Henkilökohtaista juridinen nuvontaa</p2>työelämän lakiasioissa. Mahdollisuus hakea Oikeusapua jäsenen työ-, virka- tai toimissudetta koskevassa rikosasiassa sekä näissä tapauksissa mahdollisten vastapuolen oikeaudenkäyntikulujen korvaaminen 20 000 euroon asti.</li>
      <li><p2>Yksilöllistä uravalmennusta ja palkkaneuvontaa ja koulutuksia - </p2>Luottamukselliset keskustelut uravalmentajan kanssa auttavat sinua löytämään ratkaisuja urasi suuntaan, työnhakuun, työhyvinvointiin ja palkkakehitykseen. Tarjoamme jäsenilleen jatkuvia kehittymismahdollisuuksia erilaisten koulutusten ja tapahtumien avulla.</li>
      <li><p2>Primus henkivakuutus - </p2>Saat Suomen edullisimman henkivakuutuksen itsellesi ja puolisollesi jopa 61 prosenttia normaalihintoja edullisemmin. Jäsenet ovat säästäneet keskimäärin 540 euroa henkivakuutuksen hinnassa. </li>
    </ul>
    } else if (index === 2) {
      return <ul>
      <li><p2>Henkilökohtaista juridinen nuvontaa</p2>työelämän lakiasioissa. Mahdollisuus hakea Oikeusapua jäsenen työ-, virka- tai toimissudetta koskevassa rikosasiassa sekä näissä tapauksissa mahdollisten vastapuolen oikeaudenkäyntikulujen korvaaminen 20 000 euroon asti.</li>
      <li><p2>Edunvalvonta ja yhteiskunnallinen vaikuttamistyö - </p2> ajamme aina ensisijaisesti jäsentemme etuja.  Pyrimme mm. työehtosopimusten kautta turvaamaan jäsenillemme parhaat mahdolliset työsuhteen ehdot, kuten sairauajanpalkka, lomarahat ja säännölliset palkankorotukset. </li>
      <li><p2>Primus henkivakuutus - </p2>Saat Suomen edullisimman henkivakuutuksen itsellesi ja puolisollesi jopa 61 prosenttia normaalihintoja edullisemmin. Jäsenet ovat säästäneet keskimäärin 540 euroa henkivakuutuksen hinnassa. </li>
    </ul>
    } else if (index === 3) {
      return <ul>
      <li><p2>Henkilökohtaista juridinen nuvontaa</p2>työelämän lakiasioissa. Mahdollisuus hakea Oikeusapua jäsenen työ-, virka- tai toimissudetta koskevassa rikosasiassa sekä näissä tapauksissa mahdollisten vastapuolen oikeaudenkäyntikulujen korvaaminen 20 000 euroon asti.</li>
      <li><p2>Edunvalvonta ja yhteiskunnallinen vaikuttamistyö - </p2> ajamme aina ensisijaisesti jäsentemme etuja.  Pyrimme mm. työehtosopimusten kautta turvaamaan jäsenillemme parhaat mahdolliset työsuhteen ehdot, kuten sairauajanpalkka, lomarahat ja säännölliset palkankorotukset. </li>
      <li><p2>Primus henkivakuutus - </p2>Saat Suomen edullisimman henkivakuutuksen itsellesi ja puolisollesi jopa 61 prosenttia normaalihintoja edullisemmin. Jäsenet ovat säästäneet keskimäärin 540 euroa henkivakuutuksen hinnassa. </li>
    </ul>
    } else if (index === 4) {
      return <ul>
      <li><p2>Henkilökohtaista juridinen nuvontaa</p2>työelämän lakiasioissa. Mahdollisuus hakea Oikeusapua jäsenen työ-, virka- tai toimissudetta koskevassa rikosasiassa sekä näissä tapauksissa mahdollisten vastapuolen oikeaudenkäyntikulujen korvaaminen 20 000 euroon asti.</li>
      <li><p2>Edunvalvonta ja yhteiskunnallinen vaikuttamistyö - </p2> ajamme aina ensisijaisesti jäsentemme etuja.  Pyrimme mm. työehtosopimusten kautta turvaamaan jäsenillemme parhaat mahdolliset työsuhteen ehdot, kuten sairauajanpalkka, lomarahat ja säännölliset palkankorotukset. </li>
      <li><p2>Primus henkivakuutus - </p2>Saat Suomen edullisimman henkivakuutuksen itsellesi ja puolisollesi jopa 61 prosenttia normaalihintoja edullisemmin. Jäsenet ovat säästäneet keskimäärin 540 euroa henkivakuutuksen hinnassa. </li>
    </ul>;
    }
  };

  const getIkaTeksti2 = (index) => {
    if (index === 0) {
      return <ul>
      <li><p2>Oikeudellinen turva - </p2> Huolehdithan, että sinulla on riittävän tasoinen oikeudellinen turva työelämän ongelmatilanteiteita tulevaisuudessa. Vakuutusyhtiöt tai työttömyyskassa eivät tarjoa joko lainkaan tai ainakaan samanlaatuista oikeudellista turvaa ekonomeille. Jäsenyysvuotesi kerryttävät turvaa meillä.</li>
      <li><p2>Palkankorotukset - </p2> Huolehdithan, että sinulla on ekonomien palkkauksen asiantuntijoita ja tutkittua tietoa tukenasi palkkaneuvotteluissa ja juristeja tarkistamassa työsopimuksiasi, jotta saat ansaitsemasi arvoista palkkaa ja työelämää.</li>
      <li><p2>Ymmärrys kehityksestä - </p2> Huolehdithan, että kehität itseäsi myös valmistumisen jälkeen ja pysyt silloin kehityksen kärryillä. Tarjoamme jäsenillemme niin koulutuksia ja sisältöjä itsensä kehittämiseen. Lisäksi saat kaupallisen alan digi- ja printtilehtiä jopa 70 % alennuksella.</li>
    </ul>
    } else if (index === 1) {
      return <ul>
      <li><p2>Oikeudellinen turva - </p2> Huolehdithan, että sinulla on riittävän tasoinen oikeudellinen turva työelämän ongelmatilanteiteita tulevaisuudessa. Vakuutusyhtiöt tai työttömyyskassa eivät tarjoa joko lainkaan tai ainakaan samanlaatuista oikeudellista turvaa ekonomeille. Jäsenyysvuotesi kerryttävät turvaa meillä.</li>
      <li><p2>Suunnan etsiminen - </p2> Huolehdithan, että sinulla on käytettävissä asiantuntijoita apunasi, kun mietit uusia urasuunnitelmia tai mietit seuraavien askeleiden ottoa. Jäsentemme käytössä ovat muun muassa kokeneet uravalmentajat, johtajasopimuksia jatkuvasti tekevät juristit ja erilaisia työnhakua tukevia palveluita.</li>
      <li><p2>Ymmärrys kehityksestä - </p2> Huolehdithan, että kehität itseäsi myös valmistumisen jälkeen ja pysyt silloin kehityksen kärryillä. Tarjoamme jäsenillemme niin koulutuksia ja sisältöjä itsensä kehittämiseen. Lisäksi saat kaupallisen alan digi- ja printtilehtiä jopa 70 % alennuksella.</li>
    </ul>;
    } else if (index === 2) {
      return <ul>
      <li><p2>Oikeudellinen turva - </p2> Huolehdithan, että sinulla on riittävän tasoinen oikeudellinen turva työelämän ongelmatilanteiteita tulevaisuudessa. Vakuutusyhtiöt tai työttömyyskassa eivät tarjoa joko lainkaan tai ainakaan samanlaatuista oikeudellista turvaa ekonomeille. Jäsenyysvuotesi kerryttävät turvaa meillä.</li>
      <li><p2>Työehtosopimukset - </p2> Huolehdithan, että suomalaisilla työpaikoilla tehdään työehtosopimuksia siten, että ne tukevat niin toiminnan kasvua, mutta ennen kaikkea palkitsevat arvokkaan työn tekijöitä.</li>
      <li><p2>Ymmärrys kehityksestä - </p2> Huolehdithan, että kehität itseäsi myös valmistumisen jälkeen ja pysyt silloin kehityksen kärryillä. Tarjoamme jäsenillemme niin koulutuksia ja sisältöjä itsensä kehittämiseen. Lisäksi saat kaupallisen alan digi- ja printtilehtiä jopa 70 % alennuksella.</li>
    </ul>;
    } else if (index === 3) {
      return <ul>
      <li><p2>Oikeudellinen turva - </p2> Huolehdithan, että sinulla on riittävän tasoinen oikeudellinen turva työelämän ongelmatilanteiteita tulevaisuudessa. Vakuutusyhtiöt tai työttömyyskassa eivät tarjoa joko lainkaan tai ainakaan samanlaatuista oikeudellista turvaa ekonomeille. Jäsenyysvuotesi kerryttävät turvaa meillä.</li>
      <li><p2>Suunnan etsiminen - </p2> Huolehdithan, että sinulla on käytettävissä asiantuntijoita apunasi, kun mietit uusia urasuunnitelmia tai mietit seuraavien askeleiden ottoa. Jäsentemme käytössä ovat muun muassa kokeneet uravalmentajat, johtajasopimuksia jatkuvasti tekevät juristit ja erilaisia työnhakua tukevia palveluita.</li>
      <li><p2>Ymmärrys kehityksestä - </p2>Huolehdithan, että kehität itseäsi myös uran aikana ja pysyt silloin kehityksen kärryillä. Tarjoamme jäsenillemme niin koulutuksia ja sisältöjä itsensä kehittämiseen. Lisäksi saat kaupallisen alan digi- ja printtilehtiä jopa 70 % alennuksella. </li>
    </ul>;
    } else if (index === 4) {
      return <ul>
      <li><p2>Tue alan arvostuksen nostamista - </p2>Olethan mukana varmistamassa, että kauppatieteellisen koulutuksen osaajia ja osaamista arvostetaan yhteiskunnassa myös tulevaisuudessa. Teemme jatkuvasti niin vaikuttamistyötä kuin mediatyötäkin kauppatieteellisen alan arvostuksen edistämiseksi.</li>
      <li><p2>Ymmärrys kehityksestä - </p2> Huolehdithan, että voit seurata itseaäsi kiinnostavia teemoja myös eläkkeelle jäännin jälkeen. Sisältömme varmistavat, että pysyt eläkkeelläkin kartalla tulevaisuudesta. Saat kaupallisen alan digi- ja printtilehtiä jopa 70 % alennuksella. </li>
      <li><p2>Rahan arvoiset jäsenedut - </p2>Varmistathan, että saat rahanarvoisia etuja myös eläkkeellä ollessasi. Jäsenemämme saatu puoleen hintaan samat edut kuin työssäkäyvät jäsenemme.</li>
    </ul>;
    }
  };


     // Funktio palauttaa oikeat Toiminta tekstit valinnan perusteella
     const getToimintaTeksti1 = (index) => {
      if (index === 0) {
        return <ul>
        <li><p2>Henkilökohtaista juridinen nuvontaa</p2> työelämään liittyvissä asioissa. Mahdollisuus hakea Oikeusapua jäsenen työ-, virka- tai toimissudetta koskevassa rikosasiassa sekä näissä tapauksissa mahdollisten vastapuolen oikeaudenkäyntikulujen korvaaminen.</li>
        <li><p2>Edunvalvonta ja yhteiskunnallinen vaikuttamistyö - </p2> pyrimme työehtosopimusten kautta turvaamaan jäsenillemme parhaat mahdolliset työsuhteen ehdot, kuten sairauajanpalkka, lomarahat ja säännölliset palkankorotukset.</li>
        <li><p2>Tonnin jäsenedut - </p2>Ammattilehti jopa 70 % alennuksella, Danske Bankin asuntolainaedut (jopa 1600€), Henkivakuutus 61 % alennuksella ja koko Suomen laajuiset Member+ edut. </li>
      </ul>;
      } else if (index === 1) {
        return <ul>
        <li><p2>Henkilökohtaista juridinen nuvontaa</p2> työelämään liittyvissä asioissa. Mahdollisuus hakea Oikeusapua jäsenen työ-, virka- tai toimissudetta koskevassa rikosasiassa sekä näissä tapauksissa mahdollisten vastapuolen oikeaudenkäyntikulujen korvaaminen.</li>
        <li><p2>Yksilöllistä uravalmennusta ja palkkaneuvontaa - </p2> Luottamukselliset keskustelut uravalmentajan kanssa auttavat sinua löytämään ratkaisuja urasi suuntaan, työnhakuun, työhyvinvointiin ja palkkakehitykseen. Uravalmentajillamme on erinomainen käsitys ekonomien palkoista ja palkkakehityksestä.</li>
        <li><p2>Primus henkivakuutus - </p2>Saat Suomen edullisimman henkivakuutuksen itsellesi ja puolisollesi jopa 61 prosenttia normaalihintoja edullisemmin. Jäsenet ovat säästäneet keskimäärin 540 euroa henkivakuutuksen hinnassa. </li>
      </ul>;
      } else if (index === 2) {
        return <ul>
        <li><p2>Henkilökohtaista juridinen nuvontaa</p2> työelämään liittyvissä asioissa. Mahdollisuus hakea Oikeusapua jäsenen työ-, virka- tai toimissudetta koskevassa rikosasiassa sekä näissä tapauksissa mahdollisten vastapuolen oikeaudenkäyntikulujen korvaaminen.</li>
        <li><p2>Yksilöllistä uravalmennusta ja palkkaneuvontaa - </p2> Luottamukselliset keskustelut uravalmentajan kanssa auttavat sinua löytämään ratkaisuja urasi suuntaan, työnhakuun, työhyvinvointiin ja palkkakehitykseen. Uravalmentajillamme on erinomainen käsitys ekonomien palkoista ja palkkakehityksestä.</li>
        <li><p2>Primus henkivakuutus - </p2>Saat Suomen edullisimman henkivakuutuksen itsellesi ja puolisollesi jopa 61 prosenttia normaalihintoja edullisemmin. Jäsenet ovat säästäneet keskimäärin 540 euroa henkivakuutuksen hinnassa. </li>
      </ul>;
      } else if (index === 3) {
        return <ul>
        <li><p2>Henkilökohtaista juridinen nuvontaa</p2> työelämään liittyvissä asioissa. Mahdollisuus hakea Oikeusapua jäsenen työ-, virka- tai toimissudetta koskevassa rikosasiassa sekä näissä tapauksissa mahdollisten vastapuolen oikeaudenkäyntikulujen korvaaminen.</li>
        <li><p2>Tonnin jäsenedut - </p2>Ammattilehti jopa 70 % alennuksella, Danske Bankin asuntolainaedut (jopa 1600€), Henkivakuutus 61 % alennuksella ja koko Suomen laajuiset Member+ edut. </li>
        <li><p2>Primus henkivakuutus - </p2>Saat Suomen edullisimman henkivakuutuksen itsellesi ja puolisollesi jopa 61 prosenttia normaalihintoja edullisemmin. Jäsenet ovat säästäneet keskimäärin 540 euroa henkivakuutuksen hinnassa. </li>
      </ul>;
      } else if (index === 4) {
        return <ul>
        <li><p2>Tapahtumat - </p2> tarjoamme jäsenillemme myös viihteellisempiä tapahtumia kuten Linnanmäen Heko Heko päivä tai leffa ensi-iltoja.</li>
        <li><p2>Edunvalvonta ja ammatillinen arvostus - </p2>ajamme jäsentemme etuja ja  tarjoaa mahdollisuuden olla osa laajempaa talousalan yhteisöä sekä vaikuttaa alan kehittämiseen.</li>
        <li><p2>Suomen laajuiset Member+ edut - </p2>Palveluun on kerätty ajankohtaisia etuja ja palveluita, mm. mökkeilyyn, matkailuun, vapaa-aikaan ja hyvinvointiin liittyen.</li>
      </ul>;
      }
    };
  
    const getToimintaTeksti2 = (index) => {
      if (index === 0) {
        return  <ul>
        <li><p2>Alan arvostuksen kehittäminen - </p2> Huolehdithan siitä, että kauppatieteellinen ala kehittyy mieleiseesi suuntaan. Jäsenenämme olet kehittämässä alan opetusta ja käytänteitä. Teemme muun muassa yliopistoissa edunvalvontaa opiskelijayhdistysten kautta ja valtakunnallisesti montaa eri reittiä. Lisäksi tuotamme yliopistoille muun muassa vastavalmistuneiden palautekyselyä.</li>
        <li><p2>Työn haku - </p2>Varmistathan, että saat riittävästi tukea työnhakuun ja työnhaun dokumentteihin. Tarjoamme opiskelijajäsenillemme Kylterin Työnhaun palvelua, jossa niin vinkkejä työhaun eri vaiheisiin, esimerkkejä työnhaun dokumenteista ja harjoitteita työnhaussa menestymiseen. </li>
        <li><p2>Ymmärrys kehityksestä - </p2>Huolehdithan, että kehität itseäsi seuraamalla alan kehitystä. Tarjoamme opiskelijajäsenillemme niin koulutuksia ja sisältöjä itsensä kehittämiseen. Lisäksi saat opiskelijana ilmaisen Kauppalehti digin lukuvuodeksi. </li>
      </ul>;
      } else if (index === 1) {
        return <ul>
        <li><p2>Oikeudellinen turva - </p2>Huolehdithan, että sinulla on riittävän tasoinen oikeudellinen turva työelämän ongelmatilanteiteita tulevaisuudessa. Vakuutusyhtiöt tai työttömyyskassa eivät tarjoa joko lainkaan tai ainakaan samanlaatuista oikeudellista turvaa ekonomeille. Jäsenyysvuotesi kerryttävät turvaa meillä.</li>
        <li><p2>Suunnan etsiminen - </p2>Huolehdithan, että sinulla on käytettävissä asiantuntijoita apunasi, kun mietit uusia urasuunnitelmia tai mietit seuraavien askeleiden ottoa. Jäsentemme käytössä ovat muun muassa kokeneet uravalmentajat, johtajasopimuksia jatkuvasti tekevät juristit ja erilaisia työnhakua tukevia palveluita.</li>
        <li><p2>Työehtosopimukset - </p2>Huolehdithan, että suomalaisilla työpaikoilla tehdään työehtosopimuksia siten, että ne tukevat niin toiminnan kasvua, mutta ennen kaikkea palkitsevat arvokkaan työn tekijöitä. Olemalla mukana varmistamassa työehtosopimuksia varmistat, että myös toimialaa vaihtaessa saat työntekoa tukevat sopimukset.</li>
      </ul>;
      } else if (index === 2) {
        return <ul>
        <li><p2>Oikeudellinen turva - </p2> Huolehdithan, että sinulla on riittävän tasoinen oikeudellinen turva työelämän ongelmatilanteiteita tulevaisuudessa. Vakuutusyhtiöt tai työttömyyskassa eivät tarjoa joko lainkaan tai ainakaan samanlaatuista oikeudellista turvaa ekonomeille. Jäsenyysvuotesi kerryttävät turvaa meillä.</li>
        <li><p2>Suunnan etsiminen - </p2> Huolehdithan, että sinulla on käytettävissä asiantuntijoita apunasi, kun mietit uusia urasuunnitelmia tai mietit seuraavien askeleiden ottoa. Jäsentemme käytössä ovat muun muassa kokeneet uravalmentajat, johtajasopimuksia jatkuvasti tekevät juristit ja erilaisia työnhakua tukevia palveluita.</li>
        <li><p2>Ymmärrys kehityksestä - </p2> Huolehdithan, että kehität itseäsi myös valmistumisen jälkeen ja pysyt silloin kehityksen kärryillä. Tarjoamme jäsenillemme niin koulutuksia ja sisältöjä itsensä kehittämiseen. Lisäksi saat kaupallisen alan digi- ja printtilehtiä jopa 70 % alennuksella.</li>
      </ul>;
      } else if (index === 3) {
        return <ul>
        <li><p2>Verkostot ja yhteisö - </p2>Huolehdithan, että sinulla on verkostoja erilaisiin tahoihin yrittäjänä ollesasi. Toimintamme kautta pääset tutustumaan potentiaalisiin rekryihin, asiakkaisiin ja mukaviin ihmisiin. Paikallisverkostojamme on ympäri Suomen.</li>
        <li><p2>Alan arvostuksen kehittäminen - </p2> Huolehdithan siitä, että kauppatieteellinen ala kehittyy mieleiseesi suuntaan. Jäsenenämme olet kehittämässä alan opetusta ja käytänteitä. Teemme muun muassa yliopistoissa edunvalvontaa opiskelijayhdistysten kautta ja valtakunnallisesti montaa eri reittiä. Lisäksi tuotamme yliopistoille muun muassa vastavalmistuneiden palautekyselyä.</li>
        <li><p2>Ekonomiyrittäjien tukeminen - </p2>Olethan mukana tukemassa uusia ekonomiyrittäjiä. Tarjoamme uusille ekonomiyrittäjille neuvontaa. Jäsenyydellämme saat myös Suomen Yrittäjien palvelupaketin.</li>
      </ul>;
      } else if (index === 4) {
        return <ul>
        <li><p2>Verkostot ja yhteisö - </p2>Huolehdithan, että sinulla on verkostoja erilaisiin tahoihin myös eläkkeelläsi ollesasi. Toimintamme kautta pääset olemaan osa valloittavaa yhteisöämme.</li>
        <li><p2>Tue alan arvostuksen nostamista - </p2>Olethan mukana varmistamassa, että kauppatieteellisen koulutuksen osaajia ja osaamista arvostetaan yhteiskunnassa myös tulevaisuudessa. Teemme jatkuvasti niin vaikuttamistyötä kuin mediatyötäkin kauppatieteellisen alan arvostuksen edistämiseksi.</li>
        <li><p2>Rahan arvoiset jäsenedut  - </p2>Varmistathan, että saat rahanarvoisia etuja myös eläkkeellä ollessasi. Jäsenemämme saatu puoleen hintaan samat edut kuin työssäkäyvät jäsenemme.</li>
      </ul>;
      }
    };

    // Funktio palauttaa oikeat Asema tekstit valinnan perusteella
    const getAsemaTeksti1 = (index) => {
      if (index === 0) {
        return <ul>
        <li><p2>Yksilöllistä uravalmennusta ja palkkaneuvontaa - </p2>  Luottamukselliset keskustelut uravalmentajan kanssa auttavat sinua löytämään ratkaisuja urasi suuntaan, työnhakuun, työhyvinvointiin ja palkkakehitykseen. Uravalmentajillamme on erinomainen käsitys ekonomien palkoista ja palkkakehityksestä.</li>
        <li><p2>Henkilökohtaista juridista neuvontaa </p2>työelämään liittyvissä asioissa. Mahdollisuus hakea Oikeusapua jäsenen työ-, virka- tai toimissudetta koskevassa rikosasiassa sekä näissä tapauksissa mahdollisten vastapuolen oikeaudenkäyntikulujen korvaaminen.</li>
        <li><p2>Verkostoitumispalvelu - </p2>Löydät palvelusta helposti uusia tuttavuuksia, jotka jakavat esimerkiksi samat ammatillisen kiinnostuksen kohteet kuin sinä. Voit myös laajentaa osaamistasi uusille alueille verkostoitumalla sellaisten ihmisten kanssa, joilla on osaamista, jota sinä esimerkiksi haluaisit hankkia.</li>
      </ul>;
      } else if (index === 1) {
        return <ul>
        <li><p2>Henkilökohtaista juridista neuvontaa </p2>työelämän lakiasioissa. Mahdollisuus hakea Oikeusapua jäsenen työ-, virka- tai toimissudetta koskevassa rikosasiassa sekä näissä tapauksissa mahdollisten vastapuolen oikeaudenkäyntikulujen korvaaminen 20 000 euroon asti.</li>
        <li><p2>Ammatilliset live- tapahtumat - </p2>Suomen Ekonomit tarjoaa jäsenilleen jatkuvia kehittymismahdollisuuksia erilaisten koulutusten ja tapahtumien avulla.</li>
        <li><p2>Suomen laajuiset Member+ edut - </p2>Palveluun on kerätty ajankohtaisia etuja ja palveluita, mm. mökkeilyyn, matkailuun, vapaa-aikaan ja hyvinvointiin liittyen.</li>
      </ul>;
      } else if (index === 2) {
        return <ul>
        <li><p2>Henkilökohtaista juridista neuvontaa </p2>työelämän lakiasioissa. Mahdollisuus hakea Oikeusapua jäsenen työ-, virka- tai toimissudetta koskevassa rikosasiassa sekä näissä tapauksissa mahdollisten vastapuolen oikeaudenkäyntikulujen korvaaminen 20 000 euroon asti.</li>
        <li><p2>Ammatillinen verkostoituminen - </p2>Jäsenenä voit osallistua tapahtumiin, joissa tapaat kollegoitasi eri toimialoilta. Tällaiset verkostot voivat tarjota mahdollisuuksia oppia uutta, vaihtaa ajatuksia ja jakaa parhaita käytäntöjä. </li>
        <li><p2>Edunvalvonta ja vaikuttaminen - </p2>ajamme aktiivisesti johtajien etuja työmarkkinoilla. Seuraamme työmarkkinoiden kehitystä, työehtoja ja palkkauksen tasoa. Jäsenenä voit hyötyä liiton tarjoamista neuvontapalveluista työsuhdeasioissa ja työehtosopimuksiin liittyvissä kysymyksissä. Lisäksi voit osallistua  vaikuttamistyöhön ja olla mukana muokkaamassa talousalan toimintaympäristöä.</li>
      </ul>;
      } else if (index === 3) {
        return <ul>
        <li><p2>Selvä pyy! </p2>Vaikkei näistä asematasoista mikään sinua juuri nyt koskisikaan, voit halutessasi tarkistaa niiden takaa mitä kaikkea jäsenyytemme eri asematasoilla toimiville tarjoaa. Jäsenyytemme kehittyy mukanasi, joten varmistathan, että tiedät mitä kaikkea voit jäsenyydellämme saada.</li>
       </ul>;
      } 
    };
  
    const getAsemaTeksti2 = (index) => {
      if (index === 0) {
        return <ul>
        <li><p2>Oikeudellinen turva - </p2>Huolehdithan, että sinulla on riittävän tasoinen oikeudellinen turva työelämän ongelmatilanteiteita varten niin nyt kuin tulevaisuudessa. Vakuutusyhtiöt tai työttömyyskassa eivät tarjoa joko lainkaan tai ainakaan samanlaatuista oikeudellista turvaa ekonomeille. Jäsenyysvuotesi kerryttävät turvaa meillä. Tilanteesi voi nopeasti vaihtua ja sen takia on hyvä varautua jo etukäteen.</li>
        <li><p2>Palkankorotukset - </p2>Huolehdithan, että sinulla on ekonomien palkkauksen asiantuntijoita ja tutkittua tietoa tukenasi palkkaneuvotteluissa ja juristeja tarkistamassa työsopimuksiasi, jotta saat ansaitsemasi arvoista palkkaa ja työelämää. Neuvottelemme myös yleisiä ja yrityskohtaisia työehtosopimuksia, jotka varmistavat palkan kehittymisen, vaikka työtehtävät eivät muuttuisikaan.</li>
        <li><p2>Yhteisö ja verkosto - </p2>Huolehdithan itsesi kehittämisestä ja mielekkäistä kohtaamisistasi työyhteisösi ulkopuolella. Ekonomiyhteisö tarjoaa monenmoista ohjelmaa ja sisältöä elämään. Tarjoamme niin itsensä kehittämiseen tukea. Paikallisyhdistyksemme järjestävät lisäksi monenmoista vapaa-ajan asiapitoisempaa ja vapaampaa aktiviteettia.</li>
      </ul>;
      } else if (index === 1) {
        return <ul>
        <li><p2>Oikeudellinen turva - </p2>Huolehdithan, että sinulla on riittävän tasoinen oikeudellinen turva työelämän ongelmatilanteiteita varten niin nyt kuin tulevaisuudessa. Vakuutusyhtiöt tai työttömyyskassa eivät tarjoa joko lainkaan tai ainakaan samanlaatuista oikeudellista turvaa ekonomeille. Jäsenyysvuotesi kerryttävät turvaa meillä. Tilanteesi voi nopeasti vaihtua ja sen takia on hyvä varautua jo etukäteen.</li>
        <li><p2>Palkankorotukset - </p2>Huolehdithan, että sinulla on ekonomien palkkauksen asiantuntijoita ja tutkittua tietoa tukenasi palkkaneuvotteluissa ja juristeja tarkistamassa työsopimuksiasi, jotta saat ansaitsemasi arvoista palkkaa ja työelämää. Neuvottelemme myös yleisiä ja yrityskohtaisia työehtosopimuksia, jotka varmistavat palkan kehittymisen, vaikka työtehtävät eivät muuttuisikaan.</li>
        <li><p2>Esimieskoulutukset ja sisällöt - </p2>Huolehdithan niin uutena kuin pidempääkin toimineena esimiehenä osaamisesi kehittämisesti. Tarjoamme monenmoista sisältöä ja koulutuksia esimiehenä toimiville jäsenillemme.</li>
      </ul>;
      } else if (index === 2) {
        return  <ul>
        <li><p2>Oikeudellinen turva - </p2>Huolehdithan, että sinulla on riittävän tasoinen oikeudellinen turva työelämän ongelmatilanteiteita varten niin nyt kuin tulevaisuudessa. Vakuutusyhtiöt tai työttömyyskassa eivät tarjoa joko lainkaan tai ainakaan samanlaatuista oikeudellista turvaa ekonomeille. Jäsenyysvuotesi kerryttävät turvaa meillä. Tilanteesi voi nopeasti vaihtua ja sen takia on hyvä varautua jo etukäteen.</li>
        <li><p2>Johtajasopimukset - </p2>Varmistathan, että sinulla on johtajasopimuksia laadittaessa asiantuntevat juristit apunasi tarkistamassa sopimuksia. Voit saada mittavia rahallisia hyötyjä, mikäli osaat neuvotella palkkaukseen ja muihin työehtoihin liittyvät sopimukset oikein.</li>
        <li><p2>Työnantajaneuvonta - </p2>Huolehdithan, että voit tarvittaessa kysyä vaikeista työnantajan kysymyksistä asiantuntevilta juristeilta. Tarjoamme työnantajan edustajana toimiville jäsenillemme myös työnantajaneuvontaa, jossa autamme vaikeiden juridisten tilanteiden ratkaisussa.</li>
      </ul>;
      } else if (index === 3) {
        return <ul>
        <li><p2>Selvä pyy! </p2>Vaikkei näistä asematasoista mikään sinua juuri nyt koskisikaan, voit halutessasi tarkistaa niiden takaa mitä kaikkea jäsenyytemme eri asematasoilla toimiville tarjoaa. Olemme myös tehneet nostoja siitä, mitä tulisi miettiä eri asematasoilla, jollei olisi jäsen.</li>
       </ul>;
      } 
    };

          /* <div className="container"><Table /></div> */
          
  return (
    <div className="App">
      <div className="box-yhteenveto-alku">
         <div className="box-yhteenveto-alku-otsikko">
          <h2>Jäsenen hyödyt</h2>
          <WordCarousel />
         </div>
          <div className="box-yhteenveto-alku-kuva">
          <img style={{ width: '100%' }} src={ryhmaImage} alt="ryhma" />
        </div>
     </div>

      <div className="box-yhteenveto-alku-teksti">
      <div className="box-yhteenveto-alku-raha">
      <h3>Etu luokka</h3>
      <h3>Rahallinen hyöty</h3>
      </div>
      <div className='box-yhteenveto-alaotsikko-raha'>
      <h4>
      <ExpendableButton isOpen={showMoreTextKaikki1} toggle={handleShowMoreClickKaikki1} />
      Yhteisö ja verkosto
      </h4>
      ={priceYhteisoJaVerkosto}€
      </div>
      {showMoreTextKaikki1 && (
        <div>
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span><ExpendableButton isOpen={showMoreTextKaikkiAla1} toggle={handleShowMoreClickKaikkiAla1} showMaterialSymbol={false} />Paikallisyhdistykset ja kerhot</span>
            <label>{selectedProducts[0].price}€
            <input
              type="checkbox" id="check"
              checked={selectedProducts[0].selected}
              onChange={() => handleProductToggle(selectedProducts[0].id)}
            />
          </label>
          </div>
            {showMoreTextKaikkiAla1 && (
              <ul>
                <li>Ekonomijäsenet kuuluvat alueellisiin ekonomiyhdistyksiin, jotka tuovat ekonomitoiminnan paikalliselle tasolle ja tarjoavat koulutuksia ja tapahtumia. Eri puolella Suomea toimivia ekonomiyhdistyksiä on 25. Jäsenyytemme rakentuu yhdistysjäsenyyden periaatteelle eli jäsenet kuuluvat liittoon jäsenyhdistysten kautta.</li>
              </ul>
            )}
            <div className="box-yhteenveto-alaotsikko-teksti">
            <span><ExpendableButton isOpen={showMoreTextKaikkiAla2} toggle={handleShowMoreClickKaikkiAla2} showMaterialSymbol={false} />Toimikunnat</span>
            <label>{selectedProducts[1].price}€
            <input
              type="checkbox" id="check"
              checked={selectedProducts[1].selected}
              onChange={() => handleProductToggle(selectedProducts[1].id)}
            />
          </label>
          </div>
            {showMoreTextKaikkiAla2 && (
              <ul>
                <li>Suomen Ekonomien toimikunnat – työelämätoimikunta, koulutuspoliittinen toimikunta ja yrittäjyystyöryhmä – ovat vaikuttamistyön ytimessä. Ryhmät valmistelevat päätöksiä, ehdotuksia ja suosituksia. Toimikunnan jäsenenä pääsee verkostoitumaan sekä oppimaan laajasti yhteiskunnallisesta vaikuttamisesta.</li>
              </ul>
            )}
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span><ExpendableButton isOpen={showMoreTextKaikkiAla3} toggle={handleShowMoreClickKaikkiAla3} showMaterialSymbol={false} />Opiskelijajärjestöt ja kerhot</span>
            <label>{selectedProducts[2].price}€
            <input
              type="checkbox" id="check"
              checked={selectedProducts[2].selected}
              onChange={() => handleProductToggle(selectedProducts[2].id)}
            />
          </label>
          </div>
            {showMoreTextKaikkiAla3 && (
              <ul>
                <li>Kauppatieteiden opiskelijat, kylterit, kuuluvat Suomen Ekonomeihin opiskelijayhdistysten kautta.</li>
              </ul>
            )}
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span><ExpendableButton isOpen={showMoreTextKaikkiAla4} toggle={handleShowMoreClickKaikkiAla4} showMaterialSymbol={false} />Verkostoitumispalvelu</span>
            <label>{selectedProducts[3].price}€
            <input
              type="checkbox" id="check"
              checked={selectedProducts[3].selected}
              onChange={() => handleProductToggle(selectedProducts[3].id)}
            />
          </label>
          </div>
            {showMoreTextKaikkiAla4 && (
              <ul>
                <li>Löydät palvelusta helposti uusia tuttavuuksia, jotka jakavat esimerkiksi samat ammatillisen kiinnostuksen kohteet kuin sinä. Voit myös laajentaa osaamistasi uusille alueille verkostoitumalla sellaisten ihmisten kanssa, joilla on osaamista, jota sinä esimerkiksi haluaisit hankkia.</li>
              </ul>
            )}
          </div>
      )}

     <div class="paataso-container">
     <div className='box-yhteenveto-alaotsikko-raha'>
      <h4>
      <ExpendableButton isOpen={showMoreTextKaikki2} toggle={handleShowMoreClickKaikki2} />
      Tapahtumat
      </h4>
      ={priceTapahtumat}€
      </div>
      {showMoreTextKaikki2 && (
        <div>
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span><ExpendableButton isOpen={showMoreTextKaikki2Ala1} toggle={handleShowMoreClickKaikki2Ala1} showMaterialSymbol={false} />Ammatilliset live tapahtumat</span>
            <label>{selectedProducts[4].price}€
            <input
              type="checkbox" id="check"
              checked={selectedProducts[4].selected}
              onChange={() => handleProductToggle(selectedProducts[4].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki2Ala1 && (
              <ul>
                <li>Suomen Ekonomit tarjoaa jäsenilleen jatkuvia kehittymismahdollisuuksia erilaisten koulutusten ja tapahtumien avulla. </li>
              </ul>
            )}
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span><ExpendableButton isOpen={showMoreTextKaikki2Ala2} toggle={handleShowMoreClickKaikki2Ala2} showMaterialSymbol={false} />Verkkotapahtumat</span>
            <label>{selectedProducts[5].price}€
            <input
              type="checkbox" id="check"
              checked={selectedProducts[5].selected}
              onChange={() => handleProductToggle(selectedProducts[5].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki2Ala2 && (
              <ul>
                <li>Tarjoamme jäsenillemme monipuolisia verkkotapahtumia ja valmennuksia. Löydät myös aikasiemmat tapahtumamme webinaarikirjastostamme.</li>
              </ul>
            )}
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span><ExpendableButton isOpen={showMoreTextKaikki2Ala3} toggle={handleShowMoreClickKaikki2Ala3} showMaterialSymbol={false} />Hupitapahtumat</span>
            <label>{selectedProducts[6].price}€
            <input
              type="checkbox" id="check"
              checked={selectedProducts[6].selected}
              onChange={() => handleProductToggle(selectedProducts[6].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki2Ala3 && (
              <ul>
                <li>
                Tarjoamme jäsenillemme myös viihteellisempiä tapahtumia kuten Linnanmäen Heko Heko päivä tai leffa ensi-iltoja. 
                </li>
              </ul>
            )}
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span><ExpendableButton isOpen={showMoreTextKaikki2Ala4} toggle={handleShowMoreClickKaikki2Ala4} showMaterialSymbol={false} />Paikallisyhdistyksen tapahtumat</span>
            <label>{selectedProducts[7].price}€
            <input
              type="checkbox" id="check"
              checked={selectedProducts[7].selected}
              onChange={() => handleProductToggle(selectedProducts[7].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki2Ala4 && (
              <ul>
                <li>
                Ekonomijäsenet kuuluvat alueellisiin ekonomiyhdistyksiin, jotka tuovat ekonomitoiminnan paikalliselle tasolle ja tarjoavat koulutuksia ja tapahtumia ja voit myös osallistua erilaisten kerhojen toimintaan.                 </li>
              </ul>
            )}  <div className="box-yhteenveto-alaotsikko-teksti">
            <span><ExpendableButton isOpen={showMoreTextKaikki2Ala5} toggle={handleShowMoreClickKaikki2Ala5} showMaterialSymbol={false} />Valmennukset</span>
            <label>{selectedProducts[8].price}€
            <input
              type="checkbox" id="check"
              checked={selectedProducts[8].selected}
              onChange={() => handleProductToggle(selectedProducts[8].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki2Ala5 && (
              <ul>
                <li>
                Etsitkö parempaa jaksamista, uutta innostusta tai suuntaa urallesi? Haluatko menestyä työnhaussa? Uravalmentajiemme rakentamissa verkkovalmennuksissa kehität itsetuntemusta, opit tunnistamaan omaa osaamistasi ja hankit tässä ajassa olennaisia työnhakutaitoja.
                </li>
              </ul>
            )}  <div className="box-yhteenveto-alaotsikko-teksti">
            <span><ExpendableButton isOpen={showMoreTextKaikki2Ala6} toggle={handleShowMoreClickKaikki2Ala6} showMaterialSymbol={false} />School of sales</span>
            <label>{selectedProducts[9].price}€
            <input
              type="checkbox" id="check"
              checked={selectedProducts[9].selected}
              onChange={() => handleProductToggle(selectedProducts[9].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki2Ala6 && (
              <ul>
                <li>
                Suomen Ekonomien ja Kaupan liiton perustaman School of Sales -myyntikoulun missiona on nostaa myynnin osaamista ja arvostusta ja sitä kautta parantaa Suomen kilpailukykyä ja kasvun edellytyksiä.
                </li>
              </ul>
            )}
          </div>

      )}
      </div>
      <div class="paataso-container">
      <div className='box-yhteenveto-alaotsikko-raha'>
      <h4>
      <ExpendableButton isOpen={showMoreTextKaikki3} toggle={handleShowMoreClickKaikki3} />
      Urapalvelut
      </h4>
      ={priceUrapalvelut}€
      </div>
      {showMoreTextKaikki3 && (
        <div>
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span><ExpendableButton isOpen={showMoreTextKaikki3Ala1} toggle={handleShowMoreClickKaikki3Ala1} showMaterialSymbol={false} />Uravalmennus</span>
            <label>{selectedProducts[10].price}€
            <input
              type="checkbox" id="check"
              checked={selectedProducts[10].selected}
              onChange={() => handleProductToggle(selectedProducts[10].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki3Ala1 && (
              <ul>
                <li> Luottamukselliset keskustelut uravalmentajan kanssa auttavat sinua löytämään ratkaisuja urasi suuntaan, työnhakuun ja työhyvinvointiin.</li>
              </ul>
            )}
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span><ExpendableButton isOpen={showMoreTextKaikki3Ala2} toggle={handleShowMoreClickKaikki3Ala2} showMaterialSymbol={false} />CV:n ja hakemuksen täsmäsparraus</span>
            <label>{selectedProducts[11].price}€
            <input
              type="checkbox" id="check"
              checked={selectedProducts[11].selected}
              onChange={() => handleProductToggle(selectedProducts[11].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki3Ala2 && (
              <ul>
                <li>CV:n ja hakemuksen kertaluontoisessa täsmäsparrauksessa saat vinkit työnhaun asiakirjojesi viimeistelyyn, jotta osaamisesi ja kiinnostuksesi nousevat esiin ja parannat mahdollisuuksia erottua muista työnhakijoista.</li>
              </ul>
            )}
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span><ExpendableButton isOpen={showMoreTextKaikki3Ala3} toggle={handleShowMoreClickKaikki3Ala3} showMaterialSymbol={false} />Palkkaneuvonta</span>
            <label>{selectedProducts[12].price}€
            <input
              type="checkbox" id="check"
              checked={selectedProducts[12].selected}
              onChange={() => handleProductToggle(selectedProducts[12].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki3Ala3 && (
              <ul>
                <li>Meillä on laaja tietämys ekonomien palkoista ja palkkakehityksestä. Uravalmentajamme antavat henkilökohtaista palkkaneuvontaa.</li>
              </ul>
            )}
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span><ExpendableButton isOpen={showMoreTextKaikki3Ala4} toggle={handleShowMoreClickKaikki3Ala4} showMaterialSymbol={false} />Palkkatutka</span>
            <label>{selectedProducts[13].price}€
            <input
              type="checkbox" id="check"
              checked={selectedProducts[13].selected}
              onChange={() => handleProductToggle(selectedProducts[13].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki3Ala4 && (
              <ul>
                <li>Palkkatutkan avulla voit haarukoida palkkatasoa muun muassa kokemuksen, paikkakunnan ja toimialan perusteella. Palkkatutkan datana käytetään Suomen Ekonomien tuoreimman palkkatasotutkimuksen tietoja.</li>
              </ul>
            )}
          <div className="box-yhteenveto-alaotsikko-teksti">
          <span><ExpendableButton isOpen={showMoreTextKaikki3Ala5} toggle={handleShowMoreClickKaikki3Ala5} showMaterialSymbol={false} />Mentorointi</span>
            <label>{selectedProducts[14].price}€
            <input
              type="checkbox" id="check"
              checked={selectedProducts[14].selected}
              onChange={() => handleProductToggle(selectedProducts[14].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki3Ala5 && (
              <ul>
                <li>Mentorointi on ammatillisen kehittymisen ohjelma. Se on vuorovaikutukseen perustuvaa yhteistyötä, jonka tavoitteena on edistää aktorin (mentoroitava) ammatillista kasvua ja kehittymistä sekä antaa mentorille mahdollisuus kehittää vuorovaikutustaitojaan, oppia uutta ja kokea auttamisen iloa.</li>
              </ul>
            )}
          </div>
      )}
      </div>
      <div class="paataso-container">
      <div className='box-yhteenveto-alaotsikko-raha'>
      <h4>
      <ExpendableButton isOpen={showMoreTextKaikki4} toggle={handleShowMoreClickKaikki4} />
      Lakipalvelut      
      </h4>
      ={priceLakipalvelut}€
      </div>
      {showMoreTextKaikki4 && (
        <div>
          <div className="box-yhteenveto-alaotsikko-teksti">
          <span><ExpendableButton isOpen={showMoreTextKaikki4Ala1} toggle={handleShowMoreClickKaikki4Ala1} showMaterialSymbol={false} />Henkilökohtainen lakineuvonta</span>
            <label>{selectedProducts[15].price}€
            <input
              type="checkbox" id="check"
              checked={selectedProducts[15].selected}
              onChange={() => handleProductToggle(selectedProducts[15].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki4Ala1 && (
              <ul>
                <li>Lakimiehemme tarjoavat puhelinneuvontaa työoikeudellisiin kysymyksiin lähes kaikkina arkipäivinä.</li>
              </ul>
            )}
          <div className="box-yhteenveto-alaotsikko-teksti">
          <span><ExpendableButton isOpen={showMoreTextKaikki4Ala2} toggle={handleShowMoreClickKaikki4Ala2} showMaterialSymbol={false} />Johtajasopimukset</span>
            <label>{selectedProducts[16].price}€
            <input
              type="checkbox" id="check"
              checked={selectedProducts[16].selected}
              onChange={() => handleProductToggle(selectedProducts[16].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki4Ala2 && (
              <ul>
                <li>Kommentoimme työsuhteeseen liittyviä sopimuksia, kuten työsopimuksia ja työsuhteen päättämissopimuksia.</li>
              </ul>
            )}
          <div className="box-yhteenveto-alaotsikko-teksti">
          <span><ExpendableButton isOpen={showMoreTextKaikki4Ala3} toggle={handleShowMoreClickKaikki4Ala3} showMaterialSymbol={false} />Hupitapahtumat</span>
            <label>{selectedProducts[17].price}€
            <input
              type="checkbox" id="check"
              checked={selectedProducts[17].selected}
              onChange={() => handleProductToggle(selectedProducts[17].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki4Ala3 && (
              <ul>
                <li>Kommentoimme johtajasopimuksia ja annamme vinkkejä niiden laadintaan.</li>
              </ul>
            )}
         <div className="box-yhteenveto-alaotsikko-teksti">
         <span><ExpendableButton isOpen={showMoreTextKaikki4Ala4} toggle={handleShowMoreClickKaikki4Ala4} showMaterialSymbol={false} />Riitaisten työsuhdeasioiden selvittäminen</span>
            <label>{selectedProducts[18].price}€
            <input
              type="checkbox" id="check"
              checked={selectedProducts[18].selected}
              onChange={() => handleProductToggle(selectedProducts[18].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki4Ala4 && (
              <ul>
                <li>Tarvittaessa juristimme selvittää riitaisia työsuhdeasioita työnantajan kanssa, yleensä ensimmäisenä askeleena ennen mahdollista oikeudenkäyntiä. </li>
              </ul>
            )}
          <div className="box-yhteenveto-alaotsikko-teksti">
          <span><ExpendableButton isOpen={showMoreTextKaikki4Ala5} toggle={handleShowMoreClickKaikki4Ala5} showMaterialSymbol={false} />Kertyvä oikeusapu riita- tai rikosasiassa</span>
            <label>{selectedProducts[19].price}€
            <input
              type="checkbox" id="check"
              checked={selectedProducts[19].selected}
              onChange={() => handleProductToggle(selectedProducts[19].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki4Ala5 && (
              <ul>
                <li>Riita- tai rikosasian siirtyessä tuomioistuimen kävsiteltäväksi teemme oikeusapupäätöksen. Korvaamme myös vastapuolen kuluja jäsenvuosien määrän mukaisesti.</li>
              </ul>
            )}
          <div className="box-yhteenveto-alaotsikko-teksti">
          <span><ExpendableButton isOpen={showMoreTextKaikki4Ala6} toggle={handleShowMoreClickKaikki4Ala6} showMaterialSymbol={false} />Oppaat</span>
            <label>{selectedProducts[20].price}€
            <input
              type="checkbox" id="check"
              checked={selectedProducts[20].selected}
              onChange={() => handleProductToggle(selectedProducts[20].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki4Ala6 && (
              <ul>
                <li>Meillä on lukuisia oppaita kilpailukielto-opas, johtajasopimusopas, ulkomaantyön opas.</li>
              </ul>
            )}
                 <div className="box-yhteenveto-alaotsikko-teksti">
          <span><ExpendableButton isOpen={showMoreTextKaikki4Ala7} toggle={handleShowMoreClickKaikki4Ala7} showMaterialSymbol={false} />Sopimusmallit</span>
            <label>{selectedProducts[21].price}€
            <input
              type="checkbox" id="check"
              checked={selectedProducts[21].selected}
              onChange={() => handleProductToggle(selectedProducts[21].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki4Ala7 && (
              <ul>
                <li>Meillä on mm. toimitusjohtajasopimusmalli ja ohje, toimeksiantosopimus malli.</li>
              </ul>
            )}
          <div className="box-yhteenveto-alaotsikko-teksti">
          <span><ExpendableButton isOpen={showMoreTextKaikki4Ala8} toggle={handleShowMoreClickKaikki4Ala8} showMaterialSymbol={false} />Aloittavan yrittäjän neuvonta</span>
            <label>{selectedProducts[22].price}€
            <input
              type="checkbox" id="check"
              checked={selectedProducts[22].selected}
              onChange={() => handleProductToggle(selectedProducts[22].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki4Ala8 && (
              <ul>
                <li>Yleistä tietoa ja ohjausta seuraavissa asioissa: yrittäjäksi ryhtyminen, asiantuntijan toimeksiantosopimus ja yrityksen osakkaiden välinen osakassopimus.</li>
              </ul>
            )}
          <div className="box-yhteenveto-alaotsikko-teksti">
          <span><ExpendableButton isOpen={showMoreTextKaikki4Ala9} toggle={handleShowMoreClickKaikki4Ala9} showMaterialSymbol={false} />eLakipalvelu</span>
            <label>{selectedProducts[23].price}€
            <input
              type="checkbox" id="check"
              checked={selectedProducts[23].selected}
              onChange={() => handleProductToggle(selectedProducts[23].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki4Ala9 && (
              <ul>
                <li>eLakipalvelu on helppo tapa saada vastaus nopeasti. Virtuaalinen palvelu esittää sinulle kysymyksiä ja ohjaa näppärästi vastauksen äärelle.</li>
              </ul>
            )}
          </div>
      )}
      </div>
      <div class="paataso-container">
      <div className='box-yhteenveto-alaotsikko-raha'>
      <h4>
      <ExpendableButton isOpen={showMoreTextKaikki5} toggle={handleShowMoreClickKaikki5} />
      Vaikuttamistyö ja edunvalvonta
      </h4>
      ={priceVaikuttamistyoJaEdunvalvonta}€
      </div>
      {showMoreTextKaikki5 && (
        <div>
         <div className="box-yhteenveto-alaotsikko-teksti">
          <span><ExpendableButton isOpen={showMoreTextKaikki5Ala1} toggle={handleShowMoreClickKaikki5Ala1} showMaterialSymbol={false} />Työehtosopimukset</span>
          <label>{selectedProducts[24].price}€
            <input
              type="checkbox" id="check"
              checked={selectedProducts[24].selected}
              onChange={() => handleProductToggle(selectedProducts[24].id)}
            />
          </label>
        </div>
        {showMoreTextKaikki5Ala1 && (
          <ul>
            <li>Neuvottelemme ekonomeille tyypilliset yleiset ja yrityskohtaiset työehtosopimukset.</li>
          </ul>
        )}
        <div className="box-yhteenveto-alaotsikko-teksti">
          <span><ExpendableButton isOpen={showMoreTextKaikki5Ala2} toggle={handleShowMoreClickKaikki5Ala2} showMaterialSymbol={false} />Koulutukset arvostuksen ylläpito</span>
          <label>{selectedProducts[25].price}€
            <input
              type="checkbox" id="check"
              checked={selectedProducts[25].selected}
              onChange={() => handleProductToggle(selectedProducts[25].id)}
            />
          </label>
        </div>
        {showMoreTextKaikki5Ala2 && (
          <ul>
            <li>Huolehdimme koulutuksen arvostuksen ylläpidosta niin julkisuudessa kuin työehtosopimuksissa.</li>
          </ul>
        )}
        <div className="box-yhteenveto-alaotsikko-teksti">
          <span><ExpendableButton isOpen={showMoreTextKaikki5Ala3} toggle={handleShowMoreClickKaikki5Ala3} showMaterialSymbol={false} />Lainsäädäntöön vaikuttaminen</span>
          <label>{selectedProducts[26].price}€
            <input
              type="checkbox" id="check"
              checked={selectedProducts[26].selected}
              onChange={() => handleProductToggle(selectedProducts[26].id)}
            />
          </label>
        </div>
        {showMoreTextKaikki5Ala3 && (
          <ul>
            <li>Uudistamme proaktiivisesti lainsäädäntöä ekonomien ja Suomen paremman työelämän mahdollistamiseksi.</li>
          </ul>
        )}
        <div className="box-yhteenveto-alaotsikko-teksti">
          <span><ExpendableButton isOpen={showMoreTextKaikki5Ala4} toggle={handleShowMoreClickKaikki5Ala4} showMaterialSymbol={false} />Koulutuksen laatuun vaikuttaminen</span>
          <label>{selectedProducts[27].price}€
            <input
              type="checkbox" id="check"
              checked={selectedProducts[27].selected}
              onChange={() => handleProductToggle(selectedProducts[27].id)}
            />
          </label>
        </div>
        {showMoreTextKaikki5Ala4 && (
          <ul>
            <li>Tuemme yliopistoja kehittämään koulutusta tuottamalla tutkittua tietoa heidän käyttöönsä ja vaikuttamalla heidän toimintaansa</li>
          </ul>
        )}
        <div className="box-yhteenveto-alaotsikko-teksti">
          <span><ExpendableButton isOpen={showMoreTextKaikki5Ala5} toggle={handleShowMoreClickKaikki5Ala5} showMaterialSymbol={false} />Talousvaikuttaminen</span>
          <label>{selectedProducts[28].price}€
            <input
              type="checkbox" id="check"
              checked={selectedProducts[28].selected}
              onChange={() => handleProductToggle(selectedProducts[28].id)}
            />
          </label>
        </div>
        {showMoreTextKaikki5Ala5 && (
          <ul>
            <li>Nostamme esiin Suomen talouskasvun kannalta keskeisiä asioita samalla tuoden esiin ekonomien osaamista asiasta.</li>
          </ul>
            )}
          </div>
      )}
            </div>
      <div class="paataso-container">
      <div className='box-yhteenveto-alaotsikko-raha'>
      <h4>
      <ExpendableButton isOpen={showMoreTextKaikki6} toggle={handleShowMoreClickKaikki6} />
      Jäsenedut
      </h4>
      ={priceJasenedut}€
      </div>
      {showMoreTextKaikki6 && (
        <div>
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span>
              <ExpendableButton isOpen={showMoreTextKaikki6Ala1} toggle={handleShowMoreClickKaikki6Ala1} showMaterialSymbol={false} />
              Danske Bank asuntolainaetu
            </span>
            <label>{selectedProducts[29].price}€
              <input
                type="checkbox" id="check"
                checked={selectedProducts[29].selected}
                onChange={() => handleProductToggle(selectedProducts[29].id)}
              />
            </label>
          </div>
          {showMoreTextKaikki6Ala1 && (
            <ul>
              <li>Danske Bankin asuntolaina ilman toimitusmaksua ja järjestelypalkkiota. Pienempi marginaali ja lyhennysvapaat ilman kuluja.</li>
            </ul>
          )}
          
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span>
              <ExpendableButton isOpen={showMoreTextKaikki6Ala2} toggle={handleShowMoreClickKaikki6Ala2} showMaterialSymbol={false} />
              Danske Bank vastavalmistuneen edut
            </span>
            <label>{selectedProducts[30].price}€
              <input
                type="checkbox" id="check"
                checked={selectedProducts[30].selected}
                onChange={() => handleProductToggle(selectedProducts[30].id)}
              />
            </label>
          </div>
          {showMoreTextKaikki6Ala2 && (
            <ul>
              <li>Pääset Danske Etuohjelman ylimmälle etutasolle. MasterCard Platinum -luottokortti 3. Pääsy yli 1000 lentokenttäloungeen ja kattava matkavakuutus.</li>
            </ul>
          )}
          
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span>
              <ExpendableButton isOpen={showMoreTextKaikki6Ala3} toggle={handleShowMoreClickKaikki6Ala3} showMaterialSymbol={false} />
              Danske Bank sijoittamisen edut
            </span>
            <label>{selectedProducts[31].price}€
              <input
                type="checkbox" id="check"
                checked={selectedProducts[31].selected}
                onChange={() => handleProductToggle(selectedProducts[31].id)}
              />
            </label>
          </div>
          {showMoreTextKaikki6Ala3 && (
            <ul>
              <li>Kaupankäynti Online -palvelu ilman kuukausimaksuja. Etu koskee myös osakesäästötiliä. Varainhoito- ja sijoitusneuvontapalveluista -15%. Sijoittajalle Danske-tili ja verkkotunnukset veloituksetta. Arvo-osuustilin siirto Danske Bankiin 0 euroa.</li>
            </ul>
          )}
          
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span>
              <ExpendableButton isOpen={showMoreTextKaikki6Ala4} toggle={handleShowMoreClickKaikki6Ala4} showMaterialSymbol={false} />
              Primus henkivakuutus
            </span>
            <label>{selectedProducts[32].price}€
              <input
                type="checkbox" id="check"
                checked={selectedProducts[32].selected}
                onChange={() => handleProductToggle(selectedProducts[32].id)}
              />
            </label>
          </div>
          {showMoreTextKaikki6Ala4 && (
            <ul>
              <li>Saat Suomen edullisimman henkivakuutuksen* itsellesi ja puolisollesi jopa 61 prosenttia normaalihintoja edullisemmin.</li>
            </ul>
          )}
          
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span>
              <ExpendableButton isOpen={showMoreTextKaikki6Ala5} toggle={handleShowMoreClickKaikki6Ala5} showMaterialSymbol={false} />
              Palkkio +
            </span>
            <label>{selectedProducts[33].price}€
              <input
                type="checkbox" id="check"
                checked={selectedProducts[33].selected}
                onChange={() => handleProductToggle(selectedProducts[33].id)}
              />
            </label>
          </div>
          {showMoreTextKaikki6Ala5 && (
            <ul>
              <li>Palkkioplus on kevytyrittäjäpalvelu, jonka kautta laskutat yrittäjämäisesti tehtyjä työsuorituksia helposti ja vaivattomasti: byrokratia hoidetaan puolestasi!</li>
            </ul>
          )}
          
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span>
              <ExpendableButton isOpen={showMoreTextKaikki6Ala6} toggle={handleShowMoreClickKaikki6Ala6} showMaterialSymbol={false} />
              Lehtietu
            </span>
            <label>{selectedProducts[34].price}€
              <input
                type="checkbox" id="check"
                checked={selectedProducts[34].selected}
                onChange={() => handleProductToggle(selectedProducts[34].id)}
              />
            </label>
          </div>
          {showMoreTextKaikki6Ala6 && (
            <ul>
              <li>Jäsenenä saat valitsemasi ammattimedian tilauksen 87–60 % markkinahintaa edullisemmin, oli valintasi digi tai printti.</li>
            </ul>
          )}
          
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span>
              <ExpendableButton isOpen={showMoreTextKaikki6Ala7} toggle={handleShowMoreClickKaikki6Ala7} showMaterialSymbol={false} />
              HBL Digital
            </span>
            <label>{selectedProducts[35].price}€
              <input
                type="checkbox" id="check"
                checked={selectedProducts[35].selected}
                onChange={() => handleProductToggle(selectedProducts[35].id)}
              />
            </label>
          </div>
          {showMoreTextKaikki6Ala7 && (
            <ul>
              <li>Ruotsinkielinen HBL Digital tarjoaa sinulle sähköisiä sanomalehtiä ja uutissyötteitä.</li>
            </ul>
          )}
          
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span>
              <ExpendableButton isOpen={showMoreTextKaikki6Ala8} toggle={handleShowMoreClickKaikki6Ala8} showMaterialSymbol={false} />
              Opiskelijan lehtietu
            </span>
            <label>{selectedProducts[36].price}€
              <input
                type="checkbox" id="check"
                checked={selectedProducts[36].selected}
                onChange={() => handleProductToggle(selectedProducts[36].id)}
              />
            </label>
          </div>
          {showMoreTextKaikki6Ala8 && (
            <ul>
              <li>Saat joko Kauppalehden tai Talouselämän digitilauksen maksuttomasti lokakuusta toukokuuhun.</li>
            </ul>
          )}
          
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span>
              <ExpendableButton isOpen={showMoreTextKaikki6Ala9} toggle={handleShowMoreClickKaikki6Ala9} showMaterialSymbol={false} />
              Member + edut
            </span>
            <label>{selectedProducts[37].price}€
              <input
                type="checkbox" id="check"
                checked={selectedProducts[37].selected}
                onChange={() => handleProductToggle(selectedProducts[37].id)}
              />
            </label>
          </div>
          {showMoreTextKaikki6Ala9 && (
            <ul>
              <li>Palveluun on kerätty ajankohtaisia etuja ja palveluita, mm. mökkeilyyn, matkailuun, vapaa-aikaan ja hyvinvointiin liittyen.</li>
            </ul>
          )}
          </div>
      )}

      </div>
          <div class="paataso-container"></div>
         <div className='yleinen-rahallinen-etu'>
           <h2>Paljonko jäsenyyden rahallinen arvo on?</h2>
           <div className="price-wrapper">
            <ul>
           <li>Muodostuu kaikista yläpuolella valituista arvoista</li>
           </ul>
           <p className="price-value">{calculateTotalPrice()}€</p>
           </div>
           <h2>Mitä maksat?</h2>
           <div className="price-wrapper">
            <ul>
           <li>Suomen Ekonomit</li>
           </ul>
           <p className="price-value">189€</p>
           </div>
           <div className="price-wrapper">
            <ul>
           <li>Paikallisyhdistys</li>
           </ul>
           <p className="price-value">0-40€</p>
           </div>
           <div className="price-wrapper">
            <ul>
           <li>Mahdollinen KOKO-työttömyyskassa maksu</li>
           </ul>
           <p className="price-value">63€</p>
           </div>
           <h2>Kokonaishyötysi vuoden aikana:</h2>
           <div className="price-wrapper">
            <ul>
            <li>Yllävalituista arvoista on vähennetty jäsenyyden maksut.</li>
            </ul>
           <h4 className="price-value">={calculateTotalPrice()-198-40-63}-{calculateTotalPrice()-198}€</h4>
           </div>
           <img style={{ width: '30%'}} src={aarrearkkuImage} alt="aarrearkku" />
         </div>
          </div>

          <h1>Katso vielä jäsenyyden vinkit ikäsi, elämäntilanteesi ja asematasosi mukaan.</h1>

            <h3>Minkä ikäinen olet?</h3>
       <div id="button-container-ika">
        <button
          className={activeButtonIka === 0 ? 'active' : 'inactive' }
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
          <div className="selection-info-ika">
            <div className="box-hyva">
            <div className='box-peukku'><ThumbUpOffAltIcon/></div>
              <h4>Jäsenen top 3 nostot ikäryhmälle {arvoIka}:</h4>
              <p>{getIkaTeksti1(activeButtonIka)}<br/></p>
            </div>
            <div className="box-huono">
            <div className='box-peukku'><ThumbDownOffAltIcon/></div>
              <h4>Ei jäsenen vinkit</h4>
              <p>{getIkaTeksti2(activeButtonIka)}<br/></p>
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
            <div className="box-hyva">
            <div className='box-peukku'><ThumbUpOffAltIcon/></div>
            <h4>Jäsenen top 3 nostot toiminnalle {arvoToiminta}:</h4>
            <p>{getToimintaTeksti1(activeButtonToiminta)}<br/></p>
            </div>
            <div className="box-huono">
            <div className='box-peukku'><ThumbDownOffAltIcon/></div>
            <h4>Ei jäsenen vinkit</h4>
            <p>{getToimintaTeksti2(activeButtonToiminta)}<br/></p>
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
        <button
          className={activeButtonAsema === 3 ? 'active' : 'inactive'}
          onClick={() => handleAsemaButtonClick(3)}
        >
          Ei mikään näistä
        </button>
      </div>

         {/* Laatikot ja tekstit ikäryhmänapin valinnan alle */}
       {activeButtonToiminta !== null && (
          <div className="selection-info-asema">
            <div className="box-hyva">
            <div className='box-peukku'><ThumbUpOffAltIcon/></div>
            <h4>Jäsenen top 3 nostot asemalle {arvoAsema}:</h4>
            <p>{getAsemaTeksti1(activeButtonAsema)}<br/></p>
            </div>
            <div className="box-huono">
            <div className='box-peukku'><ThumbDownOffAltIcon/></div>
            <h4>Ei jäsenen vinkit</h4>
            <p>{getAsemaTeksti2(activeButtonAsema)}<br/></p>
            </div>
          </div>
        )}
      <div className='liittyminen'>
      <a href="https://elounge.ekonomit.fi/liity" target="_blank">
        <button>Liity jäseneksi</button>
        </a>
      </div>
    </div>
  );
}

export default App;




