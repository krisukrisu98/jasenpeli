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


function App() {


  // Tuotteet ja niiden hinnoittelu sekä laskentalogiikka 

  const [isChecked, setIsChecked] = useState(false);
  const originalPrice = 199;
  const discount = 0.5;
  const localAssociationFee = 40;
  const totalMembershipFee = 292;

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const calculatePrice = () => {
    if (isChecked) {
      return (originalPrice * (1 - discount)).toFixed(2);
    }
    return originalPrice.toFixed(2);
  };

  const [selectedProducts, setSelectedProducts] = useState([
    { id: 1, price: 0, selected: true },
    { id: 2, price: 0, selected: true },
    { id: 3, price: 0, selected: true },
    { id: 4, price: 0, selected: true },
    { id: 5, price: 0, selected: true },
    { id: 6, price: 0, selected: true },
    { id: 7, price: 0, selected: true },
    { id: 8, price: 0, selected: true },
    { id: 9, price: 0, selected: true },
    { id: 10, price: 200, selected: true },
    { id: 11, price: 67, selected: true },
    { id: 12, price: 67, selected: true },
    { id: 13, price: 100, selected: true },
    { id: 14, price: 250, selected: true },
    { id: 15, price: 100, selected: true },
    { id: 16, price: 2000, selected: true },
    { id: 17, price: 100, selected: true },
    { id: 18, price: 60, selected: true },
    { id: 19, price: 120, selected: true },
    { id: 20, price: 120, selected: true },
    { id: 21, price: 1250, selected: true },
    { id: 22, price: 25, selected: true },
    { id: 23, price: 100, selected: true },
    { id: 24, price: 60, selected: true },
    { id: 25, price: 20, selected: true },
    { id: 26, price: 200, selected: true },
    { id: 27, price: 80, selected: true },
    { id: 28, price: 50, selected: true },
    { id: 29, price: 50, selected: true },
    { id: 30, price: 550, selected: true },
    { id: 31, price: 1200, selected: true },
    { id: 32, price: 700, selected: true },
    { id: 33, price: 84, selected: true },
    { id: 34, price: 574, selected: true },
    { id: 35, price: 32, selected: true },
    { id: 36, price: 449, selected: true },
    { id: 37, price: 159.80, selected: true },
    { id: 38, price: 50, selected: true },
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

  const priceVaikuttamistyoJaEdunvalvonta = selectedProducts
  .filter(product => product.id >= 6 && product.id <= 9 && product.selected)
  .reduce((sum, product) => sum + product.price, 0);

  const priceUrapalvelut = selectedProducts
  .filter(product => (product.id >= 10 && product.id <= 16 && product.selected))
  .reduce((sum, product) => sum + product.price, 0);

  const priceLakipalvelut = selectedProducts
  .filter(product => product.id >= 17 && product.id <= 25 && product.selected)
  .reduce((sum, product) => sum + product.price, 0);

  const priceTapahtumat = selectedProducts
  .filter(product => product.id >= 26 && product.id <= 30 && product.selected)
  .reduce((sum, product) => sum + product.price, 0);

  const priceJasenedut = selectedProducts
  .filter(product => product.id >= 31 && product.id <= 38 && product.selected)
  .reduce((sum, product) => sum + product.price, 0);

  // Teemat ikä, toiminta ja asema
  const [activeButtonIka, setActiveButtonIka] = useState(0);
  const [activeButtonToiminta, setActiveButtonToiminta] = useState(0);
  const [activeButtonAsema, setActiveButtonAsema] = useState(0);

  const [arvoIka, setArvoIka] = useState("18-30");
  const [arvoToiminta, setArvoToiminta] = useState("työelämässä");
  const [arvoAsema, setArvoAsema] = useState("asiantuntija");

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
  const [showMoreTextKaikki3Ala6, setShowMoreTextKaikki3Ala6] = useState(false);
  const [showMoreTextKaikki3Ala7, setShowMoreTextKaikki3Ala7] = useState(false);
  
  const handleShowMoreClickKaikki3 = () => {
    setShowMoreTextKaikki3(!showMoreTextKaikki3);
    setShowMoreTextKaikki3Ala1(false);
    setShowMoreTextKaikki3Ala2(false);
    setShowMoreTextKaikki3Ala3(false);
    setShowMoreTextKaikki3Ala4(false);
    setShowMoreTextKaikki3Ala5(false);
    setShowMoreTextKaikki3Ala6(false);
    setShowMoreTextKaikki3Ala7(false);
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

  const handleShowMoreClickKaikki3Ala6 = () => {
    setShowMoreTextKaikki3Ala6(!showMoreTextKaikki3Ala6);
  };

  const handleShowMoreClickKaikki3Ala7 = () => {
    setShowMoreTextKaikki3Ala7(!showMoreTextKaikki3Ala7);
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
  arvoToiminta = "Työnhakija";
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
  arvoAsema = "asiantuntija";
} else if (index === 1) {
  arvoAsema = "päällikkö";
} else if (index === 2) {
  arvoAsema = "johtaja";
}else if (index === 3) {
  arvoAsema = "'ei mikään näistä'";
}

setArvoAsema(arvoAsema);
  };


   // Funktio palauttaa oikeat Ikä tekstit valinnan perusteella
   const getIkaTeksti1 = (index) => {
    if (index === 0) {
      return   <ul>
      <li><p2>Henkilökohtaista juridinen nuvontaa työelämän lakiasioissa - </p2> Mahdollisuus hakea Oikeusapua jäsenen työ-, virka- tai toimissudetta koskevassa rikosasiassa sekä saada korvausta vastapuolen oikeudenkäyntikuluista, enintään 20 000 euroon saakka.</li>
      <br></br>
      <li><p2>Ammatillinen kehittyminen - </p2>Tarjoamme jäsenillemme monipuolisia koulutus- ja kehittymismahdollisuuksia. Järjestämme ammatillisia koulutuksia, työpajoja ja webinaareja. Palvelumme auttavat kehittämään osaamistasi ja pysymään ajan tasalla alan muutoksista. Jäsenenä saat myös pääsyn liiton tarjoamiin urapalveluihin, kuten työnhakuneuvontaan ja uravalmennukseen. </li>
      <br></br>
      <li><p2>Tonnin jäsenedut - </p2>Ammattilehti jopa 70 % alennuksella, Danske Bankin asuntolainaedut (jopa 1600€), Henkivakuutus 61 % alennuksella ja koko Suomen laajuiset Member+ edut. </li>
    </ul>
    } else if (index === 1) {
      return <ul>
      <li><p2>Henkilökohtaista juridinen nuvontaa työelämän lakiasioissa - </p2>Mahdollisuus hakea Oikeusapua jäsenen työ-, virka- tai toimissudetta koskevassa rikosasiassa sekä näissä tapauksissa mahdollisten vastapuolen oikeaudenkäyntikulujen korvaaminen 20 000 euroon asti.</li>
      <br></br>
      <li><p2>Yksilöllistä uravalmennusta ja palkkaneuvontaa ja koulutuksia - </p2>Luottamukselliset keskustelut uravalmentajan kanssa auttavat sinua löytämään ratkaisuja urasi suuntaan, työnhakuun, työhyvinvointiin ja palkkakehitykseen. Tarjoamme jäsenilleen jatkuvia kehittymismahdollisuuksia erilaisten koulutusten ja tapahtumien avulla.</li>
      <br></br>
      <li><p2>Tonnin jäsenedut - </p2>Ammattilehti jopa 70 % alennuksella, Danske Bankin asuntolainaedut (jopa 1600€), Henkivakuutus 61 % alennuksella ja koko Suomen laajuiset Member+ edut. </li>
    </ul>
    } else if (index === 2) {
      return <ul>
      <li><p2>Henkilökohtaista juridinen nuvontaa työelämän lakiasioissa - </p2>Mahdollisuus hakea Oikeusapua jäsenen työ-, virka- tai toimissudetta koskevassa rikosasiassa sekä näissä tapauksissa mahdollisten vastapuolen oikeaudenkäyntikulujen korvaaminen 20 000 euroon asti.</li>
      <br></br>
      <li><p2>Edunvalvonta ja yhteiskunnallinen vaikuttamistyö - </p2>Ajamme aina ensisijaisesti jäsentemme etuja.  Pyrimme mm. työehtosopimusten kautta turvaamaan jäsenillemme parhaat mahdolliset työsuhteen ehdot, kuten sairauajanpalkka, lomarahat ja säännölliset palkankorotukset.</li>
      <br></br>
      <li><p2>Tonnin jäsenedut - </p2>Ammattilehti jopa 70 % alennuksella, Danske Bankin asuntolainaedut (jopa 1600€), Henkivakuutus 61 % alennuksella ja koko Suomen laajuiset Member+ edut. </li>
    </ul>
    } else if (index === 3) {
      return <ul>
      <li><p2>Henkilökohtaista juridinen nuvontaa työelämän lakiasioissa - </p2>Mahdollisuus hakea Oikeusapua jäsenen työ-, virka- tai toimissudetta koskevassa rikosasiassa sekä näissä tapauksissa mahdollisten vastapuolen oikeaudenkäyntikulujen korvaaminen 20 000 euroon asti.</li>
      <br></br>
      <li><p2>Edunvalvonta ja yhteiskunnallinen vaikuttamistyö - </p2>Ajamme aina ensisijaisesti jäsentemme etuja.  Pyrimme mm. työehtosopimusten kautta turvaamaan jäsenillemme parhaat mahdolliset työsuhteen ehdot, kuten sairauajanpalkka, lomarahat ja säännölliset palkankorotukset.</li>
      <br></br>
      <li><p2>Tuhannella eurolla jäsenetuja - </p2>Hyödynnä muun muassa Kaleva henkivakuutus - Suomen edullisisin henkivakuutus itsellesi ja puolisollesi jopa <strong>61 prosenttia</strong> normaalihintoja edullisemmin. Jäsenet ovat säästäneet keskimäärin <strong>540 euroa</strong> henkivakuutuksen hinnassa.</li>
    </ul>
    } else if (index === 4) {
      return <ul>
      <li><p2>Edunvalvonta ja ammatillinen arvostus - </p2> Suomen Ekonomit ajaa jäsentensä etuja talousalan työmarkkinoilla. Suomen Ekonomien jäsenyys tarjoaa mahdollisuuden olla osa laajempaa talousalan yhteisöä ja vaikuttaa alan kehittämiseen.</li>
      <br></br>
      <li><p2>Ammattilehti jäsenetuna peräti 70% alennuksella - </p2>Haluatko pysyä perillä tärkeistä talouden, tekniikan tai finanssimaailman uutisista? Vaihtoehtoja jäsenetulehdeksi on monia. Saatavilla on sekä printti- että digivaihtoehtoja.</li>
      <br></br>
      <li><p2>Tonnin jäsenedut sekä Suomen laajuiset Member+ edut - </p2>Member + palveluun on kerätty ajankohtaisia etuja ja palveluita, mm. mökkeilyyn, matkailuun, vapaa-aikaan ja hyvinvointiin liittyen. Katso lisää!</li>
    </ul>;
    }
  };

  const getIkaTeksti2 = (index) => {
    if (index === 0) {
      return <ul>
      <li><p2>Oikeudellinen turva - </p2>Huolehdithan, että sinulla on riittävän tasoinen oikeudellinen turva työelämän ongelmatilanteissa tulevaisuudessa. Vakuutusyhtiöt tai työttömyyskassa eivät tarjoa joko lainkaan tai ainakaan samanlaatuista oikeudellista turvaa ekonomeille. Työsuhteeseen liittyvässä riita-asiassa oikeudenkäyntiapu kattaa Ekonomien juristin työn sekä vastapuolen oikeudenkäyntikulut <strong>5 000–20 000 euroon</strong> saakka riippuen jäsenyytesi kestosta. </li>
      <br></br>
      <li><p2>Palkankorotukset - </p2>Huolehdithan, että sinulla on ekonomien palkkauksen asiantuntijoita ja tutkittua tietoa tukenasi palkkaneuvotteluissa ja juristeja tarkistamassa työsopimuksiasi, jotta saat ansaitsemasi arvoista palkkaa ja työelämää.</li>
      <br></br>
      <li><p2>Ymmärrys kehityksestä - </p2>Huolehdithan, että kehität itseäsi myös valmistumisen jälkeen ja pysyt silloin kehityksen kärryillä. Tarjoamme jäsenillemme niin koulutuksia ja sisältöjä itsensä kehittämiseen. Lisäksi saat kaupallisen alan digi- ja printtilehtiä jopa 70 % alennuksella.</li>
    </ul>
    } else if (index === 1) {
      return <ul>
      <li><p2>Oikeudellinen turva - </p2>Huolehdithan, että sinulla on riittävän tasoinen oikeudellinen turva työelämän ongelmatilanteissa tulevaisuudessa. Vakuutusyhtiöt tai työttömyyskassa eivät tarjoa joko lainkaan tai ainakaan samanlaatuista oikeudellista turvaa ekonomeille. Työsuhteeseen liittyvässä riita-asiassa oikeudenkäyntiapu kattaa Ekonomien juristin työn sekä vastapuolen oikeudenkäyntikulut <strong>5 000–20 000 euroon</strong> saakka riippuen jäsenyytesi kestosta. </li>
      <br></br>
      <li><p2>Suunnan etsiminen - </p2>Huolehdithan, että sinulla on käytettävissä asiantuntijoita apunasi, kun mietit uusia urasuunnitelmia tai mietit seuraavien askeleiden ottoa. Jäsentemme käytössä ovat muun muassa kokeneet uravalmentajat, johtajasopimuksia jatkuvasti tekevät juristit ja erilaisia työnhakua tukevia palveluita.</li>
      <br></br>
      <li><p2>Ymmärrys kehityksestä - </p2>Huolehdithan, että kehität itseäsi myös valmistumisen jälkeen ja pysyt silloin kehityksen kärryillä. Tarjoamme jäsenillemme niin koulutuksia ja sisältöjä itsensä kehittämiseen. Lisäksi saat kaupallisen alan digi- ja printtilehtiä jopa 70 % alennuksella.</li>
    </ul>;
    } else if (index === 2) {
      return <ul>
      <li><p2>Oikeudellinen turva - </p2>Huolehdithan, että sinulla on riittävän tasoinen oikeudellinen turva työelämän ongelmatilanteissa tulevaisuudessa. Vakuutusyhtiöt tai työttömyyskassa eivät tarjoa joko lainkaan tai ainakaan samanlaatuista oikeudellista turvaa ekonomeille. Työsuhteeseen liittyvässä riita-asiassa oikeudenkäyntiapu kattaa Ekonomien juristin työn sekä vastapuolen oikeudenkäyntikulut <strong>5 000–20 000 euroon</strong> saakka riippuen jäsenyytesi kestosta. </li>
      <br></br>
      <li><p2>Työehtosopimukset - </p2> Huolehdithan, että suomalaisilla työpaikoilla tehdään työehtosopimuksia siten, että ne tukevat niin toiminnan kasvua, mutta ennen kaikkea palkitsevat arvokkaan työn tekijöitä.</li>
      <br></br>
      <li><p2>Ymmärrys kehityksestä - </p2>Huolehdithan, että kehität itseäsi myös valmistumisen jälkeen ja pysyt silloin kehityksen kärryillä. Tarjoamme jäsenillemme niin koulutuksia ja sisältöjä itsensä kehittämiseen. Lisäksi saat kaupallisen alan digi- ja printtilehtiä jopa 70 % alennuksella.</li>
    </ul>;
    } else if (index === 3) {
      return <ul>
      <li><p2>Oikeudellinen turva - </p2>Huolehdithan, että sinulla on riittävän tasoinen oikeudellinen turva työelämän ongelmatilanteissa tulevaisuudessa. Vakuutusyhtiöt tai työttömyyskassa eivät tarjoa joko lainkaan tai ainakaan samanlaatuista oikeudellista turvaa ekonomeille. Työsuhteeseen liittyvässä riita-asiassa oikeudenkäyntiapu kattaa Ekonomien juristin työn sekä vastapuolen oikeudenkäyntikulut <strong>5 000–20 000 euroon</strong> saakka riippuen jäsenyytesi kestosta. </li>
      <br></br>
      <li><p2>Suunnan etsiminen - </p2>Huolehdithan, että sinulla on käytettävissä asiantuntijoita apunasi, kun mietit uusia urasuunnitelmia tai seuraavien askeleiden ottoa. Jäsentemme käytössä ovat muun muassa kokeneet uravalmentajat, johtajasopimuksia jatkuvasti tekevät juristit ja erilaisia työnhakua tukevia palveluita.</li>
      <br></br>
      <li><p2>Ymmärrys kehityksestä - </p2>Huolehdithan, että kehität itseäsi myös uran aikana ja pysyt silloin kehityksen kärryillä. Tarjoamme jäsenillemme niin koulutuksia ja sisältöjä itsensä kehittämiseen. Lisäksi saat kaupallisen alan digi- ja printtilehtiä jopa 70 % alennuksella. </li>
    </ul>;
    } else if (index === 4) {
      return <ul>
      <li><p2>Tue alan arvostuksen nostamista - </p2>Olethan mukana varmistamassa, että kauppatieteellisen koulutuksen osaajia ja osaamista arvostetaan yhteiskunnassa myös tulevaisuudessa. Teemme jatkuvasti niin vaikuttamistyötä kuin mediatyötäkin kauppatieteellisen alan arvostuksen edistämiseksi.</li>
      <br></br>
      <li><p2>Ymmärrys kehityksestä - </p2> Huolehdithan, että voit seurata itseaäsi kiinnostavia teemoja myös eläkkeelle jäännin jälkeen. Sisältömme varmistavat, että pysyt eläkkeelläkin kartalla tulevaisuudesta. Saat kaupallisen alan digi- ja printtilehtiä jopa 70 % alennuksella. </li>
      <br></br>
      <li><p2>Rahan arvoiset jäsenedut - </p2>Varmistathan, että saat rahanarvoisia etuja myös eläkkeellä ollessasi. Jäsenemämme saatu puoleen hintaan samat edut kuin työssäkäyvät jäsenemme.</li>
    </ul>;
    }
  };


     // Funktio palauttaa oikeat Toiminta tekstit valinnan perusteella
     const getToimintaTeksti1 = (index) => {
      if (index === 0) {
        return <ul>
      <li><p2>Henkilökohtaista juridinen nuvontaa työelämän lakiasioissa - </p2>Mahdollisuus hakea Oikeusapua jäsenen työ-, virka- tai toimissudetta koskevassa rikosasiassa sekä näissä tapauksissa mahdollisten vastapuolen oikeaudenkäyntikulujen korvaaminen 20 000 euroon asti.</li>
        <br></br>
        <li><p2>Edunvalvonta ja yhteiskunnallinen vaikuttamistyö - </p2>Pyrimme työehtosopimusten kautta turvaamaan jäsenillemme parhaat mahdolliset työsuhteen ehdot, kuten sairauajanpalkka, lomarahat ja säännölliset palkankorotukset.</li>
        <br></br>
      <li><p2>Tuhannella eurolla jäsenetuja - </p2>Hyödynnä muun muassa Kaleva henkivakuutus - Suomen edullisisin henkivakuutus itsellesi ja puolisollesi jopa <strong>61 prosenttia</strong> normaalihintoja edullisemmin. Jäsenet ovat säästäneet keskimäärin <strong>540 euroa</strong> henkivakuutuksen hinnassa.</li>
      </ul>;
      } else if (index === 1) {
        return <ul>
        <li><p2>Henkilökohtaista juridinen nuvontaa</p2> työelämään liittyvissä asioissa. Mahdollisuus hakea Oikeusapua jäsenen työ-, virka- tai toimissudetta koskevassa rikosasiassa sekä näissä tapauksissa mahdollisten vastapuolen oikeaudenkäyntikulujen korvaaminen.</li>
        <br></br>
        <li><p2>Yksilöllistä uravalmennusta ja palkkaneuvontaa - </p2> Luottamukselliset keskustelut uravalmentajan kanssa auttavat sinua löytämään ratkaisuja urasi suuntaan, työnhakuun, työhyvinvointiin ja palkkakehitykseen. Uravalmentajillamme on erinomainen käsitys ekonomien palkoista ja palkkakehityksestä.</li>
        <br></br>
        <li><p2>Tuhannella eurolla jäsenetuja - </p2>Hyödynnä muun muassa Kaleva henkivakuutus - Suomen edullisisin henkivakuutus itsellesi ja puolisollesi jopa <strong>61 prosenttia</strong> normaalihintoja edullisemmin. Jäsenet ovat säästäneet keskimäärin <strong>540 euroa</strong> henkivakuutuksen hinnassa.</li>
      </ul>;
      } else if (index === 2) {
        return <ul>
        <li><p2>Henkilökohtaista juridinen nuvontaa työelämän lakiasioissa - </p2>Mahdollisuus hakea Oikeusapua jäsenen työ-, virka- tai toimissudetta koskevassa rikosasiassa sekä näissä tapauksissa mahdollisten vastapuolen oikeaudenkäyntikulujen korvaaminen 20 000 euroon asti.</li>
        <br></br>
        <li><p2>Yksilöllistä uravalmennusta ja palkkaneuvontaa - </p2> Luottamukselliset keskustelut uravalmentajan kanssa auttavat sinua löytämään ratkaisuja urasi suuntaan, työnhakuun, työhyvinvointiin ja palkkakehitykseen. Uravalmentajillamme on erinomainen käsitys ekonomien palkoista ja palkkakehityksestä.</li>
        <br></br>
        <li><p2>Kaleva henkivakuutus - </p2>Saat Suomen edullisimman henkivakuutuksen itsellesi ja puolisollesi jopa 61 prosenttia normaalihintoja edullisemmin. Jäsenet ovat säästäneet keskimäärin 540 euroa henkivakuutuksen hinnassa. </li>
      </ul>;
      } else if (index === 3) {
        return <ul>
       <li><p2>Henkilökohtaista juridinen nuvontaa työelämän lakiasioissa - </p2>Mahdollisuus hakea Oikeusapua jäsenen työ-, virka- tai toimissudetta koskevassa rikosasiassa sekä näissä tapauksissa mahdollisten vastapuolen oikeaudenkäyntikulujen korvaaminen 20 000 euroon asti.</li>
        <br></br>
        <li><p2>Tonnin jäsenedut - </p2>Ammattilehti jopa 70 % alennuksella, Danske Bankin asuntolainaedut (jopa 1600€), Henkivakuutus 61 % alennuksella ja koko Suomen laajuiset Member+ edut. </li>
        <br></br>
        <li><p2>Tuhannella eurolla jäsenetuja - </p2>Hyödynnä muun muassa Kaleva henkivakuutus - Suomen edullisisin henkivakuutus itsellesi ja puolisollesi jopa <strong>61 prosenttia</strong> normaalihintoja edullisemmin. Jäsenet ovat säästäneet keskimäärin <strong>540 euroa</strong> henkivakuutuksen hinnassa.</li>
      </ul>;
      } else if (index === 4) {
        return <ul>
        <li><p2>Monipuoliset tapahtumat - </p2>Tarjoamme jäsenillemme myös viihteellisempiä tapahtumia kuten Linnanmäen Heko Heko päivä tai leffa ensi-iltoja.</li>
        <br></br>
        <li><p2>Edunvalvonta ja ammatillinen arvostus - </p2>ajamme jäsentemme etuja ja  tarjoaa mahdollisuuden olla osa laajempaa talousalan yhteisöä sekä vaikuttaa alan kehittämiseen.</li>
        <br></br>
        <li><p2>Tonnin jäsenedut sekä Suomen laajuiset Member+ edut - </p2>Member + palveluun on kerätty ajankohtaisia etuja ja palveluita, mm. mökkeilyyn, matkailuun, vapaa-aikaan ja hyvinvointiin liittyen. Katso lisää!</li>
      </ul>;
      }
    };
  
    const getToimintaTeksti2 = (index) => {
      if (index === 0) {
        return  <ul>
        <li><p2>Alan arvostuksen kehittäminen - </p2> Huolehdithan siitä, että kauppatieteellinen ala kehittyy mieleiseesi suuntaan. Jäsenenämme olet kehittämässä alan opetusta ja käytänteitä. Teemme muun muassa yliopistoissa edunvalvontaa opiskelijayhdistysten kautta ja valtakunnallisesti montaa eri reittiä. Lisäksi tuotamme yliopistoille muun muassa vastavalmistuneiden palautekyselyä.</li>
        <br></br>
        <li><p2>Työn haku - </p2>Varmistathan, että saat riittävästi tukea työnhakuun ja työnhaun dokumentteihin. Tarjoamme opiskelijajäsenillemme Kylterin Työnhaun palvelua, jossa niin vinkkejä työhaun eri vaiheisiin, esimerkkejä työnhaun dokumenteista ja harjoitteita työnhaussa menestymiseen. </li>
        <br></br>
        <li><p2>Ymmärrys kehityksestä - </p2>Huolehdithan, että kehität itseäsi seuraamalla alan kehitystä. Tarjoamme opiskelijajäsenillemme niin koulutuksia ja sisältöjä itsensä kehittämiseen. Lisäksi saat opiskelijana ilmaisen Kauppalehti digin lukuvuodeksi. </li>
      </ul>;
      } else if (index === 1) {
        return <ul>
        <li><p2>Oikeudellinen turva - </p2>Huolehdithan, että sinulla on riittävän tasoinen oikeudellinen turva työelämän ongelmatilanteiteita tulevaisuudessa. Vakuutusyhtiöt tai työttömyyskassa eivät tarjoa joko lainkaan tai ainakaan samanlaatuista oikeudellista turvaa ekonomeille. Jäsenyysvuotesi kerryttävät turvaa meillä.</li>
        <br></br>
        <li><p2>Suunnan etsiminen - </p2>Huolehdithan, että sinulla on käytettävissä asiantuntijoita apunasi, kun mietit uusia urasuunnitelmia tai mietit seuraavien askeleiden ottoa. Jäsentemme käytössä ovat muun muassa kokeneet uravalmentajat, johtajasopimuksia jatkuvasti tekevät juristit ja erilaisia työnhakua tukevia palveluita.</li>
        <br></br>
        <li><p2>Työehtosopimukset - </p2>Huolehdithan, että suomalaisilla työpaikoilla tehdään työehtosopimuksia siten, että ne tukevat niin toiminnan kasvua, mutta ennen kaikkea palkitsevat arvokkaan työn tekijöitä. Olemalla mukana varmistamassa työehtosopimuksia varmistat, että myös toimialaa vaihtaessa saat työntekoa tukevat sopimukset.</li>
      </ul>;
      } else if (index === 2) {
        return <ul>
        <li><p2>Oikeudellinen turva - </p2> Huolehdithan, että sinulla on riittävän tasoinen oikeudellinen turva työelämän ongelmatilanteiteita tulevaisuudessa. Vakuutusyhtiöt tai työttömyyskassa eivät tarjoa joko lainkaan tai ainakaan samanlaatuista oikeudellista turvaa ekonomeille. Jäsenyysvuotesi kerryttävät turvaa meillä.</li>
        <br></br>
        <li><p2>Suunnan etsiminen - </p2> Huolehdithan, että sinulla on käytettävissä asiantuntijoita apunasi, kun mietit uusia urasuunnitelmia tai mietit seuraavien askeleiden ottoa. Jäsentemme käytössä ovat muun muassa kokeneet uravalmentajat, johtajasopimuksia jatkuvasti tekevät juristit ja erilaisia työnhakua tukevia palveluita.</li>
        <br></br>
        <li><p2>Työehtosopimukset - </p2>Huolehdithan, että suomalaisilla työpaikoilla tehdään työehtosopimuksia siten, että ne tukevat niin toiminnan kasvua, mutta ennen kaikkea palkitsevat arvokkaan työn tekijöitä. Olemalla mukana varmistamassa työehtosopimuksia varmistat, että myös toimialaa vaihtaessa saat työntekoa tukevat sopimukset.</li>
      </ul>;
      } else if (index === 3) {
        return <ul>
        <li><p2>Verkostot ja yhteisö - </p2>Huolehdithan, että sinulla on verkostoja erilaisiin tahoihin yrittäjänä ollesasi. Toimintamme kautta pääset tutustumaan potentiaalisiin rekryihin, asiakkaisiin ja mukaviin ihmisiin. Paikallisverkostojamme on ympäri Suomen.</li>
        <br></br>
        <li><p2>Alan arvostuksen kehittäminen - </p2>Huolehdithan siitä, että kauppatieteellinen ala kehittyy mieleiseesi suuntaan. Jäsenenämme olet kehittämässä alan arvostusta ja tuomassa esiin ekonomiyrittäjiä.</li>
        <br></br>
        <li><p2>Ekonomiyrittäjien tukeminen - </p2>Olethan mukana tukemassa uusia ekonomiyrittäjiä. Tarjoamme uusille ekonomiyrittäjille neuvontaa. Jäsenyydellämme saat myös Suomen Yrittäjien palvelupaketin.</li>
      </ul>;
      } else if (index === 4) {
        return <ul>
        <li><p2>Verkostot ja yhteisö - </p2>Huolehdithan, että sinulla on verkostoja erilaisiin tahoihin myös eläkkeelläsi ollesasi. Toimintamme kautta pääset olemaan osa valloittavaa yhteisöämme.</li>
        <br></br>
        <li><p2>Tue alan arvostuksen nostamista - </p2>Olethan mukana varmistamassa, että kauppatieteellisen koulutuksen osaajia ja osaamista arvostetaan yhteiskunnassa myös tulevaisuudessa. Teemme jatkuvasti niin vaikuttamistyötä kuin mediatyötäkin kauppatieteellisen alan arvostuksen edistämiseksi.</li>
        <br></br>
        <li><p2>Rahan arvoiset jäsenedut  - </p2>Varmistathan, että saat rahanarvoisia etuja myös eläkkeellä ollessasi. Jäsenemämme saatu puoleen hintaan samat edut kuin työssäkäyvät jäsenemme.</li>
      </ul>;
      }
    };

    // Funktio palauttaa oikeat Asema tekstit valinnan perusteella
    const getAsemaTeksti1 = (index) => {
      if (index === 0) {
        return <ul>
        <li><p2>Yksilöllistä uravalmennusta ja palkkaneuvontaa - </p2>Luottamukselliset keskustelut uravalmentajan kanssa auttavat sinua löytämään ratkaisuja urasi suuntaan, työnhakuun, työhyvinvointiin ja palkkakehitykseen. Uravalmentajillamme on erinomainen käsitys ekonomien palkoista ja palkkakehityksestä.</li>
        <br></br>
        <li><p2>Henkilökohtaista juridinen nuvontaa työelämän lakiasioissa - </p2>Mahdollisuus hakea Oikeusapua jäsenen työ-, virka- tai toimissudetta koskevassa rikosasiassa sekä näissä tapauksissa mahdollisten vastapuolen oikeaudenkäyntikulujen korvaaminen 20 000 euroon asti.</li>
        <br></br>
        <li><p2>Verkostoitumispalvelu - </p2>Löydät palvelusta helposti uusia tuttavuuksia, jotka jakavat esimerkiksi samat ammatillisen kiinnostuksen kohteet kuin sinä. Voit myös laajentaa osaamistasi uusille alueille verkostoitumalla sellaisten ihmisten kanssa, joilla on osaamista, jota sinä esimerkiksi haluaisit hankkia.</li>
      </ul>;
      } else if (index === 1) {
        return <ul>
        <li><p2>Henkilökohtaista juridinen nuvontaa työelämän lakiasioissa - </p2>Mahdollisuus hakea Oikeusapua jäsenen työ-, virka- tai toimissudetta koskevassa rikosasiassa sekä näissä tapauksissa mahdollisten vastapuolen oikeaudenkäyntikulujen korvaaminen 20 000 euroon asti.</li>
        <br></br>
        <li><p2>Yksilöllistä uravalmennusta ja palkkaneuvontaa - </p2>Luottamukselliset keskustelut uravalmentajan kanssa auttavat sinua löytämään ratkaisuja urasi suuntaan, työnhakuun, työhyvinvointiin ja palkkakehitykseen. Uravalmentajillamme on erinomainen käsitys ekonomien palkoista ja palkkakehityksestä.</li>
        <br></br>
        <li><p2>Ammatilliset live- tapahtumat - </p2>Suomen Ekonomit tarjoaa jäsenilleen jatkuvia kehittymismahdollisuuksia erilaisten koulutusten ja tapahtumien avulla.</li>
      </ul>;
      } else if (index === 2) {
        return <ul>
        <li><p2>Henkilökohtaista juridinen nuvontaa työelämän lakiasioissa - </p2>Mahdollisuus hakea Oikeusapua jäsenen työ-, virka- tai toimissudetta koskevassa rikosasiassa sekä näissä tapauksissa mahdollisten vastapuolen oikeaudenkäyntikulujen korvaaminen 20 000 euroon asti.</li>
        <br></br>
        <li><p2>Ammatillinen verkostoituminen - </p2>Jäsenenä voit osallistua tapahtumiin, joissa tapaat kollegoitasi eri toimialoilta. Tällaiset verkostot voivat tarjota mahdollisuuksia oppia uutta, vaihtaa ajatuksia ja jakaa parhaita käytäntöjä. </li>
        <br></br>
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
        <br></br>
        <li><p2>Palkankorotukset - </p2>Huolehdithan, että sinulla on ekonomien palkkauksen asiantuntijoita ja tutkittua tietoa tukenasi palkkaneuvotteluissa ja juristeja tarkistamassa työsopimuksiasi, jotta saat ansaitsemasi arvoista palkkaa ja työelämää. Neuvottelemme myös yleisiä ja yrityskohtaisia työehtosopimuksia, jotka varmistavat palkan kehittymisen, vaikka työtehtävät eivät muuttuisikaan.</li>
        <br></br>
        <li><p2>Yhteisö ja verkosto - </p2>Huolehdithan itsesi kehittämisestä ja mielekkäistä kohtaamisistasi työyhteisösi ulkopuolella. Ekonomiyhteisö tarjoaa monenmoista ohjelmaa ja sisältöä elämään. Tarjoamme niin itsensä kehittämiseen tukea. Paikallisyhdistyksemme järjestävät lisäksi monenmoista vapaa-ajan asiapitoisempaa ja vapaampaa aktiviteettia.</li>
      </ul>;
      } else if (index === 1) {
        return <ul>
        <li><p2>Oikeudellinen turva - </p2>Huolehdithan, että sinulla on riittävän tasoinen oikeudellinen turva työelämän ongelmatilanteiteita varten niin nyt kuin tulevaisuudessa. Vakuutusyhtiöt tai työttömyyskassa eivät tarjoa joko lainkaan tai ainakaan samanlaatuista oikeudellista turvaa ekonomeille. Jäsenyysvuotesi kerryttävät turvaa meillä. Tilanteesi voi nopeasti vaihtua ja sen takia on hyvä varautua jo etukäteen.</li>
        <br></br>
        <li><p2>Palkankorotukset - </p2>Huolehdithan, että sinulla on ekonomien palkkauksen asiantuntijoita ja tutkittua tietoa tukenasi palkkaneuvotteluissa ja juristeja tarkistamassa työsopimuksiasi, jotta saat ansaitsemasi arvoista palkkaa ja työelämää. Neuvottelemme myös yleisiä ja yrityskohtaisia työehtosopimuksia, jotka varmistavat palkan kehittymisen, vaikka työtehtävät eivät muuttuisikaan.</li>
        <br></br>
        <li><p2>Esimieskoulutukset ja sisällöt - </p2>Huolehdithan niin uutena kuin pidempääkin toimineena esimiehenä osaamisesi kehittämisesti. Tarjoamme monenmoista sisältöä ja koulutuksia esimiehenä toimiville jäsenillemme.</li>
      </ul>;
      } else if (index === 2) {
        return  <ul>
        <li><p2>Oikeudellinen turva - </p2>Huolehdithan, että sinulla on riittävän tasoinen oikeudellinen turva työelämän ongelmatilanteiteita varten niin nyt kuin tulevaisuudessa. Vakuutusyhtiöt tai työttömyyskassa eivät tarjoa joko lainkaan tai ainakaan samanlaatuista oikeudellista turvaa ekonomeille. Jäsenyysvuotesi kerryttävät turvaa meillä. Tilanteesi voi nopeasti vaihtua ja sen takia on hyvä varautua jo etukäteen.</li>
        <br></br>
        <li><p2>Johtajasopimukset - </p2>Varmistathan, että sinulla on johtajasopimuksia laadittaessa asiantuntevat juristit apunasi tarkistamassa sopimuksia. Voit saada mittavia rahallisia hyötyjä, mikäli osaat neuvotella palkkaukseen ja muihin työehtoihin liittyvät sopimukset oikein.</li>
        <br></br>
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
          <h1>Jäsenen hyödyt</h1>
          <WordCarousel />
         </div>
          <div className="box-yhteenveto-alku-kuva">
          <img style= {{ width: '100%' }} src= {ryhmaImage} alt="ryhma" />
        </div>
     </div>

     <div className="box-yhteenveto-alku-teksti">
          <div className="box-yhteenveto-alku-raha">
          <h3>Jatkuvat hyödyt</h3>
          </div>
          <div class="paataso-container">
          <div className='box-yhteenveto-alaotsikko-raha'>
      <h3>
      <ExpendableButton isOpen= {showMoreTextKaikki1} toggle= {handleShowMoreClickKaikki1} />
      Yhteisö ja verkosto
      </h3>
      </div>
      {showMoreTextKaikki1 && (
        <div>
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span ><ExpendableButton isOpen= {showMoreTextKaikkiAla1} toggle= {handleShowMoreClickKaikkiAla1} showMaterialSymbol= {false} />Paikallisyhdistykset ja kerhot</span>
            <label>
            <input
              type="checkbox" id="check"
              checked= {selectedProducts[0].selected}
              onChange= {() => handleProductToggle(selectedProducts[0].id)}
            />
          </label>
          </div>
            {showMoreTextKaikkiAla1 && (
              <ul>
                <li>Ekonomijäsenet kuuluvat alueellisiin ekonomiyhdistyksiin, jotka tuovat ekonomitoiminnan paikalliselle tasolle ja tarjoavat koulutuksia ja tapahtumia. Eri puolella Suomea toimivia ekonomiyhdistyksiä on 25. Jäsenyytemme rakentuu yhdistysjäsenyyden periaatteelle eli jäsenet kuuluvat liittoon jäsenyhdistysten kautta.</li>
              </ul>
            )}
            <div className="box-yhteenveto-alaotsikko-teksti">
            <span><ExpendableButton isOpen= {showMoreTextKaikkiAla2} toggle= {handleShowMoreClickKaikkiAla2} showMaterialSymbol= {false} />Toimikunnat</span>
            <label>
            <input
              type="checkbox" id="check"
              checked= {selectedProducts[1].selected}
              onChange= {() => handleProductToggle(selectedProducts[1].id)}
            />
          </label>
          </div>
            {showMoreTextKaikkiAla2 && (
              <ul>
                <li>Suomen Ekonomien toimikunnat – työelämätoimikunta, koulutuspoliittinen toimikunta ja yrittäjyystyöryhmä – ovat vaikuttamistyön ytimessä. Ryhmät valmistelevat päätöksiä, ehdotuksia ja suosituksia. Toimikunnan jäsenenä pääsee verkostoitumaan sekä oppimaan laajasti yhteiskunnallisesta vaikuttamisesta.</li>
              </ul>
            )}
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span><ExpendableButton isOpen= {showMoreTextKaikkiAla3} toggle= {handleShowMoreClickKaikkiAla3} showMaterialSymbol= {false} />Opiskelijajärjestöt ja kerhot</span>
            <label>
            <input
              type="checkbox" id="check"
              checked= {selectedProducts[2].selected}
              onChange= {() => handleProductToggle(selectedProducts[2].id)}
            />
          </label>
          </div>
            {showMoreTextKaikkiAla3 && (
              <ul>
                <li>Kauppatieteiden opiskelijat, kylterit, kuuluvat Suomen Ekonomeihin opiskelijayhdistysten kautta.</li>
              </ul>
            )}
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span><ExpendableButton isOpen= {showMoreTextKaikkiAla4} toggle= {handleShowMoreClickKaikkiAla4} showMaterialSymbol= {false} />Verkostoitumispalvelu</span>
            <label>
            <input
              type="checkbox" id="check"
              checked= {selectedProducts[3].selected}
              onChange= {() => handleProductToggle(selectedProducts[3].id)}
            />
          </label>
          </div>
            {showMoreTextKaikkiAla4 && (
              <ul>
                <li>Löydät palvelusta helposti uusia tuttavuuksia, jotka jakavat esimerkiksi samat ammatillisen kiinnostuksen kohteet kuin sinä. Voit myös laajentaa osaamistasi uusille alueille verkostoitumalla sellaisten ihmisten kanssa, joilla on osaamista, jota sinä esimerkiksi haluaisit hankkia.</li>
              </ul>
            )}
          </div>
      )} </div>

<div class="paataso-container">
      <div className='box-yhteenveto-alaotsikko-raha'>
      <h3>
      <ExpendableButton isOpen= {showMoreTextKaikki5} toggle= {handleShowMoreClickKaikki5} />
      Vaikuttamistyö ja edunvalvonta
      </h3>
      </div>
      {showMoreTextKaikki5 && (
        <div>
         <div className="box-yhteenveto-alaotsikko-teksti">
          <span><ExpendableButton isOpen= {showMoreTextKaikki5Ala1} toggle= {handleShowMoreClickKaikki5Ala1} showMaterialSymbol= {false} />Työehtosopimukset</span>
          <label>
            <input
              type="checkbox" id="check"
              checked= {selectedProducts[4].selected}
              onChange= {() => handleProductToggle(selectedProducts[4].id)}
            />
          </label>
        </div>
        {showMoreTextKaikki5Ala1 && (
          <ul>
            <li>Neuvottelemme ekonomeille tyypilliset yleiset ja yrityskohtaiset työehtosopimukset.</li>
          </ul>
        )}
        <div className="box-yhteenveto-alaotsikko-teksti">
          <span><ExpendableButton isOpen= {showMoreTextKaikki5Ala2} toggle= {handleShowMoreClickKaikki5Ala2} showMaterialSymbol= {false} />Koulutukset arvostuksen ylläpito</span>
          <label>
            <input
              type="checkbox" id="check"
              checked= {selectedProducts[5].selected}
              onChange= {() => handleProductToggle(selectedProducts[5].id)}
            />
          </label>
        </div>
        {showMoreTextKaikki5Ala2 && (
          <ul>
            <li>Huolehdimme koulutuksen arvostuksen ylläpidosta niin julkisuudessa kuin työehtosopimuksissa.</li>
          </ul>
        )}
        <div className="box-yhteenveto-alaotsikko-teksti">
          <span><ExpendableButton isOpen= {showMoreTextKaikki5Ala3} toggle= {handleShowMoreClickKaikki5Ala3} showMaterialSymbol= {false} />Lainsäädäntöön vaikuttaminen</span>
          <label>
            <input
              type="checkbox" id="check"
              checked= {selectedProducts[6].selected}
              onChange= {() => handleProductToggle(selectedProducts[6].id)}
            />
          </label>
        </div>
        {showMoreTextKaikki5Ala3 && (
          <ul>
            <li>Uudistamme proaktiivisesti lainsäädäntöä ekonomien ja Suomen paremman työelämän mahdollistamiseksi.</li>
          </ul>
        )}
        <div className="box-yhteenveto-alaotsikko-teksti">
          <span><ExpendableButton isOpen= {showMoreTextKaikki5Ala4} toggle= {handleShowMoreClickKaikki5Ala4} showMaterialSymbol= {false} />Koulutuksen laatuun vaikuttaminen</span>
          <label>
            <input
              type="checkbox" id="check"
              checked= {selectedProducts[7].selected}
              onChange= {() => handleProductToggle(selectedProducts[7].id)}
            />
          </label>
        </div>
        {showMoreTextKaikki5Ala4 && (
          <ul>
            <li>Tuemme yliopistoja kehittämään koulutusta tuottamalla tutkittua tietoa heidän käyttöönsä ja vaikuttamalla heidän toimintaansa</li>
          </ul>
        )}
        <div className="box-yhteenveto-alaotsikko-teksti">
          <span><ExpendableButton isOpen= {showMoreTextKaikki5Ala5} toggle= {handleShowMoreClickKaikki5Ala5} showMaterialSymbol= {false} />Talousvaikuttaminen</span>
          <label>
            <input
              type="checkbox" id="check"
              checked= {selectedProducts[8].selected}
              onChange= {() => handleProductToggle(selectedProducts[8].id)}
            />
          </label>
        </div>
        {showMoreTextKaikki5Ala5 && (
          <ul>
            <li>Nostamme esiin Suomen talouskasvun kannalta keskeisiä asioita samalla tuoden esiin ekonomien osaamista asiasta.</li>
          </ul>
            )}
          </div>
      )} </div>
      
      </div>

      <div className="box-yhteenveto-raha">
         <div className='yleinen-rahallinen-etu'>
         <div className="price-wrapper2">
           </div>
           <h2>Ota huomioon!</h2>
           <div className='box-list'>
           <div className="price-wrapper">
            <ul>
           <p>Työehtosopimus tuo sinulle lisää rahaa: <strong>sairausajan palkka</strong> (1–3 kuukaudelta), <strong>lomaraha</strong> (50 % lomapalkasta), <strong> palkallinen perhevapaa</strong> (6 päivää–3 kuukautta), <strong>sairaan lapsen hoito palkallisesti</strong> (1–4 päivää) ja <strong>palkan yleiskorotus</strong> (kustannusvaikutus 3,6 % vuonna 2023). Yleiskorotukset Mediaanipalkalla ekonomi sai vuodessa lisää palkkaa 2263 €.
            <br></br>
            <br></br>
            Työnantajalla ei ole velvollisuutta maksaa mitään näistä, jos alalla ei ole työehtosopimusta. </p> 
           </ul>
           </div>
           </div>
         </div>
         </div>


      <div className="box-yhteenveto-alku-teksti">
      <div className="box-yhteenveto-alku-raha">
      <h3>Rahanarvoiset edut</h3>
      <h3>Rahallinen hyöty per vuosi</h3>
      </div>

      <div class="paataso-container">
      <div className='box-yhteenveto-alaotsikko-raha'>
      <h3>
      <ExpendableButton isOpen= {showMoreTextKaikki3} toggle= {handleShowMoreClickKaikki3} />
      Urapalvelut
      </h3>
      <div className='raha-alataso'>= {priceUrapalvelut.toLocaleString('fi-FI')} €</div>
      </div>
      {showMoreTextKaikki3 && (
        <div>
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span><ExpendableButton isOpen= {showMoreTextKaikki3Ala1} toggle= {handleShowMoreClickKaikki3Ala1} showMaterialSymbol= {false} />Uravalmennus</span>
            <label>{selectedProducts[9].price} €
            <input
              type="checkbox" id="check"
              checked= {selectedProducts[9].selected}
              onChange= {() => handleProductToggle(selectedProducts[9].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki3Ala1 && (
              <ul>
                <li> Luottamukselliset keskustelut uravalmentajan kanssa auttavat sinua löytämään ratkaisuja urasi suuntaan, työnhakuun ja työhyvinvointiin.</li>
                <br></br>
                <li style={{ fontStyle: 'italic' }}>200 € / tunti. Laskettu siten, että käytät yhden 3 x 1 h valmennuksen 3 vuodesssa.</li>
              </ul>
            )}
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span><ExpendableButton isOpen= {showMoreTextKaikki3Ala2} toggle= {handleShowMoreClickKaikki3Ala2} showMaterialSymbol= {false} />CV:n ja hakemuksen täsmäsparraus</span>
            <label>{selectedProducts[10].price} €
            <input
              type="checkbox" id="check"
              checked= {selectedProducts[10].selected}
              onChange= {() => handleProductToggle(selectedProducts[10].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki3Ala2 && (
              <ul>
                <li>CV:n ja hakemuksen kertaluontoisessa täsmäsparrauksessa saat vinkit työnhaun asiakirjojesi viimeistelyyn, jotta osaamisesi ja kiinnostuksesi nousevat esiin ja parannat mahdollisuuksia erottua muista työnhakijoista.</li>
                <br></br>
                <li style={{ fontStyle: 'italic' }}>150€ / tunti. Laskettu siten, että käytät kerran 5 vuodessa.</li>
              </ul>
            )}
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span><ExpendableButton isOpen= {showMoreTextKaikki3Ala3} toggle= {handleShowMoreClickKaikki3Ala3} showMaterialSymbol= {false} />Palkkaneuvonta</span>
            <label>{selectedProducts[11].price} €
            <input
              type="checkbox" id="check"
              checked= {selectedProducts[11].selected}
              onChange= {() => handleProductToggle(selectedProducts[11].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki3Ala3 && (
              <ul>
                <li>Meillä on laaja tietämys ekonomien palkoista ja palkkakehityksestä. Uravalmentajamme antavat henkilökohtaista palkkaneuvontaa.</li>
                <br></br>
                <li style={{ fontStyle: 'italic' }}>150 € / tunti. Laskettu siten, että käytät kerran 5 vuodessa.</li>
              </ul>
            )}
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span><ExpendableButton isOpen= {showMoreTextKaikki3Ala4} toggle= {handleShowMoreClickKaikki3Ala4} showMaterialSymbol= {false} />Palkkatutka</span>
            <label>{selectedProducts[12].price} €
            <input
              type="checkbox" id="check"
              checked= {selectedProducts[12].selected}
              onChange= {() => handleProductToggle(selectedProducts[12].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki3Ala4 && (
              <ul>
                <li>Palkkatutkan avulla voit haarukoida palkkatasoa muun muassa kokemuksen, paikkakunnan ja toimialan perusteella. Palkkatutkan datana käytetään Suomen Ekonomien tuoreimman palkkatasotutkimuksen tietoja.</li>
                <br></br>
                <li style={{ fontStyle: 'italic' }}>Ei vastaavaa vapailla markkinoilla. .</li>
              </ul>
            )}   <div className="box-yhteenveto-alaotsikko-teksti">
            <span><ExpendableButton isOpen= {showMoreTextKaikki3Ala5} toggle= {handleShowMoreClickKaikki3Ala5} showMaterialSymbol= {false} />Verkkovalmennukset</span>
            <label>{selectedProducts[13].price} €
            <input
              type="checkbox" id="check"
              checked= {selectedProducts[13].selected}
              onChange= {() => handleProductToggle(selectedProducts[13].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki3Ala5 && (
              <ul>
                <li>
                Etsitkö parempaa jaksamista, uutta innostusta tai suuntaa urallesi? Haluatko menestyä työnhaussa? Uravalmentajiemme rakentamissa verkkovalmennuksissa kehität itsetuntemusta, opit tunnistamaan omaa osaamistasi ja hankit tässä ajassa olennaisia työnhakutaitoja.
                </li>
                <br></br>
                <li style={{ fontStyle: 'italic' }}>250 € / ohjattu kahden viikon valmennus. Laskettu siten, että käytät vähintään yhden valmennuksen vuodessa.</li>
              </ul>
            )}  
          <div className="box-yhteenveto-alaotsikko-teksti">
          <span><ExpendableButton isOpen= {showMoreTextKaikki3Ala6} toggle= {handleShowMoreClickKaikki3Ala6} showMaterialSymbol= {false} />Työnhaun työkalut käytössä 24/7 eLoungessa</span>
            <label>{selectedProducts[14].price.toLocaleString('fi-FI')} €
            <input
              type="checkbox" id="check"
              checked= {selectedProducts[14].selected}
              onChange= {() => handleProductToggle(selectedProducts[14].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki3Ala6 && (
              <ul>
                <li>CV:n ja LinkedIn -profiilin kuntotesti, itsetuntemuksen ja työnhaun ekonomeille suunnitellut materiaalit käytössäsi milloin tahansa.</li>
                <br></br>
                <li style={{ fontStyle: 'italic' }}>Ei vastaavaa vapailla markkinoilla.</li>
              </ul>
            )}
             <div className="box-yhteenveto-alaotsikko-teksti">
          <span><ExpendableButton isOpen= {showMoreTextKaikki3Ala7} toggle= {handleShowMoreClickKaikki3Ala7} showMaterialSymbol= {false} />Mentorointi</span>
            <label>{selectedProducts[15].price.toLocaleString('fi-FI')} €
            <input
              type="checkbox" id="check"
              checked= {selectedProducts[15].selected}
              onChange= {() => handleProductToggle(selectedProducts[15].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki3Ala7 && (
              <ul>
                <li>Mentorointi on ammatillisen kehittymisen ohjelma. Se on vuorovaikutukseen perustuvaa yhteistyötä, jonka tavoitteena on edistää aktorin (mentoroitava) ammatillista kasvua ja kehittymistä sekä antaa mentorille mahdollisuus kehittää vuorovaikutustaitojaan, oppia uutta ja kokea auttamisen iloa.</li>
                <br></br>
                <li style={{ fontStyle: 'italic' }}>Mentorointiohjelmat yleensä maksavat noin 2 000 €. HUOM! Ohjelma maksaa 200€ jäsenmaksun päälle.</li>
              </ul>
            )}
          </div>
      )}
      </div>
      <div class="paataso-container">
      <div className='box-yhteenveto-alaotsikko-raha'>
      <h3>
      <ExpendableButton isOpen= {showMoreTextKaikki4} toggle= {handleShowMoreClickKaikki4} />
      Lakipalvelut      
      </h3>
      <div className='raha-alataso'>= {priceLakipalvelut.toLocaleString('fi-FI')} €</div>
      </div>
      {showMoreTextKaikki4 && (
        <div>
          <div className="box-yhteenveto-alaotsikko-teksti">
          <span><ExpendableButton isOpen= {showMoreTextKaikki4Ala1} toggle= {handleShowMoreClickKaikki4Ala1} showMaterialSymbol= {false} />Henkilökohtainen lakineuvonta</span>
            <label>{selectedProducts[16].price} €
            <input
              type="checkbox" id="check"
              checked= {selectedProducts[16].selected}
              onChange= {() => handleProductToggle(selectedProducts[16].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki4Ala1 && (
              <ul>
                <li>Lakimiehemme tarjoavat puhelinneuvontaa työoikeudellisiin kysymyksiin lähes kaikkina arkipäivinä.</li>
                <br></br>
                <li style={{ fontStyle: 'italic' }}>Tuntihinta on 300 €. Laskettu siten, että käytät kerran kolmessa vuodessa.</li>
              </ul>
            )}
          <div className="box-yhteenveto-alaotsikko-teksti">
          <span><ExpendableButton isOpen= {showMoreTextKaikki4Ala2} toggle= {handleShowMoreClickKaikki4Ala2} showMaterialSymbol= {false} />Johtajasopimukset</span>
            <label>{selectedProducts[17].price} €
            <input
              type="checkbox" id="check"
              checked= {selectedProducts[17].selected}
              onChange= {() => handleProductToggle(selectedProducts[17].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki4Ala2 && (
              <ul>
                <li>Kommentoimme työsuhteeseen liittyviä sopimuksia, kuten työsopimuksia ja työsuhteen päättämissopimuksia.</li>
                <br></br>
                <li style={{ fontStyle: 'italic' }}>300 € / tunti. Laskettu siten, että käytä kerran kymmenessä vuodessa ja aikaa kuluu 2 tuntia.</li>
              </ul>
            )}
          <div className="box-yhteenveto-alaotsikko-teksti">
          <span><ExpendableButton isOpen= {showMoreTextKaikki4Ala3} toggle= {handleShowMoreClickKaikki4Ala3} showMaterialSymbol= {false} />Työsopimuskommentointi</span>
            <label>{selectedProducts[18].price} €
            <input
              type="checkbox" id="check"
              checked= {selectedProducts[18].selected}
              onChange= {() => handleProductToggle(selectedProducts[18].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki4Ala3 && (
              <ul>
                <li>Kommentoimme johtajasopimuksia ja annamme vinkkejä niiden laadintaan.</li>
                <br></br>
                <li style={{ fontStyle: 'italic' }}>300 € / tunti. Laskettu siten, että käytät kerran viidessä vuodessa. </li>
              </ul>
            )}
         <div className="box-yhteenveto-alaotsikko-teksti">
         <span><ExpendableButton isOpen= {showMoreTextKaikki4Ala4} toggle= {handleShowMoreClickKaikki4Ala4} showMaterialSymbol= {false} />Riitaisten työsuhdeasioiden selvittäminen</span>
            <label>{selectedProducts[19].price} €
            <input
              type="checkbox" id="check"
              checked= {selectedProducts[19].selected}
              onChange= {() => handleProductToggle(selectedProducts[19].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki4Ala4 && (
              <ul>
                <li>Tarvittaessa juristimme selvittää riitaisia työsuhdeasioita työnantajan kanssa, yleensä ensimmäisenä askeleena ennen mahdollista oikeudenkäyntiä. </li>
                <br></br>
                <li style={{ fontStyle: 'italic' }}>300 € / tunti. Laskettu siten, että käytät kerran kymmenessä vuodessa ja aikaa kuluu 4 tuntia.</li>
              </ul>
            )}
          <div className="box-yhteenveto-alaotsikko-teksti">
          <span><ExpendableButton isOpen= {showMoreTextKaikki4Ala5} toggle= {handleShowMoreClickKaikki4Ala5} showMaterialSymbol= {false} />Kertyvä oikeusapu riita- tai rikosasiassa</span>
            <label>{selectedProducts[20].price.toLocaleString('fi-FI')} €
            <input
              type="checkbox" id="check"
              checked= {selectedProducts[20].selected}
              onChange= {() => handleProductToggle(selectedProducts[20].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki4Ala5 && (
              <ul>
                <li>Riita- tai rikosasian siirtyessä tuomioistuimen kävsiteltäväksi teemme oikeusapupäätöksen. Korvaamme myös vastapuolen kuluja jäsenvuosien määrän mukaisesti.</li>
                <br></br>
                <li style={{ fontStyle: 'italic' }}>Riita tai rikosasian selvittely käräjäoikeudessa kustantaa yleensä noin 50 000€. Laskettu, että tapahtuu kerran 40 vuoden työuralla.</li>
              </ul>
            )}
          <div className="box-yhteenveto-alaotsikko-teksti">
          <span><ExpendableButton isOpen= {showMoreTextKaikki4Ala6} toggle= {handleShowMoreClickKaikki4Ala6} showMaterialSymbol= {false} />Oppaat</span>
            <label>{selectedProducts[21].price} €
            <input
              type="checkbox" id="check"
              checked= {selectedProducts[21].selected}
              onChange= {() => handleProductToggle(selectedProducts[21].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki4Ala6 && (
              <ul>
                <li>Meillä on lukuisia oppaita kilpailukielto-opas, johtajasopimusopas, ulkomaantyön opas.</li>
                <br></br>
                <li style={{ fontStyle: 'italic' }}>Oppaan hinnat keskimäärin noin 50 €. Laskettu, että käytät kerran kahdessa vuodessa yhtä opasta.</li>
              </ul>
            )}
                 <div className="box-yhteenveto-alaotsikko-teksti">
          <span><ExpendableButton isOpen= {showMoreTextKaikki4Ala7} toggle= {handleShowMoreClickKaikki4Ala7} showMaterialSymbol= {false} />Sopimusmallit</span>
            <label>{selectedProducts[22].price} €
            <input
              type="checkbox" id="check"
              checked= {selectedProducts[22].selected}
              onChange= {() => handleProductToggle(selectedProducts[22].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki4Ala7 && (
              <ul>
                <li>Meillä on mm. toimitusjohtajasopimusmalli ja ohje, toimeksiantosopimus malli.</li>
                <br></br>
                <li style={{ fontStyle: 'italic' }}>Esimerkiksi ohtajasopimus-malli 500 € ostettuna. Laskettu siten, että käytät kerran 5 vuodessa.</li>
              </ul>
            )}
          <div className="box-yhteenveto-alaotsikko-teksti">
          <span><ExpendableButton isOpen= {showMoreTextKaikki4Ala8} toggle= {handleShowMoreClickKaikki4Ala8} showMaterialSymbol= {false} />Aloittavan yrittäjän neuvonta</span>
            <label>{selectedProducts[23].price} €
            <input
              type="checkbox" id="check"
              checked= {selectedProducts[23].selected}
              onChange= {() => handleProductToggle(selectedProducts[23].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki4Ala8 && (
              <ul>
                <li>Yleistä tietoa ja ohjausta seuraavissa asioissa: yrittäjäksi ryhtyminen, asiantuntijan toimeksiantosopimus ja yrityksen osakkaiden välinen osakassopimus.</li>
                <br></br>
                <li style={{ fontStyle: 'italic' }}>Tuntihinta on 300 € ja aikaa kuluu 2 tuntia. Laskettu siten, että käytät kerran 10 vuoden työuralla.</li>
              </ul>
            )}
          <div className="box-yhteenveto-alaotsikko-teksti">
          <span><ExpendableButton isOpen= {showMoreTextKaikki4Ala9} toggle= {handleShowMoreClickKaikki4Ala9} showMaterialSymbol= {false} />eLakipalvelu</span>
            <label>{selectedProducts[24].price} €
            <input
              type="checkbox" id="check"
              checked= {selectedProducts[24].selected}
              onChange= {() => handleProductToggle(selectedProducts[24].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki4Ala9 && (
              <ul>
                <li>eLakipalvelu on helppo tapa saada vastaus nopeasti. Virtuaalinen palvelu esittää sinulle kysymyksiä ja ohjaa näppärästi vastauksen äärelle.</li>
                <br></br>
                <li style={{ fontStyle: 'italic' }}>Hinta vapailta markkinoilta noin 40 € per vuosi. Laskettu, että käytät kerran kahdessa vuodessa.</li>
              </ul>
            )}
          </div>
      )}
      </div>

      <div class="paataso-container">
     <div className='box-yhteenveto-alaotsikko-raha'>
      <h3>
      <ExpendableButton isOpen= {showMoreTextKaikki2} toggle= {handleShowMoreClickKaikki2} />
      Tapahtumat
      </h3>
      <div className='raha-alataso'>= {priceTapahtumat.toLocaleString('fi-FI')} €</div>
      </div>
      {showMoreTextKaikki2 && (
        <div>
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span><ExpendableButton isOpen= {showMoreTextKaikki2Ala1} toggle= {handleShowMoreClickKaikki2Ala1} showMaterialSymbol= {false} />Huippuseminaarit</span>
            <label>{selectedProducts[25].price} €
            <input
              type="checkbox" id="check"
              checked= {selectedProducts[25].selected}
              onChange= {() => handleProductToggle(selectedProducts[25].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki2Ala1 && (
              <ul>
                <li>Tarjoamme jäsenillemme korkealaatuisia huippuseminaareja yhteiskuntaa puhuttelevista aiheista joissa on mahdollista tavata ja verkostoitua.</li>
                <br></br>
                <li style={{ fontStyle: 'italic' }}>Keskimääräinen hinta tapahtumalle on 200 € sisältäen huippuluokan puhujat, monipuoliset tarjoilut sekä tasokkaat puitteet. Laskettu niin, että osallistut yhteen huippuseminaariin vuoden aikana. </li>
              </ul>
            )}
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span><ExpendableButton isOpen= {showMoreTextKaikki2Ala2} toggle= {handleShowMoreClickKaikki2Ala2} showMaterialSymbol= {false} />Ajankohtaistapahtumat</span>
            <label>{selectedProducts[26].price} €
            <input
              type="checkbox" id="check"
              checked= {selectedProducts[26].selected}
              onChange= {() => handleProductToggle(selectedProducts[26].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki2Ala2 && (
              <ul>
                <li>Tarjoamme monipuolisia ajankohtaistapahtumia ja -valmennuksia. Löydät myös aikaisempien tapahtumiemme tallenteet eLoungesta.</li>
                <br></br>
                <li style={{ fontStyle: 'italic' }}>Keskimääräinen hinta tapahtumalle on 30-50 €. Laskettu siten, että osallistut yhteen striimattuun ja yhteen lähitapahtumaan vuoden aikana.</li>
              </ul>
            )}
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span><ExpendableButton isOpen= {showMoreTextKaikki2Ala3} toggle= {handleShowMoreClickKaikki2Ala3} showMaterialSymbol= {false} />Viihdetapahtumat</span>
            <label>{selectedProducts[27].price} €
            <input
              type="checkbox" id="check"
              checked= {selectedProducts[27].selected}
              onChange= {() => handleProductToggle(selectedProducts[27].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki2Ala3 && (
              <ul>
                <li>
                Järjestämme viihteellisempiä tapahtumia kuten yksityisiä konsertteja, elokuvanäytöksiä ja huvipuistopäiviä 
                </li>
                <br></br>
                <li style={{ fontStyle: 'italic' }}>Keskimääräinen hinta tapahtumalle on 50 €. Hinta verrannollinen yhteen pääsylippuun yleisimmissä viihdetilaisuuksissa, kuten elokuva-, teatteri-, konsertti- tai taidetapahtumissa. Laskettu siten, että osallistut yhteen viihdetapahtumaan vuoden aikana.</li>
              </ul>
            )}
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span><ExpendableButton isOpen= {showMoreTextKaikki2Ala4} toggle= {handleShowMoreClickKaikki2Ala4} showMaterialSymbol= {false} />Paikallisyhdistyksen tapahtumat</span>
            <label>{selectedProducts[28].price} €
            <input
              type="checkbox" id="check"
              checked= {selectedProducts[28].selected}
              onChange= {() => handleProductToggle(selectedProducts[28].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki2Ala4 && (
              <ul>
                <li>
                Ekonomijäsenet kuuluvat alueellisiin ekonomiyhdistyksiin, jotka tuovat ekonomitoiminnan paikalliselle tasolle. Yhdistykset tarjoavat koulutuksia ja tapahtumia sekä erilaista kerhotoimintaa.</li>
                <br></br>
                <li style={{ fontStyle: 'italic' }}>Keskimääräinen hinta tapahtumalle on 50 €. Laskettu siten, että osallistut yhteen paikallisyhdistyksesi järjestämään tapahtumaan vuoden aikana.</li>
              </ul>
            )}<div className="box-yhteenveto-alaotsikko-teksti">
            <span><ExpendableButton isOpen= {showMoreTextKaikki2Ala6} toggle= {handleShowMoreClickKaikki2Ala6} showMaterialSymbol= {false} />School of sales</span>
            <label>{selectedProducts[29].price} €
            <input
              type="checkbox" id="check"
              checked= {selectedProducts[29].selected}
              onChange= {() => handleProductToggle(selectedProducts[29].id)}
            />
          </label>
          </div>
            {showMoreTextKaikki2Ala6 && (
              <ul>
                <li>
                Suomen Ekonomien ja Kaupan liiton perustaman School of Sales -myyntikoulun missiona on nostaa myynnin osaamista ja arvostusta ja sitä kautta parantaa Suomen kilpailukykyä ja kasvun edellytyksiä.
                </li>
                <br></br>
                <li style={{ fontStyle: 'italic' }}>Keskimääräinen hinta tapahtumalle on 50 €.</li>
              </ul>
            )}
          </div>

      )}</div>

      <div class="paataso-container">
      <div className='box-yhteenveto-alaotsikko-raha'>
      <h3>
      <ExpendableButton isOpen= {showMoreTextKaikki6} toggle= {handleShowMoreClickKaikki6} />
      Jäsenedut
      </h3>
      <div className='raha-alataso'>= {priceJasenedut.toLocaleString('fi-FI')} €</div>
      </div>
      {showMoreTextKaikki6 && (
        <div>
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span>
              <ExpendableButton isOpen= {showMoreTextKaikki6Ala1} toggle= {handleShowMoreClickKaikki6Ala1} showMaterialSymbol= {false} />
              Danske Bank asuntolainaetu
            </span>
            <label>{selectedProducts[30].price.toLocaleString('fi-FI')} €
              <input
                type="checkbox" id="check"
                checked= {selectedProducts[30].selected}
                onChange= {() => handleProductToggle(selectedProducts[30].id)}
              />
            </label>
          </div>
          {showMoreTextKaikki6Ala1 && (
            <ul>
              <li>Danske Bankin asuntolaina ilman toimitusmaksua ja järjestelypalkkiota. Pienempi marginaali ja lyhennysvapaat ilman kuluja.</li>
              <br></br>
              <li style={{ fontStyle: 'italic' }}>Laskettu niin, että säästät esimerkiksi 200 000 euron lainassa 1 200 euroa.</li>
            </ul>
          )}
          
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span>
              <ExpendableButton isOpen= {showMoreTextKaikki6Ala2} toggle= {handleShowMoreClickKaikki6Ala2} showMaterialSymbol= {false} />
              Danske Bank vastavalmistuneen edut
            </span>
            <label>{selectedProducts[31].price} €
              <input
                type="checkbox" id="check"
                checked= {selectedProducts[31].selected}
                onChange= {() => handleProductToggle(selectedProducts[31].id)}
              />
            </label>
          </div>
          {showMoreTextKaikki6Ala2 && (
            <ul>
              <li>Pääset Danske Etuohjelman ylimmälle etutasolle. MasterCard Platinum -luottokortti 3. Pääsy yli 1000 lentokenttäloungeen ja kattava matkavakuutus.</li>
              <br></br>
              <li style={{ fontStyle: 'italic' }}>Etukokonaisuuden arvo on vuosittain yli 700 euroa.</li>
            </ul>
          )}
          
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span>
              <ExpendableButton isOpen= {showMoreTextKaikki6Ala3} toggle= {handleShowMoreClickKaikki6Ala3} showMaterialSymbol= {false} />
              Danske Bank sijoittamisen edut
            </span>
            <label>{selectedProducts[32].price} €
              <input
                type="checkbox" id="check"
                checked= {selectedProducts[32].selected}
                onChange= {() => handleProductToggle(selectedProducts[32].id)}
              />
            </label>
          </div>
          {showMoreTextKaikki6Ala3 && (
            <ul>
              <li>Kaupankäynti Online -palvelu ilman kuukausimaksuja. Etu koskee myös osakesäästötiliä. Varainhoito- ja sijoitusneuvontapalveluista -15%. Sijoittajalle Danske-tili ja verkkotunnukset veloituksetta. Arvo-osuustilin siirto Danske Bankiin 0 euroa.</li>
              <br></br>
              <li style={{ fontStyle: 'italic' }}>Hinta perustuu säästettyihin palvelumaksuihin vuoden aikana. Summaan ei ole laskettu varainhoitoon- ja sijoitusneuvontaan saatavaa -15% etua.</li>
            </ul>
          )}
          
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span>
              <ExpendableButton isOpen= {showMoreTextKaikki6Ala4} toggle= {handleShowMoreClickKaikki6Ala4} showMaterialSymbol= {false} />
              Kaleva henkivakuutus
            </span>
            <label>{selectedProducts[33].price} €
              <input
                type="checkbox" id="check"
                checked= {selectedProducts[33].selected}
                onChange= {() => handleProductToggle(selectedProducts[33].id)}
              />
            </label>
          </div>
          {showMoreTextKaikki6Ala4 && (
            <ul>
              <li>Saat Suomen edullisimman henkivakuutuksen* itsellesi ja puolisollesi jopa 61 prosenttia normaalihintoja edullisemmin.</li>
              <br></br>
              <li style={{ fontStyle: 'italic' }}>Jäsenet ovat säästäneet keskimäärin 574 euroa henkivakuutuksen hinnassa vuosittain.</li>
            </ul>
          )}
          
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span>
              <ExpendableButton isOpen= {showMoreTextKaikki6Ala5} toggle= {handleShowMoreClickKaikki6Ala5} showMaterialSymbol= {false} />
              Palkkio +
            </span>
            <label>{selectedProducts[34].price.toLocaleString('fi-FI')} €
              <input
                type="checkbox" id="check"
                checked= {selectedProducts[34].selected}
                onChange= {() => handleProductToggle(selectedProducts[34].id)}
              />
            </label>
          </div>
          {showMoreTextKaikki6Ala5 && (
            <ul>
              <li>Palkkioplus on kevytyrittäjäpalvelu, jonka kautta laskutat yrittäjämäisesti tehtyjä työsuorituksia helposti ja vaivattomasti: byrokratia hoidetaan puolestasi!</li>
              <br></br>
              <li style={{ fontStyle: 'italic' }}>Laskuta veloituksetta 1 000 euron edestä työtä kevytyrittäjänä eli ilman y-tunnusta. Tämän ylittävältä osalta palveluveloitus on vain 3,2 %. Etu perustuu osuuteen, josta ei makseta palvelumaksua, 1000 € laskutuksessa.</li>
            </ul>
          )}
          
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span>
              <ExpendableButton isOpen= {showMoreTextKaikki6Ala6} toggle= {handleShowMoreClickKaikki6Ala6} showMaterialSymbol= {false} />
              Lehtietu ekonomi
            </span>
            <label>{selectedProducts[35].price} €
              <input
                type="checkbox" id="check"
                checked= {selectedProducts[35].selected}
                onChange= {() => handleProductToggle(selectedProducts[35].id)}
              />
            </label>
          </div>
          {showMoreTextKaikki6Ala6 && (
            <ul>
              <li>Jäsenenä saat valitsemasi ammattimedian tilauksen 57-86 % markkinahintaa edullisemmin, oli valintasi digi tai printti.</li>
              <br></br>
              <li style={{ fontStyle: 'italic' }}>Esim. Talouselämän digi ja printti -yhdistelmätilauksesta säästät 464 euroa (normaalihinta 539 e, jäsenetuhinta 75 e vuodelle 2023).</li>
            </ul>
          )}
          
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span>
              <ExpendableButton isOpen= {showMoreTextKaikki6Ala7} toggle= {handleShowMoreClickKaikki6Ala7} showMaterialSymbol= {false} />
              HBL Digital
            </span>
            <label>{selectedProducts[36].price} €
              <input
                type="checkbox" id="check"
                checked= {selectedProducts[36].selected}
                onChange= {() => handleProductToggle(selectedProducts[36].id)}
              />
            </label>
          </div>
          {showMoreTextKaikki6Ala7 && (
            <ul>
              <li>Ruotsinkielinen HBL Digital tarjoaa sinulle sähköisiä sanomalehtiä ja uutissyötteitä.</li>
              <br></br>
              <li style={{ fontStyle: 'italic' }}>Säästät 159,80 euroa. Jäsenenä voit ostaa HBL Digital lehden 55 euron jäsenhintaan, kun normaalihinta on 214,80 e.</li>
            </ul>
          )}
          
          <div className="box-yhteenveto-alaotsikko-teksti">
            <span>
              <ExpendableButton isOpen= {showMoreTextKaikki6Ala9} toggle= {handleShowMoreClickKaikki6Ala9} showMaterialSymbol= {false} />
              Member + edut
            </span>
            <label>{selectedProducts[37].price} €
              <input
                type="checkbox" id="check"
                checked= {selectedProducts[37].selected}
                onChange= {() => handleProductToggle(selectedProducts[37].id)}
              />
            </label>
          </div>
          {showMoreTextKaikki6Ala9 && (
            <ul>
              <li>Palveluun on kerätty ajankohtaisia etuja ja palveluita, mm. mökkeilyyn, matkailuun, vapaa-aikaan ja hyvinvointiin liittyen.</li>
              <br></br>
              <li style={{ fontStyle: 'italic' }}>Laskettu keskimääräinen säästö, kun käytät yhden edun vuodessa.</li>
            </ul>
          )}
          </div>
      )}

        </div>
      </div>

      <div className="box-yhteenveto-raha">
         <div className='yleinen-rahallinen-etu'>
         <div className="price-wrapper2">
           <h2>Tämän verran sinä hyödyt:</h2>
           <h3 className="price-value2">= {calculateTotalPrice().toLocaleString('fi-FI')} €</h3>
           </div>
           <h2>Mitä maksat?</h2>
           <div className='box-list'>
           <div className="price-wrapper">
            <ul>
           <li>Suomen Ekonomit</li> <p>- Alennus jäsenyydestä -50%<label>
              <input
                type="checkbox" id="check"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </label></p> 
           </ul>
           <p className="price-value">{calculatePrice()} €</p>
           </div>
           <div className="price-wrapper">
            <ul>
           <li>Paikallisyhdistys</li>
           </ul>
           <p className="price-value">0-{localAssociationFee} €</p>
           </div>
           <div className="price-wrapper">
            <ul>
           <p4 style={{ fontWeight: 'bold' }}>Jäsenmaksu yhteensä</p4>
           </ul>
           <p className="price-value-yhteensä">=  {-(-(calculatePrice())-40)} €</p>
           </div>
           </div>
           <div className="price-wrapper2">
           <h2>Kokonaishyötysi vuoden aikana:</h2>
           <h2 className="price-value">=  {(calculateTotalPrice() - localAssociationFee - calculatePrice()).toLocaleString('fi-FI')} €</h2>
           </div>
         </div>
        <div class="aarrearkku-container">
        <img style= {{ width: '30%'}} src= {aarrearkkuImage} alt="aarrearkku" />
        </div>
         </div>

          <h1>Katso vielä vinkit ikäsi, elämäntilanteesi ja asemasi mukaan.</h1>

       <div className='ala-box-otsikot'><h1>Minkä ikäinen olet?</h1></div>
       <div id="button-container-ika">
        <button
          className= {activeButtonIka === 0 ? 'active' : 'inactive' }
          onClick= {() => handleIkaButtonClick(0)}
        >
          18-30
        </button>
        <button
          className= {activeButtonIka === 1 ? 'active' : 'inactive'}
          onClick= {() => handleIkaButtonClick(1)}
        >
          30-40
        </button>
        <button
          className= {activeButtonIka === 2 ? 'active' : 'inactive'}
          onClick= {() => handleIkaButtonClick(2)}
        >
          40-50
        </button>
        <button
          className= {activeButtonIka === 3 ? 'active' : 'inactive'}
          onClick= {() => handleIkaButtonClick(3)}
        >
          50-65
        </button>
        <button
          className= {activeButtonIka === 4 ? 'active' : 'inactive'}
          onClick= {() => handleIkaButtonClick(4)}
        >
        +65
        </button>
      </div>
      {/* Laatikot ja tekstit ikäryhmänapin valinnan alle */}
      {activeButtonIka !== null && (
          <div className="selection-info-ika">
            <div className="box-hyva">
            <div className='box-peukku'><ThumbUpOffAltIcon/></div>
              <h2>Jäsenen top 3 nostot ikäryhmälle {arvoIka}:</h2>
              <div className='box-list'>
               <p>{getIkaTeksti1(activeButtonIka)}<br/></p>
               </div>
            </div>
            <div className="box-huono">
            <div className='box-peukku'><ThumbDownOffAltIcon/></div>
              <h2>Ei jäsenen vinkit</h2>
              <div className='box-list'>
              <p>{getIkaTeksti2(activeButtonIka)}<br/></p>
              </div>
            </div>
          </div>
        )}


      <div className='ala-box-otsikot'><h1>Pääasiallinen toiminta</h1></div>
      <div id="button-container-toiminta">
        <button
          className= {activeButtonToiminta === 0 ? 'active' : 'inactive'}
          onClick= {() => handleToimintaButtonClick(0)}
        >
          Työelämässä
        </button>
        <button
          className= {activeButtonToiminta === 2 ? 'active' : 'inactive'}
          onClick= {() => handleToimintaButtonClick(2)}
        >
          Työnhakija
        </button>
        <button
          className= {activeButtonToiminta === 3 ? 'active' : 'inactive'}
          onClick= {() => handleToimintaButtonClick(3)}
        >
          Yrittäjä
        </button>
      </div>

       {/* Laatikot ja tekstit ikäryhmänapin valinnan alle */}
       {activeButtonToiminta !== null && (
          <div className="selection-info-toiminta">
            <div className="box-hyva">
            <div className='box-peukku'><ThumbUpOffAltIcon/></div>
            <h2>Jäsenen top 3 nostot toiminnalle {arvoToiminta}:</h2>
            <div className='box-list'>
            <p>{getToimintaTeksti1(activeButtonToiminta)}<br/></p>
            </div>
            </div>
            <div className="box-huono">
            <div className='box-peukku'><ThumbDownOffAltIcon/></div>
            <h2>Ei jäsenen vinkit</h2>
            <div className='box-list'>
            <p>{getToimintaTeksti2(activeButtonToiminta)}<br/></p>
            </div>
            </div>
          </div>
        )}

      <div className='ala-box-otsikot'><h1>Asema</h1></div>
      <div id="button-container-asemataso">
        <button
          className= {activeButtonAsema === 0 ? 'active' : 'inactive'}
          onClick= {() => handleAsemaButtonClick(0)}
        >
          Asiantuntija
        </button>
        <button
          className= {activeButtonAsema === 1 ? 'active' : 'inactive'}
          onClick= {() => handleAsemaButtonClick(1)}
        >
          Päällikkö
        </button>
        <button
          className= {activeButtonAsema === 2 ? 'active' : 'inactive'}
          onClick= {() => handleAsemaButtonClick(2)}
        >
          Johtaja
        </button>
        <button
          className= {activeButtonAsema === 3 ? 'active' : 'inactive'}
          onClick= {() => handleAsemaButtonClick(3)}
        >
          Ei mikään näistä
        </button>
      </div>

         {/* Laatikot ja tekstit ikäryhmänapin valinnan alle */}
       {activeButtonToiminta !== null && (
          <div className="selection-info-asema">
            <div className="box-hyva">
            <div className='box-peukku'><ThumbUpOffAltIcon/></div>
            <h2>Jäsenen top 3 nostot asemalle {arvoAsema}:</h2>
            <div className='box-list'>
            <p>{getAsemaTeksti1(activeButtonAsema)}<br/></p>
            </div>
            </div>
            <div className="box-huono">
            <div className='box-peukku'><ThumbDownOffAltIcon/></div>
            <h2>Ei jäsenen vinkit</h2>
            <div className='box-list'>
            <p>{getAsemaTeksti2(activeButtonAsema)}<br/></p>
            </div>
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




