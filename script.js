// const firstnameInput = document.querySelector("#firstname");      // a #-et ne felejtsem el!! ID esetében #, class esetében pont(.)-t tegyünk.
                                                                     // ez csak a querySelectornál van így. 

const firstnameInput = document.getElementById("firstname");         // Az 1.sor így is kiírható 
const results1 = document.getElementById("results1");                // a results1-re íratjuk ki a lentebbi (fetch-es) meghívást
const results2 = document.getElementById("results2");                 // az axiost pedig ide.



firstnameInput.addEventListener('input', (e) => {         // Change event volt, helyette beírtam input, mert igazából mindegy mit adok meg neki.
                                                          // ...ez azért kell,  ha változás van a beírt szövegben, az is fusso le.
//console.log(e);                                         // az e ()-ben van, de ha nincs, akkor is fut.


                                                          // https://hur.webmania.cc/firstnames/XXX.json  ---> az XXX helyére kerül az,
                                                          //...  amit az 'input' mező tartalmaz (vagyis a felhasználó által beírt valamit).

if(firstnameInput.value.length > 2){                      // Ebben az esetben, a network/preview (hálózat/előnézet)-ben csak akkor 
                                                          //...  jelenik meg a json, ha 2-nél több betűt írok az input mezőbe.
                                                          //... ezzel egyidejűleg, látszik a szűrés vagy szűkítés is, miszerint
                                                          //...  kevesebb név jelent meg a json-ben.
                                                          
                                                         

//---------------------------------------------------- FETCH HASZNÁLATA ------------------------------------------------------




 fetch(`https://hur.webmania.cc/firstnames/${firstnameInput.value}.json`)      //  Template literal = ` ` ---> alt+7 -es idézőjel.
                                                                               // ....ezt akkor kell használni, mikor bele akarunk helyezni
                                                                               //...  egy változót. {...}
                                                                               // ---> https://hur.webmania.cc/firstnames/{...}.json
                                                                               //... jelen esetben a firstnameInput - t, + az értékét (value),
                                                                               //...   elé pedig a $ jelet.
                                                                               // Ezzel kiment a meghívás a megadott címre (url) , amit 
                                                                               // ... megvizsgálhatunk --->  f12/API/ JSON oldal.


                                                                               // A fetch elküld egy  kérést az API fele, de nem lehet tudni,
                                                                               //... hogy mikor érkezik meg a válasz. Ezért egy promis-szal
                                                                               // tér vissza. Ezeket a promis-okat a .then függvénnyel tuddjuk elkapni.
                                                                               // Amikor végzett a lekéréssel, akkor fut le az az ág, amit
                                                                               //... a .then-be teszünk. ---> 50.sor





   .then(response => response.json())
                                                                               // response = válasz  
                                                                               //   => / feterro   
                                                                               // response.json ---> json-t azért írunk, mert az API megmondta, h
                                                                               //... json-nel fog visszatérni. Ez a 30.sorban is látszik,
                                                                               // .. a meghívás végén.
                                                                               //  Ebbe a sorba még csak bolvasódik az adat. 
                                                                               
                                                                               // A kapott válasz, vagyis a beolvasott adat szintén egy promis-t 
                                                                               // ... ad vissza, ezért használjuk ismét a .then-t, amibe
                                                                               //  mostmár adatok is vannak. Ezt a következőképp írjuk ki:

// .then(data => console.log(data))                                  // Itt kiírattam consolra az adatot, ezt kaptam: {firstnames: Array(5)}
                    

          .then (data => {                                                        //  A firstname tömböt dolgozom fel.
               data.firstnames.forEach(firstname =>{                              // forEach = ezzel tudok végigmenni az elemeken
       
               results1.innerHTML += `<li>${firstname.name}</li>`;                // azért, hogy a 'firstname.nem'-et változónak értékelje, 
                                                                                  // ... kell a $ jel és a {...} 
               })
           })


// ------------------------------------------ AXIOS HASZNÁLATA ---------------------------------------------------


// axios = js-es segédkönyvtár

// keretrendszerek esetében érdemes telepíteni. ---> https://github.com/axios/axios  ---> lent installing katt
//                                              ---> egyszerű js használatánál elég az egyik CDN link, amit HTML -be bemásolok.
//                                     Jelen esetben : <script src="https://unpkg.com/axios@1.1.2/dist/axios.min.js"></script>
//                                     ---> ezután js-ben használhatjuk az axios objektumot és  különböző metódusait.


                                                           // amikor adatot kérünk a szervertől akkor ezt használjuk ---> get:

   axios.get(`https://hur.webmania.cc/firstnames/${firstnameInput.value}.json`)   // Ugyanaz az url lesz, mint a fetch-nél.
                                                                                  // Mivel ez is egy promist ad vissza, így 
                                                                                  // ... itt is használjuk a .then-t, annyi különbséggel, hogy 
                                                                                  // ... kihagyhatunk egy sort, mivel egyből az adatokat kapjuk vissza.
                                  
     //  .then(data => console.log(data))                            // Ebben az esetben consol/data/firstname -ben vannak az adatok
     //  .then(response => console.log(response.data))               // Ebben az esetben consol/firstname/firstname -ben vannak az adatok
        .then (response =>{
               response.data.firstnames.forEach(firstname => {
             
              results2.innerHTML += `<li>${firstname.name}</li>`; 
              })
        })                                            
}

})
                                                          
