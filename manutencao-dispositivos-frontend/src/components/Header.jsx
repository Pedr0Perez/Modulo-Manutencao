import React, { useEffect } from "react";
import "./styles/Header.css";
import LogoSis from "../assets/logo-sis.png";
import { useNavigate } from "react-router-dom";
import MenuUser from "./MenuUser";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { Fade } from "@mui/material";
import TooltipCustom from "./TooltipCustom";

export default function Header() {
  const navigate = useNavigate();

  const enableTooltips = () => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
  };

  useEffect(() => {
    setTimeout(() => {
      enableTooltips();
    }, 100);
  }, []);

  return (
    <header className="header">
      <TooltipCustom title="Página Inicial do Módulo de Manutenções">
        <span
          className="sis-logo-container sis-logo-head-container"
          onClick={() => navigate("/home")}
        >
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 740.000000 740.000000"
            preserveAspectRatio="xMidYMid meet"
            className="sis-logo-head"
          >
            <g
              transform="translate(0.000000,740.000000) scale(0.100000,-0.100000)"
              fill="var(--sis-color)"
              stroke="none"
            >
              <path
                d="M3454 7390 c-760 -53 -1470 -330 -2069 -806 -142 -113 -456 -427
-569 -569 -445 -559 -705 -1188 -792 -1915 -24 -199 -24 -601 0 -800 87 -727
347 -1356 792 -1915 113 -142 427 -456 569 -569 559 -445 1188 -705 1915 -792
199 -24 601 -24 800 0 727 87 1356 347 1915 792 142 113 456 427 569 569 445
559 705 1188 792 1915 12 102 17 220 17 400 0 180 -5 298 -17 400 -87 727
-347 1356 -792 1915 -113 142 -427 456 -569 569 -556 443 -1198 709 -1905 790
-167 19 -495 27 -656 16z m-859 -1307 c47 -25 85 -64 111 -113 18 -33 19 -71
19 -740 0 -669 -1 -707 -19 -740 -26 -49 -64 -88 -111 -113 -40 -22 -46 -22
-585 -22 -513 0 -547 1 -580 19 -49 26 -88 64 -113 111 -22 40 -22 42 -22 745
0 669 1 707 19 740 35 66 87 109 156 131 14 4 264 7 555 6 522 -2 531 -2 570
-24z m3288 16 c14 -6 30 -22 36 -36 8 -16 11 -164 11 -468 l0 -445 40 0 c53 0
86 -17 100 -50 10 -23 5 -56 -25 -196 -43 -192 -48 -208 -82 -223 -34 -16
-1792 -16 -1826 0 -34 15 -39 31 -82 223 -30 140 -35 173 -25 196 14 33 47 50
100 50 l40 0 0 445 c0 464 2 483 44 503 31 15 1637 16 1669 1z m-2160 -800
c43 -20 47 -45 47 -304 l0 -245 -80 0 -80 0 0 200 0 200 -360 0 -360 0 0 80 0
80 405 0 c275 0 412 -4 428 -11z m151 -719 c35 -13 44 -35 58 -144 7 -53 16
-96 22 -96 5 0 44 27 87 60 115 89 114 89 271 -68 157 -157 157 -156 68 -271
-33 -43 -60 -82 -60 -88 0 -6 30 -14 68 -18 184 -19 182 -17 182 -235 0 -93
-4 -180 -10 -194 -13 -35 -35 -44 -144 -57 -53 -7 -96 -17 -96 -22 0 -6 27
-45 60 -88 89 -115 89 -114 -68 -271 -156 -156 -154 -156 -270 -68 -44 33 -85
60 -91 60 -6 0 -11 -11 -11 -25 0 -13 -5 -59 -12 -102 -18 -123 -18 -123 -235
-123 -201 0 -215 4 -232 68 -5 20 -13 70 -17 110 -3 39 -11 72 -16 72 -6 0
-46 -27 -90 -60 -116 -88 -114 -88 -270 68 -156 156 -156 154 -68 270 33 44
60 84 60 89 0 6 -43 15 -96 22 -109 13 -131 22 -144 57 -6 14 -10 101 -10 194
0 218 -2 216 183 235 37 4 67 12 67 17 0 6 -27 46 -60 90 -88 116 -88 114 68
270 156 156 154 156 270 68 44 -33 84 -60 90 -60 5 0 13 35 17 78 9 100 24
143 55 159 30 15 335 18 374 3z m1256 -435 c0 -245 -4 -372 -11 -388 -18 -41
-49 -47 -224 -47 l-165 0 0 80 0 80 120 0 120 0 0 320 0 320 80 0 80 0 0 -365z
m-2480 -435 l0 -80 -240 0 -240 0 0 -280 0 -280 -80 0 -80 0 0 325 c0 339 3
364 44 383 13 7 132 11 309 11 l287 1 0 -80z m3300 -664 c49 -26 88 -64 113
-111 22 -40 22 -42 22 -745 0 -703 0 -705 -22 -745 -25 -47 -64 -85 -113 -111
-32 -18 -64 -19 -420 -19 -356 0 -388 1 -420 19 -49 26 -88 64 -113 111 -22
40 -22 42 -22 745 0 669 1 707 19 740 35 66 87 109 156 131 14 4 192 7 395 6
340 -2 373 -4 405 -21z m-3035 -163 c47 -25 85 -64 111 -113 18 -33 19 -65 19
-500 0 -457 0 -466 -22 -505 -25 -47 -64 -85 -113 -111 -30 -16 -63 -20 -217
-22 -132 -3 -183 -7 -183 -15 0 -7 11 -55 25 -107 31 -120 31 -145 0 -175
l-24 -25 -341 0 -341 0 -24 25 c-31 30 -31 55 0 175 14 52 25 100 25 107 0 8
-51 12 -182 15 -155 2 -188 6 -218 22 -49 26 -88 64 -113 111 -22 39 -22 48
-22 505 0 435 1 467 19 500 35 66 87 109 156 131 14 4 336 7 715 6 686 -2 690
-2 730 -24z m855 -493 l0 -280 520 0 520 0 0 -80 0 -80 -565 0 c-392 0 -571 3
-588 11 -44 20 -47 41 -47 384 l0 325 80 0 80 0 0 -280z"
              />
              <path
                d="M1475 5925 l-25 -24 0 -671 0 -671 25 -24 24 -25 511 0 511 0 24 25
25 24 0 671 0 671 -25 24 -24 25 -511 0 -511 0 -24 -25z m615 -1175 l0 -80
-80 0 -80 0 0 80 0 80 80 0 80 0 0 -80z"
              />
              <path
                d="M4330 5550 l0 -400 285 0 c190 0 292 -4 309 -11 13 -7 30 -25 37 -40
11 -28 13 -29 89 -29 76 0 78 1 89 29 7 15 24 33 37 40 17 7 119 11 309 11
l285 0 0 400 0 400 -720 0 -720 0 0 -400z"
              />
              <path
                d="M4203 4968 c3 -13 11 -49 18 -80 l12 -58 817 0 817 0 12 58 c7 31 15
67 18 80 l5 22 -305 0 -305 0 -11 -29 c-19 -45 -46 -51 -231 -51 -185 0 -212
6 -231 51 l-11 29 -305 0 -305 0 5 -22z"
              />
              <path
                d="M3606 4398 c-3 -18 -10 -67 -16 -108 -6 -41 -18 -82 -26 -91 -8 -9
-40 -26 -70 -37 -67 -26 -80 -22 -174 53 -38 30 -73 55 -77 55 -11 0 -113
-103 -113 -113 0 -5 25 -39 55 -77 75 -94 79 -107 53 -174 -11 -30 -28 -62
-37 -70 -9 -8 -50 -20 -91 -26 -41 -6 -90 -13 -107 -16 l-33 -5 0 -79 0 -79
33 -5 c17 -3 66 -10 107 -16 41 -6 82 -18 91 -26 9 -8 26 -40 37 -70 26 -67
22 -80 -53 -174 -30 -38 -55 -73 -55 -77 0 -11 103 -113 113 -113 5 0 39 25
77 55 94 75 107 79 174 53 30 -11 62 -28 70 -37 8 -9 20 -50 26 -91 6 -41 13
-90 16 -107 l5 -33 79 0 79 0 5 33 c3 17 10 66 16 107 6 41 18 82 26 91 8 9
40 26 70 37 67 26 80 22 174 -53 38 -30 73 -55 77 -55 11 0 113 103 113 114 0
4 -25 40 -56 79 -31 40 -60 82 -65 94 -10 26 23 123 50 147 10 9 53 20 97 26
147 20 134 10 134 100 0 90 13 80 -134 100 -44 6 -87 17 -97 26 -27 24 -60
121 -50 147 5 12 34 54 65 94 31 39 56 75 56 80 0 11 -103 113 -113 113 -5 0
-39 -25 -77 -55 -94 -75 -107 -79 -174 -53 -30 11 -62 28 -70 37 -8 9 -20 50
-26 91 -6 41 -13 90 -16 108 l-5 32 -79 0 -79 0 -5 -32z m195 -308 c125 -38
215 -121 259 -237 79 -207 -23 -436 -227 -513 -207 -79 -436 23 -513 227 -117
310 169 620 481 523z"
              />
              <path
                d="M3605 3936 c-55 -21 -130 -102 -145 -157 -14 -52 -8 -135 13 -175 20
-38 73 -91 111 -112 43 -23 170 -23 212 0 76 41 123 110 131 193 10 97 -44
197 -132 242 -42 22 -141 27 -190 9z"
              />
              <path
                d="M5155 2885 l-25 -24 0 -671 0 -671 25 -24 24 -25 351 0 351 0 24 25
25 24 0 671 0 671 -25 24 c-34 35 -52 32 -60 -12 -14 -77 -62 -140 -135 -179
-30 -16 -58 -19 -180 -19 -130 0 -149 2 -185 22 -70 37 -116 100 -130 176 -8
44 -26 47 -60 12z"
              />
              <path
                d="M5370 2895 c0 -9 11 -27 25 -40 23 -24 31 -25 135 -25 104 0 112 1
135 25 14 13 25 31 25 40 0 13 -22 15 -160 15 -138 0 -160 -2 -160 -15z"
              />
              <path
                d="M1475 2725 l-25 -24 0 -296 0 -295 720 0 720 0 0 295 0 296 -25 24
-24 25 -671 0 -671 0 -24 -25z"
              />
              <path
                d="M1450 1895 c0 -46 4 -60 25 -80 l24 -25 671 0 671 0 24 25 c21 20 25
34 25 80 l0 55 -720 0 -720 0 0 -55z"
              />
              <path
                d="M1995 1618 c-6 -19 -35 -135 -35 -142 0 -3 95 -6 210 -6 116 0 210 3
210 8 0 4 -9 39 -18 77 l-18 70 -172 3 c-133 2 -173 0 -177 -10z"
              />
            </g>
          </svg>
        </span>
      </TooltipCustom>
      <MenuUser />
    </header>
  );
}