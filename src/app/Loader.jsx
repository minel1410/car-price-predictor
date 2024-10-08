

import "./globals.css";
import { useState, useEffect } from "react";

function getRandomIntBetween(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export default function Loader() {


    const [factIndex, setFactIndex] = useState(0);

    const funFacts = [
      "Otprilike 80% svih automobila koji se prodaju u Bosni i Hercegovini su polovni, dok novih automobila čini samo 20% tržišta.",
      "Najpopularniji brendovi polovnih automobila u BiH su Volkswagen, Audi, BMW, i Škoda, sa Volkswagenom često na vrhu liste zbog svoje pouzdanosti i dostupnosti delova.",
      "Prosečna starost polovnog automobila u BiH je oko 15 godina, što je u velikoj meri rezultat niskog uvoza novih vozila i ekonomskih faktora koji utiču na kupovnu moć.",
      "Prosečna cena polovnog automobila u BiH je oko 10.000 KM, mada cene mogu značajno varirati zavisno od brenda, modela, godine proizvodnje i stanja vozila.",
      "Polovni automobili u BiH često imaju visoku kilometražu, sa prosečnim brojem pređenih kilometara od oko 200.000 km.",
      "Automobili na dizel su i dalje veoma popularni u BiH zbog njihovih ekonomičnih prednosti u odnosu na benzinske motore, iako se interesovanje za vozila na LPG (plin) u poslednje vreme povećava.",
      "Približno 40% kupaca polovnih automobila u BiH traži dodatne provere i izveštaje o stanju vozila pre kupovine, kako bi se izbegli skriveni problemi i oštećenja.",
    ];

    useEffect(() => {
      const intervalId = setInterval(() => {
        setFactIndex(getRandomIntBetween(0, funFacts.length - 1));
      }, 1500);

      return () => clearInterval(intervalId);
    }, []);

    return (
      <div className="w-full flex flex-col justify-center items-center">
        <svg
          viewBox="0 0 178 40"
          width="178"
          height="40"
          className="overflow-hidden w-96 h-96 md:h-[600px] md:w-[600px]"
        >
          <path
            class="air"
            d="M 46 16.5 h -20 a 8 8 0 0 1 0 -16"
            fill="none"
            stroke="#E85725"
            stroke-width="1"
            stroke-linejoin="round"
            stroke-linecap="round"
          ></path>

          <g id="car">
            <svg
              viewBox="0 0 118 28.125"
              x="30"
              y="11.725"
              width="118"
              height="28.125"
            >
              <defs>
                <circle id="circle" cx="0" cy="0" r="1"></circle>

                <g id="wheel">
                  <use
                    href="#circle"
                    fill="#1E191A"
                    transform="scale(10)"
                  ></use>
                  <use href="#circle" fill="#fff" transform="scale(5)"></use>
                  <path
                    fill="#1E191A"
                    stroke="#1E191A"
                    stroke-width="0.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    opacity="0.2"
                    stroke-dashoffset="0"
                    d="M -3.5 0 a 4 4 0 0 1 7 0 a 3.5 3.5 0 0 0 -7 0"
                  ></path>
                  <use
                    href="#circle"
                    fill="#1E191A"
                    transform="scale(1.5)"
                  ></use>

                  <path
                    fill="none"
                    stroke="#F9B35C"
                    stroke-width="0.75"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-dasharray="20 14 8 5"
                    d="M 0 -7.5 a 7.5 7.5 0 0 1 0 15 a 7.5 7.5 0 0 1 0 -15"
                  ></path>
                  <path
                    fill="none"
                    stroke="#fff"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    opacity="0.1"
                    stroke-dashoffset="0"
                    d="M -6.5 -6.25 a 10 10 0 0 1 13 0 a 9 9 0 0 0 -13 0"
                  ></path>
                </g>
              </defs>

              <g transform="translate(51.5 11.125)">
                <path
                  stroke-width="2"
                  stroke="#1E191A"
                  fill="#EF3F33"
                  d="M 0 0 v -2 a 4.5 4.5 0 0 1 9 0 v 2"
                ></path>
                <rect
                  fill="#1E191A"
                  x="3.25"
                  y="-3"
                  width="5"
                  height="3"
                ></rect>
              </g>

              <g transform="translate(10 24.125)">
                <g transform="translate(59 0)">
                  <path
                    id="shadow"
                    opacity="0.7"
                    fill="#1E191A"
                    d="M -64 0 l -4 4 h 9 l 8 -1.5 h 100 l -3.5 -2.5"
                  ></path>
                </g>

                <path
                  fill="#fff"
                  stroke="#1E191A"
                  stroke-width="2.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M 0 0 v -10 l 35 -13 v 5 l 4 0.5 l 0.5 4.5 h 35.5 l 30 13"
                ></path>

                <g
                  fill="#fff"
                  stroke="#1E191A"
                  stroke-width="2.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M -6 0 v -22 h 10 z"></path>
                  <path d="M 105 0 h -3 l -12 -5.2 v 6.2 h 12"></path>
                </g>

                <g fill="#949699" opacity="0.7">
                  <rect x="16" y="-6" width="55" height="6"></rect>
                  <path d="M 24 -14 l 13 -1.85 v 1.85"></path>
                </g>

                <g
                  fill="none"
                  stroke="#1E191A"
                  stroke-width="2.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke-dasharray="30 7 42" d="M 90 0 h -78"></path>
                  <path d="M 39.5 -13 h -15"></path>
                </g>

                <path
                  fill="#fff"
                  stroke="#1E191A"
                  stroke-width="2.25"
                  stroke-linejoin="round"
                  d="M 48.125 -6 h -29 v 6 h 29"
                ></path>

                <rect
                  x="48"
                  y="-7.125"
                  width="6.125"
                  height="7.125"
                  fill="#1E191A"
                ></rect>

                <g fill="#1E191A">
                  <rect x="60" y="-15" width="1" height="6"></rect>
                  <rect x="56.5" y="-17.5" width="6" height="2.5"></rect>
                </g>
              </g>

              <g class="wheels" transform="translate(0 18.125)">
                <g transform="translate(10 0)">
                  <use href="#wheel"></use>
                </g>

                <g transform="translate(87 0)">
                  <use href="#wheel" stroke-dashoffset="-22"></use>
                </g>
              </g>
            </svg>
          </g>

          <g
            fill="none"
            stroke-width="1"
            stroke-linejoin="round"
            stroke-linecap="round"
          >
            <path
              class="air"
              stroke="#E85725"
              d="M 177.5 34 h -10 q -16 0 -32 -8"
            ></path>

            <path
              class="air"
              stroke="#949699"
              d="M 167 28.5 c -18 -2 -22 -8 -37 -10.75"
            ></path>

            <path
              class="air"
              stroke="#949699"
              d="M 153 20 q -4 -1.7 -8 -3"
            ></path>

            <path
              class="air"
              stroke="#E85725"
              d="M 117 16.85 c -12 0 -12 16 -24 16 h -8"
            />
            <path
              class="air"
              stroke="#949699"
              d="M 65 12 q -5 3 -12 3.8"
            ></path>

            <path
              class="air"
              stroke="#949699"
              stroke-dasharray="9 10"
              d="M 30 13.5 h -2.5 q -5 0 -5 -5"
            ></path>

            <path class="air" stroke="#949699" d="M 31 33 h -10"></path>

            <path class="air" stroke="#949699" d="M 29.5 23 h -12"></path>
            <path class="air" stroke="#949699" d="M 13.5 23 h -6"></path>

            <path class="air" stroke="#E85725" d="M 28 28 h -27.5"></path>
          </g>
        </svg>
        <p className="px-12 mb-36 text-md text-gray-200 md:text-lg">
          {funFacts[factIndex]}
        </p>
      </div>
    );
}

