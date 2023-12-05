//tests -  do not pay attention

import React, { useState, useEffect } from "react";

function Carousel({ itemsToShow, children }) {
  const [displayedItems, setDisplayedItems] = useState(itemsToShow);

  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;
      if (screenWidth < 600) {
      } else if (screenWidth < 900) {
        setDisplayedItems(4);
      } else {
        setDisplayedItems(itemsToShow);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [itemsToShow]);

  return (
    <div className="carousel">
      {React.Children.map(children, (child, index) => (
        <div
          className="carousel-item"
          style={{ flex: `0 0 calc(100% / ${displayedItems})` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

export default Carousel;

const slideWidth = 30;

const CarouselSlideItem = ({ element, pos, idx, activeIdx }) => {
  const item = {
    styles: {
      transform: `translateX(${pos * slideWidth}rem)`,
    },
  };

  switch (pos) {
    case -1:
    case 1:
      item.styles = { ...item.styles, filter: "grayscale(1)" };
      break;
    case 0:
      break;
    default:
      item.styles = { ...item.styles, opacity: 0 };
      break;
  }

  return (
    <li className="carousel__slide-item" style={item.styles}>
      {element}
    </li>
  );
};
//===========================test
const Carousel = () => {
  const [items, setItems] = React.useState(
    mappingCategories.map((element, idx) => idx)
  );
  const [isTicking, setIsTicking] = React.useState(false);
  const [activeIdx, setActiveIdx] = React.useState(0);
  const bigLength = items.length;

  const prevClick = (jump = 1) => {
    if (!isTicking) {
      setIsTicking(true);
      setItems((prev) => {
        return prev.map((_, i) => prev[(i + jump) % bigLength]);
      });
    }
  };

  const nextClick = (jump = 1) => {
    if (!isTicking) {
      setIsTicking(true);
      setItems((prev) => {
        return prev.map((_, i) => prev[(i - jump + bigLength) % bigLength]);
      });
    }
  };

  const handleDotClick = (idx) => {
    if (idx < activeIdx) prevClick(activeIdx - idx);
    if (idx > activeIdx) nextClick(idx - activeIdx);
  };

  React.useEffect(() => {
    if (isTicking) sleep(300).then(() => setIsTicking(false));
  }, [isTicking]);

  React.useEffect(() => {
    setActiveIdx((bigLength - (items[0] % bigLength)) % bigLength);
  }, [items]);

  return (
    <div className="carousel__wrap">
      <div className="carousel__inner">
        <button
          className="carousel__btn carousel__btn--prev"
          onClick={() => prevClick()}
        >
          <i className="carousel__btn-arrow carousel__btn-arrow--left" />
        </button>
        <div className="carousel__container">
          <ul className="carousel__slide-list">
            {items.map((pos, i) => (
              <CarouselSlideItem
                key={i}
                element={mappingCategories[i]}
                idx={i}
                pos={pos}
                activeIdx={activeIdx}
              />
            ))}
          </ul>
        </div>
        <button
          className="carousel__btn carousel__btn--next"
          onClick={() => nextClick()}
        >
          <i className="carousel__btn-arrow carousel__btn-arrow--right" />
        </button>
        <div className="carousel__dots">
          {items.slice(0, mappingCategories.length).map((pos, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={i === activeIdx ? "dot active" : "dot"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<Carousel />, document.getElementById("root"));
