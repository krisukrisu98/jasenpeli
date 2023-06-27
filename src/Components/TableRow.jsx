import React, { useState } from "react";

export const TableRow = ({ yksikkoDetails }) => {
  const [showMoreTextKaikki1, setShowMoreTextKaikki1] = useState(false);
  const [showMoreTextKaikki2, setShowMoreTextKaikki2] = useState(false);
  const [showMoreTextKaikki3, setShowMoreTextKaikki3] = useState(false);
  const [showMoreTextKaikki4, setShowMoreTextKaikki4] = useState(false);
  const [showMoreTextKaikki5, setShowMoreTextKaikki5] = useState(false);
  const [activeTableRow, setActiveTableRow] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([
    { id: 1, name: yksikkoDetails.valitaso1, price: yksikkoDetails.raha1, selected: true },
    { id: 2, name: yksikkoDetails.valitaso2, price: yksikkoDetails.raha2, selected: true },
    { id: 3, name: yksikkoDetails.valitaso3, price: yksikkoDetails.raha3, selected: true },
    { id: 4, name: yksikkoDetails.valitaso4, price: yksikkoDetails.raha4, selected: true },
    { id: 5, name: yksikkoDetails.valitaso5, price: yksikkoDetails.raha5, selected: true }
  ]);

  const handleShowMoreClickKaikki1 = () => {
    setShowMoreTextKaikki1(!showMoreTextKaikki1);
    setShowMoreTextKaikki2(false);
    setShowMoreTextKaikki3(false);
    setShowMoreTextKaikki4(false);
    setShowMoreTextKaikki5(false);
    setActiveTableRow(1);
  };

  const handleShowMoreClickKaikki2 = () => {
    setShowMoreTextKaikki2(!showMoreTextKaikki2);
    setShowMoreTextKaikki1(false);
    setShowMoreTextKaikki3(false);
    setShowMoreTextKaikki4(false);
    setShowMoreTextKaikki5(false);
    setActiveTableRow(2);
  };

  const handleShowMoreClickKaikki3 = () => {
    setShowMoreTextKaikki3(!showMoreTextKaikki3);
    setShowMoreTextKaikki1(false);
    setShowMoreTextKaikki2(false);
    setShowMoreTextKaikki4(false);
    setShowMoreTextKaikki5(false);
    setActiveTableRow(3);
  };

  const handleShowMoreClickKaikki4 = () => {
    setShowMoreTextKaikki4(!showMoreTextKaikki4);
    setShowMoreTextKaikki1(false);
    setShowMoreTextKaikki2(false);
    setShowMoreTextKaikki3(false);
    setShowMoreTextKaikki5(false);
    setActiveTableRow(4);
  };

  const handleShowMoreClickKaikki5 = () => {
    setShowMoreTextKaikki5(!showMoreTextKaikki5);
    setShowMoreTextKaikki1(false);
    setShowMoreTextKaikki2(false);
    setShowMoreTextKaikki3(false);
    setShowMoreTextKaikki4(false);
    setActiveTableRow(5);
  };

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

  const shouldShowMoreText = (index) => {
    if (activeTableRow === null) {
      return false;
    }
    return activeTableRow === index;
  };

  return (
    <tr className="tr-valitaso">
      <td></td>
      <td>
        <div className="checkbox-container">
          <h5 onClick={handleShowMoreClickKaikki1}>{yksikkoDetails.valitaso1}</h5>
          {shouldShowMoreText(1) && showMoreTextKaikki1 && <p>{yksikkoDetails.tarkenne1}</p>}
          <label>
            <input
              type="checkbox"
              checked={selectedProducts[0].selected}
              onChange={() => handleProductToggle(selectedProducts[0].id)}
            />
          </label>
        </div>
        <div className="checkbox-container">
          <h5 onClick={handleShowMoreClickKaikki2}>{yksikkoDetails.valitaso2}</h5>
          {shouldShowMoreText(2) && showMoreTextKaikki2 && <p>{yksikkoDetails.tarkenne2}</p>}
          <label>
            <input
              type="checkbox"
              checked={selectedProducts[1].selected}
              onChange={() => handleProductToggle(selectedProducts[1].id)}
            />
          </label>
        </div>
        <div className="checkbox-container">
          <h5 onClick={handleShowMoreClickKaikki3}>{yksikkoDetails.valitaso3}</h5>
          {shouldShowMoreText(3) && showMoreTextKaikki3 && <p>{yksikkoDetails.tarkenne3}</p>}
          <label>
            <input
              type="checkbox"
              checked={selectedProducts[2].selected}
              onChange={() => handleProductToggle(selectedProducts[2].id)}
            />
          </label>
        </div>
        <div className="checkbox-container">
          <h5 onClick={handleShowMoreClickKaikki4}>{yksikkoDetails.valitaso4}</h5>
          {shouldShowMoreText(4) && showMoreTextKaikki4 && <p>{yksikkoDetails.tarkenne4}</p>}
          <label>
            <input
              type="checkbox"
              checked={selectedProducts[3].selected}
              onChange={() => handleProductToggle(selectedProducts[3].id)}
            />
          </label>
        </div>
        {yksikkoDetails.valitaso5 && (
          <div className="checkbox-container">
            <h5 onClick={handleShowMoreClickKaikki5}>{yksikkoDetails.valitaso5}</h5>
            {shouldShowMoreText(5) && showMoreTextKaikki5 && <p>{yksikkoDetails.tarkenne5}</p>}
            <label>
              <input
                type="checkbox"
                checked={selectedProducts[4].selected}
                onChange={() => handleProductToggle(selectedProducts[4].id)}
              />
            </label>
          </div>
        )}
      </td>
      <td>
        <p>Total: {calculateTotalPrice()}</p>
      </td>
    </tr>
  );
};
